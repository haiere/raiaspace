<div align="center">

# RaiaSpace

<a href="https://github.com/Haiere/raiaspace">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=20&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&lines=A+privacy-first+search+frontend;Powered+by+your+own+SearXNG+instance;No+build+step,+no+database,+no+tracking" alt="Typing SVG" />
</a>

<br />

<img src="https://img.shields.io/badge/Version-0.1.5-blue?style=flat-square" alt="Version 0.1.5" />
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
<img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />

<br />

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
<img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Vanilla JavaScript" />
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/SearXNG-3050C4?style=flat-square&logo=searxng&logoColor=white" alt="SearXNG" />

</div>

---

**RaiaSpace** is a static, client-side search frontend built with plain HTML, CSS, and JavaScript, paired with a small Node.js / Express backend.

<div align="center">

| **What it is** | **Search flow** |
| :--- | :--- |
| - No build step<br>- No database<br>- No framework dependency<br>- Tiny Node.js / Express backend<br>- Forwards queries to your own SearXNG<br>- Returns normalized JSON for reliable display | `Browser -> RaiaSpace Backend -> SearXNG -> Upstream Search Engines`<br><br>If any part of that chain fails, RaiaSpace shows a clear error instead of fake or placeholder results. |

</div>

### Why a backend?

RaiaSpace used to talk to SearXNG directly from the browser, but that approach is fragile:

| Problem | Explanation |
|---|---|
| **JSON disabled by default** | SearXNG does not expose its JSON output unless explicitly enabled. |
| **CORS issues** | Browser-to-SearXNG requests can be blocked by cross-origin policy. |
| **Mixed-content blocking** | HTTPS pages cannot call HTTP endpoints. |

> [!NOTE]
> The backend solves all of that by calling SearXNG server-side, normalizing the response, and keeping the frontend simple.

### Local Data

When enabled, RaiaSpace stores the following data locally in your browser:

- Search history
- Bookmarks
- Theme preference
- Accessibility preferences
- Search filters
- Backend API base URL

This data stays on your device and is not sent to any RaiaSpace-operated server.

---

## Architecture

```text
+-----------------------+       GET /api/search?q=...       +-----------------------+
|     Browser (SPA)     | --------------------------------> |  RaiaSpace Backend    |
|     index.html        |                                   |  backend/server.js    |
|     style.css         | <-------------------------------- |  Node.js / Express    |
|     script.js         |          Normalized JSON          +-----------------------+
+-----------------------+                                               |
                                                                        | GET /search?format=json
                                                                        v
                                                                +-----------------------+
                                                                |       SearXNG         |
                                                                |     searxng:8080      |
                                                                +-----------------------+
                                                                        |
                                                                        v
                                                              Upstream search engines
```

