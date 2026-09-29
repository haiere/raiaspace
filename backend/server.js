import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const SEARXNG_URL = process.env.SEARXNG_URL || "http://searxng:8080";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const FETCH_TIMEOUT_MS = parseInt(process.env.FETCH_TIMEOUT_MS || "15000", 10);

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());

app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
}));

// ── Health check ────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Search endpoint ─────────────────────────────────────────
app.get("/api/search", async (req, res) => {
  const {
    q,
    mode = "web",
    page = 1,
    language,
    time_range,
    safesearch,
    categories,
  } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ ok: false, error: "Missing query parameter 'q'." });
  }

  // Map RaiaSpace modes → SearXNG categories
  const CATEGORY_MAP = {
    web: "general",
    ai: "general",
    images: "images",
    videos: "videos",
    news: "news",
    academic: "science",
    maps: "general",
    shopping: "general",
    social: "general",
    files: "general",
  };

  const params = new URLSearchParams({
    q: q.trim(),
    format: "json",
    pageno: String(page),
  });

  const category = categories || CATEGORY_MAP[mode] || "general";
  if (category) params.set("categories", category);
  if (language) params.set("language", language);
  if (time_range) params.set("time_range", time_range);
  if (safesearch !== undefined) params.set("safesearch", String(safesearch));

  const searxngEndpoint = `${SEARXNG_URL}/search?${params.toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(searxngEndpoint, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!upstream.ok) {
      // 403 almost always means JSON format is not enabled in SearXNG
      if (upstream.status === 403) {
        return res.status(502).json({
          ok: false,
          error: "SearXNG rejected the request (403). Enable 'json' in search.formats of settings.yml.",
        });
      }
      if (upstream.status === 429) {
        return res.status(429).json({
          ok: false,
          error: "SearXNG rate-limited the request. Try again shortly.",
        });
      }
      return res.status(upstream.status).json({
        ok: false,
        error: `SearXNG returned HTTP ${upstream.status}.`,
      });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return res.status(502).json({
        ok: false,
        error: "SearXNG returned non-JSON content. Check that 'json' is in search.formats.",
      });
    }

    const data = await upstream.json();

    // ── Normalize results for the frontend ─────────────────
    const results = (data.results || []).map((r) => ({
      title: r.title || "",
      url: r.url || "",
      snippet: r.content || "",
      domain: (() => {
        try { return new URL(r.url).hostname.replace(/^www\./, ""); }
        catch { return ""; }
      })(),
      engine: r.engine || (Array.isArray(r.engines) ? r.engines[0] : "") || "",
      publishedDate: r.publishedDate || "",
      thumbnail: r.thumbnail || r.img_src || "",
    }));

    res.json({
      ok: true,
      query: q,
      mode,
      page: Number(page),
      number_of_results: data.number_of_results ?? results.length,
      results,
      suggestions: data.suggestions || [],
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      return res.status(504).json({ ok: false, error: "Search request timed out." });
    }
    console.error("[search] upstream error:", err);
    res.status(502).json({ ok: false, error: "Could not reach the search backend." });
  }
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`RaiaSpace backend listening on :${PORT}`);
  console.log(`SearXNG upstream: ${SEARXNG_URL}`);
  console.log(`CORS origin: ${FRONTEND_ORIGIN}`);
});
