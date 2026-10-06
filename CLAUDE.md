# Portfolio — Claude Instructions

Static portfolio for Md Sarwar Osman Sagar (Air Ticketing & Reservation Professional), hosted on Vercel at https://sarwar-osman.vercel.app. No server-side code.

## Structure (flat — everything is in the repo root)
- Pages: `index.html`, `about.html`, `experience.html`, `education.html`, `skills.html`, `activities.html`, `contact.html`
- `aeroops.html` — AeroOps workspace (separate Firebase app; do not edit as part of portfolio changes)
- `home.css` (new homepage design plus the shared header and footer used on every portfolio page; keep the header/footer markup identical across pages), `style.css` (base design), `app.js` (rendering/navigation), `profile.js` (editable profile data), `public-stats.js`
- Images: `profile-portrait.jpg`, `workspace.jpg`, `aeroops-preview.webp`, `og-image.png`, `favicon-*.png`, `favicon.ico`, `apple-touch-icon.png`
- `Md-Sarwar-Osman-Sagar-CV.pdf`, `robots.txt`, `sitemap.xml`, `vercel.json`

## Rules
1. Read this file and the relevant HTML before changing anything.
2. Prefer editing reusable information in `profile.js`.
3. Keep internal links relative and flat (for example `./style.css`, `./app.js`, `./about.html`). Do not create an `assets/` folder.
4. Do not invent employers, qualifications, achievements or dates.
5. Preserve responsive/mobile behavior.
6. After every change, verify all HTML pages, CSS, JS, images and CV links resolve.
7. Report which files were changed.
