// Every project's "demo" is a real artifact: a screenshot of the actual app/prototype,
// or a chart built directly from the exact numbers published in that repo's README.
// The one exception (Deep Generative Models) has no saved output, so its demo is an
// architecture diagram, labeled as such rather than as results.

const ARCH_SVG = `
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" class="arch-svg">
  <style>
    .box { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }
    .lbl { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: var(--ink); }
    .arrow { stroke: var(--accent); stroke-width: 2; marker-end: url(#arrowhead); fill: none; }
    .cap { font-family: 'Inter', sans-serif; font-size: 10.5px; fill: var(--muted); }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
    </marker>
  </defs>
  <rect x="10" y="60" width="100" height="56" rx="8" class="box"/>
  <text x="60" y="92" text-anchor="middle" class="lbl">Image</text>
  <text x="60" y="130" text-anchor="middle" class="cap">CIFAR-10 /</text>
  <text x="60" y="142" text-anchor="middle" class="cap">Tiny ImageNet</text>

  <path d="M118 88 H165" class="arrow"/>

  <rect x="170" y="52" width="120" height="72" rx="8" class="box"/>
  <text x="230" y="84" text-anchor="middle" class="lbl">Encoder</text>
  <text x="230" y="100" text-anchor="middle" class="lbl">(Conv)</text>
  <text x="230" y="140" text-anchor="middle" class="cap">DCAE / VAE</text>

  <path d="M298 88 H345" class="arrow"/>

  <rect x="350" y="60" width="90" height="56" rx="8" class="box"/>
  <text x="395" y="92" text-anchor="middle" class="lbl">Latent z</text>
  <text x="395" y="130" text-anchor="middle" class="cap">PCA / t-SNE</text>
  <text x="395" y="142" text-anchor="middle" class="cap">K-Means (DCAE)</text>

  <path d="M448 88 H495" class="arrow"/>

  <rect x="500" y="52" width="130" height="72" rx="8" class="box"/>
  <text x="565" y="80" text-anchor="middle" class="lbl">Decoder /</text>
  <text x="565" y="96" text-anchor="middle" class="lbl">Generator</text>
  <text x="565" y="140" text-anchor="middle" class="cap">VAE / DCGAN</text>

  <text x="320" y="195" text-anchor="middle" class="cap">Autoencoder reconstructs the input; VAE and DCGAN generate new images from the latent space.</text>
</svg>`;

