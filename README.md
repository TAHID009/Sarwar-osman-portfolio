# Md Sarwar Osman Sagar — Reservation Professional Portfolio

Static portfolio + AeroOps workspace. No build step; deployed on Vercel (also compatible with GitHub Pages).

## Folder structure

```text
/
├── index.html            Home
├── about.html            About
├── experience.html       Career history
├── skills.html           Expertise
├── education.html        Education
├── activities.html       Activities
├── contact.html          Contact
├── aeroops.html          AeroOps workspace (private, sign-in required)
├── favicon.ico           Browser default icon (must stay at root)
├── apple-touch-icon.png  iOS home-screen icon (must stay at root)
├── robots.txt            Search engine rules
├── sitemap.xml           Sitemap
├── vercel.json           Redirects from the old flat file URLs to /assets/
├── README.md
├── CLAUDE.md             Instructions for Claude
└── assets/
    ├── css/style.css     Shared design system
    ├── js/
    │   ├── profile.js    Central editable profile data
    │   ├── app.js        Shared rendering / navigation
    │   └── public-stats.js
    ├── img/              Photos, previews, favicons, social image
    └── docs/             CV (PDF)
```

Pages stay at the top level so their URLs never change. Everything else lives in `assets/`.

## Updating

- Personal information, CV link, numbers: edit `assets/js/profile.js`.
- Site-wide design: edit `assets/css/style.css`.
- Replace the CV by overwriting `assets/docs/Md-Sarwar-Osman-Sagar-CV.pdf` (keep the file name).

## GitHub Pages (optional)

Repository → Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
Note: `vercel.json` is ignored on GitHub Pages; that is harmless.