In the reference deployment, Caddy terminates TLS on ports 80 and 443, serves the static frontend, and forwards /api/* to the backend. All services run together in one docker-compose.yml.

[!IMPORTANT]
The Docker deployment requires a dedicated root domain or subdomain (e.g. search.example.com). Path-based hosting such as example.com/raiaspace is not supported by this Caddyfile setup.

---

Features

<table>
<tr>
<td width="50%" valign="top">

Search

· Multi-mode search: Web, AI Answer, Images, Videos, News, Maps, Shopping, Academic, Social, and Files
· Backend-proxied SearXNG, so there are no CORS or mixed-content issues
· No fake results or demo mode
· Text search
· Voice input via the Web Speech API, where supported
· Image input from upload or selection
· File input for filename or topic-based search
· Camera input on supported devices and browsers

</td>
<td width="50%" valign="top">

Filtering & Personalization

· Advanced filters: language, region, time range, safe search, file type, domain, and exclusions
· Search history stored locally, up to 50 entries
· Local bookmarks for result links
· Light, dark, and system theme modes
· Reduced-motion support
· Keyboard shortcuts
· Responsive layout for mobile, tablet, and desktop
· Early failure detection through backend startup checks
· Docker-ready deployment with automatic HTTPS

</td>
</tr>
</table>

[!NOTE]
Some features depend on browser support, SearXNG configuration, enabled engines, and device permissions.

---

Requirements

<table>
<tr>
<td width="33%" valign="top">

Production

· Docker Engine 24+ and Docker Compose v2
· A public domain or subdomain pointing to your server
· Ports 80 and 443 open to the internet

</td>
<td width="33%" valign="top">

Development

· Node.js 20+ for the backend
· A reachable SearXNG instance
· Any static file server for the frontend (e.g., python3 -m http.server or npx serve)

</td>
<td width="33%" valign="top">

SearXNG

· JSON output enabled in settings.yml
· Reachable from the backend, ideally through the Docker network

</td>
</tr>
</table>

[!NOTE]
The frontend itself does not require a database, user account, build step, or package installation.

---

Backend API

The backend exposes one search endpoint and one health endpoint.

GET /api/search

Proxies a query to SearXNG and returns normalized results.

Param Required Default Description
q Yes - Search query
mode No web web, ai, images, videos, news, academic, maps, shopping, social, files
page No 1 Result page
language No - Language code
time_range No - day, week, month, year
safesearch No - 0 off, 1 moderate, 2 strict
categories No - Override SearXNG category
filetype No - pdf, docx, txt, csv
site No - Restrict results to one domain
exclude No - Space-separated excluded terms
exact No - Exact-phrase constraint

The backend translates site, exclude, and exact into query operators (site:, -term, "phrase") before forwarding to SearXNG.

<details>
<summary><b>Success Response</b></summary>

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
      "url": "https://example.org/article",
      "snippet": "Short description ...",
      "domain": "example.org",
      "engine": "google",
      "publishedDate": "",
      "thumbnail": ""
    }
  ],
  "suggestions": []
}
```

</details>

<details>
<summary><b>Error Response & Status Codes</b></summary>

```json
{ "ok": false, "error": "Human-readable explanation." }
```

Code Meaning
200 Success
400 Missing or invalid q
429 SearXNG rate-limited the request
502 Backend could not reach SearXNG, or JSON is disabled
504 Backend timed out waiting for SearXNG

</details>

GET /health

```json
{ "status": "ok" }
```

Used by Docker health checks and the frontend connection test.

---

SearXNG Configuration

RaiaSpace uses SearXNG's JSON API. JSON output must be enabled in settings.yml (already done in searxng/settings.yml):

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

You should see JSON output starting with {"query":"test", ...}.

CORS and HTTPS

Because the frontend never calls SearXNG directly, CORS is not required for RaiaSpace. The backend talks to SearXNG over the internal Docker network using plain HTTP, which keeps the service private and simple.

---

Getting Started (Local Development)

1. Clone the repository

```bash
git clone https://github.com/Haiere/raiaspace.git
cd raiaspace
```

2. Start SearXNG locally

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

3. Run the backend

```bash
cd backend
npm install
SEARXNG_URL=http://localhost:8080 \
FRONTEND_ORIGIN=http://localhost:5500 \
PORT=3000 \
npm start
```

4. Serve the frontend

```bash
python3 -m http.server 5500
```

5. Point the frontend to the backend

1. Open http://localhost:5500.
2. Go to Settings.
3. Set the backend API base URL to http://localhost:3000.
4. Save and test.
5. Run a search.

[!TIP]
For a production-style local setup, keep the backend URL as /api.

---

Deployment (Docker Compose + Caddy)

The reference deployment uses Docker Compose with Caddy for automatic HTTPS. The stack has four services: SearXNG, backend, frontend (nginx), and Caddy. Redis is not included; SearXNG's limiter is disabled by default, so a cache is unnecessary overhead.

Prerequisites

· Server with a public IP
· Docker Engine 24+ and Docker Compose v2
· A dedicated domain or subdomain pointing to your server
· Ports 80 and 443 open in the firewall

1. Prepare .env

```bash
cp .env.example .env
nano .env
```

Example values:

```env
SEARXNG_SECRET=$(openssl rand -hex 32)
SEARXNG_BASE_URL=http://localhost:8080/
RAIASPACE_FRONTEND_URL=https://search.example.com
DOMAIN_FRONTEND=search.example.com
LETSENCRYPT_EMAIL=you@example.com
```

[!IMPORTANT]

· DOMAIN_FRONTEND must be a bare domain or subdomain (no scheme, no trailing slash, no path).
· RAIASPACE_FRONTEND_URL must match the public origin exactly (with https://, without trailing slash).
· The SearXNG instance is not exposed publicly in this stack; SEARXNG_BASE_URL is only used internally.

2. Start the stack

```bash
docker compose up -d --build
```

The first run pulls images, builds the backend, and issues TLS certificates. The backend container waits for SearXNG to become healthy before starting, and Caddy waits for both.

3. Verify each layer

SearXNG:

```bash
docker compose exec backend wget -qO- 'http://searxng:8080/search?q=test&format=json' | head -c 200
```

Backend:

```bash
curl -s 'https://search.example.com/health'
curl -s 'https://search.example.com/api/search?q=test&mode=web' | jq .ok
```

Frontend:
Open https://search.example.com and run a search. In DevTools -> Network, confirm the request goes to /api/search and returns 200.

4. Inspect logs

```bash
docker compose logs -f searxng
docker compose logs -f backend
docker compose logs -f caddy
docker compose ps
```

5. Open firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Updating

```bash
git pull
docker compose up -d --build
docker compose restart searxng
```

---

Configuration

Frontend

Settings are stored in localStorage.

Key Description
rs_theme Light, dark, or system
rs_reduced_motion Minimize non-essential animations
rs_safe_search Safe-search preference
rs_suggestions Enable autocomplete suggestions
rs_save_history Store recent searches locally
rs_language Preferred result language
rs_region Preferred region
raiaspace-api-url Backend API base URL (default /api)
rs_bookmarks Locally saved result links
rs_history Up to 50 saved queries

[!NOTE]
Upgrading from v0.1.3 or earlier: the old raiaspace-searxng-url key is migrated automatically and now stores the backend URL.

Backend

Variable Default Description
PORT 3000 Listen port
SEARXNG_URL http://searxng:8080 Base URL of SearXNG (trailing slashes are trimmed)
FRONTEND_ORIGIN http://localhost:3000 Allowed CORS origin (trailing slashes are trimmed)
FETCH_TIMEOUT_MS 15000 Upstream timeout in milliseconds

Reset Local Data

Use Settings to:

· Clear search history
· Remove bookmarks
· Reset the backend URL
· Restore default preferences

You can also clear site data through your browser settings.

---

Keyboard Shortcuts

Action Shortcut
Focus search box Cmd + K / Ctrl + K
Open shortcuts panel Cmd + / / Ctrl + /
Submit search Enter
Insert a new line Shift + Enter
Close modal or drawer Esc
Navigate autocomplete Arrow Up / Arrow Down
Navigate mode tabs Arrow Left / Arrow Right

[!NOTE]
Shortcuts are disabled while focus is inside a text input, select, or another control with native keyboard behavior.

---

Project Structure

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

Troubleshooting

<details>
<summary><b>`docker compose` fails with "Set SEARXNG_SECRET in .env"</b></summary>

<br />

One or more required environment variables are missing. Copy .env.example to .env and fill in every value.

</details>

<details>
<summary><b>Backend not reachable</b></summary>

<br />

The frontend cannot reach /api/search. Check:

```bash
docker compose ps
docker compose logs backend
curl https://search.example.com/health
```

Common causes:

· Backend container is not running
· Reverse proxy is not forwarding /api/*
· Backend URL is misconfigured
· TLS certificate has not been issued yet

</details>

<details>
<summary><b>SearXNG returned 403</b></summary>

<br />

JSON output is not enabled.

1. Make sure json exists under search.formats in settings.yml.
2. Confirm the file is mounted inside the container.
3. Ensure limiter: false is set if needed.
4. Restart SearXNG.

</details>

<details>
<summary><b>SearXNG returned HTML</b></summary>

<br />

This usually means the request hit the wrong endpoint or JSON output is still disabled. Run:

```bash
docker compose exec backend wget -qO- 'http://searxng:8080/search?q=test&format=json' | head -c 100
```

</details>

<details>
<summary><b>Request timed out</b></summary>

<br />

Possible causes:

· One or more SearXNG engines are slow.
· The instance is rate-limiting requests.
· Network instability between backend and SearXNG.

Fix: increase FETCH_TIMEOUT_MS or disable slow engines.

</details>

<details>
<summary><b>Backend works, frontend shows errors</b></summary>

<br />

Check the browser console.

· If it shows http:// on an https:// page, reset the API base URL to /api.
· If it shows a CORS error, FRONTEND_ORIGIN does not match the page origin.

</details>

<details>
<summary><b>Caddy fails to get a certificate</b></summary>

<br />

Common causes:

· DOMAIN_FRONTEND contains a scheme (https://) or trailing slash. It must be a bare domain.
· The domain does not resolve to this server's public IP.
· Ports 80/443 are blocked by the firewall or cloud security group.

</details>

<details>
<summary><b>Voice search does not work</b></summary>

<br />

Voice input depends on the Web Speech API, which is not consistently available across browsers. Use a supported browser, grant microphone permission, and confirm the selected language.

</details>

<details>
<summary><b>Empty results</b></summary>

<br />

Possible causes:

· Query is too specific.
· Safe search is filtering results.
· Relevant engines are disabled.
· The instance is rate-limiting requests.
· The chosen category is empty or unsupported.

Try a simpler query or switch category.

</details>

<details>
<summary><b>Bookmarks or history are missing</b></summary>

<br />

Check whether:

· Browser site data was cleared.
· Private browsing is active.
· Storage is blocked.
· The origin changed.
· A browser extension is clearing local storage.

</details>

---

Privacy

RaiaSpace is a self-hosted, local-first stack.

<table>
<tr>
<td width="50%" valign="top">

What it does not provide

· No hosted backend operated by the project
· No user accounts
· No cloud bookmark database
· No hosted history sync
· No analytics or telemetry

</td>
<td width="50%" valign="top">

Query routing

Search terms go from your browser to your backend, then to your SearXNG instance. RaiaSpace itself does not send your queries to a project-operated server.

</td>
</tr>
</table>

Local storage: Search history, bookmarks, and preferences are stored in browser storage under your RaiaSpace origin. This storage is persistent by default but can be cleared by the browser, the user, private browsing, or extensions.

External requests: RaiaSpace may communicate with:

· Your backend
· Your SearXNG instance
· Remote result URLs when opened
· Browser speech-recognition services, depending on browser support

---

Security Considerations

Backend exposure

The backend is meant to be reachable through HTTPS. Protect it by:

· Restricting FRONTEND_ORIGIN to the exact frontend origin
· Running it behind a reverse proxy with TLS
· Keeping dependencies updated
· Adding rate limiting if the deployment is public

SearXNG exposure

In the reference deployment, SearXNG is not exposed to the public internet. That is the safest default. If you expose it publicly:

· Apply rate limits
· Monitor resource usage
· Keep it updated
· Avoid exposing admin interfaces

Search queries

Search queries may contain sensitive information. Self-hosting gives you control, but upstream search engines can still process requests depending on your SearXNG configuration.

Local storage

[!WARNING]
Local storage is not encrypted. Do not store secrets, credentials, or private tokens there.

Suggested CSP

```text
default-src 'self';
img-src 'self' data: https:;
style-src 'self' 'unsafe-inline';
script-src 'self';
connect-src 'self';
```

Adjust connect-src if the frontend uses a different backend origin.

---

Browser Support

Browser Version Notes
Chrome 90+ Core search; voice depends on platform
Edge 90+ Core search; voice depends on platform
Firefox 88+ Core search; speech recognition may be limited
Safari 15.4+ Core search; speech features vary
iOS Safari Recent Responsive layout; permission restrictions may apply
Android Chrome Recent Responsive layout; microphone and camera permissions may be required

Feature availability depends on browser APIs, device permissions, SearXNG configuration, and the selected search mode.

---

Contributing

Contributions are welcome.

Core principles to preserve:

· No fake or placeholder results.
· No demo mode that hides missing backend data.
· No unnecessary external dependencies.
· No analytics or telemetry.
· No hidden query forwarding.
· No secrets or private instance credentials in source files.
· Keyboard accessibility for interactive elements.
· Clear error states for failed requests.
· Responsive behavior on mobile and desktop.
· Reduced-motion support.

Workflow:

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

[!TIP]
Open an issue first for major architectural changes.

Do not commit:

· .env files with real secrets.
· SearXNG passwords or secret keys.
· API tokens.
· Private instance URLs.
· Personal search history.
· Private bookmarks.
· Generated browser-storage exports.

---

License

RaiaSpace is released under the MIT License.

See the LICENSE file for full license text.

[!NOTE]
The MIT License covers the project code, not content returned by search engines or external websites.

---

Version History

v0.1.5 - Current

<table>
<tr>
<td width="50%" valign="top">

Backend & Deployment

· Dockerfile now uses npm install --omit=dev so image builds work without a lockfile
· Redis removed from the stack (unused with the limiter disabled)
· Backend healthcheck added; Caddy waits for SearXNG and backend to be healthy
· Required .env variables now fail loudly when missing
· SEARXNG_URL / FRONTEND_ORIGIN trailing slashes trimmed automatically

</td>
<td width="50%" valign="top">

Backend API

· site, exclude, exact, and filetype filters are now actually forwarded to SearXNG (translated to query operators)
· page parameter validated (minimum 1)

</td>
</tr>
</table>

v0.1.4

<table>
<tr>
<td width="50%" valign="top">

Backend & Deployment

· Added a backend service (backend/server.js) that proxies SearXNG server-side
· Removed direct browser-to-SearXNG calls
· Eliminated CORS and mixed-content issues
· Added Docker Compose deployment with SearXNG, backend, frontend, and Caddy
· Added automatic HTTPS via Caddy and Let's Encrypt
· Introduced a stable JSON contract between frontend and backend
· Added a health endpoint used by Docker and the frontend
· Added structured backend error responses and status codes

</td>
<td width="50%" valign="top">

Frontend & UX

· Changed settings to store the backend API base URL instead of a SearXNG URL
· Added automatic migration of the legacy raiaspace-searxng-url key
· Added local search history and bookmarks
· Added themes and reduced-motion support
· Added multimodal input controls (voice, image, file, and camera)
· Added keyboard shortcuts and improved responsive behavior
· Added explicit no-demo-results behavior

</td>
</tr>
</table>

---

<div align="center">

Built for focused discovery and self-hosted search.

RaiaSpace v0.1.5

</div>