const PROJECTS = [
  {
    id: "phishing",
    title: "Phishing Website Detection",
    desc: "Classifies phishing vs. legitimate URLs from structural/lexical features alone (no page content). Random Forest reached <strong>78.5% accuracy</strong>; a class-balanced variant traded accuracy for <strong>83% recall</strong> on the phishing class, the metric that matters when missing a phishing site is costlier than a false alarm.",
    tags: ["Python", "scikit-learn", "Random Forest", "SVM"],
    url: "https://github.com/kstc707/phishing-website-detection",
    demo: { type: "image", src: "assets/phishing.png", caption: "Real test-set accuracy for every model I tried — including the recall trade-off." }
  },
  {
    id: "churn",
    title: "Customer Churn Analysis",
    desc: "End-to-end churn modeling on the IBM Telco dataset (~7,000 customers). Random Forest achieved <strong>74.8% accuracy / 0.839 ROC AUC</strong>, with both models class-weighted to catch ~78–80% of actual churners rather than optimizing raw accuracy.",
    tags: ["Python", "pandas", "scikit-learn", "EDA"],
    url: "https://github.com/kstc707/customer-churn-analysis",
    demo: { type: "image", src: "assets/churn.png", caption: "Random Forest vs. Logistic Regression, across every metric that mattered." }
  },
  {
    id: "heart",
    title: "Heart Disease Prediction",
    desc: "Compared five classical ML/statistical classifiers on the UCI Heart Disease dataset. LDA led on accuracy (<strong>85.6%</strong>); Logistic Regression hit <strong>90.5% sensitivity</strong> (0.906 AUC) after threshold tuning to prioritize catching true positives.",
    tags: ["R", "LDA/QDA", "Logistic Regression", "glmnet"],
    url: "https://github.com/kstc707/heart-disease-prediction",
    demo: { type: "image", src: "assets/heart.png", caption: "Accuracy and sensitivity, side by side, across all five classifiers." }
  },
  {
    id: "airquality",
    title: "Air Quality Prediction & Clustering",
    desc: "Team project (COMP 7/8150): predicted AQI category across 200+ global cities using 1.2M+ hourly pollutant/weather readings. Tree-based models hit <strong>99.9% accuracy</strong>; unsupervised clustering surfaced distinct pollution regimes.",
    tags: ["Python", "scikit-learn", "Tableau", "Clustering"],
    url: "https://github.com/kstc707/air-quality-prediction",
    demo: { type: "image", src: "assets/aq_model.png", caption: "Test-set metrics across five models — tree-based models essentially learn the AQI formula." }
  },
  {
    id: "sql",
    title: "SQL Sales Analytics",
    desc: "Window-function/CTE analytics on 10,194 Superstore order lines. Found the Pareto split is really <strong>49% of customers → 80% of sales</strong> (not 20/80), and that margin collapses to <strong>-77.4%</strong> at 40%+ discount tiers.",
    tags: ["SQL", "SQLite", "Window Functions", "CTEs"],
    url: "https://github.com/kstc707/sql-sales-analytics",
    demo: { type: "image", src: "assets/sql.png", caption: "What discounting past 20% actually does to profit margin." }
  },
  {
    id: "forecasting",
    title: "Monthly Sales Forecasting",
    desc: "Forecasts Superstore sales 6 months out with honest train/holdout evaluation. Holt-Winters beat a seasonal-naive baseline: <strong>17.0% MAPE vs. 25.9%</strong>.",
    tags: ["Python", "statsmodels", "Time Series"],
    url: "https://github.com/kstc707/sales-forecasting",
    demo: { type: "image", src: "assets/forecast_plot.png", caption: "Six months held out and never seen during fitting — actual vs. both forecasts." }
  },
  {
    id: "dashboard",
    title: "Sales BI Dashboard",
    desc: "Interactive Streamlit + Plotly dashboard with live cross-filters (region/category/date), KPI cards, and drill-down charts over the Superstore dataset — built as a verifiable substitute after Power BI Desktop proved unavailable on macOS.",
    tags: ["Streamlit", "Plotly", "Python"],
    url: "https://github.com/kstc707/sales-bi-dashboard",
    demo: { type: "image", src: "assets/streamlit_dashboard.png", caption: "The actual dashboard, running — not a mockup." }
  },
  {
    id: "abtest",
    title: "A/B Testing Analysis",
    desc: "Full statistical workup of a checkout-flow test: two-proportion z-test, chi-square cross-check, 95% CI, and a power analysis. Found a <strong>+11.1% relative lift (p = 0.00004)</strong> — and that the test was run far larger than the 80%-power minimum required.",
    tags: ["Python", "scipy", "statsmodels", "Hypothesis Testing"],
    url: "https://github.com/kstc707/ab-testing-analysis",
    demo: { type: "image", src: "assets/ab.png", caption: "Control vs. treatment, with the actual lift and significance." }
  },
  {
    id: "cohort",
    title: "Customer Retention / Cohort Analysis",
    desc: "Classic cohort-retention triangle: groups customers by signup month and tracks repeat-purchase rates over time. Built and validated a pipeline showing <strong>42% month-1 retention</strong> decaying to single digits by month 11.",
    tags: ["Python", "pandas", "seaborn"],
    url: "https://github.com/kstc707/customer-retention-cohort-analysis",
    demo: { type: "image", src: "assets/retention_heatmap.png", caption: "Every row is a signup month, every column is months-later. Real decay curve." }
  },
  {
    id: "dataquality",
    title: "Automated Data Quality Pipeline",
    desc: "Rule-based + statistical data-quality gate: null-rate, duplicate, Z-score/IQR outlier, categorical-consistency, business-rule, and date-range checks. Ran against an 8,160-row test set and correctly flagged every injected issue, landing an <strong>84.6% clean-row rate</strong>.",
    tags: ["Python", "pandas", "NumPy", "Data QA"],
    url: "https://github.com/kstc707/data-quality-pipeline",
    demo: { type: "image", src: "assets/dataquality.png", caption: "Every issue the pipeline caught on one run, counted." }
  },
  {
    id: "youtube",
    title: "Content Recommendation Algorithm Diagnosis",
    desc: "Investigated the complaint that recommendations \"feel repetitive\" using ~3,000 video records. Found <strong>Music alone captures 59.2% of total views</strong> while showing lower engagement/retention than niche categories — a scale-over-quality bias — and proposed a concrete A/B test to fix it.",
    tags: ["Excel", "Pivot Analysis", "A/B Test Design"],
    url: "https://github.com/kstc707/youtube-recommendation-analysis",
    demo: { type: "image", src: "assets/youtube.png", caption: "Where the views actually go." }
  },
  {
    id: "deeplearning",
    title: "Deep Generative Models (DCAE / VAE / DCGAN)",
    desc: "Implemented and evaluated three deep generative/representation-learning architectures in PyTorch on CIFAR-10 and Tiny ImageNet-200: a convolutional autoencoder with PCA/K-Means/t-SNE cluster analysis, a convolutional VAE, and a DCGAN.",
    tags: ["PyTorch", "Deep Learning", "CNNs"],
    url: "https://github.com/kstc707/deep-learning-image-generation",
    demo: { type: "svg", svg: ARCH_SVG, caption: "No saved benchmark numbers for this one (the notebooks don't persist outputs) — so here's the actual pipeline instead of a chart I can't back up." }
  },
];

