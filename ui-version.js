/* Site-wide UI version switch (portfolio + AeroOps share one key).
   v2 = new professional aviation design (default)   v1 = previous design (kept intact)
   Presentation only: never touches profile data, AeroOps records, auth or cloud sync.
   Hidden switch (not linked anywhere): add ?ui=v1 or ?ui=v2 to any page URL once,
   or press Ctrl+Alt+Shift+U on any page and confirm. */
(function () {
  var KEY = "aeroops.ui.version", v = "v2";
  try {
    var q = new URLSearchParams(location.search).get("ui");
    if (q === "v1" || q === "v2") localStorage.setItem(KEY, q);
    var st = localStorage.getItem(KEY);
    if (st === "v1" || st === "v2") v = st;
  } catch (e) {}
  document.documentElement.setAttribute("data-ui", v);
  window.__aeroUI = v;
  var css = document.getElementById("ui-v2-css");
  if (css) css.media = v === "v1" ? "not all" : "all";
  window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === "U" || e.key === "u")) {
      var n = window.__aeroUI === "v1" ? "v2" : "v1";
      if (confirm("Switch site design to " + n + "? (Design only - your data is not affected)")) {
        try { localStorage.setItem(KEY, n); } catch (x) {}
        location.reload();
      }
    }
  });
})();
