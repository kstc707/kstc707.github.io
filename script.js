// Project data — every figure here is copied verbatim from each repo's README.
const PROJECTS = [
  {
    title: "Phishing Website Detection",
    desc: "Classifies phishing vs. legitimate URLs from structural/lexical features alone (no page content). Random Forest reached <strong>78.5% accuracy</strong>; a class-balanced variant traded accuracy for <strong>83% recall</strong> on the phishing class, the metric that matters when missing a phishing site is costlier than a false alarm.",
    tags: ["Python", "scikit-learn", "Random Forest", "SVM"],
    url: "https://github.com/kstc707/phishing-website-detection"
  },
  {
    title: "Customer Churn Analysis",
    desc: "End-to-end churn modeling on the IBM Telco dataset (~7,000 customers). Random Forest achieved <strong>74.8% accuracy / 0.839 ROC AUC</strong>, with both models class-weighted to catch ~78–80% of actual churners rather than optimizing raw accuracy.",
    tags: ["Python", "pandas", "scikit-learn", "EDA"],
    url: "https://github.com/kstc707/customer-churn-analysis"
  },
  {
    title: "Heart Disease Prediction",
    desc: "Compared five classical ML/statistical classifiers on the UCI Heart Disease dataset. LDA led on accuracy (<strong>85.6%</strong>); Logistic Regression hit <strong>90.5% sensitivity</strong> (0.906 AUC) after threshold tuning to prioritize catching true positives.",
    tags: ["R", "LDA/QDA", "Logistic Regression", "glmnet"],
    url: "https://github.com/kstc707/heart-disease-prediction"
  },
  {
    title: "Air Quality Prediction & Clustering",
    desc: "Team project (COMP 7/8150): predicted AQI category across 200+ global cities using 1.2M+ hourly pollutant/weather readings. Tree-based models hit <strong>99.9% accuracy</strong>; unsupervised clustering surfaced distinct pollution regimes.",
    tags: ["Python", "scikit-learn", "Tableau", "Clustering"],
    url: "https://github.com/kstc707/air-quality-prediction"
  },
  {
    title: "SQL Sales Analytics",
    desc: "Window-function/CTE analytics on 10,194 Superstore order lines. Found the Pareto split is really <strong>49% of customers → 80% of sales</strong> (not 20/80), and that margin collapses to <strong>-77.4%</strong> at 40%+ discount tiers.",
    tags: ["SQL", "SQLite", "Window Functions", "CTEs"],
    url: "https://github.com/kstc707/sql-sales-analytics"
  },
  {
    title: "Monthly Sales Forecasting",
    desc: "Forecasts Superstore sales 6 months out with honest train/holdout evaluation. Holt-Winters beat a seasonal-naive baseline: <strong>17.0% MAPE vs. 25.9%</strong>.",
    tags: ["Python", "statsmodels", "Time Series"],
    url: "https://github.com/kstc707/sales-forecasting"
  },
  {
    title: "Sales BI Dashboard",
    desc: "Interactive Streamlit + Plotly dashboard with live cross-filters (region/category/date), KPI cards, and drill-down charts over the Superstore dataset — built as a verifiable substitute after Power BI Desktop proved unavailable on macOS.",
    tags: ["Streamlit", "Plotly", "Python"],
    url: "https://github.com/kstc707/sales-bi-dashboard"
  },
  {
    title: "A/B Testing Analysis",
    desc: "Full statistical workup of a checkout-flow test: two-proportion z-test, chi-square cross-check, 95% CI, and a power analysis. Found a <strong>+11.1% relative lift (p = 0.00004)</strong> — and that the test was run far larger than the 80%-power minimum required.",
    tags: ["Python", "scipy", "statsmodels", "Hypothesis Testing"],
    url: "https://github.com/kstc707/ab-testing-analysis"
  },
  {
    title: "Customer Retention / Cohort Analysis",
    desc: "Classic cohort-retention triangle: groups customers by signup month and tracks repeat-purchase rates over time. Built and validated a pipeline showing <strong>42% month-1 retention</strong> decaying to single digits by month 11.",
    tags: ["Python", "pandas", "seaborn"],
    url: "https://github.com/kstc707/customer-retention-cohort-analysis"
  },
  {
    title: "Automated Data Quality Pipeline",
    desc: "Rule-based + statistical data-quality gate: null-rate, duplicate, Z-score/IQR outlier, categorical-consistency, business-rule, and date-range checks. Ran against an 8,160-row test set and correctly flagged every injected issue, landing an <strong>84.6% clean-row rate</strong>.",
    tags: ["Python", "pandas", "NumPy", "Data QA"],
    url: "https://github.com/kstc707/data-quality-pipeline"
  },
  {
    title: "Content Recommendation Algorithm Diagnosis",
    desc: "Investigated the complaint that recommendations \"feel repetitive\" using ~3,000 video records. Found <strong>Music alone captures 59.2% of total views</strong> while showing lower engagement/retention than niche categories — a scale-over-quality bias — and proposed a concrete A/B test to fix it.",
    tags: ["Excel", "Pivot Analysis", "A/B Test Design"],
    url: "https://github.com/kstc707/youtube-recommendation-analysis"
  },
  {
    title: "Deep Generative Models (DCAE / VAE / DCGAN)",
    desc: "Implemented and evaluated three deep generative/representation-learning architectures in PyTorch on CIFAR-10 and Tiny ImageNet-200: a convolutional autoencoder with PCA/K-Means/t-SNE cluster analysis, a convolutional VAE, and a DCGAN.",
    tags: ["PyTorch", "Deep Learning", "CNNs"],
    url: "https://github.com/kstc707/deep-learning-image-generation"
  },
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <a class="project-card" href="${p.url}" target="_blank" rel="noopener">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <span class="card-link">View repository ↗</span>
    </a>
  `).join("");
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
  setupNav();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
