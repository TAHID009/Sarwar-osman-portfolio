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
        <div class="job-date"><span class="timeline-dot"></span>${esc(x.period)}</div>
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
    links.innerHTML = `<a href="index.html">Home</a><a href="about.html">About</a><a href="experience.html">Experience</a><a href="skills.html">Skills</a><a href="education.html">Education</a><a href="activities.html">Activities</a><a href="aeroops.html">AeroOps Desk</a><a href="contact.html">Contact</a>`;
    toggle.addEventListener("click", ()=>links.classList.toggle("open"));
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
