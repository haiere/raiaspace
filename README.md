# RaiaSpace

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License" />
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Active Status" />
  <img src="https://img.shields.io/badge/app-static%20SPA-blue.svg" alt="Static SPA" />
  <img src="https://img.shields.io/badge/backend-Node.js%20%2B%20SearXNG-orange.svg" alt="Node.js + SearXNG Backend" />
  <img src="https://img.shields.io/badge/deploy-Docker%20Compose-2496ED.svg" alt="Docker Compose Deployment" />
  <img src="https://img.shields.io/badge/privacy-self--hosted-purple.svg" alt="Self-hosted Privacy" />
  <img src="https://img.shields.io/badge/version-0.1.4-blue.svg" alt="Version 0.1.4" />
</p>

<p align="center">
  A private, minimal, and fast search interface powered by your own SearXNG instance, proxied through a tiny self-hosted backend.
</p>

<p align="center">
  <a href="#deployment">
    <img src="https://img.shields.io/badge/Get%20Started-Docker%20Compose-3B82F6?style=for-the-badge" alt="Get started with RaiaSpace" />
  </a>
  <a href="#privacy">
    <img src="https://img.shields.io/badge/Privacy-Self--Hosted-7C3AED?style=for-the-badge" alt="Privacy information" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Requirements](#requirements)
- [Backend API](#backend-api)
- [SearXNG Configuration](#searxng-configuration)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Privacy](#privacy)
- [Security Considerations](#security-considerations)
- [Browser Support](#browser-support)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Version History](#version-history)

---

## Overview

RaiaSpace is a static, client-side search frontend built with plain HTML, CSS, and JavaScript, paired with a small Node.js/Express backend.

The frontend has no build step, no database, and no framework dependency. The backend forwards search queries to your self-hosted SearXNG instance and returns normalized JSON that the frontend can display reliably.

Search flow:

```text
Browser → RaiaSpace Backend → SearXNG → Upstream Search Engines
```

If any part of that chain fails, RaiaSpace shows a clear error instead of fake or placeholder results.

### Why a backend?

RaiaSpace used to talk to SearXNG directly from the browser, but that approach is fragile:

- SearXNG JSON output is disabled by default.
- Browser-to-SearXNG requests can run into CORS issues.
- HTTPS pages cannot call HTTP endpoints because of mixed-content blocking.

The backend solves all of that by calling SearXNG server-side, normalizing the response, and keeping the frontend simple.

### Local data

When enabled, RaiaSpace stores the following data locally in your browser:

- Search history.
- Bookmarks.
- Theme preference.
- Accessibility preferences.
- Search filters.
- Backend API base URL.

This data stays on your device and is not sent to any RaiaSpace-operated server.

---

## Architecture

```text
┌──────────────────────┐
│   Browser (SPA)      │
│   index.html         │
│   style.css          │
│   script.js          │
└──────────┬───────────┘
           │  GET /api/search?q=...
           ▼
┌──────────────────────┐
│  RaiaSpace Backend   │
│  backend/server.js   │
│  Node.js / Express   │
└──────────┬───────────┘
           │  GET /search?format=json
           ▼
┌──────────────────────┐
│      SearXNG         │
│   searxng:8080       │
└──────────┬───────────┘
           ▼
   Upstream search engines
```

In the reference deployment, Caddy terminates TLS on ports 80 and 443, serves the static frontend, and forwards `/api/*` to the backend. All services run together in one `docker-compose.yml`.

---

## Features

- Multi-mode search: Web, AI Answer, Images, Videos, News, Maps, Shopping, Academic, Social, and Files.
- Backend-proxied SearXNG, so there are no CORS or mixed-content issues.
- No fake results or demo mode.
- Text search.
- Voice input via the Web Speech API, where supported.
- Image input from upload or selection.
- File input for filename or topic-based search.
- Camera input on supported devices and browsers.
- Advanced filters: language, region, time range, safe search, file type, domain, and exclusions.
- Search history stored locally, up to 50 entries.
- Local bookmarks for result links.
- Light, dark, and system theme modes.
- Reduced-motion support.
- Keyboard shortcuts.
- Responsive layout for mobile, tablet, and desktop.
- Early failure detection through backend startup checks.
- Docker-ready deployment with automatic HTTPS.

Some features depend on browser support, SearXNG configuration, enabled engines, and device permissions.

---

## Requirements

### Production

- Docker Engine and Docker Compose.
- A public domain pointing to your server.
- Ports 80 and 443 open to the internet.

### Development

- Node.js 20+ for the backend.
- A reachable SearXNG instance.
- Any static file server for the frontend, such as `python3 -m http.server` or `npx serve`.

### SearXNG

- JSON output enabled in `settings.yml`.
- SearXNG reachable from the backend, ideally through the Docker network.

The frontend itself does not require a database, user account, build step, or package installation.

---

## Backend API

The backend exposes one search endpoint and one health endpoint.

### `GET /api/search`

Proxies a query to SearXNG and returns normalized results.

| Param | Required | Default | Description |
| --- | --- | --- | --- |
| `q` | Yes | — | Search query |
| `mode` | No | `web` | `web`, `ai`, `images`, `videos`, `news`, `academic`, `maps`, `shopping`, `social`, `files` |
| `page` | No | `1` | Result page |
| `language` | No | — | Language code |
| `time_range` | No | — | `day`, `week`, `month`, `year` |
| `safesearch` | No | — | `0` off, `1` moderate, `2` strict |
| `categories` | No | — | Override SearXNG category |
| `filetype` | No | — | `pdf`, `docx`, `txt`, `csv` |
| `site` | No | — | Restrict results to one domain |
| `exclude` | No | — | Space-separated excluded terms |
| `exact` | No | — | Exact-phrase constraint |

Success response:

```json
{
  "ok": true,
  "query": "example",
  "mode": "web",
  "page": 1,
  "number_of_results": 42,
  "results": [
    {
      "title": "Example result",
      "url": "[https://example.org/article](https://example.org/article)",
      "snippet": "Short description …",
      "domain": "example.org",
      "engine": "google",
      "publishedDate": "",
      "thumbnail": ""
    }
  ],
  "suggestions": []
}
```

Error response:

```json
{ "ok": false, "error": "Human-readable explanation." }
```

Status codes:

| Code | Meaning |
| --- | --- |
| `200` | Success |
| `400` | Missing or invalid `q` |
| `429` | SearXNG rate-limited the request |
| `502` | Backend could not reach SearXNG, or JSON is disabled |
| `504` | Backend timed out waiting for SearXNG |

### `GET /health`

```json
{ "status": "ok" }
```

Used by Docker health checks and the frontend connection test.

---

## SearXNG Configuration

RaiaSpace uses SearXNG’s JSON API. JSON output must be enabled in `settings.yml`.

### Enable JSON output

```yaml
use_default_settings: true

general:
  instance_name: "RaiaSpace"

server:
  bind_address: "0.0.0.0"
  port: 8080
  secret_key: "REPLACE_ME"
  limiter: false
  image_proxy: true

search:
  formats:
    - html
    - json
  safe_search: 1
  autocomplete: "duckduckgo"

ui:
  default_locale: "en"
```

Restart SearXNG after editing the file:

```bash
docker compose restart searxng
```

Verify JSON output:

```bash
docker compose exec backend \
  wget -qO- 'http://searxng:8080/search?q=test&format=json' | head -c 200
```

You should see JSON output starting with `{"query":"test", ...}`.

### Request example

```text
http://searxng:8080/search?q=example&format=json&categories=general
```

Common parameters:

| Parameter | Description |
| --- | --- |
| `q` | Search query |
| `format` | Output format, must be `json` |
| `categories` | Search category such as `general` or `images` |
| `language` | Result language |
| `pageno` | Page number |
| `time_range` | Time filter |
| `safesearch` | Safe-search level |

### CORS and HTTPS

Because the frontend never calls SearXNG directly, CORS is not required for RaiaSpace. The backend talks to SearXNG over the internal Docker network using plain HTTP, which keeps the service private and simple.

---

## Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/Haiere/raiaspace.git](https://github.com/Haiere/raiaspace.git)
cd raiaspace
```

### 2. Start SearXNG locally

```bash
docker run -d --name searxng -p 8080:8080 \
  -v "$PWD/searxng/settings.yml:/etc/searxng/settings.yml:ro" \
  -e SEARXNG_BASE_URL=http://localhost:8080/ \
  searxng/searxng:latest
```

Verify JSON output:

```bash
curl -s 'http://localhost:8080/search?q=test&format=json' | head -c 200
```

### 3. Run the backend

```bash
cd backend
npm install
SEARXNG_URL=http://localhost:8080 \
FRONTEND_ORIGIN=http://localhost:5500 \
PORT=3000 \
npm start
```

### 4. Serve the frontend

```bash
python3 -m http.server 5500
```

Open `http://localhost:5500`.

### 5. Point the frontend to the backend

1. Open RaiaSpace.
2. Go to Settings.
3. Set the backend API base URL to `http://localhost:3000`.
4. Save and test.
5. Run a search.

For a production-style local setup, keep the backend URL as `/api`.

---

## Deployment

The reference deployment uses Docker Compose with Caddy for automatic HTTPS.

### Prerequisites

- Server with a public IP.
- Docker Engine 24+ and Docker Compose v2.
- Domain names pointing to your server.
- Ports 80 and 443 open in the firewall.

### Example domains

| Subdomain | Purpose |
| --- | --- |
| `yourdomain.com` | Frontend |
| `api.yourdomain.com` | Backend API, optional if same-origin |
| `search.yourdomain.com` | SearXNG, if exposed separately |

### 1. Prepare `.env`

```bash
cp .env.example .env
nano .env
```

Example values:

```env
SEARXNG_SECRET=$(openssl rand -hex 32)
SEARXNG_BASE_URL=[https://search.yourdomain.com/](https://search.yourdomain.com/)
RAIASPACE_BACKEND_URL=[https://api.yourdomain.com](https://api.yourdomain.com)
RAIASPACE_FRONTEND_URL=[https://yourdomain.com](https://yourdomain.com)
RAIASPACE_SEARXNG_URL=http://searxng:8080

DOMAIN_SEARCH=search.yourdomain.com
DOMAIN_API=api.yourdomain.com
DOMAIN_FRONTEND=yourdomain.com
LETSENCRYPT_EMAIL=you@yourdomain.com
```

`RAIASPACE_SEARXNG_URL` must use the internal Docker hostname `searxng`, not `localhost`.

### 2. Start the stack

```bash
docker compose up -d --build
```

The first run pulls images, builds the backend, and issues TLS certificates.

### 3. Verify each layer

SearXNG:

```bash
docker compose exec backend wget -qO- 'http://searxng:8080/search?q=test&format=json' | head -c 200
```

Backend:

```bash
curl -s '[https://api.yourdomain.com/health](https://api.yourdomain.com/health)'
curl -s '[https://api.yourdomain.com/api/search?q=test&mode=web](https://api.yourdomain.com/api/search?q=test&mode=web)' | jq .ok
```

Frontend:

Open `https://yourdomain.com` and run a search. In DevTools → Network, confirm the request goes to `/api/search` and returns `200`.

### 4. Inspect logs

```bash
docker compose logs -f searxng
docker compose logs -f backend
docker compose logs -f caddy
docker compose ps
```

### 5. Open firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Updating

```bash
git pull
docker compose up -d --build
docker compose restart searxng
```

---

## Configuration

### Frontend

Settings are stored in `localStorage`.

| Key | Description |
| --- | --- |
| `rs_theme` | Light, dark, or system |
| `rs_reduced_motion` | Minimize non-essential animations |
| `rs_safe_search` | Safe-search preference |
| `rs_suggestions` | Enable autocomplete suggestions |
| `rs_save_history` | Store recent searches locally |
| `rs_language` | Preferred result language |
| `rs_region` | Preferred region |
| `raiaspace-api-url` | Backend API base URL, default `/api` |
| `rs_bookmarks` | Locally saved result links |
| `rs_history` | Up to 50 saved queries |

Upgrading from `v0.1.3` or earlier: the old `raiaspace-searxng-url` key is migrated automatically and now stores the backend URL.

### Backend

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | Listen port |
| `SEARXNG_URL` | `http://searxng:8080` | Base URL of SearXNG |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | Allowed CORS origin |
| `FETCH_TIMEOUT_MS` | `15000` | Upstream timeout in milliseconds |

### Reset local data

Use Settings to:

- Clear search history.
- Remove bookmarks.
- Reset the backend URL.
- Restore default preferences.

You can also clear site data through your browser settings.

---

## Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Focus search box | `⌘K` / `Ctrl+K` |
| Open shortcuts panel | `⌘/` / `Ctrl+/` |
| Submit search | `Enter` |
| Insert a new line | `Shift+Enter` |
| Close modal or drawer | `Esc` |
| Navigate autocomplete | `Arrow Up` / `Arrow Down` |
| Navigate mode tabs | `Arrow Left` / `Arrow Right` |

Shortcuts are disabled while focus is inside a text input, select, or another control with native keyboard behavior.

---

## Project Structure

```text
raiaspace/
├── docker-compose.yml
├── Caddyfile
├── .env
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── style.css
├── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
└── searxng/
    └── settings.yml
```

RaiaSpace intentionally avoids frontend build tooling and runtime dependencies.

---

## Troubleshooting

### Backend not reachable

The frontend cannot reach `/api/search`.

Check:

```bash
docker compose ps
docker compose logs backend
curl [https://yourdomain.com/api/health](https://yourdomain.com/api/health)
```

Common causes:

- Backend container is not running.
- Reverse proxy is not forwarding `/api/*`.
- Backend URL is misconfigured.
- TLS certificate has not been issued yet.

### SearXNG returned 403

JSON output is not enabled.

Fix:

1. Make sure `json` exists under `search.formats`.
2. Confirm the file is mounted inside the container.
3. Ensure `limiter: false` is set if needed.
4. Restart SearXNG.

### SearXNG returned HTML

This usually means the request hit the wrong endpoint or JSON output is still disabled.

```bash
docker compose exec backend \
  wget -qO- 'http://searxng:8080/search?q=test&format=json' | head -c 100
```

### Request timed out

Possible causes:

- One or more SearXNG engines are slow.
- The instance is rate-limiting requests.
- Network instability between backend and SearXNG.

Fix: increase `FETCH_TIMEOUT_MS` or disable slow engines.

### Backend works, frontend shows errors

Check the browser console.

- If it shows `http://` on an `https://` page, reset the API base URL to `/api`.
- If it shows a CORS error, `FRONTEND_ORIGIN` does not match the page origin.

### Voice search does not work

Voice input depends on the Web Speech API, which is not consistently available across browsers. Use a supported browser, grant microphone permission, and confirm the selected language.

### Empty results

Possible causes:

- Query is too specific.
- Safe search is filtering results.
- Relevant engines are disabled.
- The instance is rate-limiting requests.
- The chosen category is empty or unsupported.

Try a simpler query or switch category.

### Bookmarks or history are missing

Check whether:

- Browser site data was cleared.
- Private browsing is active.
- Storage is blocked.
- The origin changed.
- A browser extension is clearing local storage.

---

## Privacy

RaiaSpace is a self-hosted, local-first stack.

### What it does not provide

- No hosted backend operated by the project.
- No user accounts.
- No cloud bookmark database.
- No hosted history sync.
- No analytics or telemetry.

### Query routing

Search terms go from your browser to your backend, then to your SearXNG instance. RaiaSpace itself does not send your queries to a project-operated server.

### Local storage

Search history, bookmarks, and preferences are stored in browser storage under your RaiaSpace origin. This storage is persistent by default but can be cleared by the browser, the user, private browsing, or extensions.

### External requests

RaiaSpace may communicate with:

- Your backend.
- Your SearXNG instance.
- Remote result URLs when opened.
- Browser speech-recognition services, depending on browser support.

---

## Security Considerations

### Backend exposure

The backend is meant to be reachable through HTTPS. Protect it by:

- Restricting `FRONTEND_ORIGIN` to the exact frontend origin.
- Running it behind a reverse proxy with TLS.
- Keeping dependencies updated.
- Adding rate limiting if the deployment is public.

### SearXNG exposure

In the reference deployment, SearXNG is not exposed to the public internet. That is the safest default. If you expose it publicly, apply rate limits, monitor resource usage, keep it updated, and avoid exposing admin interfaces.

### Search queries

Search queries may contain sensitive information. Self-hosting gives you control, but upstream search engines can still process requests depending on your SearXNG configuration.

### Local storage

Local storage is not encrypted. Do not store secrets, credentials, or private tokens there.

### Suggested CSP

```text
default-src 'self';
img-src 'self' data: https:;
style-src 'self' 'unsafe-inline';
script-src 'self';
connect-src 'self';
```

Adjust `connect-src` if the frontend uses a different backend origin.

---

## Browser Support

| Browser | Version | Notes |
| --- | --- | --- |
| Chrome | 90+ | Core search; voice depends on platform |
| Edge | 90+ | Core search; voice depends on platform |
| Firefox | 88+ | Core search; speech recognition may be limited |
| Safari | 15.4+ | Core search; speech features vary |
| iOS Safari | Recent | Responsive layout; permission restrictions may apply |
| Android Chrome | Recent | Responsive layout; microphone and camera permissions may be required |

Feature availability depends on browser APIs, device permissions, SearXNG configuration, and the selected search mode.

---

## Roadmap

Potential future improvements:

- Configurable `FETCH_TIMEOUT_MS` from the UI.
- Result-type filtering, such as PDF-only mode.
- Per-engine status reporting.
- Optional encrypted local bookmarks.
- Import and export for bookmarks and history.
- PWA installation and offline shell caching.
- Better camera and image-search flows.
- Additional localization.
- Custom result layouts.
- Accessibility audits and automated tests.
- Optional same-origin reverse-proxy mode.
- Optional SearXNG preference synchronization.

These features are not guaranteed to be in `v0.1.4`.

---

## Contributing

Contributions are welcome.

Please preserve the core principles of the project:

- No fake or placeholder results.
- No demo mode that hides missing backend data.
- No unnecessary external dependencies.
- No analytics or telemetry.
- No hidden query forwarding.
- No secrets or private instance credentials in source files.
- Keyboard accessibility for interactive elements.
- Clear error states for failed requests.
- Responsive behavior on mobile and desktop.
- Reduced-motion support.

### Workflow

1. Fork the repository.
2. Create a branch.
3. Make your changes.
4. Test with a real SearXNG instance and backend.
5. Test with a broken or unavailable backend.
6. Test with a broken or unavailable SearXNG instance.
7. Test keyboard and screen-reader behavior.
8. Commit your changes.
9. Push the branch.
10. Open a pull request.

Open an issue first for major architectural changes.

Do not commit:

- `.env` files with real secrets.
- SearXNG passwords or secret keys.
- API tokens.
- Private instance URLs.
- Personal search history.
- Private bookmarks.
- Generated browser-storage exports.

---

## License

RaiaSpace is released under the MIT License.

See the `LICENSE` file for full license text. The MIT License covers the project code, not content returned by search engines or external websites.

---

## Support

If RaiaSpace is useful, you can support development through Buy Me a Coffee.

Support is optional and does not unlock required functionality.

<p align="center">
  <a href="https://buymeacoffee.com/hajirstudio" target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20Development-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
      alt="Buy Me a Coffee"
    />
  </a>
</p>

---

## Version History

### v0.1.4

- Added a backend service (`backend/server.js`) that proxies SearXNG server-side.
- Removed direct browser-to-SearXNG calls.
- Eliminated CORS and mixed-content issues.
- Added Docker Compose deployment with SearXNG, Redis/Valkey, backend, frontend, and Caddy.
- Added automatic HTTPS via Caddy and Let’s Encrypt.
- Introduced a stable JSON contract between frontend and backend.
- Changed settings to store the backend API base URL instead of a SearXNG URL.
- Added automatic migration of the legacy `raiaspace-searxng-url` key.
- Added a health endpoint used by Docker and the frontend.
- Added structured backend error responses and status codes.
- Added local search history and bookmarks.
- Added themes and reduced-motion support.
- Added multimodal input controls: voice, image, file, and camera.
- Added keyboard shortcuts and improved responsive behavior.
- Added explicit no-demo-results behavior.

---

<p align="center">
  Built for focused discovery and self-hosted search.
</p>

<p align="center">
  <sub>RaiaSpace v0.1.4</sub>
</p>

<p align="center">
  Live site: <a href="https://hajir.is-a.dev/raiaspace">hajir.is-a.dev/raiaspace</a>
</p>