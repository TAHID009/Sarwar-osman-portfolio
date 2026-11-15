(function () {
  const el = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Shared identity
  document.querySelectorAll("[data-profile-name]").forEach(n => n.textContent = profile.name);
  document.querySelectorAll("[data-profile-shortname]").forEach(n => n.textContent = profile.shortName);
  document.querySelectorAll("[data-profile-title]").forEach(n => n.textContent = profile.professionalTitle);
  document.querySelectorAll("[data-profile-location]").forEach(n => n.textContent = profile.location);

  // Home hero
  if (el("heroLead")) el("heroLead").textContent = profile.summary;
  if (el("heroYears")) el("heroYears").textContent = profile.yearsExperience;
  if (el("heroGds")) el("heroGds").textContent = profile.gdsCount;
  if (el("heroFocus")) el("heroFocus").textContent = profile.focus;

  // Home About teaser (text only, no photo — full photo lives on About page)
  if (el("aboutTeaser")) {
    const short = profile.about.split(". ").slice(0, 2).join(". ") + ".";
    el("aboutTeaser").textContent = short;
  }
  // Home experience teaser (most recent role only)
  if (el("experienceTeaser") && profile.experience[0]) {
    const latest = profile.experience[0];
    el("experienceTeaser").textContent = `Currently ${latest.role} at ${latest.company}, with ${profile.yearsExperience.toLowerCase()} across reservation, ticketing and travel operations.`;
  }

  // Home performance impact strip
  if (el("impactGrid") && profile.impact) {
    el("impactGrid").innerHTML = profile.impact.map((x,i)=>`
      <div class="impact-stat">
        <div class="impact-value" id="impact-value-${i}">${esc(x.value)}</div>
        <div class="impact-label">${esc(x.label)}</div>
        <div class="impact-sub">${esc(x.sub)}</div>
      </div>`).join("");
  }
  if (el("impactNote") && profile.impactNote) el("impactNote").textContent = profile.impactNote;

  // About page
  if (el("aboutText")) el("aboutText").textContent = profile.about;
  if (el("factName")) el("factName").textContent = profile.name;
  if (el("factEmail")) el("factEmail").textContent = profile.email;
  if (el("factLocation")) el("factLocation").textContent = profile.location;
  if (el("factExp")) el("factExp").textContent = profile.yearsExperience;

  // Expertise cards (Home performance visualization + Skills page)
  if (el("expertiseGrid")) {
    el("expertiseGrid").innerHTML = profile.expertise.map((x,i)=>`
      <article class="card">
        <div class="card-icon">${String(i+1).padStart(2,"0")}</div>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.text)}</p>
        <div class="pills">${x.tags.map(t=>`<span class="pill">${esc(t)}</span>`).join("")}</div>
      </article>`).join("");
  }

  // Full experience timeline (Experience page)
  if (el("experienceFull")) {
    el("experienceFull").innerHTML = profile.experience.map(x=>`
      <article class="job-card">
        ${x.period ? `<div class="job-date"><span class="timeline-dot"></span>${esc(x.period)}</div>` : `<div class="job-date"></div>`}
        <div>
          <h3>${esc(x.role)}</h3>
          <h4>${esc(x.company)} · ${esc(x.location)}</h4>
          <ul>${x.bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
        </div>
      </article>`).join("");
  }

  // Skills grouped into meaningful categories (no percentage bars)
  if (el("skillGroups")) {
    const catMap = { "GDS":"Systems", "Distribution":"Systems", "Core":"Aviation & Reservation", "Service":"Aviation & Reservation", "Analytics":"Business & Technology", "Productivity":"Business & Technology" };
    const groups = { "Aviation & Reservation": [], "Systems": [], "Business & Technology": [] };
    profile.skills.forEach(([name, cat]) => {
      const group = catMap[cat] || "Aviation & Reservation";
      groups[group].push(name);
    });
    el("skillGroups").innerHTML = Object.entries(groups).map(([group, items]) => `
      <div class="skill-group">
        <h4>${esc(group)}</h4>
        <div class="tag-row">${items.map(i=>`<span class="pill">${esc(i)}</span>`).join("")}</div>
      </div>`).join("");
  }

  // Education
  if (el("educationGrid")) {
    el("educationGrid").innerHTML = profile.education.map(x=>`
      <article class="edu-card">
        <h3>${esc(x.degree)}</h3>
        <p><strong>${esc(x.institution)}</strong></p>
      </article>`).join("");
  }

  // Activities
  if (el("activitiesGrid")) {
    el("activitiesGrid").innerHTML = profile.activities.map((x,i)=>`
      <article class="card">
        <div class="card-icon">${String(i+1).padStart(2,"0")}</div>
        <h3>${esc(x[0])}</h3>
        <p>${esc(x[1])}</p>
      </article>`).join("");
  }

  // Hero statement (v2) — same summary text as the v1 hero
  document.querySelectorAll("[data-profile-summary]").forEach(n => n.textContent = profile.summary);

  // Home: career timeline (v2) — most recent roles, first line of detail each
  if (el("homeTimeline")) {
    el("homeTimeline").innerHTML = profile.experience.map(x => `
      <li class="tl-item">
        <div class="tl-when">${esc(x.period || "")}</div>
        <div class="tl-body">
          <h3>${esc(x.role)}</h3>
          <p class="tl-org">${esc(x.company)} · ${esc(x.location)}</p>
          ${x.bullets && x.bullets[0] ? `<p class="tl-note">${esc(x.bullets[0])}</p>` : ""}
        </div>
      </li>`).join("");
  }

  // Home: grouped expertise (v2) — grouped lists, no scores
  if (el("expertiseGroups") && profile.expertiseGroups) {
    el("expertiseGroups").innerHTML = profile.expertiseGroups.map(g => `
      <div class="xp-group">
        <h3>${esc(g.title)}</h3>
        <ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>`).join("");
  }

  // Home: research interests (v2)
  if (el("researchList") && profile.researchInterests) {
    el("researchList").innerHTML = profile.researchInterests.map(i => `<li>${esc(i)}</li>`).join("");
  }

  // Home: education timeline (v2)
  if (el("eduTimeline")) {
    el("eduTimeline").innerHTML = profile.education.map(x => `
      <li class="tl-item">
        <div class="tl-body">
          <h3>${esc(x.degree)}</h3>
          <p class="tl-org">${esc(x.institution)}</p>
        </div>
      </li>`).join("");
  }

  // Years of experience (automatic from profile.experienceStart, or profile.yearsExperienceManual)
  document.querySelectorAll("[data-exp-years]").forEach(n => { if (profile.yearsExperience) n.textContent = profile.yearsExperience; });
  document.querySelectorAll("[data-exp-short]").forEach(n => { if (profile.yearsShort) n.textContent = profile.yearsShort; });
  document.querySelectorAll("[data-exp-words]").forEach(n => { if (profile.yearsWords) n.textContent = profile.yearsWords; });

  // Training & Workshops (Home page) — data lives in profile.workshops
  // Each workshop has "image" (one photo) or "images" (several, first = cover). Clicking a photo opens the viewer.
  const wsPhotos = (w) => (Array.isArray(w.images) && w.images.length ? w.images : (w.image ? [w.image] : []));
  if (el("homeTrainingGrid") && profile.workshops) {
    el("homeTrainingGrid").innerHTML = profile.workshops.map((w, i) => {
      const photos = wsPhotos(w);
      const cover = photos[0] ? `<img class="h-train-img" src="${esc(photos[0])}" alt="${esc(w.title)}" loading="lazy">` : "";
      const media = photos.length
        ? `<button type="button" class="h-train-media" data-ws="${i}" aria-label="View ${photos.length > 1 ? photos.length + " photos" : "photo"}: ${esc(w.title)}">${cover}<span class="h-train-zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8v6M8 11h6"/></svg></span>${photos.length > 1 ? `<span class="h-train-count" aria-hidden="true">${photos.length} photos</span>` : ""}</button>`
        : "";
      return `
      <article class="h-train-card">
        ${media}
        <div class="h-train-body">
          <div class="h-train-meta">${w.date ? `<span class="h-train-chip">${esc(w.date)}</span>` : ""}${w.location ? `<span class="h-train-chip">${esc(w.location)}</span>` : ""}</div>
          <h3>${esc(w.title)}</h3>
          ${w.organizer ? `<p class="h-train-org">${esc(w.organizer)}</p>` : ""}
          <p class="h-train-desc">${esc(w.description || "")}</p>
        </div>
      </article>`;
    }).join("");

    // Photo viewer (lightbox): click a photo, then use the arrows / swipe / keyboard. Esc, the X, or a click outside closes it.
    let lb = null, lbItems = [], lbIdx = 0, lbTitle = "", lbMeta = "", lbOpener = null, lbTouchX = null;
    const lbBuild = () => {
      lb = document.createElement("div");
      lb.className = "h-lb"; lb.hidden = true;
      lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
      lb.innerHTML = `
        <button type="button" class="h-lb-x" aria-label="Close photo viewer">&times;</button>
        <button type="button" class="h-lb-nav h-lb-prev" aria-label="Previous photo">&#8249;</button>
        <figure class="h-lb-fig"><img class="h-lb-img" alt=""><figcaption class="h-lb-cap"><strong></strong><span></span></figcaption></figure>
        <button type="button" class="h-lb-nav h-lb-next" aria-label="Next photo">&#8250;</button>`;
      document.body.appendChild(lb);
      lb.addEventListener("click", (ev) => {
        if (ev.target.closest(".h-lb-x") || ev.target === lb || ev.target.classList.contains("h-lb-fig")) lbClose();
        else if (ev.target.closest(".h-lb-prev")) lbShow(lbIdx - 1);
        else if (ev.target.closest(".h-lb-next")) lbShow(lbIdx + 1);
      });
      lb.addEventListener("touchstart", (ev) => { lbTouchX = ev.touches[0].clientX; }, { passive: true });
      lb.addEventListener("touchend", (ev) => {
        if (lbTouchX === null) return;
        const dx = ev.changedTouches[0].clientX - lbTouchX; lbTouchX = null;
        if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
      });
    };
    const lbShow = (n) => {
      if (!lbItems.length) return;
      lbIdx = (n + lbItems.length) % lbItems.length;
      const img = lb.querySelector(".h-lb-img");
      img.src = lbItems[lbIdx];
      img.alt = lbTitle + (lbItems.length > 1 ? " — photo " + (lbIdx + 1) + " of " + lbItems.length : "");
      lb.querySelector(".h-lb-cap strong").textContent = lbTitle;
      lb.querySelector(".h-lb-cap span").textContent = [lbMeta, lbItems.length > 1 ? (lbIdx + 1) + " / " + lbItems.length : ""].filter(Boolean).join("  ·  ");
      lb.classList.toggle("h-lb-single", lbItems.length < 2);
    };
    const lbOpen = (w, opener) => {
      if (!lb) lbBuild();
      lbItems = wsPhotos(w); lbTitle = w.title || ""; lbMeta = [w.date, w.location].filter(Boolean).join(" · "); lbOpener = opener;
      lbShow(0);
      lb.hidden = false; document.documentElement.classList.add("h-lb-open");
      lb.querySelector(".h-lb-x").focus();
    };
    const lbClose = () => {
      if (!lb || lb.hidden) return;
      lb.hidden = true; document.documentElement.classList.remove("h-lb-open");
      lb.querySelector(".h-lb-img").removeAttribute("src");
      if (lbOpener && lbOpener.focus) lbOpener.focus();
    };
    el("homeTrainingGrid").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-ws]");
      if (b && profile.workshops[+b.dataset.ws]) lbOpen(profile.workshops[+b.dataset.ws], b);
    });
    document.addEventListener("keydown", (ev) => {
      if (!lb || lb.hidden) return;
      if (ev.key === "Escape") lbClose();
      else if (ev.key === "ArrowLeft") lbShow(lbIdx - 1);
      else if (ev.key === "ArrowRight") lbShow(lbIdx + 1);
      else if (ev.key === "Tab") { // keep keyboard focus inside the viewer
        const f = [...lb.querySelectorAll("button")].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
    });
  }

  // Quote card (Home page) — rotates through profile.quotes every profile.quoteEveryDays days
  if (el("dailyQuote") && Array.isArray(profile.quotes) && profile.quotes.length) {
    const now = new Date();
    const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    const step = Math.max(1, profile.quoteEveryDays || 1);
    const q = profile.quotes[Math.floor(dayNumber / step) % profile.quotes.length];
    el("dailyQuote").textContent = q.text;
    if (el("dailyQuoteBy")) {
      el("dailyQuoteBy").textContent = q.author ? "— " + q.author : "";
      el("dailyQuoteBy").hidden = !q.author;
    }
  }

  // Contact links (footer + simple text links)
  document.querySelectorAll("[data-email-link]").forEach(a => { a.href = `mailto:${profile.email}`; a.textContent = profile.email; });
  document.querySelectorAll("[data-phone-link]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; a.textContent = profile.phone; });
  document.querySelectorAll("[data-linkedin-link]").forEach(a => { a.href = profile.linkedin; });
  document.querySelectorAll("[data-cv-link]").forEach(a => { a.href = profile.cv; });
  // Icon-only variants: set the link but keep the symbol as visible text
  document.querySelectorAll("[data-email-icon]").forEach(a => { a.href = `mailto:${profile.email}`; a.title = profile.email; });
  document.querySelectorAll("[data-phone-icon]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; a.title = profile.phone; });
  // Rich contact cards: set href on the card, set text only on the inner label (keeps icon/markup intact)
  document.querySelectorAll("[data-email-card]").forEach(a => { a.href = `mailto:${profile.email}`; });
  document.querySelectorAll("[data-phone-card]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; });
  document.querySelectorAll("[data-email-text]").forEach(n => { n.textContent = profile.email; });
  document.querySelectorAll("[data-phone-text]").forEach(n => { n.textContent = profile.phone; });

  // Mobile nav — multi-page links
  const toggle = el("mobileToggle"), links = el("mobileLinks");
  if (toggle && links) {
    links.innerHTML = `<a href="index.html">Home</a><a href="about.html">About</a><a href="experience.html">Experience</a><a href="skills.html">Skills</a><a class="v2-only" href="index.html#projects">Projects</a><a class="v2-only" href="index.html#research">Research</a><a href="education.html">Education</a><a href="activities.html">Activities</a><a href="aeroops.html">AeroOps Desk</a><a href="contact.html">Contact</a>`;
    // The header is sticky and can be anywhere relative to the document depending
    // on scroll, but #mobileLinks is a normal sibling below it in the page flow.
    // Without this, opening the menu while scrolled down places it back up at the
    // header's original (unstuck) spot in the document instead of under the header
    // the user can actually see, so it looks like nothing happened until they
    // scroll back to the top. Pinning it to the viewport and recalculating its
    // position from the header's live bounding box every time it opens (and on
    // resize) keeps it directly under the visible header no matter where the
    // user has scrolled to.
    function positionMobileMenu() {
      const headerBox = document.querySelector(".header");
      if (headerBox) links.style.top = (headerBox.getBoundingClientRect().bottom + 8) + "px";
    }
    toggle.addEventListener("click", () => {
      const opening = !links.classList.contains("open");
      if (opening) positionMobileMenu();
      links.classList.toggle("open");
    });
    window.addEventListener("resize", () => { if (links.classList.contains("open")) positionMobileMenu(); });
  }

  // AeroOps Desk nav label — shows "Login" until unlocked on this device/tab, then "AeroOps Desk"
  function refreshAeroNavLabel() {
    const unlocked = sessionStorage.getItem("aeroUnlocked") === "1";
    document.querySelectorAll('a[href="aeroops.html"]').forEach(a => {
      a.textContent = unlocked ? "AeroOps Desk" : "Login";
    });
  }
  window.refreshAeroNavLabel = refreshAeroNavLabel;
  refreshAeroNavLabel();

  // Make the Login link open the sign-in screen instantly: aeroops.html is a very large page, so the browser
  // keeps showing the current page until it has downloaded and parsed it. Warm it up ahead of the click.
  // (Prerender on hover/press where supported; plain prefetch elsewhere.) Skipped on the AeroOps page itself.
  if (!/aeroops\.html$/.test(location.pathname)) {
    try {
      if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
        const sr = document.createElement("script");
        sr.type = "speculationrules";
        sr.textContent = JSON.stringify({
          prefetch: [{ urls: ["aeroops.html"], eagerness: "eager" }],
          prerender: [{ urls: ["aeroops.html"], eagerness: "moderate" }]
        });
        document.head.appendChild(sr);
      } else {
        const l = document.createElement("link");
        l.rel = "prefetch"; l.href = "aeroops.html"; l.as = "document";
        document.head.appendChild(l);
      }
    } catch (e) {}
  }

  // Highlight the current page in the nav
  const currentPage = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, #mobileLinks a").forEach(a => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });

  // Sticky header: subtle shadow once the page is scrolled
  const headerEl = document.querySelector(".header");
  if (headerEl) {
    const toggleScrolled = () => headerEl.classList.toggle("scrolled", window.scrollY > 8);
    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
  }
})();
