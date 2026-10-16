const profile = {
  name: "Md Sarwar Osman Sagar",
  shortName: "Sarwar",
  professionalTitle: "Air Ticketing & Reservation Professional",
  tagline: "GDS • NDC • OTA • Fare Management",
  location: "Chattogram, Bangladesh",
  email: "mdsarwarosman22@gmail.com",
  phone: "+8801642770839",
  linkedin: "https://linkedin.com/in/md-sarwar-osman-sagar-03738a158",
  cv: "./Md-Sarwar-Osman-Sagar-CV.pdf",
  yearsExperience: "3+ Years",
  gdsCount: "3 GDS",
  focus: "Travel Operations",
  // Years of experience shown on the home page. It updates automatically from this start month (YYYY-MM).
  // To type your own value instead (for example "4+ Years"), fill yearsExperienceManual; leave it "" to keep it automatic.
  experienceStart: "2023-06",
  yearsExperienceManual: "",
  summary: "Reservation and ticketing professional focused on accurate air bookings, fare rules, reissue and refund handling, GDS, NDC and OTA workflows, and clear customer communication.",
  about: "I work across airline reservation and ticketing workflows, combining GDS knowledge, fare and policy review, customer communication, and travel operations support. My goal is to make every booking accurate, efficient, and easy for the customer. On the academic side, I hold a BBA in Human Resource Management from Southern University Bangladesh and a Master's in International Business from Wuhan University, China, on a Chinese Government Scholarship.",
  experience: [
    {
      period: "Aug 2026 – Present",
      role: "Air Ticketing & Reservation Executive",
      company: "JF (Bangladesh) Limited – Finlay Travels",
      location: "Chattogram, Bangladesh",
      bullets: [
        "Manage end-to-end airline reservations using GDS, NDC and OTA platforms.",
        "Review fare rules, availability, ticketing conditions and airline policies before confirmation.",
        "Support customers with booking, changes, cancellations, reissue and refund-related requirements.",
        "Maintain accuracy across PNRs, passenger details, ticketing records and customer communication."
      ]
    },
    {
      period: "Nov 2023 – Jul 2026",
      role: "Air Ticketing & Reservation Executive",
      company: "BeFresh PLC",
      location: "Chattogram, Bangladesh",
      bullets: [
        "Oversaw reservation and ticketing operations using GDS, NDC and OTA channels.",
        "Supported customers through booking, documentation, schedule changes and post-ticketing service.",
        "Applied fare rules and airline policies while processing operational requests."
      ]
    },
    {
      period: "May 2022 – Feb 2023",
      role: "Management Trainee Officer",
      company: "Prantik Group",
      location: "Bangladesh",
      bullets: [
        "Supported business and administrative operations while developing professional management skills."
      ]
    },
    {
      period: "Earlier",
      role: "HR Intern Executive",
      company: "MAS Intimates Bangladesh Pvt. Limited",
      location: "Bangladesh",
      bullets: [
        "Supported HR and administrative activities in an organisational environment."
      ]
    }
  ],
  education: [
    {
      degree: "Master’s in International Business",
      institution: "Wuhan University"
    },
    {
      degree: "BBA in Human Resource Management",
      institution: "Southern University Bangladesh"
    }
  ],
  expertise: [
    {title:"Air Ticketing & Reservation", text:"Booking, PNR handling, ticket issuance and post-ticketing support.", tags:["GDS","Ticketing"]},
    {title:"Fare & Policy Review", text:"Fare rules, restrictions, pricing checks and airline policy review.", tags:["Fare Rules","Reissue","Refund"]},
    {title:"NDC & OTA Workflows", text:"Operate across newer airline distribution and OTA booking channels.", tags:["NDC","OTA"]},
    {title:"Customer Service", text:"Customer-focused communication through booking, change, cancellation and service cases.", tags:["Phone","Email","Chat"]},
    {title:"Travel Operations", text:"Maintaining detailed records, coordination, documentation and day-to-day travel support.", tags:["Operations","Documentation"]},
    {title:"Reporting & Business Tools", text:"Microsoft Office and Power BI skills supporting reporting and analysis.", tags:["Excel","Power BI"]}
  ],
  skills: [
    ["Sabre","GDS"],["Galileo","GDS"],["Amadeus","GDS"],["NDC","Distribution"],["OTA Platforms","Distribution"],
    ["Air Ticketing","Core"],["Fare Rules","Core"],["Reissue & Refund","Core"],["Customer Service","Service"],["Microsoft Power BI","Analytics"],["Microsoft Office","Productivity"]
  ],
  activities: [
    ["Student Affairs","Campus photography and student event activities."],
    ["Delegate","Participated as a university conference delegate."],
    ["Volunteering","Assisted with career talks and student guidance activities."],
    ["Event Coordination","Supported execution of an inter-university quiz competition."]
  ],
  expertiseGroups: [
    { title: "Airline Operations", items: ["Ticketing","Reservation","Reissue","Refund","Void","Fare Rules"] },
    { title: "GDS & Distribution", items: ["Sabre","Galileo","Amadeus","NDC","OTA","LCC"] },
    { title: "Business", items: ["Revenue Operations","Agency Support","Corporate Sales","International Business"] },
    { title: "Technology & Analytics", items: ["Power BI","Operational Data","Web Technologies","MS Office"] }
  ],
  researchInterests: ["Aviation","Airfare Pricing","Airline Revenue","Tourism","Hospitality","International Business","Entrepreneurship","Technology in Travel"],
  // Training & Workshops (Experience page). To add one, copy a block below and fill it in.
  // Put the photo in the repo root and point "image" at it. Leave organizer/date/location out if unknown. Newest first.
  // Quote card on the home page (beside Professional Focus). A new quote shows every quoteEveryDays days, in order.
  // Add, edit or remove quotes freely. Leave author "" to show no name. Please double-check any quote you add.
  quoteEveryDays: 1,
  quotes: [
    { text: "Aviation is not just a profession for me. It's a passion for building better systems and smarter solutions.", author: "" },
    { text: "It is possible to fly without motors, but not without knowledge and skill.", author: "Wilbur Wright" },
    { text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
    { text: "The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart" },
    { text: "If we worked on the assumption that what is accepted as true really is true, there would be little hope for advance.", author: "Orville Wright" }
  ],
  workshops: [
    {
      image: "./workshop-verteil.jpg",
      title: "Verteil Travel Agency Workshop",
      organizer: "Verteil Technologies × Saimon Global",
      date: "14 October 2026",
      location: "Hotel Sarina, Dhaka",
      description: "Exclusive agency workshop on Verteil's NDC platform, which connects 85+ global airlines with 22,000+ travel agencies, covering new opportunities for agencies in the Bangladesh market."
    },
    {
      image: "./workshop-china-southern.jpg",
      title: "China Southern Airlines Agency Workshop Program 2026",
      organizer: "China Southern Airlines, Dhaka Office",
      date: "12 October 2026",
      location: "Banani Club Limited, Dhaka",
      description: "Airline agency workshop bringing travel partners together with the sales team to strengthen collaboration and share practical insights on working with the airline."
    }
  ],
  // Live counts, not estimates — pulled straight from the real ticketing log via
  // public-stats.js (reads a small public Firestore summary AeroOps keeps updated
  // whenever entries change). The numbers below are only the fallback shown
  // before that fetch resolves, or if it fails — kept as "—" on purpose so
  // nothing fake is ever shown, live or fallback.
  impact: [
    { value: "—", label: "Tickets Issued", sub: "GDS, NDC and OTA channels" },
    { value: "—", label: "Reissues Handled", sub: "Fare difference & rebooking cases" },
    { value: "—", label: "Refunds Processed", sub: "Airline penalty & tax cases" },
    { value: "—", label: "Airlines Worked With", sub: "Unique carriers ticketed" },
  ],
  impactNote: "Live counts from the ticketing log — updates automatically as new work is recorded."
};

// Automatic years of experience (runs once when the page loads)
(function () {
  const words = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen"];
  const manual = (profile.yearsExperienceManual || "").trim();
  if (manual) {
    const n = parseInt(manual, 10);
    profile.yearsExperience = manual;
    profile.yearsShort = manual.split(" ")[0];
    profile.yearsWords = (words[n] || String(n)) + "-plus";
    return;
  }
  const m = /^(\d{4})-(\d{2})/.exec(profile.experienceStart || "");
  if (!m) return;
  const now = new Date();
  const months = (now.getFullYear() - +m[1]) * 12 + (now.getMonth() + 1 - +m[2]);
  const y = Math.max(0, Math.floor(months / 12));
  profile.yearsShort = y >= 1 ? y + "+" : "<1";
  profile.yearsExperience = y >= 1 ? y + "+ Years" : "Under 1 Year";
  profile.yearsWords = y >= 1 ? (words[y] || String(y)) + "-plus" : "under one";
})();
