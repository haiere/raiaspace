# RaiaSpace

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Static Badge](https://img.shields.io/badge/SPA-client--side-blue.svg)
![Privacy First](https://img.shields.io/badge/privacy-first-purple.svg)

A private, minimal search interface for web, images, video, news, and AI, with optional SearXNG integration.

---

## Overview

RaiaSpace is a client-side search frontend that provides a clean, distraction-free way to search the web. It can operate in two modes:

- **Local Demo** — generates sample results without sending any request.
- **Live SearXNG** — connects to a configured SearXNG instance to fetch real search results.

The app is built as a single-page application using HTML, CSS, and JavaScript, and it runs entirely in the browser. No server-side logic is required. All settings and search history are stored locally, making it suitable for users who value transparency and control over their data.

RaiaSpace is designed for developers who want a customisable search UI, for privacy-conscious users who prefer self-hosted search backends, and for anyone who appreciates a modern, responsive interface.

---

## Features

- Multi-mode search — supports Web, AI Answer, Images, Videos, News, Maps, Shopping, Academic, Social, and Files.
- SearXNG integration — connect to any SearXNG instance that supports JSON output.
- Local demo mode — works out of the box with sample data, no network required.
- Multimodal input — search by text, voice, image upload, file upload, or camera capture.
- Advanced filters — refine results by date, language, region, safe search, file type, domain, and more.
- Search history — stores recent searches locally in the browser.
- Theme support — light, dark, and system-preference modes.
- Keyboard shortcuts — enables fast navigation and interaction.
- Responsive layout — adapts to all screen sizes, from mobile to desktop.
- Bookmarking — save individual results locally.
- Privacy-first — no tracking, no external analytics, and no data sent unless explicitly configured.

---

## Requirements

RaiaSpace is a static web application. It requires:

- A modern web browser with JavaScript enabled.
- Optional: a running SearXNG instance if you want live search results.
- No server, database, or additional runtime is required for the frontend itself.

If you choose to use SearXNG, ensure that the instance:

- Allows JSON output (`format: json` in its configuration).
- Permits cross-origin requests from your frontend origin.

### Example CORS headers

If you control the SearXNG reverse proxy or server, a permissive setup may include headers like:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type