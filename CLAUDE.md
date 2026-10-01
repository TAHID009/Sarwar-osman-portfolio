# Sagar Portfolio — Claude Instructions

## Purpose
This is a static GitHub Pages portfolio for Md Sarwar Osman Sagar, an Air Ticketing & Reservation Professional.

## Project structure
All website files intentionally live in the repository root to minimize GitHub Pages path errors.

- `index.html` — home page
- `about.html` — profile/about
- `experience.html` — career history
- `education.html` — education
- `skills.html` — reservation/GDS/NDC/OTA expertise
- `activities.html` — activities
- `contact.html` — contact
- `style.css` — shared design system
- `app.js` — shared rendering/navigation logic
- `profile.js` — central editable profile data
- `profile-portrait.jpg` — profile image
- `workspace.jpg` — supporting image
- `Md-Sarwar-Osman-Sagar-CV.pdf` — CV

## Editing rules
1. Read this file and the relevant HTML before changing anything.
2. Prefer editing reusable information in `profile.js`.
3. Keep all internal links relative and root-based (for example `./style.css`, `./app.js`).
4. Preserve GitHub Pages compatibility; no server-side code.
5. Do not move files into new folders unless explicitly requested.
6. Do not invent employers, qualifications, achievements or dates.
7. Preserve responsive/mobile behavior.
8. After every change, verify all HTML pages, CSS, JS, images and CV links.
9. Keep the professional positioning focused on airline reservation, ticketing, GDS, NDC, OTA, fare rules and travel operations.
10. Report which files were changed.

## UI versions (v1 / v2)
- v2 = current professional aviation design (default). v1 = previous design, kept intact and restorable.
- `style.css` is the v1 design. `style-v2.css` layers v2 on top and is switched off when v1 is selected (`ui-version.js`).
- AeroOps (`aeroops.html`) uses the same switch and key (`aeroops.ui.version` in localStorage). Design only; data, auth and sync are never touched.
- Hidden switch (not linked anywhere): add `?ui=v1` or `?ui=v2` to a URL once, or press Ctrl+Alt+Shift+U.
- New pages must include `<link rel="stylesheet" href="./style-v2.css" id="ui-v2-css"><script src="./ui-version.js"></script>` right after `style.css`.
