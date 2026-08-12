# RaiaSpace

A minimal, privacy-focused, glassmorphism search homepage. Pure HTML/CSS/vanilla JS —
no build step, no framework, no backend of its own. It can run purely on bundled
sample data (**Local Demo** mode), or connect to a real **SearXNG** instance for
live results (**Live SearXNG** mode).

## Files

```
index.html   Markup — nav, hero, search box, drawers, modals, results view
style.css    All styling — design tokens, light/dark themes, components
script.js    All behavior — search modes, drawers, SearXNG service, rendering
```

Open `index.html` directly in a browser, or serve the folder with any static
file server. No dependencies to install.

## Local Demo vs. Live SearXNG

**RaiaSpace defaults to Live SearXNG**, pointed at `http://localhost:8080`. It
is not a demo by default — on load it quietly checks that instance and shows
a real connection status. If nothing is running there yet, you'll see an
honest error screen (not fake results) until you either start a real instance
or point RaiaSpace at one you already run.

**Local Demo** mode still exists, but only as an explicit, clearly-labeled
opt-in for offline UI testing — flip it on yourself from Settings if you want
to browse the interface without a backend. RaiaSpace never mixes the two: the
mode badge in the nav always shows which one is active, and results are
always tagged accordingly.

### Get a real instance running in under a minute

The fastest path to genuinely working search is a local SearXNG instance with
JSON already enabled — most public instances deliberately disable JSON to
discourage scraping, so pointing RaiaSpace at a random public instance from a
list is unlikely to work reliably. Self-hosting is the reliable option:

```bash
mkdir searxng && cd searxng
cat > docker-compose.yml << 'EOF'
services:
  searxng:
    image: docker.io/searxng/searxng:latest
    ports:
      - "8080:8080"
    environment:
      - SEARXNG_BASE_URL=http://localhost:8080/
    volumes:
      - ./searxng-data:/etc/searxng
EOF
docker compose up -d
```

On first run SearXNG writes a default `settings.yml` into `./searxng-data`.
Edit it to enable JSON (see below), then:

```bash
docker compose restart
```

Open RaiaSpace — it will already be pointed at `http://localhost:8080` and
should connect on its own. If you use a different port or a remote host,
update the URL in **Settings → SearXNG connection**.

## SearXNG setup

RaiaSpace calls:

```
GET {SEARXNG_BASE_URL}/search?q={query}&format=json&categories=...&language=...&pageno=...
```

Your SearXNG instance must have JSON output enabled. In `settings.yml`:

```yaml
search:
  formats:
    - html
    - json
```

Without this, SearXNG returns HTTP 403 for JSON requests, and RaiaSpace will
show a "JSON format unavailable" status rather than silently failing or
falling back to fake data.

Your instance must also allow cross-origin requests from wherever RaiaSpace is
served (CORS). For local development, the simplest options are:

- Serve RaiaSpace from the same origin as SearXNG, or
- Configure SearXNG's reverse proxy / `access_control_allow_origin` to permit
  RaiaSpace's origin.

No API key is required or accepted — standard SearXNG search does not use one,
and RaiaSpace never asks for one.

The in-app **SearXNG setup guide** (an accordion inside Settings) shows this
same information for anyone who didn't read this file.

## Mode → SearXNG category mapping

| RaiaSpace mode | SearXNG category | Notes |
|---|---|---|
| Web | `general` | |
| AI Answer | `general` | Results are shown as a "Source-based preview" — an extractive summary built locally from returned snippets, never a real AI backend, and always labeled as such. |
| Images | `images` | Rendered as a media grid. |
| Videos | `videos` | Rendered as video cards; original result opens in a new tab, nothing autoplays or is embedded automatically. |
| News | `news` | |
| Academic | `science` | |
| Maps | `general` (fallback) | Shown with a notice that native map search isn't configured. |
| Shopping | `general` (fallback) | Shown with a notice, labeled as web-based product discovery. |
| Social | `general` (fallback) | Shown with a notice. |
| Files | *(not sent)* | Always local-only — see below. |

## Files mode is local-only

Files selected in Files mode are **never** uploaded to SearXNG or any other
remote service, in either Local Demo or Live SearXNG mode. RaiaSpace can
preview them and extract plain text from TXT/CSV/MD locally, and shows
metadata for PDF/DOCX, but full document search requires a backend or local
indexing engine this frontend does not include.

## Error handling

Every failure mode gets a dedicated, honest message plus **Retry** and
**Settings** actions, with an optional technical-detail toggle — never a
silent fallback to fake results:

- Invalid URL
- Connection / network failure
- CORS failure
- JSON disabled (HTTP 403)
- Rate limited (HTTP 429)
- Timeout (15s)
- Malformed JSON
- Empty results
- Unsupported category (falls back to `general` with a visible notice)

## Privacy

- Live SearXNG mode sends your query (and selected filters) to the SearXNG
  instance you configured — nowhere else.
- Local Demo mode sends nothing anywhere.
- Selected files are never uploaded.
- Search history and settings live only in this browser's `localStorage`.
- There is no account system or sync in this version.
- RaiaSpace can't promise what your SearXNG instance itself logs — that
  depends on how you or its operator configured it.

See **Settings → Privacy → View** for the same explanation in-app.

## Known limitations

- Autocomplete suggestions are drawn from local sample queries, search
  history, and trending demo entries — not from a live SearXNG suggestion
  endpoint (SearXNG's own `suggestions` field is only returned alongside a
  completed search, and is shown post-search as "Related searches").
- Region filtering is UI-only; SearXNG doesn't have a general "region"
  parameter separate from language.
- Pagination in Local Demo mode cycles the same bundled sample set — it
  demonstrates the UI, not real paging.