const CASEBENCH = {
  title: "Casebench",
  url: "https://github.com/kstc707/casebench",
  demo: { type: "image", src: "assets/casebench_demo.png", caption: "The real case-study workspace — manager brief on the left, structured submission panel on the right. Not a mockup; this is the running prototype." }
};

function demoMarkup(demo) {
  if (demo.type === "svg") {
    return `<div class="demo-frame demo-frame-svg">${demo.svg}</div><p class="demo-caption">${demo.caption}</p>`;
  }
  return `<div class="demo-frame"><img src="${demo.src}" alt="${demo.caption}" loading="lazy"></div><p class="demo-caption">${demo.caption}</p>`;
}

function openModal(data) {
  const overlay = document.getElementById("modalOverlay");
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <h3 id="modalTitle">${data.title}</h3>
    ${demoMarkup(data.demo)}
    <a href="${data.url}" class="btn btn-primary" target="_blank" rel="noopener">View full repository ↗</a>
  `;
  overlay.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.classList.remove("modal-open");
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p, i) => `
    <button class="project-card reveal" style="--d:${i % 6}" data-project="${p.id}" type="button">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <span class="card-link">Click to see the result →</span>
    </button>
  `).join("");
}

// ---------- Hero "scatter settles into a fitted line" demo ----------
// A small, honest visual metaphor for the hero's own pitch: noisy points,
// a line that actually fits them. Purely decorative — no claimed data.
function renderScatterDemo() {
  const svg = document.getElementById("scatterSvg");
  const card = document.getElementById("scatterCard");
  if (!svg || !card) return;

  const W = 300, H = 170, pad = 26;
  const x1 = pad, y1 = H - pad, x2 = W - pad, y2 = pad + 8;
  const n = 13;
  let circles = "";
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const lineX = x1 + t * (x2 - x1);
    const lineY = y1 + t * (y2 - y1);
    const cx = lineX + (Math.random() - 0.5) * 10;
    const cy = lineY + (Math.random() - 0.5) * 34;
    const dx = (Math.random() - 0.5) * 2 * 95;
    const dy = (Math.random() - 0.5) * 2 * 70;
    circles += `<circle class="pt" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" style="--dx:${dx.toFixed(0)}px;--dy:${dy.toFixed(0)}px;--i:${i}"></circle>`;
  }
  const lineLen = Math.hypot(x2 - x1, y2 - y1).toFixed(0);

  svg.innerHTML = `
    <line class="axis" x1="${pad}" y1="${H - pad}" x2="${W - pad}" y2="${H - pad}"></line>
    <line class="axis" x1="${pad}" y1="${H - pad}" x2="${pad}" y2="${pad}"></line>
    <line class="trend-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
      style="stroke-dasharray:${lineLen}; stroke-dashoffset:${lineLen}"></line>
    ${circles}
  `;

  const settle = () => {
    const line = svg.querySelector(".trend-line");
    card.classList.add("settled");
    if (line) line.style.strokeDashoffset = "0";
  };
  const reset = () => {
    const line = svg.querySelector(".trend-line");
    card.classList.remove("settled");
    if (line) line.style.strokeDashoffset = String(lineLen);
  };

  setTimeout(settle, 500);
  card.addEventListener("click", () => {
    reset();
    void card.offsetWidth; // force reflow so the re-settle transitions again
    setTimeout(settle, 60);
  });
}

// ---------- Scroll-triggered reveal ----------
function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (els.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
}

// ---------- Timeline: career-flow pulse down the rail ----------
function setupTimelineFlow() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  const items = [...timeline.querySelectorAll(".timeline-item")];
  if (items.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => setTimeout(() => item.classList.add("in-view"), i * 140));
        io.unobserve(timeline);
      }
    });
  }, { threshold: 0.15 });
  io.observe(timeline);
}

// ---------- Hero stat counters ----------
function setupCounters() {
  const stats = document.querySelectorAll(".stat-num");
  if (stats.length === 0) return;
  const animate = (el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw);
    if (Number.isNaN(target)) return;
    const isDecimal = raw.includes(".");
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = isDecimal ? (target * eased).toFixed(1) : String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window)) {
    stats.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  stats.forEach(el => io.observe(el));
}

function setupProjectClicks() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if (!card) return;
    const id = card.getAttribute("data-project");
    if (id === "casebench") {
      openModal(CASEBENCH);
      return;
    }
    const proj = PROJECTS.find(p => p.id === id);
    if (proj) openModal(proj);
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function setupNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderScatterDemo();
  setupNav();
  setupProjectClicks();
  setupReveal();
  setupTimelineFlow();
  setupCounters();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
