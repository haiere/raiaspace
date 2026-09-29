/* ============================================================
   RaiaSpace Search v0.1.4 — Application Logic
   Talks to a RaiaSpace backend, which proxies SearXNG.
   ============================================================ */
(function () {
    "use strict";

    /* ============ ICON LIBRARY ============ */
    const ICONS = {
        web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
        ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/></svg>',
        images: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5-11 11"/></svg>',
        videos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m21 8-4 3 4 3z"/></svg>',
        news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h6M7 12h10M7 16h10"/></svg>',
        maps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
        shopping: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>',
        academic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l10-5 10 5-10 5-10-5z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/></svg>',
        social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="17" cy="7" r="2.3"/><path d="M2.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5M14.5 19c.3-2 1.7-3.6 3.4-4.2"/></svg>',
        files: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
        arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
        trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
        bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
        copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
        share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
        external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
        warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
        sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
        fast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
        layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>',
        doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>',
        image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5-11 11"/></svg>'
    };

    /* ============ STORE ============ */
    const Store = {
        get(k, fb) { try { const v = localStorage.getItem(k); return v === null ? fb : JSON.parse(v); } catch (e) { return fb; } },
        set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
        del(k) { try { localStorage.removeItem(k); } catch (e) {} }
    };

    /* ============ STATE ============ */
    // Same-origin by default. Override with a full URL if the API lives elsewhere.
    const DEFAULT_API_BASE_URL = "/api";
    const State = {
        theme: Store.get("rs_theme", "system"),
        reducedMotion: Store.get("rs_reduced_motion", false),
        safeSearch: Store.get("rs_safe_search", true),
        suggestionsEnabled: Store.get("rs_suggestions", true),
        saveHistory: Store.get("rs_save_history", true),
        history: Store.get("rs_history", []),
        mode: "web",
        filters: {},
        activeFilterCount: 0,
        // Backward compat: migrate old searxng-url key to api-url
        apiBaseUrl: localStorage.getItem("raiaspace-api-url")
            || (function () {
                const legacy = localStorage.getItem("raiaspace-searxng-url");
                if (legacy) {
                    localStorage.removeItem("raiaspace-searxng-url");
                    localStorage.setItem("raiaspace-api-url", DEFAULT_API_BASE_URL);
                }
                return DEFAULT_API_BASE_URL;
            })(),
        apiStatus: "untested",
        currentPage: 1,
        lastQuery: "",
        imageFile: null,
        genericFile: null,
        activeTab: "All"
    };

    /* ============ CONSTANTS ============ */
    const MODES = [
        { id: "web", label: "Web", icon: "web", desc: "Search across the public web." },
        { id: "ai", label: "AI Answer", icon: "ai", desc: "Ask a complex question and get a structured answer." },
        { id: "images", label: "Images", icon: "images", desc: "Find visual results, products, and references." },
        { id: "videos", label: "Videos", icon: "videos", desc: "Search tutorials, explainers, and video content." },
        { id: "news", label: "News", icon: "news", desc: "Explore recent reports and current events." },
        { id: "maps", label: "Maps", icon: "maps", desc: "Find places, directions, and local information." },
        { id: "shopping", label: "Shopping", icon: "shopping", desc: "Compare products, prices, and reviews." },
        { id: "academic", label: "Academic", icon: "academic", desc: "Find research papers, journals, and scholarly sources." },
        { id: "social", label: "Social", icon: "social", desc: "Search public discussions and communities." },
        { id: "files", label: "Files", icon: "files", desc: "Search documents and file-type focused results." }
    ];

    const PLACEHOLDERS = {
        web: "Search the web, ask a question, or paste a link…",
        ai: "Ask a complex question…",
        images: "Describe an image to find…",
        videos: "Search for tutorials, explainers, videos…",
        news: "Search recent news and reports…",
        maps: "Search places, addresses, directions…",
        shopping: "Search products, brands, prices…",
        academic: "Search papers, journals, authors…",
        social: "Search discussions and communities…",
        files: "Search documents (PDF, DOCX, TXT)…"
    };

    const TRENDING = [
        { title: "Latest space exploration missions", category: "Science" },
        { title: "Frontend performance techniques", category: "Technology" },
        { title: "Lossless audio format comparison", category: "Audio" },
        { title: "New developments in AI", category: "Technology" },
        { title: "Climate technology breakthroughs", category: "Environment" },
        { title: "Modern aerospace engineering", category: "Engineering" }
    ];

    const FEATURES = [
        { icon: "fast", title: "Fast by default", desc: "Get to useful results with a focused, low-distraction interface." },
        { icon: "layers", title: "Search your way", desc: "Switch between web, AI, image, video, news, academic, and shopping modes." },
        { icon: "sparkle", title: "Multimodal input", desc: "Search using text, voice, images, camera input, URLs, and documents." },
        { icon: "shield", title: "Privacy-focused", desc: "Keep your search experience clear, transparent, and under your control." }
    ];

    const SUGGESTION_POOL = [
        "artificial intelligence trends", "space exploration news", "best lossless audio formats",
        "frontend performance techniques", "climate technology", "aerospace engineering jobs",
        "how does search indexing work", "privacy focused browsers", "machine learning basics",
        "renewable energy breakthroughs"
    ];

    // Mode → backend query parameters. The backend handles the SearXNG category mapping.
    const LANGUAGE_CODE_MAP = { "English": "en", "Bahasa Indonesia": "id", "Spanish": "es", "Japanese": "ja", "Any language": "" };
    const SAFE_SEARCH_MAP = { "Moderate": "1", "Strict": "2", "Off": "0" };
    const TIME_RANGE_MAP = { "Any time": "", "Past hour": "day", "Past day": "day", "Past week": "week", "Past month": "month", "Past year": "year" };
    const API_TIMEOUT_MS = 15000;

    const RESULT_TABS = ["All", "AI Overview", "Images", "Videos", "News", "Discussions"];

    /* ============ HELPERS ============ */
    function $(id) { return document.getElementById(id); }
    function escapeHTML(s) { const d = document.createElement("div"); d.textContent = String(s == null ? "" : s); return d.innerHTML; }
    function escapeAttr(s) { return escapeHTML(s); }
    function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }

    function toast(msg) {
        const stack = $("toastStack");
        if (!stack) return;
        const el = document.createElement("div");
        el.className = "toast";
        el.innerHTML = ICONS.check + "<span>" + escapeHTML(msg) + "</span>";
        stack.appendChild(el);
        requestAnimationFrame(() => el.classList.add("show"));
        setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 220); }, 2800);
    }

    function timeAgo(ts) {
        const diff = Math.max(0, Date.now() - ts);
        const min = Math.floor(diff / 60000);
        if (min < 1) return "just now";
        if (min < 60) return min + "m ago";
        const hr = Math.floor(min / 60);
        if (hr < 24) return hr + "h ago";
        return Math.floor(hr / 24) + "d ago";
    }

    function formatBytes(b) {
        if (b < 1024) return b + " B";
        if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
        return (b / 1048576).toFixed(1) + " MB";
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => toast("Link copied")).catch(() => toast("Could not copy link"));
        } else {
            toast("Copy not supported in this browser");
        }
    }

    function doShare(title, url) {
        if (navigator.share) { navigator.share({ title, url }).catch(() => {}); }
        else { copyToClipboard(url); toast("Share unavailable — link copied"); }
    }

    /* ============ THEME ============ */
    function applyTheme() {
        let effective = State.theme;
        if (effective === "system") {
            effective = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        document.documentElement.setAttribute("data-theme", effective);
        document.querySelectorAll("[data-theme-choice]").forEach(btn => {
            btn.setAttribute("aria-pressed", btn.dataset.themeChoice === State.theme ? "true" : "false");
        });
    }

    function setTheme(t) { State.theme = t; Store.set("rs_theme", t); applyTheme(); }

    /* ============ BACKEND CLIENT ============ */
    let searchAbortController = null;

    // Accepts "/api", "api", "https://api.example.com", "https://api.example.com/"
    // Returns a normalized base with no trailing slash.
    function normalizeApiBaseUrl(raw) {
        if (!raw || !raw.trim()) {
            return { valid: false, error: "Enter a valid API base URL or a relative path like /api." };
        }
        const trimmed = raw.trim();
        // Relative path
        if (trimmed.startsWith("/") || (!trimmed.includes("://") && !trimmed.startsWith("http"))) {
            let path = trimmed.replace(/\/+$/, "");
            if (!path.startsWith("/")) path = "/" + path;
            return { valid: true, url: path, error: null };
        }
        try {
            const parsed = new URL(trimmed);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                return { valid: false, error: "Only HTTP and HTTPS URLs are supported." };
            }
            let clean = parsed.origin + parsed.pathname.replace(/\/+$/, "");
            clean = clean.replace(/\/+$/, "");
            return { valid: true, url: clean, error: null };
        } catch (e) {
            return { valid: false, error: "Enter a valid HTTP or HTTPS URL." };
        }
    }

    function buildBackendUrl(query, filters, mode, page) {
        const base = normalizeApiBaseUrl(State.apiBaseUrl || DEFAULT_API_BASE_URL);
        if (!base.valid) return { valid: false, error: base.error };

        const params = new URLSearchParams({
            q: query,
            mode,
            page: String(page || 1)
        });

        const f = filters || {};
        const lang = LANGUAGE_CODE_MAP[f.fLang] || "";
        if (lang) params.set("language", lang);

        const tr = TIME_RANGE_MAP[f.fDate] || "";
        if (tr) params.set("time_range", tr);

        const safe = SAFE_SEARCH_MAP[f.fSafe];
        if (safe !== undefined) params.set("safesearch", safe);

        // The backend does not (yet) implement these advanced operators,
        // but we pass them through so they can be added server-side later.
        if (f.fFileType && f.fFileType !== "Any type") params.set("filetype", f.fFileType);
        if (f.fDomain) params.set("site", f.fDomain.trim());
        if (f.fExclude) params.set("exclude", f.fExclude.trim());
        if (f.fExact) params.set("exact", f.fExact.trim());

        return { valid: true, requestUrl: base.url + "/search?" + params.toString() };
    }

    async function searchWithBackend(query, filters, mode, page) {
        if (searchAbortController) searchAbortController.abort();
        const controller = new AbortController();
        searchAbortController = controller;

        let timedOut = false;
        const timeoutId = setTimeout(() => { timedOut = true; controller.abort(); }, API_TIMEOUT_MS);
        const t0 = performance.now();

        const built = buildBackendUrl(query, filters, mode, page);
        if (!built.valid) { clearTimeout(timeoutId); return { ok: false, errorType: "invalid-url", message: built.error }; }

        let response;
        try {
            response = await fetch(built.requestUrl, {
                method: "GET",
                headers: { "Accept": "application/json" },
                signal: controller.signal
            });
        } catch (err) {
            clearTimeout(timeoutId);
            if (err && err.name === "AbortError") {
                if (timedOut) return { ok: false, errorType: "timeout", message: "The search request took too long. Try again or check your backend." };
                return { ok: false, errorType: "cancelled", message: "Search cancelled." };
            }
            return {
                ok: false,
                errorType: "network",
                message: "Could not reach the RaiaSpace backend. Check that it is running and reachable.",
                technical: String(err)
            };
        }
        clearTimeout(timeoutId);
        const elapsedMs = performance.now() - t0;

        let payload = null;
        try { payload = await response.json(); }
        catch (e) { payload = null; }

        if (!response.ok || !payload || payload.ok !== true) {
            const message = (payload && payload.error) || ("Backend returned HTTP " + response.status + ".");
            return { ok: false, errorType: "backend", message, technical: "HTTP " + response.status };
        }

        return {
            ok: true,
            data: payload,
            elapsedMs
        };
    }

    async function checkBackendConnection(baseUrl) {
        const norm = normalizeApiBaseUrl(baseUrl);
        if (!norm.valid) return { status: "invalid", message: norm.error };

        const prev = State.apiBaseUrl;
        State.apiBaseUrl = norm.url;
        // Use a cheap query; the backend will hit SearXNG, which also validates the chain.
        const result = await searchWithBackend("connectivity test", {}, "web", 1);
        State.apiBaseUrl = prev;

        if (result.ok) {
            return { status: "ok", message: "Backend is reachable and returned valid JSON." };
        }
        if (result.errorType === "cancelled") {
            return { status: "network", message: "Connection test cancelled." };
        }
        if (result.errorType === "timeout") {
            return { status: "timeout", message: "Backend did not respond in time." };
        }
        return { status: "network", message: result.message };
    }

    /* ============ DRAWER / MODAL HELPERS ============ */
    function trapFocus(e) {
        if (e.key !== "Tab") return;
        const openEl = document.querySelector(".modal-overlay.open .modal, .side-drawer.open, .mobile-drawer.open");
        if (!openEl) return;
        const focusables = openEl.querySelectorAll('button, input, select, a, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function openDrawer(overlayId, drawerId, trigger) {
        const overlay = $(overlayId), drawer = $(drawerId);
        if (!overlay || !drawer) return;
        overlay.classList.add("open");
        drawer.classList.add("open");
        if (trigger) trigger.setAttribute("aria-expanded", "true");
        drawer._trigger = trigger;
        const f = drawer.querySelector("button, input, select, a");
        if (f) setTimeout(() => f.focus(), 50);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", trapFocus);
    }

    function closeDrawer(overlayId, drawerId) {
        const overlay = $(overlayId), drawer = $(drawerId);
        if (!overlay || !drawer) return;
        overlay.classList.remove("open");
        drawer.classList.remove("open");
        if (drawer._trigger) { drawer._trigger.setAttribute("aria-expanded", "false"); drawer._trigger.focus(); }
        if (!document.querySelector(".side-drawer.open, .mobile-drawer.open, .modal-overlay.open")) {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", trapFocus);
        }
    }

    function openModal(id, trigger) {
        const overlay = $(id);
        if (!overlay) return;
        overlay.classList.add("open");
        overlay._trigger = trigger;
        const f = overlay.querySelector("button, input, [tabindex]");
        if (f) setTimeout(() => f.focus(), 50);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", trapFocus);
    }

    function closeModal(id) {
        const overlay = $(id);
        if (!overlay) return;
        overlay.classList.remove("open");
        if (overlay._trigger) overlay._trigger.focus();
        if (!document.querySelector(".side-drawer.open, .mobile-drawer.open, .modal-overlay.open")) {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", trapFocus);
        }
    }

    /* ============ DOM REFS ============ */
    const searchForm = $("searchForm");
    const searchInput = $("searchInput");
    const searchBox = document.querySelector(".search-box");
    const clearBtn = $("clearInputBtn");
    const submitBtn = $("submitBtn");
    const validationMsg = $("validationMsg");
    const autocomplete = $("autocomplete");
    const homeView = $("homeView");
    const resultsView = $("resultsView");
    const resultsContent = $("resultsContent");
    const modesRow = $("modesRow");

    /* ============ THEME / MOTION INIT ============ */
    const toggleReducedMotion = $("toggleReducedMotion");
    if (toggleReducedMotion) {
        toggleReducedMotion.checked = State.reducedMotion;
        toggleReducedMotion.addEventListener("change", e => {
            State.reducedMotion = e.target.checked;
            Store.set("rs_reduced_motion", State.reducedMotion);
            document.documentElement.style.setProperty("--dur-fast", State.reducedMotion ? "0.001ms" : "140ms");
            document.documentElement.style.setProperty("--dur-med", State.reducedMotion ? "0.001ms" : "260ms");
        });
    }
    if (State.reducedMotion) {
        document.documentElement.style.setProperty("--dur-fast", "0.001ms");
        document.documentElement.style.setProperty("--dur-med", "0.001ms");
    }

    document.querySelectorAll("#themeSeg [data-theme-choice]").forEach(btn => {
        btn.addEventListener("click", () => setTheme(btn.dataset.themeChoice));
    });
    document.querySelectorAll("#mobileThemeSeg [data-theme-choice]").forEach(btn => {
        btn.addEventListener("click", () => setTheme(btn.dataset.themeChoice));
    });

    applyTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (State.theme === "system") applyTheme();
    });

    /* ============ SETTINGS TOGGLES ============ */
    const toggleSafeSearch = $("toggleSafeSearch");
    if (toggleSafeSearch) {
        toggleSafeSearch.checked = State.safeSearch;
        toggleSafeSearch.addEventListener("change", e => { State.safeSearch = e.target.checked; Store.set("rs_safe_search", State.safeSearch); });
    }
    const toggleSuggestions = $("toggleSuggestions");
    if (toggleSuggestions) {
        toggleSuggestions.checked = State.suggestionsEnabled;
        toggleSuggestions.addEventListener("change", e => { State.suggestionsEnabled = e.target.checked; Store.set("rs_suggestions", State.suggestionsEnabled); });
    }
    const toggleSaveHistory = $("toggleSaveHistory");
    if (toggleSaveHistory) {
        toggleSaveHistory.checked = State.saveHistory;
        toggleSaveHistory.addEventListener("change", e => { State.saveHistory = e.target.checked; Store.set("rs_save_history", State.saveHistory); });
    }

    /* ============ BACKEND SETTINGS UI ============ */
    const apiBaseUrlInput = $("apiBaseUrlInput");
    const apiStatusPill = $("apiStatusPill");
    const apiStatusText = $("apiStatusText");
    const httpsWarnBanner = $("httpsWarnBanner");
    const dataSourceSub = $("dataSourceSub");

    if (apiBaseUrlInput) apiBaseUrlInput.value = State.apiBaseUrl;

    function setStatusPill(state, text) {
        if (!apiStatusPill || !apiStatusText) return;
        apiStatusPill.className = "status-pill" + (state ? " " + state : "");
        apiStatusText.textContent = text;
    }

    const STATUS_LABELS = {
        untested: { cls: "", text: "Not tested" },
        testing: { cls: "", text: "Testing…" },
        ok: { cls: "ok", text: "Backend is reachable and returned valid JSON." },
        cors: { cls: "err", text: "The backend may be blocking browser requests (CORS)." },
        network: { cls: "err", text: "RaiaSpace could not reach the backend." },
        invalid: { cls: "err", text: "Enter a valid API base URL or a relative path like /api." },
        timeout: { cls: "err", text: "The request took too long." }
    };

    function checkHttpsMismatch() {
        if (!httpsWarnBanner) return;
        const pageHttps = location.protocol === "https:";
        const urlHttp = State.apiBaseUrl && State.apiBaseUrl.startsWith("http://");
        httpsWarnBanner.hidden = !(pageHttps && urlHttp);
    }

    function refreshBackendUI() {
        if (dataSourceSub) dataSourceSub.textContent = "Queries are proxied through " + State.apiBaseUrl;
        checkHttpsMismatch();
    }
    refreshBackendUI();

    const testApiBtn = $("testApiBtn");
    if (testApiBtn) testApiBtn.addEventListener("click", async () => {
        setStatusPill("", "Testing…");
        const r = await checkBackendConnection(apiBaseUrlInput.value);
        State.apiStatus = r.status;
        const label = STATUS_LABELS[r.status] || STATUS_LABELS.network;
        setStatusPill(label.cls, r.message || label.text);
    });

    const saveApiBtn = $("saveApiBtn");
    if (saveApiBtn) saveApiBtn.addEventListener("click", () => {
        const norm = normalizeApiBaseUrl(apiBaseUrlInput.value);
        if (!norm.valid) { setStatusPill("err", norm.error); return; }
        State.apiBaseUrl = norm.url;
        localStorage.setItem("raiaspace-api-url", norm.url);
        apiBaseUrlInput.value = norm.url;
        State.apiStatus = "untested";
        refreshBackendUI();
        toast("API base URL saved");
    });

    const resetApiBtn = $("resetApiBtn");
    if (resetApiBtn) resetApiBtn.addEventListener("click", () => {
        State.apiBaseUrl = DEFAULT_API_BASE_URL;
        localStorage.setItem("raiaspace-api-url", DEFAULT_API_BASE_URL);
        apiBaseUrlInput.value = DEFAULT_API_BASE_URL;
        State.apiStatus = "untested";
        setStatusPill("", "Not tested");
        refreshBackendUI();
        toast("Reset to default");
    });

    const setupAccordion = $("setupAccordion");
    const setupAccordionHead = $("setupAccordionHead");
    function toggleAccordion() {
        if (!setupAccordion) return;
        const open = setupAccordion.classList.toggle("open");
        if (setupAccordionHead) setupAccordionHead.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (setupAccordionHead) setupAccordionHead.addEventListener("click", toggleAccordion);

    /* ============ NAV / DRAWER WIRING ============ */
    const historyBtn = $("historyBtn");
    if (historyBtn) historyBtn.addEventListener("click", () => { renderHistory(); openDrawer("historyOverlay", "historyDrawer", historyBtn); });
    const settingsBtn = $("settingsBtn");
    if (settingsBtn) settingsBtn.addEventListener("click", () => openDrawer("settingsOverlay", "settingsDrawer", settingsBtn));
    const mobileHistoryLink = $("mobileHistoryLink");
    if (mobileHistoryLink) mobileHistoryLink.addEventListener("click", () => { closeMobileDrawer(); renderHistory(); openDrawer("historyOverlay", "historyDrawer", $("mobileMenuBtn")); });
    const mobileSettingsLink = $("mobileSettingsLink");
    if (mobileSettingsLink) mobileSettingsLink.addEventListener("click", () => { closeMobileDrawer(); setTimeout(() => openDrawer("settingsOverlay", "settingsDrawer", settingsBtn), 220); });
    const settingsClose = $("settingsClose");
    if (settingsClose) settingsClose.addEventListener("click", () => closeDrawer("settingsOverlay", "settingsDrawer"));
    const settingsOverlay = $("settingsOverlay");
    if (settingsOverlay) settingsOverlay.addEventListener("click", () => closeDrawer("settingsOverlay", "settingsDrawer"));
    const historyClose = $("historyClose");
    if (historyClose) historyClose.addEventListener("click", () => closeDrawer("historyOverlay", "historyDrawer"));
    const historyOverlay = $("historyOverlay");
    if (historyOverlay) historyOverlay.addEventListener("click", () => closeDrawer("historyOverlay", "historyDrawer"));

    const mobileMenuBtn = $("mobileMenuBtn");
    function openMobileDrawer() { openDrawer("mobileOverlay", "mobileDrawer", mobileMenuBtn); applyTheme(); }
    function closeMobileDrawer() { closeDrawer("mobileOverlay", "mobileDrawer"); }
    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileDrawer);
    const mobileDrawerClose = $("mobileDrawerClose");
    if (mobileDrawerClose) mobileDrawerClose.addEventListener("click", closeMobileDrawer);
    const mobileOverlay = $("mobileOverlay");
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileDrawer);

    /* ============ NAV MORE DROPDOWN ============ */
    const navMoreBtn = $("navMoreBtn");
    const navMoreMenu = $("navMoreMenu");

    function openNavMore() {
        if (!navMoreMenu || !navMoreBtn) return;
        navMoreMenu.hidden = false;
        navMoreMenu.classList.add("open");
        navMoreBtn.setAttribute("aria-expanded", "true");
        const f = navMoreMenu.querySelector(".menu-item");
        if (f) f.focus();
    }
    function closeNavMore(returnFocus) {
        if (!navMoreMenu || !navMoreBtn) return;
        navMoreMenu.hidden = true;
        navMoreMenu.classList.remove("open");
        navMoreBtn.setAttribute("aria-expanded", "false");
        if (returnFocus) navMoreBtn.focus();
    }
    if (navMoreBtn && navMoreMenu) {
        navMoreBtn.addEventListener("click", e => { e.stopPropagation(); navMoreMenu.hidden ? openNavMore() : closeNavMore(false); });
        document.addEventListener("click", e => { if (!navMoreBtn.contains(e.target) && !navMoreMenu.contains(e.target)) closeNavMore(false); });
        navMoreMenu.addEventListener("keydown", e => {
            const items = Array.from(navMoreMenu.querySelectorAll(".menu-item"));
            const i = items.indexOf(document.activeElement);
            if (e.key === "Escape") { e.preventDefault(); closeNavMore(true); }
            else if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
            else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
        });
    }

    /* ============ MODE NAV ============ */
    const MORE_MODE_IDS = ["maps", "shopping", "academic", "social", "files"];

    function goToModeFromNav(modeId) {
        setMode(modeId);
        closeNavMore(false);
        if ($("mobileDrawer").classList.contains("open")) closeMobileDrawer();
        if (resultsView.classList.contains("active")) {
            resultsView.classList.remove("active");
            homeView.classList.remove("home-hidden");
        }
        window.scrollTo({ top: 0, behavior: State.reducedMotion ? "auto" : "smooth" });
        setTimeout(() => searchInput && searchInput.focus(), 100);
    }
    document.querySelectorAll("[data-nav-mode]").forEach(btn => {
        btn.addEventListener("click", () => goToModeFromNav(btn.dataset.navMode));
    });

    /* ============ MOBILE MORE ACCORDION ============ */
    const mobileMoreTrigger = $("mobileMoreTrigger");
    const mobileMorePanel = $("mobileMorePanel");
    if (mobileMoreTrigger && mobileMorePanel) {
        mobileMoreTrigger.addEventListener("click", () => {
            const isOpen = mobileMoreTrigger.getAttribute("aria-expanded") === "true";
            mobileMoreTrigger.setAttribute("aria-expanded", String(!isOpen));
            mobileMorePanel.hidden = isOpen;
        });
    }

    /* ============ SIGN IN ============ */
    const signinBtnDesktop = $("signinBtnDesktop");
    if (signinBtnDesktop) signinBtnDesktop.addEventListener("click", () => toast("Sign in isn't available yet"));
    const signinBtnMobile = $("signinBtnMobile");
    if (signinBtnMobile) signinBtnMobile.addEventListener("click", () => { closeMobileDrawer(); toast("Sign in isn't available yet"); });

    /* ============ HISTORY ============ */
    function renderHistory() {
        const list = $("historyList");
        if (!list) return;
        if (!State.history.length) {
            list.innerHTML = '<div class="empty-state">' + ICONS.clock + "<div>Your recent searches will appear here.</div></div>";
            return;
        }
        list.innerHTML = State.history.slice().reverse().map((h, idx) => {
            const realIdx = State.history.length - 1 - idx;
            return '<div class="history-item">' +
                '<div class="h-icon">' + (ICONS[h.mode] || ICONS.web) + "</div>" +
                '<div class="h-main"><div class="h-query">' + escapeHTML(h.query) + '</div><div class="h-meta">' +
                capitalize(h.mode) + " · " + timeAgo(h.time) + "</div></div>" +
                '<button class="icon-btn h-remove" aria-label="Remove this search" data-remove-idx="' + realIdx + '">' + ICONS.close + "</button>" +
                "</div>";
        }).join("");
        list.querySelectorAll("[data-remove-idx]").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.dataset.removeIdx, 10);
                State.history.splice(idx, 1);
                Store.set("rs_history", State.history);
                renderHistory();
            });
        });
    }

    function clearHistory() {
        State.history = [];
        Store.set("rs_history", []);
        renderHistory();
        toast("Search history cleared");
    }
    const clearHistoryFromSettings = $("clearHistoryFromSettings");
    if (clearHistoryFromSettings) clearHistoryFromSettings.addEventListener("click", clearHistory);
    const clearAllHistory = $("clearAllHistory");
    if (clearAllHistory) clearAllHistory.addEventListener("click", clearHistory);

    /* ============ MODES ROW ============ */
    if (modesRow) {
        modesRow.innerHTML = MODES.map(m =>
            '<button type="button" class="mode-btn" role="tab" aria-selected="' + (m.id === State.mode) + '" data-mode="' + m.id + '" data-tooltip="' + escapeAttr(m.desc) + '">' + ICONS[m.icon] + "<span>" + m.label + "</span></button>"
        ).join("");
    }
    const modeDesc = $("modeDesc");
    if (modeDesc) modeDesc.textContent = MODES.find(m => m.id === State.mode).desc;
    if (searchInput) searchInput.placeholder = PLACEHOLDERS[State.mode];

    if (modesRow) {
        modesRow.addEventListener("click", e => {
            const btn = e.target.closest(".mode-btn");
            if (!btn) return;
            setMode(btn.dataset.mode);
        });
        modesRow.addEventListener("keydown", e => {
            const tabs = Array.from(modesRow.querySelectorAll(".mode-btn"));
            const i = tabs.indexOf(document.activeElement);
            if (i < 0) return;
            if (e.key === "ArrowRight") { e.preventDefault(); tabs[(i + 1) % tabs.length].focus(); }
            if (e.key === "ArrowLeft") { e.preventDefault(); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
        });
    }

    function setMode(modeId) {
        State.mode = modeId;
        if (modesRow) modesRow.querySelectorAll(".mode-btn").forEach(b => b.setAttribute("aria-selected", b.dataset.mode === modeId ? "true" : "false"));
        const m = MODES.find(x => x.id === modeId);
        if (m && modeDesc) modeDesc.textContent = m.desc;
        if (searchInput) searchInput.placeholder = PLACEHOLDERS[modeId];
        document.querySelectorAll("[data-nav-mode]").forEach(el => {
            if (el.dataset.navMode === modeId) el.setAttribute("aria-current", "page");
            else el.removeAttribute("aria-current");
        });
        if (navMoreBtn) navMoreBtn.classList.toggle("has-active", MORE_MODE_IDS.includes(modeId));
    }

    /* ============ TRENDING / FEATURES ============ */
    const trendGrid = $("trendGrid");
    if (trendGrid) {
        trendGrid.innerHTML = TRENDING.map((t, i) =>
            '<button type="button" class="trend-card" data-query="' + escapeAttr(t.title) + '">' +
            '<span class="trend-num">' + String(i + 1).padStart(2, "0") + "</span>" +
            '<div class="trend-main">' +
            '<div class="trend-title">' + escapeHTML(t.title) + "</div>" +
            '<div class="trend-cat">' + escapeHTML(t.category) + "</div>" +
            "</div>" +
            '<span class="trend-arrow">' + ICONS.trend + "</span>" +
            "</button>"
        ).join("");
        trendGrid.addEventListener("click", e => {
            const card = e.target.closest(".trend-card");
            if (card) runSearch(card.dataset.query);
        });
    }

    const featureGrid = $("featureGrid");
    if (featureGrid) {
        featureGrid.innerHTML = FEATURES.map(f =>
            '<article class="feature-card"><div class="feature-icon">' + ICONS[f.icon] + "</div><h3>" + escapeHTML(f.title) + "</h3><p>" + escapeHTML(f.desc) + "</p></article>"
        ).join("");
    }

    /* ============ SEARCH INPUT ============ */
    function autoResize() {
        if (!searchInput) return;
        searchInput.style.height = "auto";
        searchInput.style.height = Math.min(searchInput.scrollHeight, 160) + "px";
    }
    function updateSubmitState() {
        if (!searchInput || !submitBtn || !clearBtn) return;
        const has = searchInput.value.trim().length > 0;
        submitBtn.disabled = !has;
        clearBtn.classList.toggle("show", has);
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            autoResize();
            updateSubmitState();
            if (validationMsg) validationMsg.textContent = "";
            if (State.suggestionsEnabled) renderAutocomplete(searchInput.value);
            else closeAutocomplete();
        });
        searchInput.addEventListener("focus", () => {
            if (searchBox) searchBox.classList.add("focused");
            if (State.suggestionsEnabled) renderAutocomplete(searchInput.value);
        });
        searchInput.addEventListener("blur", () => { if (searchBox) searchBox.classList.remove("focused"); });
        searchInput.addEventListener("keydown", e => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const active = autocomplete.querySelector(".ac-item.active");
                if (active && autocomplete.classList.contains("open")) { active.click(); return; }
                submitSearch();
            } else if (e.key === "Escape") {
                if (autocomplete.classList.contains("open")) closeAutocomplete();
                else searchInput.blur();
            } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                if (autocomplete.classList.contains("open")) {
                    e.preventDefault();
                    navigateAutocomplete(e.key === "ArrowDown" ? 1 : -1);
                }
            }
        });
    }
    if (clearBtn) clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        autoResize();
        updateSubmitState();
        closeAutocomplete();
        searchInput.focus();
    });
    if (searchForm) searchForm.addEventListener("submit", e => { e.preventDefault(); submitSearch(); });

    function submitSearch() {
        const q = searchInput.value.trim();
        if (!q) { if (validationMsg) validationMsg.textContent = "Please enter a search term before submitting."; return; }
        runSearch(q);
    }

    document.addEventListener("click", e => {
        if (!e.target.closest(".search-shell")) closeAutocomplete();
    });

    /* ============ AUTOCOMPLETE ============ */
    let acItems = [];
    function renderAutocomplete(query) {
        if (!autocomplete) return;
        const q = query.trim().toLowerCase();
        const groups = [];
        if (q.length > 0) {
            const matches = SUGGESTION_POOL.filter(s => s.toLowerCase().includes(q)).slice(0, 5);
            if (matches.length) groups.push({ label: "Suggestions", items: matches.map(m => ({ text: m, icon: "search", type: "suggestion" })) });
        }
        const recent = State.history.filter(h => q.length === 0 || h.query.toLowerCase().includes(q)).slice(-5).reverse();
        if (recent.length) groups.push({ label: "Recent searches", items: recent.map(h => ({ text: h.query, icon: "clock", type: "recent" })) });
        const trending = TRENDING.filter(t => q.length === 0 || t.title.toLowerCase().includes(q)).slice(0, 4);
        if (trending.length) groups.push({ label: "Trending", items: trending.map(t => ({ text: t.title, icon: "trend", category: t.category, type: "trending" })) });

        if (!groups.length) {
            autocomplete.innerHTML = '<div class="empty-state" style="padding:20px;">No suggestions found.</div>';
            autocomplete.classList.add("open");
            acItems = [];
            return;
        }
        let html = "";
        acItems = [];
        groups.forEach(g => {
            html += '<div class="ac-group-label">' + g.label + "</div>";
            g.items.forEach(item => {
                const idx = acItems.length;
                acItems.push(item);
                html += '<div class="ac-item" role="option" data-idx="' + idx + '">' + ICONS[item.icon] +
                    '<span class="ac-text">' + highlightMatch(item.text, q) + "</span>" +
                    (item.category ? '<span class="ac-category">' + escapeHTML(item.category) + "</span>" : "") +
                    (item.type === "recent" ? '<button class="ac-remove" aria-label="Remove" data-remove-query="' + escapeAttr(item.text) + '">' + ICONS.close + "</button>" : "") +
                    "</div>";
            });
        });
        autocomplete.innerHTML = html;
        autocomplete.classList.add("open");
        autocomplete.querySelectorAll(".ac-item").forEach(el => {
            el.addEventListener("click", ev => {
                if (ev.target.closest(".ac-remove")) return;
                const item = acItems[parseInt(el.dataset.idx, 10)];
                searchInput.value = item.text;
                runSearch(item.text);
            });
        });
        autocomplete.querySelectorAll(".ac-remove").forEach(btn => {
            btn.addEventListener("click", ev => {
                ev.stopPropagation();
                const qt = btn.dataset.removeQuery;
                State.history = State.history.filter(h => h.query !== qt);
                Store.set("rs_history", State.history);
                renderAutocomplete(searchInput.value);
            });
        });
    }
    function highlightMatch(text, q) {
        if (!q) return escapeHTML(text);
        const idx = text.toLowerCase().indexOf(q);
        if (idx === -1) return escapeHTML(text);
        return escapeHTML(text.slice(0, idx)) + "<mark>" + escapeHTML(text.slice(idx, idx + q.length)) + "</mark>" + escapeHTML(text.slice(idx + q.length));
    }
    function navigateAutocomplete(dir) {
        if (!autocomplete) return;
        const items = Array.from(autocomplete.querySelectorAll(".ac-item"));
        if (!items.length) return;
        let cur = items.findIndex(i => i.classList.contains("active"));
        items.forEach(i => i.classList.remove("active"));
        cur = (cur + dir + items.length) % items.length;
        items[cur].classList.add("active");
        items[cur].scrollIntoView({ block: "nearest" });
    }
    function closeAutocomplete() { if (autocomplete) autocomplete.classList.remove("open"); }

    /* ============ FILTERS ============ */
    const filtersToggleBtn = $("filtersToggleBtn");
    const filtersPanel = $("filtersPanel");
    if (filtersToggleBtn && filtersPanel) {
        filtersToggleBtn.addEventListener("click", () => {
            const open = filtersPanel.classList.toggle("open");
            filtersToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }
    const FILTER_IDS = ["fDate", "fLang", "fRegion", "fSafe", "fFileType", "fDomain", "fExclude", "fExact"];
    const applyFiltersBtn = $("applyFiltersBtn");
    if (applyFiltersBtn) applyFiltersBtn.addEventListener("click", () => {
        let count = 0;
        const f = {};
        FILTER_IDS.forEach(id => {
            const el = $(id);
            if (!el) return;
            const val = el.value.trim();
            f[id] = val;
            const isDefault = (el.tagName === "SELECT" && el.selectedIndex === 0) || (el.tagName === "INPUT" && val === "");
            if (!isDefault) count++;
        });
        State.filters = f;
        State.activeFilterCount = count;
        const badge = $("filterCount");
        if (badge) {
            badge.hidden = count === 0;
            badge.textContent = count;
        }
        toast(count ? count + " filter" + (count > 1 ? "s" : "") + " applied" : "Filters reset");
    });
    const resetFiltersBtn = $("resetFiltersBtn");
    if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", () => {
        FILTER_IDS.forEach(id => {
            const el = $(id);
            if (!el) return;
            if (el.tagName === "SELECT") el.selectedIndex = 0;
            else el.value = "";
        });
        State.filters = {};
        State.activeFilterCount = 0;
        const badge = $("filterCount");
        if (badge) badge.hidden = true;
    });

    /* ============ SEARCH / RESULTS ============ */
    let bookmarks = new Set(Store.get("rs_bookmarks", []));
    let lastSubmit = 0;

    function runSearch(query) {
        query = (query || "").trim();
        if (!query) return;
        const now = Date.now();
        if (now - lastSubmit < 400) return;
        lastSubmit = now;

        closeAutocomplete();
        if (searchInput) searchInput.value = query;
        State.lastQuery = query;
        State.currentPage = 1;
        State.activeTab = "All";

        if (State.saveHistory) {
            State.history.push({ query, mode: State.mode, time: Date.now() });
            if (State.history.length > 50) State.history.shift();
            Store.set("rs_history", State.history);
        }

        homeView.classList.add("home-hidden");
        resultsView.classList.add("active");
        window.scrollTo({ top: 0, behavior: State.reducedMotion ? "auto" : "smooth" });

        const qText = $("resultsQueryText");
        const mTag = $("resultsModeTag");
        if (qText) qText.textContent = query;
        if (mTag) mTag.textContent = MODES.find(m => m.id === State.mode).label;
        renderResultsFilterChips();
        renderResultTabs();
        loadResults(query, State.currentPage);
    }

    function loadResults(query, page) {
        if (submitBtn) { submitBtn.classList.add("loading"); submitBtn.disabled = true; }
        resultsContent.innerHTML = skeletonHTML();
        renderLiveResults(query, page).finally(() => {
            if (submitBtn) { submitBtn.classList.remove("loading"); updateSubmitState(); }
        });
    }

    function skeletonHTML() {
        let html = "";
        for (let i = 0; i < 4; i++) {
            html += '<div class="skeleton-card"><div class="sk-line sk-w40"></div><div class="sk-line sk-w90"></div><div class="sk-line sk-w60"></div></div>';
        }
        return html;
    }

    function renderResultsFilterChips() {
        const wrap = $("resultsFilterChips");
        if (!wrap) return;
        const active = Object.entries(State.filters).filter(([k, v]) => v && v !== "Any time" && v !== "Any language" && v !== "Any region" && v !== "Moderate" && v !== "Any type");
        wrap.innerHTML = active.map(([k, v]) =>
            '<span class="results-filter-chip">' + escapeHTML(v) + '<button aria-label="Remove filter" data-filter-key="' + k + '">' + ICONS.close + "</button></span>"
        ).join("");
        wrap.querySelectorAll("button").forEach(b => {
            b.addEventListener("click", () => {
                delete State.filters[b.dataset.filterKey];
                State.activeFilterCount = Math.max(0, State.activeFilterCount - 1);
                renderResultsFilterChips();
                loadResults(State.lastQuery, State.currentPage);
            });
        });
    }

    function renderResultTabs() {
        const wrap = $("resultTabs");
        if (!wrap) return;
        wrap.innerHTML = RESULT_TABS.map(t =>
            '<button class="result-tab" role="tab" aria-selected="' + (t === State.activeTab) + '" data-tab="' + t + '">' + t + "</button>"
        ).join("");
        wrap.querySelectorAll(".result-tab").forEach(btn => {
            btn.addEventListener("click", () => {
                State.activeTab = btn.dataset.tab;
                wrap.querySelectorAll(".result-tab").forEach(b => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
                State.currentPage = 1;
                loadResults(State.lastQuery, State.currentPage);
            });
        });
    }

    function poweredByBadge() {
        return '<span class="powered-by">' + ICONS.shield + "<span>Powered by SearXNG</span></span>";
    }
    function metaStripHTML(count, elapsedMs) {
        const parts = [];
        if (typeof count === "number") parts.push("<span>" + count.toLocaleString() + " results</span>");
        if (typeof elapsedMs === "number") parts.push("<span>" + (elapsedMs / 1000).toFixed(2) + "s</span>");
        return parts.length ? '<div class="results-meta-strip">' + parts.join("") + "</div>" : "";
    }
    function emptyStateHTML() { return '<div class="results-empty">' + ICONS.search + "<h3>No results</h3><p>No results were returned for this query.</p></div>"; }
    function relatedSearchesHTML(suggestions) {
        if (!suggestions || !suggestions.length) return "";
        return '<div class="related-searches"><h3>Related searches</h3><div class="related-chips">' +
            suggestions.map(s => '<button class="followup-chip" data-followup="' + escapeAttr(s) + '">' + escapeHTML(s) + "</button>").join("") + "</div></div>";
    }
    function paginationHTML(page, hasResults, hasMore) {
        return '<div class="pagination-row">' +
            '<button class="page-btn" id="pagePrevBtn" type="button" ' + (page <= 1 ? "disabled" : "") + ">" + ICONS.arrowLeft + "<span>Previous</span></button>" +
            '<span class="page-indicator">Page ' + page + "</span>" +
            '<button class="page-btn" id="pageNextBtn" type="button" ' + (!hasResults || !hasMore ? "disabled" : "") + "><span>Next</span>" + ICONS.arrow + "</button></div>";
    }
    function errorScreenHTML(errorType, message, technical) {
        return '<div class="error-screen">' +
            '<div class="err-icon">' + ICONS.warn + "</div>" +
            "<h3>We hit a snag</h3>" +
            "<p>" + escapeHTML(message) + "</p>" +
            '<div class="modal-btn-row">' +
            '<button class="btn btn-ghost" id="errSettingsBtn" type="button">Open settings</button>' +
            '<button class="btn btn-primary" id="errRetryBtn" type="button">Retry</button>' +
            "</div>" +
            (technical ? '<button class="error-tech-toggle" id="errTechToggle" type="button">Show technical detail</button><div class="error-tech-detail" id="errTechDetail">' + escapeHTML(technical) + "</div>" : "") +
            "</div>";
    }

    function resultCardHTML(r, query) {
        const bmKey = query + "::" + r.url;
        const isBm = bookmarks.has(bmKey);
        return '<article class="result-card">' +
            '<div class="result-top">' +
            '<span class="result-favicon">' + ICONS.web + "</span>" +
            '<span class="result-domain">' + escapeHTML(r.domain || "") + "</span>" +
            (r.engine ? '<span class="result-domain" style="opacity:0.7;">· ' + escapeHTML(r.engine) + "</span>" : "") +
            "</div>" +
            '<a class="result-title" href="' + escapeAttr(r.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(r.title) + "</a>" +
            '<p class="result-snippet">' + escapeHTML(r.snippet || "") + "</p>" +
            '<div class="result-meta">' + escapeHTML(r.url || "") + (r.meta ? " · " + escapeHTML(r.meta) : "") + "</div>" +
            '<div class="result-actions">' +
            '<button class="icon-btn' + (isBm ? " active" : "") + '" data-action="bookmark" data-key="' + escapeAttr(bmKey) + '" aria-label="Bookmark" data-tooltip="Bookmark">' + ICONS.bookmark + "</button>" +
            '<button class="icon-btn" data-action="copy" data-url="' + escapeAttr(r.url) + '" aria-label="Copy link" data-tooltip="Copy link">' + ICONS.copy + "</button>" +
            '<button class="icon-btn" data-action="share" data-title="' + escapeAttr(r.title) + '" data-url="' + escapeAttr(r.url) + '" aria-label="Share" data-tooltip="Share">' + ICONS.share + "</button>" +
            '<button class="icon-btn" data-action="open" data-url="' + escapeAttr(r.url) + '" aria-label="Open in new tab" data-tooltip="Open in new tab">' + ICONS.external + "</button>" +
            "</div></article>";
    }

    async function renderLiveResults(query, page) {
        const result = await searchWithBackend(query, State.filters, State.mode, page);

        if (!result.ok) {
            if (result.errorType === "cancelled") return;
            resultsContent.innerHTML = errorScreenHTML(result.errorType, result.message, result.technical);
            wireResultActions();
            return;
        }

        const payload = result.data;
        const normalized = payload.results || [];
        const suggestions = payload.suggestions || [];

        let html = poweredByBadge();
        html += metaStripHTML(
            typeof payload.number_of_results === "number" ? payload.number_of_results : normalized.length,
            result.elapsedMs
        );

        if (!normalized.length) {
            html += emptyStateHTML();
            resultsContent.innerHTML = html;
            wireResultActions();
            return;
        }

        if (State.mode === "ai" || State.activeTab === "AI Overview") {
            html += sourceBasedPreviewHTML(query, normalized);
        }

        if (State.mode === "images") {
            html += mediaGridHTML(normalized);
        } else if (State.mode === "videos") {
            html += videoGridHTML(normalized);
        } else {
            html += normalized.map(r => resultCardHTML(r, query)).join("");
        }

        html += relatedSearchesHTML(suggestions);
        html += paginationHTML(page, normalized.length > 0, normalized.length > 0);

        resultsContent.innerHTML = html;
        wireResultActions();
        wireMediaThumbs();
    }

    function sourceBasedPreviewHTML(query, results) {
        const topSnippets = results.slice(0, 4).map(r => r.snippet).filter(Boolean);
        const summary = topSnippets.length
            ? topSnippets.join(" ").replace(/([.!?])\s+/g, "$1|").split("|").slice(0, 4).join(" ")
            : "No extractable snippet content was available for this query.";
        return '<div class="ai-answer-box">' +
            '<span class="source-preview-label">' + ICONS.sparkle + "<span>Source-based preview</span></span>" +
            "<h2>" + escapeHTML(query) + "</h2>" +
            '<div class="ai-disclaimer">Generated locally from search snippets. This is not a live AI answer — connect an AI provider for full synthesis.</div>' +
            '<p class="ai-answer-text">' + escapeHTML(summary) + "</p>" +
            '<div class="ai-sources">' + results.slice(0, 4).map(r =>
                '<div class="ai-source-card"><div class="src-title">' + escapeHTML(r.title) + '</div><div class="src-domain">' + escapeHTML(r.domain) + "</div></div>"
            ).join("") +
            "</div></div>";
    }

    function mediaGridHTML(results) {
        return '<div class="media-grid">' + results.map(r =>
            '<button class="media-card" type="button" data-action="open" data-url="' + escapeAttr(r.url) + '" aria-label="Open ' + escapeAttr(r.title) + '">' +
            '<div class="media-thumb-wrap">' +
            '<span class="media-placeholder">' + ICONS.image + "</span>" +
            (r.thumbnail ? '<img class="media-thumb-img" src="' + escapeAttr(r.thumbnail) + '" alt="" loading="lazy">' : "") +
            "</div>" +
            '<div class="media-caption"><div class="m-title">' + escapeHTML(r.title) + '</div><div class="m-source">' + escapeHTML(r.domain) + "</div></div>" +
            "</button>"
        ).join("") + "</div>";
    }

    function videoGridHTML(results) {
        return '<div class="video-grid">' + results.map(r =>
            '<button class="video-card" type="button" data-action="open" data-url="' + escapeAttr(r.url) + '" aria-label="Open ' + escapeAttr(r.title) + '">' +
            '<div class="video-thumb-wrap">' +
            (r.thumbnail ? '<img src="' + escapeAttr(r.thumbnail) + '" alt="" loading="lazy">' : "") +
            '<span class="video-play">' + ICONS.videos + "</span>" +
            "</div>" +
            '<div class="video-info"><div class="v-title">' + escapeHTML(r.title) + '</div><div class="v-meta">' + escapeHTML(r.domain) + (r.publishedDate ? " · " + escapeHTML(r.publishedDate) : "") + "</div></div>" +
            "</button>"
        ).join("") + "</div>";
    }

    function wireMediaThumbs() {
        resultsContent.querySelectorAll(".media-thumb-img, .video-thumb-wrap img").forEach(img => {
            img.addEventListener("error", () => { img.style.display = "none"; });
        });
    }

    function wireResultActions() {
        resultsContent.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
            btn.addEventListener("click", () => {
                const key = btn.dataset.key;
                if (bookmarks.has(key)) { bookmarks.delete(key); btn.classList.remove("active"); toast("Bookmark removed"); }
                else { bookmarks.add(key); btn.classList.add("active"); toast("Bookmarked"); }
                Store.set("rs_bookmarks", Array.from(bookmarks));
            });
        });
        resultsContent.querySelectorAll('[data-action="copy"]').forEach(btn => {
            btn.addEventListener("click", () => copyToClipboard(btn.dataset.url));
        });
        resultsContent.querySelectorAll('[data-action="share"]').forEach(btn => {
            btn.addEventListener("click", () => doShare(btn.dataset.title, btn.dataset.url));
        });
        resultsContent.querySelectorAll('[data-action="open"]').forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.dataset.url) window.open(btn.dataset.url, "_blank", "noopener,noreferrer");
            });
        });
        resultsContent.querySelectorAll("[data-followup]").forEach(btn => {
            btn.addEventListener("click", () => runSearch(btn.dataset.followup));
        });

        const prevBtn = $("pagePrevBtn");
        const nextBtn = $("pageNextBtn");
        if (prevBtn) prevBtn.addEventListener("click", () => {
            if (State.currentPage > 1) { State.currentPage--; loadResults(State.lastQuery, State.currentPage); window.scrollTo({ top: 0, behavior: "auto" }); }
        });
        if (nextBtn) nextBtn.addEventListener("click", () => {
            State.currentPage++;
            loadResults(State.lastQuery, State.currentPage);
            window.scrollTo({ top: 0, behavior: "auto" });
        });

        const errRetry = $("errRetryBtn");
        const errSettings = $("errSettingsBtn");
        const errTechToggle = $("errTechToggle");
        if (errRetry) errRetry.addEventListener("click", () => loadResults(State.lastQuery, State.currentPage));
        if (errSettings) errSettings.addEventListener("click", () => openDrawer("settingsOverlay", "settingsDrawer", settingsBtn));
        if (errTechToggle) errTechToggle.addEventListener("click", () => {
            const d = $("errTechDetail");
            const show = d.classList.toggle("show");
            errTechToggle.textContent = show ? "Hide technical detail" : "Show technical detail";
        });
    }

    const backHomeBtn = $("backHomeBtn");
    if (backHomeBtn) backHomeBtn.addEventListener("click", () => {
        resultsView.classList.remove("active");
        homeView.classList.remove("home-hidden");
        window.scrollTo({ top: 0, behavior: State.reducedMotion ? "auto" : "smooth" });
    });
    const logoHome = $("logoHome");
    if (logoHome) logoHome.addEventListener("click", e => {
        e.preventDefault();
        resultsView.classList.remove("active");
        homeView.classList.remove("home-hidden");
        window.scrollTo({ top: 0, behavior: "auto" });
    });

    /* ============ KEYBOARD SHORTCUTS ============ */
    const footerShortcuts = $("footerShortcuts");
    if (footerShortcuts) footerShortcuts.addEventListener("click", e => { e.preventDefault(); openModal("shortcutsOverlay", footerShortcuts); });
    const shortcutsClose = $("shortcutsClose");
    if (shortcutsClose) shortcutsClose.addEventListener("click", () => closeModal("shortcutsOverlay"));
    const shortcutsOverlay = $("shortcutsOverlay");
    if (shortcutsOverlay) shortcutsOverlay.addEventListener("click", e => { if (e.target.id === "shortcutsOverlay") closeModal("shortcutsOverlay"); });
    const footerPrivacy = $("footerPrivacy");
    if (footerPrivacy) footerPrivacy.addEventListener("click", e => { e.preventDefault(); openModal("privacyOverlay", footerPrivacy); });
    const footerTerms = $("footerTerms");
    if (footerTerms) footerTerms.addEventListener("click", e => { e.preventDefault(); toast("Terms page coming soon"); });
    const footerHelp = $("footerHelp");
    if (footerHelp) footerHelp.addEventListener("click", e => { e.preventDefault(); toast("Help page coming soon"); });
    const openPrivacyDialogBtn = $("openPrivacyDialogBtn");
    if (openPrivacyDialogBtn) openPrivacyDialogBtn.addEventListener("click", () => openModal("privacyOverlay", openPrivacyDialogBtn));
    const privacyClose = $("privacyClose");
    if (privacyClose) privacyClose.addEventListener("click", () => closeModal("privacyOverlay"));
    const privacyOverlay = $("privacyOverlay");
    if (privacyOverlay) privacyOverlay.addEventListener("click", e => { if (e.target.id === "privacyOverlay") closeModal("privacyOverlay"); });

    document.addEventListener("keydown", e => {
        const mod = e.ctrlKey || e.metaKey;
        if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); searchInput.focus(); }
        else if (mod && e.key === "/") { e.preventDefault(); openModal("shortcutsOverlay", document.activeElement); }
        else if (e.key === "Escape") {
            ["shortcutsOverlay", "voiceOverlay", "imageModalOverlay", "fileModalOverlay", "cameraModalOverlay"].forEach(id => {
                const ov = $(id);
                if (ov && ov.classList.contains("open")) closeModal(id);
            });
            if ($("settingsDrawer").classList.contains("open")) closeDrawer("settingsOverlay", "settingsDrawer");
            if ($("historyDrawer").classList.contains("open")) closeDrawer("historyOverlay", "historyDrawer");
            if ($("mobileDrawer").classList.contains("open")) closeMobileDrawer();
            if (navMoreMenu && !navMoreMenu.hidden) closeNavMore(true);
        }
    });

    /* ============ VOICE SEARCH ============ */
    const voiceBtn = $("voiceBtn");
    const voiceStatus = $("voiceStatus");
    const voiceTranscript = $("voiceTranscript");
    const voiceVisual = $("voiceVisual");
    const voiceStartBtn = $("voiceStartBtn");
    let recognition = null, listening = false, finalTranscript = "";
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (voiceBtn) voiceBtn.addEventListener("click", () => {
        resetVoiceModal();
        openModal("voiceOverlay", voiceBtn);
        if (!SpeechRec) {
            voiceStatus.textContent = "Voice search is not supported in this browser. Please type your query.";
            voiceStartBtn.disabled = true;
        }
    });
    const voiceClose = $("voiceClose");
    if (voiceClose) voiceClose.addEventListener("click", () => { stopListening(); closeModal("voiceOverlay"); });
    const voiceOverlay = $("voiceOverlay");
    if (voiceOverlay) voiceOverlay.addEventListener("click", e => { if (e.target.id === "voiceOverlay") { stopListening(); closeModal("voiceOverlay"); } });
    const voiceCancelBtn = $("voiceCancelBtn");
    if (voiceCancelBtn) voiceCancelBtn.addEventListener("click", () => { stopListening(); closeModal("voiceOverlay"); });

    function resetVoiceModal() {
        finalTranscript = "";
        if (voiceTranscript) voiceTranscript.textContent = "Your recognized speech will appear here…";
        if (voiceStatus) voiceStatus.textContent = "Tap start and allow microphone access.";
        if (voiceVisual) voiceVisual.classList.remove("listening");
        if (voiceStartBtn) {
            voiceStartBtn.textContent = "Start listening";
            voiceStartBtn.disabled = !SpeechRec;
            voiceStartBtn.onclick = startListening;
        }
        const useBtn = document.getElementById("voiceUseBtn");
        if (useBtn) useBtn.style.display = "none";
    }

    function startListening() {
        if (!SpeechRec) return;
        recognition = new SpeechRec();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.onstart = () => {
            listening = true;
            if (voiceVisual) voiceVisual.classList.add("listening");
            if (voiceStatus) voiceStatus.textContent = "Listening…";
            if (voiceStartBtn) {
                voiceStartBtn.textContent = "Stop listening";
                voiceStartBtn.onclick = stopListening;
            }
        };
        recognition.onresult = (event) => {
            let interim = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
                else interim += event.results[i][0].transcript;
            }
            if (voiceTranscript) voiceTranscript.textContent = (finalTranscript + interim) || "Your recognized speech will appear here…";
        };
        recognition.onerror = (event) => {
            if (event.error === "not-allowed" || event.error === "permission-denied") {
                if (voiceStatus) voiceStatus.textContent = "Microphone permission denied. Enable it in your browser settings.";
            } else {
                if (voiceStatus) voiceStatus.textContent = "We couldn't process that. Try again or type your query.";
            }
            stopListening();
        };
        recognition.onend = () => {
            if (listening) {
                listening = false;
                if (voiceVisual) voiceVisual.classList.remove("listening");
                if (voiceStatus) voiceStatus.textContent = "Stopped listening.";
                if (voiceStartBtn) {
                    voiceStartBtn.textContent = "Start listening";
                    voiceStartBtn.onclick = startListening;
                }
            }
        };
        try { recognition.start(); } catch (e) { if (voiceStatus) voiceStatus.textContent = "Could not start voice recognition."; }
    }

    function stopListening() {
        if (recognition && listening) { try { recognition.stop(); } catch (e) {} }
        listening = false;
        if (voiceVisual) voiceVisual.classList.remove("listening");
    }

    (function addVoiceUseBtn() {
        const row = document.querySelector("#voiceModalBody .modal-btn-row");
        if (!row) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = "voiceUseBtn";
        btn.className = "btn btn-primary";
        btn.textContent = "Use this query";
        btn.style.display = "none";
        btn.addEventListener("click", () => {
            const text = finalTranscript.trim();
            if (text) { stopListening(); closeModal("voiceOverlay"); runSearch(text); }
        });
        row.appendChild(btn);
        if (voiceTranscript) {
            const obs = new MutationObserver(() => {
                btn.style.display = finalTranscript.trim() ? "block" : "none";
            });
            obs.observe(voiceTranscript, { childList: true, characterData: true, subtree: true });
        }
    })();

    /* ============ IMAGE SEARCH ============ */
    const imageSearchBtn = $("imageSearchBtn");
    const imageDropzone = $("imageDropzone");
    const imageFileInput = $("imageFileInput");
    const imagePreviewArea = $("imagePreviewArea");
    const imageSearchSubmitBtn = $("imageSearchSubmitBtn");
    const MAX_IMAGE_MB = 10;

    if (imageSearchBtn) imageSearchBtn.addEventListener("click", () => { resetImageModal(); openModal("imageModalOverlay", imageSearchBtn); });
    const imageModalClose = $("imageModalClose");
    if (imageModalClose) imageModalClose.addEventListener("click", () => closeModal("imageModalOverlay"));
    const imageCancelBtn = $("imageCancelBtn");
    if (imageCancelBtn) imageCancelBtn.addEventListener("click", () => closeModal("imageModalOverlay"));
    const imageModalOverlay = $("imageModalOverlay");
    if (imageModalOverlay) imageModalOverlay.addEventListener("click", e => { if (e.target.id === "imageModalOverlay") closeModal("imageModalOverlay"); });

    function resetImageModal() {
        State.imageFile = null;
        if (imagePreviewArea) imagePreviewArea.innerHTML = "";
        const pf = $("imagePromptField");
        if (pf) pf.value = "";
        if (imageSearchSubmitBtn) imageSearchSubmitBtn.disabled = true;
        if (imageDropzone) imageDropzone.style.display = "block";
    }

    if (imageDropzone && imageFileInput) {
        imageDropzone.addEventListener("click", () => imageFileInput.click());
        imageDropzone.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); imageFileInput.click(); } });
        ["dragenter", "dragover"].forEach(ev => imageDropzone.addEventListener(ev, e => { e.preventDefault(); imageDropzone.classList.add("drag-over"); }));
        ["dragleave", "drop"].forEach(ev => imageDropzone.addEventListener(ev, e => { e.preventDefault(); imageDropzone.classList.remove("drag-over"); }));
        imageDropzone.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f) handleImageFile(f); });
        imageFileInput.addEventListener("change", e => { const f = e.target.files[0]; if (f) handleImageFile(f); });
    }

    function handleImageFile(file) {
        const valid = ["image/png", "image/jpeg", "image/webp"];
        if (!valid.includes(file.type)) {
            if (imagePreviewArea) imagePreviewArea.innerHTML = '<div class="err-msg">' + ICONS.warn + "<span>Please choose PNG, JPEG, or WebP.</span></div>";
            return;
        }
        if (file.size > MAX_IMAGE_MB * 1048576) {
            if (imagePreviewArea) imagePreviewArea.innerHTML = '<div class="err-msg">' + ICONS.warn + "<span>File exceeds " + MAX_IMAGE_MB + " MB.</span></div>";
            return;
        }
        State.imageFile = file;
        const url = URL.createObjectURL(file);
        if (imagePreviewArea) imagePreviewArea.innerHTML = '<div class="preview-card">' +
            '<img class="preview-thumb" src="' + url + '" alt="">' +
            '<div class="preview-meta"><div class="preview-name">' + escapeHTML(file.name) + '</div><div class="preview-size">' + formatBytes(file.size) + "</div></div>" +
            '<button class="icon-btn" id="removeImageBtn" aria-label="Remove">' + ICONS.close + "</button></div>";
        if (imageDropzone) imageDropzone.style.display = "none";
        if (imageSearchSubmitBtn) imageSearchSubmitBtn.disabled = false;
        const removeBtn = $("removeImageBtn");
        if (removeBtn) removeBtn.addEventListener("click", resetImageModal);
    }

    if (imageSearchSubmitBtn) imageSearchSubmitBtn.addEventListener("click", () => {
        if (!State.imageFile) return;
        closeModal("imageModalOverlay");
        const pf = $("imagePromptField");
        const prompt = pf ? pf.value.trim() : "";
        setMode("images");
        runSearch(prompt || State.imageFile.name.replace(/\.[^.]+$/, ""));
    });

    /* ============ FILE UPLOAD ============ */
    const fileUploadBtn = $("fileUploadBtn");
    const fileDropzone = $("fileDropzone");
    const genericFileInput = $("genericFileInput");
    const filePreviewArea = $("filePreviewArea");
    const fileSearchSubmitBtn = $("fileSearchSubmitBtn");
    const MAX_FILE_MB = 20;
    const ALLOWED_EXT = ["pdf", "docx", "txt", "csv", "md", "png", "jpg", "jpeg", "webp", "gif"];

    if (fileUploadBtn) fileUploadBtn.addEventListener("click", () => { resetFileModal(); openModal("fileModalOverlay", fileUploadBtn); });
    const fileModalClose = $("fileModalClose");
    if (fileModalClose) fileModalClose.addEventListener("click", () => closeModal("fileModalOverlay"));
    const fileCancelBtn = $("fileCancelBtn");
    if (fileCancelBtn) fileCancelBtn.addEventListener("click", () => closeModal("fileModalOverlay"));
    const fileModalOverlay = $("fileModalOverlay");
    if (fileModalOverlay) fileModalOverlay.addEventListener("click", e => { if (e.target.id === "fileModalOverlay") closeModal("fileModalOverlay"); });

    function resetFileModal() {
        State.genericFile = null;
        if (filePreviewArea) filePreviewArea.innerHTML = "";
        if (fileSearchSubmitBtn) fileSearchSubmitBtn.disabled = true;
        if (fileDropzone) fileDropzone.style.display = "block";
    }

    if (fileDropzone && genericFileInput) {
        fileDropzone.addEventListener("click", () => genericFileInput.click());
        fileDropzone.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); genericFileInput.click(); } });
        ["dragenter", "dragover"].forEach(ev => fileDropzone.addEventListener(ev, e => { e.preventDefault(); fileDropzone.classList.add("drag-over"); }));
        ["dragleave", "drop"].forEach(ev => fileDropzone.addEventListener(ev, e => { e.preventDefault(); fileDropzone.classList.remove("drag-over"); }));
        fileDropzone.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f) handleGenericFile(f); });
        genericFileInput.addEventListener("change", e => { const f = e.target.files[0]; if (f) handleGenericFile(f); });
    }

    function handleGenericFile(file) {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!ALLOWED_EXT.includes(ext)) {
            if (filePreviewArea) filePreviewArea.innerHTML = '<div class="err-msg">' + ICONS.warn + "<span>Unsupported file type.</span></div>";
            return;
        }
        if (file.size > MAX_FILE_MB * 1048576) {
            if (filePreviewArea) filePreviewArea.innerHTML = '<div class="err-msg">' + ICONS.warn + "<span>File exceeds " + MAX_FILE_MB + " MB.</span></div>";
            return;
        }
        State.genericFile = file;
        if (filePreviewArea) filePreviewArea.innerHTML = '<div class="preview-card">' +
            '<div class="preview-file-icon">' + ICONS.doc + "</div>" +
            '<div class="preview-meta"><div class="preview-name">' + escapeHTML(file.name) + '</div><div class="preview-size">' + formatBytes(file.size) + " · " + ext.toUpperCase() + "</div></div>" +
            '<button class="icon-btn" id="removeFileBtn" aria-label="Remove">' + ICONS.close + "</button></div>" +
            '<div class="progress-track"><div class="progress-fill" id="fileProgressFill" style="width:0%"></div></div>';
        if (fileDropzone) fileDropzone.style.display = "none";
        const removeBtn = $("removeFileBtn");
        if (removeBtn) removeBtn.addEventListener("click", resetFileModal);
        animateProgress();
    }

    function animateProgress() {
        let p = 0;
        const fill = $("fileProgressFill");
        const iv = setInterval(() => {
            p += Math.random() * 22;
            if (p >= 100) { p = 100; clearInterval(iv); if (fileSearchSubmitBtn) fileSearchSubmitBtn.disabled = false; }
            if (fill) fill.style.width = p + "%";
        }, 140);
    }

    if (fileSearchSubmitBtn) fileSearchSubmitBtn.addEventListener("click", () => {
        if (!State.genericFile) return;
        const name = State.genericFile.name.replace(/\.[^.]+$/, "");
        const ext = State.genericFile.name.split(".").pop().toLowerCase();
        closeModal("fileModalOverlay");
        setMode("files");
        runSearch(name + " filetype:" + ext);
    });

    /* ============ CAMERA ============ */
    const cameraSearchBtn = $("cameraSearchBtn");
    const cameraContent = $("cameraContent");
    let cameraStream = null;

    if (cameraSearchBtn) cameraSearchBtn.addEventListener("click", () => { renderCameraPrompt(); openModal("cameraModalOverlay", cameraSearchBtn); });
    const cameraModalClose = $("cameraModalClose");
    if (cameraModalClose) cameraModalClose.addEventListener("click", closeCameraModal);
    const cameraModalOverlay = $("cameraModalOverlay");
    if (cameraModalOverlay) cameraModalOverlay.addEventListener("click", e => { if (e.target.id === "cameraModalOverlay") closeCameraModal(); });

    function closeCameraModal() { stopCamera(); closeModal("cameraModalOverlay"); }

    function renderCameraPrompt() {
        if (!cameraContent) return;
        cameraContent.innerHTML =
            '<p style="font-size:14px;color:var(--text-soft);margin:0 0 16px;">Allow camera access to capture a photo and search with it.</p>' +
            '<div class="modal-btn-row"><button class="btn btn-ghost" id="camUploadFallback" type="button">Upload image instead</button><button class="btn btn-primary" id="camRequestBtn" type="button">Enable camera</button></div>';
        $("camRequestBtn").addEventListener("click", requestCamera);
        $("camUploadFallback").addEventListener("click", () => { closeCameraModal(); if (imageSearchBtn) imageSearchBtn.click(); });
    }

    async function requestCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            cameraContent.innerHTML =
                '<div class="err-msg" style="margin-bottom:14px;">' + ICONS.warn + "<span>Camera unavailable. Try uploading an image.</span></div>" +
                '<div class="modal-btn-row"><button class="btn btn-primary" id="camUploadFallback2" type="button">Upload image instead</button></div>';
            $("camUploadFallback2").addEventListener("click", () => { closeCameraModal(); if (imageSearchBtn) imageSearchBtn.click(); });
            return;
        }
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            cameraContent.innerHTML =
                '<video id="cameraPreview" autoplay playsinline style="width:100%;border-radius:12px;background:#000;max-height:320px;object-fit:cover;"></video>' +
                '<canvas id="cameraCanvas" style="display:none;"></canvas>' +
                '<div class="modal-btn-row" style="margin-top:14px;"><button class="btn btn-ghost" id="camCancel" type="button">Cancel</button><button class="btn btn-primary" id="camCapture" type="button">Capture</button></div>';
            $("cameraPreview").srcObject = cameraStream;
            $("camCancel").addEventListener("click", closeCameraModal);
            $("camCapture").addEventListener("click", capturePhoto);
        } catch (err) {
            cameraContent.innerHTML =
                '<div class="err-msg" style="margin-bottom:14px;">' + ICONS.warn + "<span>Camera access unavailable. Try uploading an image.</span></div>" +
                '<div class="modal-btn-row"><button class="btn btn-primary" id="camUploadFallback3" type="button">Upload image instead</button></div>';
            $("camUploadFallback3").addEventListener("click", () => { closeCameraModal(); if (imageSearchBtn) imageSearchBtn.click(); });
        }
    }

    function capturePhoto() {
        const video = $("cameraPreview");
        const canvas = $("cameraCanvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        stopCamera();
        cameraContent.innerHTML =
            '<img src="' + dataUrl + '" style="width:100%;border-radius:12px;max-height:320px;object-fit:cover;" alt="Captured photo">' +
            '<div class="modal-btn-row" style="margin-top:14px;"><button class="btn btn-ghost" id="camRetake" type="button">Retake</button><button class="btn btn-primary" id="camSearchThis" type="button">Search this photo</button></div>';
        $("camRetake").addEventListener("click", requestCamera);
        $("camSearchThis").addEventListener("click", () => {
            closeCameraModal();
            setMode("images");
            runSearch("photo capture");
        });
    }

    function stopCamera() {
        if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
    }

    /* ============ FLOATING DONATE ============ */
    const donateFloat = $("donateFloat");
    const donateFloatClose = $("donateFloatClose");
    const DONATE_DISMISSED_KEY = "rs_donate_dismissed";

    if (donateFloat) {
        if (Store.get(DONATE_DISMISSED_KEY, false)) {
            donateFloat.classList.add("hidden");
        } else {
            setTimeout(() => {
                donateFloat.classList.remove("hidden");
            }, 2500);
        }
    }

    if (donateFloatClose) donateFloatClose.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        donateFloat.classList.add("hidden");
        Store.set(DONATE_DISMISSED_KEY, true);
    });

    /* ============ LANGUAGE / REGION ============ */
    const languageSelect = $("languageSelect");
    if (languageSelect) {
        languageSelect.value = Store.get("rs_language", "English");
        languageSelect.addEventListener("change", e => Store.set("rs_language", e.target.value));
    }
    const regionSelect = $("regionSelect");
    if (regionSelect) {
        regionSelect.value = Store.get("rs_region", "Automatic");
        regionSelect.addEventListener("change", e => Store.set("rs_region", e.target.value));
    }

    /* ============ INIT ============ */
    autoResize();
    updateSubmitState();
    renderHistory();
    applyTheme();

    // Auto-test backend connection on first load
    if (State.apiStatus === "untested") {
        checkBackendConnection(State.apiBaseUrl).then(r => {
            State.apiStatus = r.status;
            const label = STATUS_LABELS[r.status] || STATUS_LABELS.network;
            setStatusPill(label.cls, r.message || label.text);
        });
    }

    console.log("%cRaiaSpace v0.1.4", "color:#3b82f6;font-weight:800;font-size:14px", "— backend-proxied SearXNG");
})();