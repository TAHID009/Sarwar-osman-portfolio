# AeroOps Knowledge Hub: setup, testing and deployment

## What changed
Only the existing Knowledge Hub block in `aeroops.html` (the `kh-css`, `kh-css2` and `kh-js` blocks) was modified. All other modules are untouched.
The existing collections are reused (`kh_notes`, `kh_platforms`, `kh_documents`, `kh_settings`). No new database or paid service.

## New note fields (all optional, so old notes keep working)
description, purpose, visibility (`private` | `team`, default private), attachments[] (metadata only: id, name, path, type, size, kind),
createdBy / updatedBy ({uid, name}), platformName / platformCode / platformColor (copied onto the note so shared notes display correctly).
History is stored in the subcollection `kh_notes/{id}/history` (append-only).
Bookmarks on someone else's shared note are stored in `kh_settings/{uid}.bookmarks`.

## Required Firebase setup (nothing here has been deployed by me)
1. Merge `firestore.rules` into your existing Firestore rules. Do NOT replace your whole file.
2. Merge `storage.rules` into your Storage rules.
3. Enable Firebase Storage and make sure your `firebaseConfig` contains `storageBucket`.
4. Optional roles: set a custom claim `role` to `admin` or `manager` with the Admin SDK. Users sign out and in again to pick it up. Without it, every user is a normal user: private notes and self-verification work, team notes are readable, and only the note owner can edit them.
5. Optional: copy `firebase-storage-compat.js` (same version as your other Firebase files) into `./vendor/`. Otherwise it loads from jsDelivr / gstatic on first use.

## Behaviour notes
- Verified vs user-authored: every card and the detail panel show a Verified or "User-authored, not verified" indicator. Command examples are labelled as reference only.
- Attachments: PNG, JPG, WEBP, GIF, PDF, DOCX, XLSX, TXT. Max 10 MB each, 12 per note. Checked in the browser AND in Storage rules. SVG is deliberately not allowed.
- Duplicate creates a private draft and does not copy attachments.
- Delete asks for confirmation, then removes the note, its files and its history (history cleanup works only for the note owner).

## Known limitations
- Notes are loaded with live listeners and paged client-side (24 at a time). Fine for hundreds to low thousands of notes; add server-side `limit()/startAfter()` paging beyond that.
- Image/PDF previews use Firebase download URLs, which are bearer links: anyone who has a copied link can open that file. Storage rules still protect uploads, deletes and SDK reads. For strict per-request enforcement, serve files through a Cloud Function.
- Private notes of other users are never readable by staff.

## Deploy (GitHub + Vercel)
1. `git status`, commit `aeroops.html` (and the rules files) on a branch, and open a PR.
2. Vercel builds a preview from the PR. Open it, sign in, and run the checklist below.
3. Publish the rules with `firebase deploy --only firestore:rules,storage` (or paste them in the console) after reviewing them in the emulator.
4. Merge to main and re-run the checklist on production. Never commit `.env` files or keys.

## Manual test checklist (run on the Vercel preview)
Sign in, open Knowledge Hub, add a note with 2 commands, tags, a PNG, a PDF; reload and confirm they persist; copy each command; bookmark; edit and check Update History; duplicate; archive and restore; delete (confirm dialog); search by command / tag / platform; each filter chip; sort; grid/list; narrow the window to phone width and open a note; sign in as a second user and confirm they cannot see your private note; set a note to Team and confirm they can read but not edit it.

---

# Automatic extraction from PDF / DOCX (Section 11)

Open **More filters > Import Document** (or the empty-state button).

## How it works
1. Choose or drop several PDF/DOCX files. Legacy `.doc` is rejected with an exact message (save as `.docx` first, browsers cannot read it reliably). Files over 30 MB are rejected.
2. Text and structure are read **in the browser**: PDFs via pdf.js (text layer, page numbers, monospace and heading detection), DOCX via mammoth (headings, lists, tables, code-style paragraphs, embedded pictures).
3. Scanned PDF pages (no text layer) are flagged. If you tick **OCR**, the free open-source Tesseract.js engine is loaded on demand from jsDelivr (it also downloads English language data). No paid service is used.
4. Commands are recognised from context (labels like "Command:", monospace/code styling, table Command columns, GDS-style separators), not by "any short uppercase word". Command text is kept exactly as found. Uncertain lines are flagged **Needs Review**, never guessed.
5. Cards are built per section; large command tables are split one card per command. Platform and category are suggested from keywords and can be changed.
6. A review screen shows each card (source file, page/section, commands, explanation, steps, warnings, flags, duplicate suggestions). You can edit, skip, mark flags reviewed, compare duplicates and choose **Keep separate / Merge / Replace / Skip**. Nothing is saved until you click Import.
7. Approved cards go to `kh_notes` (status Extracted from Source or Needs Review, never verified). The original file is stored at `kh/{uid}/src_{docId}/...` and recorded in `kh_documents`; each card keeps `source.documentId/documentName/pageRef` and an **Open original file** button (importer only). Extracted text is only ever displayed as text, never executed.

## What was actually tested (automated, simulated Firestore, real parsers)
- Real **DOCX** (generated with python-docx: headings, code-style paragraphs, numbered lists, a 3-column command table, warnings) parsed with the real mammoth library.
- Real **multi-page text PDF** (generated with reportlab: headings, Courier command lines, numbered steps, warnings) parsed with the real pdf.js 3.11.174.
- A real **image-only (scanned) PDF**: correctly detected as having no text layer and flagged.
- File validation (.doc, .exe), review UI, edit, skip, import, provenance fields, duplicate detection on re-import, compare view, merge (no silent overwrite, merged card reset to Needs Review/unverified), Needs Review flags and "mark reviewed".

## NOT tested (please test on the preview deployment)
- **OCR itself** (Tesseract could not be downloaded in my test environment). The OCR code path and its failure message exist but have never run.
- Real airline/GDS manuals, DOC files, password-protected PDFs, very large files, multi-column PDF layouts.
- Real Firebase Storage upload of the original file, page snapshots and DOCX pictures; PDF page-snapshot rendering (needs a real browser canvas).
- Visual appearance of the import screens.

## Known limitations
- PDFs do not store real spaces, so spacing inside a PDF command is reconstructed from glyph gaps (a single space). Check commands containing multiple spaces.
- Multi-line commands, scanned tables and multi-column layouts are not reliably understood and may need editing.
- PDF headings are detected by larger font size. PDFs with one font size become a single section (split per command if more than 8 commands).
- Platform/category are keyword suggestions. Verification is a manual action by a person; import never verifies.

---

# Free (Spark) plan: Storage off mode
Cloud Storage for Firebase now needs the Blaze plan, so `aeroops.html` ships with `var STORAGE_ON=false;` (top of the Knowledge Hub script). In this mode the upload options are hidden; notes, commands, search, history and PDF/DOCX import all work (text is saved to Firestore, only the original file and images are not kept). If you ever enable Storage, publish `storage.rules` and change that line to `var STORAGE_ON=true;`.
