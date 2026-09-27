# RaiaSpace

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![Application](https://img.shields.io/badge/app-static%20SPA-blue.svg)](#overview)
[![Backend](https://img.shields.io/badge/backend-SearXNG-orange.svg)](#searxng-requirements)
[![Privacy](https://img.shields.io/badge/privacy-local--first-purple.svg)](#privacy)
[![Version](https://img.shields.io/badge/version-0.1.4-blue.svg)](#version-history)

> A private, minimal, and fast search interface powered by your own SearXNG instance.

**RaiaSpace** is a static, client-side search frontend for web, images, video, news, and other search categories supported by SearXNG.

It does **not** generate placeholder or fake results. Every query is sent directly from your browser to the SearXNG instance you configure. If the instance is unavailable, misconfigured, or unable to return JSON, RaiaSpace shows a clear, actionable error — not fabricated data.

<p align="center">
  <a href="#getting-started">
    <img src="https://img.shields.io/badge/Get%20Started-Configure%20SearXNG-3B82F6?style=for-the-badge" alt="Get started with RaiaSpace" />
  </a>
  <a href="#privacy">
    <img src="https://img.shields.io/badge/Privacy-Run%20Your%20Own%20Backend-7C3AED?style=for-the-badge" alt="Privacy information" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [SearXNG Requirements](#searxng-requirements)
- [Getting Started](#getting-started)
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

RaiaSpace is a single-page application built with plain HTML, CSS, and JavaScript.

It requires **no**:

- Frontend build step or framework.
- Database.
- RaiaSpace server.
- Backend application server.

The frontend connects directly to a **SearXNG instance** selected by you.

RaiaSpace is designed for:

- Developers who want a customizable search interface.
- Privacy-conscious users who prefer self-hosted search infrastructure.
- SearXNG administrators who need a lightweight frontend.
- Users who want a responsive search experience without a hosted search account.

### No Demo or Fake Results

RaiaSpace does **not** include:

- Fake search results.
- Placeholder content.
- A “demo mode” that simulates a working backend.

If SearXNG is not configured or reachable:

- No placeholder results are shown.
- The failed request is reported to the user.
- The interface provides troubleshooting guidance where possible.

### Local Data

The following data is stored **locally in your browser** when enabled:

- Search history.
- Bookmarks.
- Theme preference.
- Accessibility preferences.
- Search filters.
- SearXNG instance URL.

This data is **not** sent to any RaiaSpace server — because RaiaSpace does not operate a server-side storage service.

---

## Features

- **Multi-mode search** — Web, AI Answer, Images, Videos, News, Maps, Shopping, Academic, Social, and Files (depending on your SearXNG configuration).
- **Live SearXNG integration** — Real requests to a SearXNG JSON API.
- **No mock data** — No fabricated results when the backend fails.
- **Text search** — Standard text queries.
- **Voice input** — Optional speech recognition via the Web Speech API (where supported).
- **Image input** — Select or upload an image when the workflow supports it.
- **File input** — Select a local file for supported search workflows.
- **Camera input** — Capture an image on devices/browsers that expose camera access.
- **Advanced filters** — Language, region, time range, safe search, file type, domain, exclusion terms (where supported).
- **Search history** — Up to 50 recent queries stored locally.
- **Bookmarks** — Save individual result links locally.
- **Theme support** — Light, dark, and system-preference modes.
- **Reduced motion** — Respects the browser’s reduced-motion preference.
- **Keyboard shortcuts** — Navigate and control the interface without relying only on pointer input.
- **Responsive layout** — Works across mobile, tablet, and desktop.
- **CORS awareness** — Explains common cross-origin request failures.
- **HTTPS awareness** — Detects likely mixed-content configuration problems.
- **No required telemetry** — No analytics, tracking, or RaiaSpace backend needed.

Some features depend on your SearXNG configuration, enabled engines, permissions, and capabilities.

---

## Requirements

RaiaSpace requires:

- A modern web browser.
- JavaScript enabled.
- A running SearXNG instance.
- JSON output enabled on the SearXNG instance.
- CORS configured for the origin where RaiaSpace is served.
- HTTPS-compatible deployment when the frontend is served over HTTPS.

The frontend itself requires **no**:

- Database.
- Backend application server.
- Node.js runtime in production.
- Build tool.
- Package installation.
- RaiaSpace account.

---

## SearXNG Requirements

RaiaSpace communicates with SearXNG through its search API.

SearXNG supports search requests through the `/` and `/search` endpoints. JSON output must be enabled in the instance configuration and requested through the appropriate format parameter. [web:67]

### Enable JSON Output

In your SearXNG `settings.yml`, ensure JSON is included in the search formats:

```yaml
search:
  formats:
    - html
    - json
```

Exact formatting and surrounding configuration may differ by SearXNG version and deployment.

If JSON output is not enabled, requests that ask for JSON may fail or return a `403 Forbidden` response. [web:67]

### API Request Parameters

A typical SearXNG JSON request looks like:

```text
[https://searx.example.com/search?q=example&format=json](https://searx.example.com/search?q=example&format=json)
```

Common parameters include:

| Parameter     | Description                                      |
|---------------|--------------------------------------------------|
| `q`           | Search query                                     |
| `format`      | Output format, such as `json`                    |
| `categories`  | Search categories                                |
| `language`    | Result language                                  |
| `pageno`      | Result page number                               |
| `time_range`  | Time filter such as `day`, `month`, or `year`    |
| `safesearch`  | Safe-search level                                |

Available behavior depends on your SearXNG configuration and enabled engines. [web:67]

### Configure CORS

Your SearXNG server or reverse proxy must allow browser requests from the origin hosting RaiaSpace.

A permissive example:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Access-Control-Max-Age: 86400
```

For a private instance, prefer restricting to the exact RaiaSpace origin instead of using `*`:

```http
Access-Control-Allow-Origin: [https://hajir.is-a.dev/raiaspace](https://hajir.is-a.dev/raiaspace)
```

Do **not** include a trailing slash in the origin value.

### Nginx Example

Add inside the relevant `location` block:

```nginx
add_header Access-Control-Allow-Origin "[https://hajir.is-a.dev/raiaspace](https://hajir.is-a.dev/raiaspace)" always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
add_header Access-Control-Allow-Headers "Content-Type, Accept" always;

if ($request_method = OPTIONS) {
    return 204;
}
```

For local development, you may temporarily use:

```nginx
add_header Access-Control-Allow-Origin "http://localhost:8080" always;
```

### Caddy Example

```caddy
header {
    Access-Control-Allow-Origin "[https://hajir.is-a.dev/raiaspace](https://hajir.is-a.dev/raiaspace)"
    Access-Control-Allow-Methods "GET, OPTIONS"
    Access-Control-Allow-Headers "Content-Type, Accept"
}
```

### CORS Security Note

Using:

```http
Access-Control-Allow-Origin: *
```

allows any website to issue browser requests to your SearXNG instance.

This may be acceptable for a deliberately public search service, but a private or rate-limited instance should restrict the allowed origin and apply appropriate authentication or network controls.

### HTTPS and Mixed Content

If RaiaSpace is served over HTTPS, the configured SearXNG URL should also use HTTPS.

Browsers may block requests from a secure HTTPS page to an insecure HTTP resource as mixed content. Mixed content can expose or modify data in transit, so serving all resources over HTTPS is recommended. [web:74]

---

## Getting Started

### 1. Get the Files

Clone the repository:

```bash
git clone [https://github.com/Haiere/raiaspace.git](https://github.com/Haiere/raiaspace.git)
cd raiaspace
```

Or download manually:

```text
index.html
script.js
style.css
```

Place all files in the same directory.

### 2. Serve the Application

Because RaiaSpace uses `fetch`, browser storage, and cross-origin requests, serve it through HTTP or HTTPS.

Opening `index.html` with `file://` may work for basic layout testing but is not recommended for SearXNG integration.

#### Python

```bash
python3 -m http.server 8080
```

#### Node.js

```bash
npx serve .
```

#### PHP

```bash
php -S localhost:8080
```

Then open:

```text
http://localhost:8080
```

### 3. Configure SearXNG

1. Open RaiaSpace.
2. Click the **Settings** button.
3. Enter the base URL of your SearXNG instance.
4. Save the URL.
5. Click **Test**.
6. Confirm that the instance is reachable and returns valid JSON.
7. Enter a search query and press **Enter**.

Example SearXNG URL:

```text
[https://searx.example.com](https://searx.example.com)
```

Do **not** include `/search` unless the application explicitly requests that path as part of its configuration.

---

## Configuration

Configuration is managed through the **Settings** interface and persisted locally in the browser.

| Setting or Key            | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| `rs_theme`                | Theme preference: `light`, `dark`, or `system`               |
| `rs_reduced_motion`       | Minimize or disable non-essential animations                 |
| `rs_safe_search`          | Safe-search preference (where supported)                     |
| `rs_suggestions`          | Enable or disable autocomplete suggestions                   |
| `rs_save_history`         | Store recent searches locally                                |
| `rs_language`             | Preferred search-result language                             |
| `rs_region`               | Preferred search region                                      |
| `raiaspace-searxng-url`   | Configured SearXNG base URL                                  |
| `rs_bookmarks`            | Locally saved result links                                   |
| `rs_history`              | Up to 50 locally saved search queries                        |

### Reset Local Data

Use the relevant Settings controls to:

- Clear all search history.
- Remove bookmarks.
- Reset the SearXNG URL.
- Restore default preferences.

You can also clear RaiaSpace site data through your browser’s privacy or storage settings.

---

## Keyboard Shortcuts

| Action                        | Shortcut                  |
|-------------------------------|---------------------------|
| Focus search box              | `⌘K` / `Ctrl+K`           |
| Open shortcuts panel          | `⌘/` / `Ctrl+/`           |
| Submit search                 | `Enter`                   |
| Insert a new line in the query| `Shift+Enter`             |
| Close modal or drawer         | `Esc`                     |
| Navigate autocomplete         | `Arrow Up` / `Arrow Down` |
| Navigate mode tabs            | `Arrow Left` / `Arrow Right` |

Shortcuts may be ignored while focus is inside a text input, select element, or another control where the keystroke has a native meaning.

---

## Project Structure

```text
raiaspace/
├── index.html    # Markup, dialogs, drawers, and static layout
├── script.js     # Application state, SearXNG client, and UI logic
├── style.css     # Design tokens, layout, themes, and components
├── README.md     # Project documentation
└── LICENSE       # MIT license
```

RaiaSpace intentionally avoids build tooling and runtime dependencies.

---

## Troubleshooting

### “This SearXNG Instance Did Not Return JSON”

The instance may not have JSON output enabled.

Check your SearXNG configuration:

```yaml
search:
  formats:
    - html
    - json
```

Restart or reload SearXNG after changing the configuration, then test the connection again.

### “The SearXNG Instance May Be Blocking Browser Requests”

The browser likely blocked the request because the SearXNG server did not return suitable CORS headers.

Check:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- OPTIONS request handling
- The exact origin serving RaiaSpace
- Browser developer-console errors

Alternatively, serve RaiaSpace from the same origin as SearXNG, for example:

```text
[https://searx.example.com/raiaspace/](https://searx.example.com/raiaspace/)
```

Same-origin deployment can avoid cross-origin browser restrictions, but it requires server configuration.

### “The Search Request Took Too Long”

Possible causes:

- The SearXNG instance is offline.
- One or more configured engines are slow.
- The instance is rate-limiting requests.
- The network connection is unstable.
- The frontend timeout is too short.

The default timeout is controlled by the application implementation. If the project exposes a setting such as `SEARXNG_TIMEOUT_MS`, update it carefully and test the user experience.

### HTTPS Page with HTTP Instance

Browsers may block an HTTP SearXNG request from an HTTPS RaiaSpace page because of mixed-content restrictions.

Use:

```text
[https://your-searxng-instance.example](https://your-searxng-instance.example)
```

instead of:

```text
http://your-searxng-instance.example
```

Alternatively, serve both applications over HTTP only in a controlled local-development environment. HTTPS is recommended for real deployments. [web:74]

### Voice Search Does Not Work

Voice input depends on the Web Speech API and browser implementation.

The Web Speech API consists of speech recognition and speech synthesis capabilities, but speech recognition is not available consistently across major browsers. [web:65][web:70]

If voice input is unavailable:

- Use a supported browser.
- Grant microphone permission.
- Check the selected language.
- Confirm that the device has a microphone.
- Type the query manually if recognition is unavailable.

### Empty Results

Possible causes:

- The query is too specific.
- Safe search filtered available results.
- Relevant engines are disabled.
- The SearXNG instance is rate-limiting requests.
- External search engines returned no results.
- The selected category is unsupported or empty.

Try a simpler query, change the category, or review your SearXNG instance configuration.

### Bookmarks or History Are Missing

Check whether:

- Browser site data was cleared.
- Private browsing mode is active.
- Storage access is blocked.
- The site origin changed.
- A browser extension removes local storage.
- The browser profile changed.

---

## Privacy

RaiaSpace is designed as a **local-first** frontend.

### What RaiaSpace Does Not Provide

RaiaSpace does **not** provide:

- A search backend.
- A user account system.
- A cloud bookmark database.
- A hosted search-history service.
- Analytics by default.
- A RaiaSpace server that receives queries.

### Query Routing

Search terms are sent from your browser to the SearXNG instance you configure.

RaiaSpace does **not** route queries through a separate RaiaSpace backend. However, the configured SearXNG server and the external search engines it uses may process or log requests according to their own configuration and policies.

Self-hosting SearXNG gives you greater control, but it does **not** automatically guarantee that upstream engines or server logs retain no information.

### Local Storage

Search history, bookmarks, and preferences are stored in browser storage under the RaiaSpace website origin.

Local storage is persistent by default but can be cleared by the user, browser, private-browsing session, storage policy, or browser extension. [web:62][web:63]

### External Requests

RaiaSpace may communicate with:

- The SearXNG instance you configure.
- Remote result URLs when opened.
- Browser speech-recognition services, depending on browser implementation and configuration.
- Any external resource explicitly included by the deployment.

The frontend should not be described as completely network-free because live search requires communication with SearXNG.

---

## Security Considerations

### CORS

CORS controls which browser origins can read responses from your SearXNG instance.

Restrict `Access-Control-Allow-Origin` to the RaiaSpace origin whenever practical. Avoid permissive wildcard access for private or sensitive deployments.

### SearXNG Exposure

If your SearXNG instance is publicly reachable:

- Apply rate limits.
- Monitor resource usage.
- Keep SearXNG updated.
- Review enabled engines.
- Avoid exposing administrative interfaces.
- Use HTTPS.
- Restrict CORS where possible.
- Consider authentication or network-level access controls for private deployments.

### Search Queries

Search queries may contain personal, confidential, or sensitive information.

Do not assume that a self-hosted frontend means that every upstream search engine receives no query data. Review your SearXNG and engine configuration before entering sensitive queries.

### Local Storage

Local storage is not an encrypted vault.

Do not store secrets, credentials, private tokens, or highly sensitive content in RaiaSpace bookmarks or settings.

### Browser Permissions

Voice, image, file, and camera features may require browser permissions.

Only grant permissions that are necessary for the feature you are using.

### Content Security Policy

When self-hosting RaiaSpace, consider deploying a restrictive Content Security Policy that allows only the resources required by the application.

---

## Browser Support

| Browser        | Version   | Notes                                                                 |
|----------------|----------:|-----------------------------------------------------------------------|
| Chrome         | 90+       | Core search support; voice support depends on browser and platform      |
| Edge           | 90+       | Core search support; voice support depends on browser and platform      |
| Firefox        | 88+       | Core search support; speech-recognition availability may be limited     |
| Safari         | 15.4+     | Core search support; speech features vary by version and platform       |
| iOS Safari     | Recent    | Responsive layout; browser permission restrictions may apply            |
| Android Chrome | Recent    | Responsive layout; microphone and camera permissions may be required    |

Feature availability depends on browser APIs, device permissions, SearXNG configuration, and the selected search category.

---

## Roadmap

Potential future enhancements include:

- Search-result pagination.
- Instance capability detection.
- Configurable request timeout.
- Better result-type filtering.
- More detailed engine-status reporting.
- Optional encrypted local bookmarks.
- Import and export of bookmarks.
- Search-history export.
- PWA installation support.
- Offline shell caching.
- Improved camera and image-search workflows.
- Additional localization.
- Custom result layouts.
- Accessibility audits and automated tests.
- Optional same-origin deployment guide.
- SearXNG preference synchronization.

These features are not necessarily implemented in version `0.1.4`.

---

## Contributing

Contributions are welcome.

Please preserve the core design principles of the project:

- No fake or placeholder search results.
- No demo mode that disguises unavailable backend data.
- No unnecessary external dependencies.
- No analytics, telemetry, or phone-home behavior.
- No hidden query forwarding.
- No secrets or private instance credentials in source files.
- Keyboard accessibility for interactive elements.
- Clear error states for failed SearXNG requests.
- Responsive behavior on mobile and desktop.
- Reduced-motion support.

### Contribution Workflow

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes.
4. Test with a real SearXNG instance.
5. Test with an unavailable or misconfigured instance.
6. Test CORS and HTTPS error states.
7. Test keyboard and screen-reader behavior.
8. Commit your changes:

   ```bash
   git commit -m "Describe your change"
   ```

9. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

10. Open a pull request.

Open an issue first for significant architectural changes.

Do **not** commit:

- SearXNG passwords.
- Private tokens.
- API keys.
- Private instance URLs.
- Personal search history.
- Private bookmarks.
- User data.
- Generated browser-storage exports.

---

## License

RaiaSpace is released under the **MIT License**.

See the [LICENSE](LICENSE) file for the complete license text.

The MIT license covers the project code. It does not grant ownership or redistribution rights for content returned by search engines or external websites.

---

## Support

If RaiaSpace is useful to you, you can support continued development through Buy Me a Coffee.

Support is optional and does not unlock required functionality.

<p align="center">
  <a href="https://buymeacoffee.com/hajirstudio" target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20Development-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
      alt="Buy Me a Coffee"
    />
  </a>
</p>

<p align="center">
  <a href="https://buymeacoffee.com/hajirstudio">
    Support RaiaSpace on Buy Me a Coffee
  </a>
</p>

---

## Version History

### v0.1.4

- Added live SearXNG integration.
- Added local search history and bookmarks.
- Added configurable themes and reduced-motion support.
- Added multimodal input controls.
- Added SearXNG connectivity and CORS guidance.
- Added keyboard shortcuts.
- Improved responsive behavior.
- Added explicit no-demo-results behavior.

---

<p align="center">
  Built for focused discovery and self-hosted search.
</p>

<p align="center">
  <sub>RaiaSpace v0.1.4</sub>
</p>

**Live site:** https://hajir.is-a.dev/raiaspace