(function () {
  const el = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Shared identity
  document.querySelectorAll("[data-profile-name]").forEach(n => n.textContent = profile.name);
  document.querySelectorAll("[data-profile-shortname]").forEach(n => n.textContent = profile.shortName);
  document.querySelectorAll("[data-profile-title]").forEach(n => n.textContent = profile.professionalTitle);
  document.querySelectorAll("[data-profile-location]").forEach(n => n.textContent = profile.location);

  // Home
  if (el("heroLead")) el("heroLead").textContent = profile.summary;
  if (el("heroYears")) el("heroYears").textContent = profile.yearsExperience;
  if (el("heroGds")) el("heroGds").textContent = profile.gdsCount;
  if (el("heroFocus")) el("heroFocus").textContent = profile.focus;
  if (el("aboutText")) el("aboutText").textContent = profile.about;

  if (el("factName")) el("factName").textContent = profile.name;
  if (el("factEmail")) el("factEmail").textContent = profile.email;
  if (el("factLocation")) el("factLocation").textContent = profile.location;
  if (el("factExp")) el("factExp").textContent = profile.yearsExperience;

  if (el("expertiseGrid")) {
    el("expertiseGrid").innerHTML = profile.expertise.map((x,i)=>`
      <article class="card">
        <div class="card-icon">${String(i+1).padStart(2,"0")}</div>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.text)}</p>
        <div class="pills">${x.tags.map(t=>`<span class="pill">${esc(t)}</span>`).join("")}</div>
      </article>`).join("");
  }

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

  // Skills grouped into meaningful categories (no percentage bars, just clean grouped tags)
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

  if (el("educationGrid")) {
    el("educationGrid").innerHTML = profile.education.map(x=>`
      <article class="edu-card">
        <div class="year">${esc(x.year)}</div>
        <h3>${esc(x.degree)}</h3>
        <p><strong>${esc(x.institution)}</strong> · ${esc(x.location)}</p>
        <p>${esc(x.result)}</p>
        ${x.note ? `<p>${esc(x.note)}</p>` : ""}
      </article>`).join("");
  }

  // Contact links
  document.querySelectorAll("[data-email-link]").forEach(a => { a.href = `mailto:${profile.email}`; a.textContent = profile.email; });
  document.querySelectorAll("[data-phone-link]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; a.textContent = profile.phone; });
  document.querySelectorAll("[data-linkedin-link]").forEach(a => { a.href = profile.linkedin; });
  document.querySelectorAll("[data-cv-link]").forEach(a => { a.href = profile.cv; });
  document.querySelectorAll("[data-email-icon]").forEach(a => { a.href = `mailto:${profile.email}`; a.title = profile.email; });
  document.querySelectorAll("[data-phone-icon]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; a.title = profile.phone; });
  // Rich contact cards: set href on the card, set text only on the inner label (keeps icon/markup intact)
  document.querySelectorAll("[data-email-card]").forEach(a => { a.href = `mailto:${profile.email}`; });
  document.querySelectorAll("[data-phone-card]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; });
  document.querySelectorAll("[data-email-text]").forEach(n => { n.textContent = profile.email; });
  document.querySelectorAll("[data-phone-text]").forEach(n => { n.textContent = profile.phone; });

  // Mobile nav — anchor links to sections on the single-page site
  const toggle = el("mobileToggle"), links = el("mobileLinks");
  if (toggle && links) {
    links.innerHTML = `<a href="#home">Home</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#contact">Contact</a>`;
    toggle.addEventListener("click", ()=>links.classList.toggle("open"));
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", ()=>links.classList.remove("open")));
  }

  // Scroll-spy: highlight whichever section is currently in view
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], #mobileLinks a[href^="#"]');
  const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }
})();
