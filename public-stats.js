// Fills in the "Professional growth, by the numbers" stats on the homepage with
// live counts from the real ticketing log (AeroOps), instead of static text.
//
// How it works: AeroOps writes a small, non-sensitive summary document
// (public_stats/homepage — counts only, never money) to Firestore every time
// its entries change. This script does a PUBLIC, READ-ONLY fetch of that one
// document and swaps the numbers into the page. If the fetch fails, or hasn't
// resolved yet, the "—" fallback already in profile.js stays on screen — never
// a fabricated number.
//
// SETUP (one-time):
// 1) Paste the same firebaseConfig object you use for AeroOps' "Connect Live
//    Cloud Sync" below. These values are meant to be public in a client app —
//    they are not secrets. Security comes from the Firestore rule in step 2,
//    not from hiding this config.
// 2) In the Firebase console → Firestore → Rules, add a rule that lets anyone
//    READ the public_stats collection, but only your signed-in account WRITE
//    to it — for example:
//
//      match /public_stats/{docId} {
//        allow read: if true;
//        allow write: if request.auth != null && request.auth.uid == "YOUR_UID_HERE";
//      }
//
//    (This is the same UID-lock the rest of your Firestore rules should already
//    move to — see the security note in AeroOps' cloud sync settings.)

const PUBLIC_STATS_FIREBASE_CONFIG = {
  // apiKey: "…",
  // authDomain: "…",
  // projectId: "…",
};

// Order must match profile.js's `impact` array exactly:
// 0 = Tickets Issued, 1 = Reissues Handled, 2 = Refunds Processed, 3 = Airlines Worked With
const PUBLIC_STATS_FIELD_ORDER = ['ticketsIssued', 'reissuesHandled', 'refundsProcessed', 'airlinesWorkedWith'];

(function () {
  if (!PUBLIC_STATS_FIREBASE_CONFIG.projectId) return; // not configured yet — leave the "—" fallback as-is

  const s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js';
  s1.onload = () => {
    const s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s2.onload = fetchAndRender;
    s2.onerror = () => {}; // fail silently — fallback numbers stay
    document.head.appendChild(s2);
  };
  s1.onerror = () => {};
  document.head.appendChild(s1);

  function fetchAndRender() {
    try {
      const app = firebase.initializeApp(PUBLIC_STATS_FIREBASE_CONFIG);
      const db = firebase.firestore(app);
      db.collection('public_stats').doc('homepage').get()
        .then((doc) => {
          if (!doc.exists) return;
          const data = doc.data();
          PUBLIC_STATS_FIELD_ORDER.forEach((key, i) => {
            const val = data[key];
            if (val === undefined || val === null) return;
            const el = document.getElementById('impact-value-' + i);
            if (el) el.textContent = Number(val).toLocaleString();
          });
        })
        .catch(() => {}); // fail silently — fallback numbers stay
    } catch (err) {
      // fail silently — fallback numbers stay
    }
  }
})();
