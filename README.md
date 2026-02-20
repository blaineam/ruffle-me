# Ruffle My 🪶

> Play your Flash archive anywhere — no plugin required.

**Ruffle My 🪶** is a dead-simple, single-page Flash emulator powered by [Ruffle.rs](https://ruffle.rs). Drop any `.swf` file onto the page and it plays instantly in your modern browser. No setup, no plugins, no nonsense — just pure nostalgic vibes.

🌐 **Live site:** [flash.wemiller.com](https://flash.wemiller.com)

---

## ✨ Features

- **Drag & Drop** — Drop any `.swf` file onto the page to play it instantly
- **Click to Browse** — Prefer a file picker? Click the drop zone
- **Swap on the Fly** — Drop a new file anytime to replace the current one
- **Full-Screen Playback** — The SWF fills your entire browser window
- **CRT Filter** — Toggle retro scanlines for extra nostalgia
- **Reset** — One click to return to the start screen
- **Glassmorphic UI** — Neon synthwave aesthetics with CSS animations
- **Auto-Updates** — CI keeps Ruffle pinned to the latest version weekly

---

## 🚀 Quick Start

### Online

Visit [flash.wemiller.com](https://flash.wemiller.com), drag and drop a `.swf` file — done.

### Docker (local server)

```bash
docker compose up -d
```

Then open [http://localhost:8420](http://localhost:8420)

> Port **8420** — memorable, unique, and ready to roll.

### Just open the file

```bash
open index.html
```

Most browsers will run it directly from the filesystem. If Ruffle's WASM files don't load offline, see below.

---

## 📡 Offline / Self-Hosted Ruffle

By default the page loads Ruffle from the unpkg CDN (requires an internet connection on first visit; browsers may cache it afterwards). For fully air-gapped or offline use:

1. Download the **self-hosted** Ruffle release from [ruffle.rs/#releases](https://ruffle.rs/#releases)
2. Extract the zip into a folder named `ruffle/` next to `index.html`
3. Edit `index.html` and swap the CDN script tag for:

```html
<script src="ruffle/ruffle.js"></script>
```

---

## 📁 Project Structure

```
ruffle-me/
├── index.html                        # The whole app — one file
├── docker-compose.yml                # Serve locally with nginx on port 8420
├── nginx.conf                        # nginx config with COOP/COEP headers
├── CNAME                             # Custom domain (flash.wemiller.com)
├── .nojekyll                         # Tells GitHub Pages to skip Jekyll
└── .github/
    └── workflows/
        ├── pages.yml                 # Auto-deploy to GitHub Pages on push
        └── update-ruffle.yml         # Weekly Ruffle version bump
```

---

## 🤖 CI / Automation

| Workflow | Trigger | What it does |
|---|---|---|
| `pages.yml` | Push to `main` | Deploys to GitHub Pages |
| `update-ruffle.yml` | Every Monday 00:00 UTC | Bumps Ruffle CDN version to latest |

The update workflow:
1. Fetches the latest `@ruffle-rs/ruffle` version from npm
2. Updates the `<script>` tag in `index.html` to pin that version
3. Commits and pushes only if there's an actual change

No human intervention needed — Ruffle stays fresh automatically.

---

## 🌐 GitHub Pages Setup

After pushing to GitHub:

1. Go to **Settings → Pages** in your repo
2. Set **Source** to `GitHub Actions`
3. The `pages.yml` workflow handles the rest on every push to `main`

For the custom domain (`flash.wemiller.com`), add a DNS `CNAME` record pointing to `<your-github-username>.github.io`.

---

## 🎨 Tech Stack

| Layer | Tech |
|---|---|
| Flash emulation | [Ruffle.rs](https://ruffle.rs) (Rust + WASM) |
| UI | Vanilla HTML / CSS / JS — zero dependencies |
| Hosting | GitHub Pages + nginx (Docker) |
| CI | GitHub Actions |

---

## 🕹 How to Use

1. Open the site
2. Drag any `.swf` file onto the glowing drop zone (or click to browse)
3. Watch it come to life
4. Toggle **CRT** for the full retro monitor effect
5. Drop another file anytime — it swaps instantly
6. Hit **Reset** to go back to the start

---

Made with ❤️ and nostalgia. Powered by [Ruffle.rs](https://ruffle.rs).
