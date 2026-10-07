# Security and snapshot setup (manual steps)

These steps are done in the Firebase console and in Vercel. The code in this branch cannot do them for you.

## 0. Back up first
In AeroOps open Settings > Data & Storage and use "Backup (JSON)" and "Export all activities (CSV)". Also use the export buttons for entries and the Revenue Desk. Keep the files somewhere safe.

## 1. Firestore rules
1. Firebase console > Authentication > Users: copy your own "User UID".
2. Open `firestore.rules`, replace `PUT-YOUR-FIREBASE-UID-HERE` with that UID.
3. Firebase console > Firestore Database > Rules: paste the file, then use the Rules Playground to test:
   - signed out: read `work_record_pwi/x` is denied; read `publicSummary/2026-09` is allowed; list `publicSummary` is denied;
   - signed in as you: read and write the private collections is allowed;
   - signed in as another user: read `work_record_pwi/x` is denied;
   - write `publicSummary/2026-09` with an extra field such as `reference` is denied.
4. Publish the rules. The old `public_stats` collection becomes private; you can delete its `homepage` document.

## 2. Authentication
- Authentication > Settings > User actions: turn OFF "Enable create (sign-up)" once your account exists.
- Delete any user that is not you (Authentication > Users).
- Turn on email enumeration protection if shown.
- Authentication > Settings > Authorized domains: keep only `sarwar-osman.vercel.app` and your Firebase domains (remove `localhost` and anything unknown).
- Password policy and multi-factor sign-in: turn on if your plan offers them (they may need the Identity Platform upgrade).
- App Check: Firebase console > App Check > register the web app with reCAPTCHA, test, then enforce for Firestore and Authentication.

## 3. Headers
`vercel.json` sends the security headers. The Content-Security-Policy is in **Report-Only** mode first. Open the site and AeroOps, sign in, use every tab, and watch the browser console (F12). If no "Content Security Policy" violations appear, change the key `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `vercel.json`.

## 4. Publishing the snapshot
AeroOps > Settings > Public snapshot > Preview & publish. Nothing is published automatically. The website section appears only after a document exists. Use `?demo` on the home page URL to see the design with sample numbers.
