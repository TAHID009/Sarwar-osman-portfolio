# AeroOps company switching + UI upgrade
Changed: aeroops.html only. Added: firestore.rules (review before publishing). Untouched: vendor/*.
Backup of the original: aeroops_BACKUP_original_2026-10-11.zip
Fixed: `company` was dropped on every Firestore sync (FIELD_ORDER / SALES_FIELD_ORDER / Work Records clean()).
New: Settings > Company & Workspace > Switch Company; stable companyId per workspace; filtered views per workspace;
navy/cyan button system (ao-btn--primary|secondary|success|warning|danger, existing buttons restyled).
Old companies script removed; its localStorage key aeroops_companies_v1 is left in place as a backup.
Caveats: Public snapshot publishes counts for the ACTIVE workspace only; firestore.rules untested.
Not in the original zip (keep your own copies): style.css, profile.js, app.js, vendor/xlsx.full.min.js, vendor/chart.umd.js, favicons.
