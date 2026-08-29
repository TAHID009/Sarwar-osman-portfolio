(function () {
  const el = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Shared identity
  document.querySelectorAll("[data-profile-name]").forEach(n => n.textContent = profile.name);
  document.querySelectorAll("[data-profile-title]").forEach(n => n.textContent = profile.professionalTitle);
  document.querySelectorAll("[data-profile-location]").forEach(n => n.textContent = profile.location);

  // Home
  if (el("heroTitle")) el("heroTitle").innerHTML = `Air Ticketing &<br><span class="gradient">Reservation Professional</span>`;
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

  if (el("experiencePreview")) {
    el("experiencePreview").innerHTML = profile.experience.slice(0,3).map(x=>`
      <article class="job-card">
        <div class="job-date"><span class="timeline-dot"></span>${esc(x.period)}</div>
        <div>
          <h3>${esc(x.role)}</h3>
          <h4>${esc(x.company)} · ${esc(x.location)}</h4>
          <ul>${x.bullets.slice(0,2).map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
        </div>
      </article>`).join("");
  }

  if (el("skillsGrid")) {
    el("skillsGrid").innerHTML = profile.skills.map(([name,cat])=>`
      <div class="skill-card"><strong>${esc(name)}</strong><span>${esc(cat)}</span></div>`).join("");
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

  if (el("activitiesGrid")) {
    el("activitiesGrid").innerHTML = profile.activities.map((x,i)=>`
      <article class="card">
        <div class="card-icon">${String(i+1).padStart(2,"0")}</div>
        <h3>${esc(x[0])}</h3>
        <p>${esc(x[1])}</p>
      </article>`).join("");
  }

  // Contact links
  document.querySelectorAll("[data-email-link]").forEach(a => { a.href = `mailto:${profile.email}`; a.textContent = profile.email; });
  document.querySelectorAll("[data-phone-link]").forEach(a => { a.href = `tel:${profile.phone.replace(/\s+/g,'')}`; a.textContent = profile.phone; });
  document.querySelectorAll("[data-linkedin-link]").forEach(a => { a.href = profile.linkedin; });
  document.querySelectorAll("[data-cv-link]").forEach(a => { a.href = profile.cv; });

  // Mobile nav
  const toggle = el("mobileToggle"), links = el("mobileLinks");
  if (toggle && links) {
    links.innerHTML = `<a href="index.html">Home</a><a href="about.html">About</a><a href="experience.html">Experience</a><a href="education.html">Education</a><a href="skills.html">Expertise</a><a href="activities.html">Activities</a><a href="contact.html">Contact</a>`;
    toggle.addEventListener("click", ()=>links.classList.toggle("open"));
  }

  // Highlight the current page in the nav so it's clear a click registered
  const currentPage = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, #mobileLinks a").forEach(a => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });
})();
