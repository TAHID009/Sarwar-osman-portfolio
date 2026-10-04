# Sagar Portfolio — Claude Instructions

## Purpose
This is a static GitHub Pages portfolio for Md Sarwar Osman Sagar, an Air Ticketing & Reservation Professional.

## Project structure
Pages live in the repository root (URLs must not change). Everything else is in `assets/`.

- `index.html`, `about.html`, `experience.html`, `education.html`, `skills.html`, `activities.html`, `contact.html` — portfolio pages
- `aeroops.html` — AeroOps workspace (separate app, see below)
- `assets/css/style.css` — shared design system
- `assets/js/app.js` — shared rendering/navigation logic
- `assets/js/profile.js` — central editable profile data
- `assets/js/public-stats.js` — public stats on the home page
- `assets/img/` — profile photo, workspace photo, AeroOps preview, favicons, `og-image.png`
- `assets/docs/Md-Sarwar-Osman-Sagar-CV.pdf` — CV
- Root-only files: `favicon.ico`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, `vercel.json` (redirects from old flat URLs)

## Editing rules
1. Read this file and the relevant HTML before changing anything.
2. Prefer editing reusable information in `profile.js`.
3. Keep all internal links relative (for example `./assets/css/style.css`, `./assets/js/app.js`, `./about.html`).
4. Preserve GitHub Pages compatibility; no server-side code.
5. Put new files in the matching `assets/` folder; do not create other folders or move pages out of the root unless explicitly requested.
6. Do not invent employers, qualifications, achievements or dates.
7. Preserve responsive/mobile behavior.
8. After every change, verify all HTML pages, CSS, JS, images and CV links.
9. Keep the professional positioning focused on airline reservation, ticketing, GDS, NDC, OTA, fare rules and travel operations.
10. Report which files were changed.

## UI design
- The portfolio uses a single design: `assets/css/style.css`. There is no v1/v2 switch.
- `aeroops.html` is locked to its v2 design (the old switch was removed). It is a separate, large app with its own Firebase sign-in and data; do not edit it as part of portfolio changes.
- New pages need `<link rel="stylesheet" href="./assets/css/style.css">` and `<script src="./assets/js/profile.js"></script><script defer src="./assets/js/app.js"></script>`.
