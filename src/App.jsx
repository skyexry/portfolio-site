import { useState, useEffect } from "react";

// ═══ DEVICON MAP ═══════════════════════════════════════
const ICON = {
  "Python":       "python-plain",
  "R":            "r-original",
  "TypeScript":   "typescript-plain",
  "JavaScript":   "javascript-plain",
  "LaTeX":        "latex-original",
  "React":        "react-original",
  "Vite":         "vitejs-plain",
  "FastAPI":      "fastapi-plain",
  "PyTorch":      "pytorch-plain",
  "Pandas":       "pandas-plain",
  "Scikit-learn": "scikitlearn-plain",
  "Docker":       "docker-plain",
  "Git":          "git-plain",
  "PostgreSQL":   "postgresql-plain",
  "Supabase":     "supabase-plain",
  "AWS S3":       "amazonwebservices-original",
  "NumPy":        "numpy-plain",
  "Streamlit":    "streamlit-plain",
  "SQL":          "azuresqldatabase-plain",
};

// ═══ DATA ══════════════════════════════════════════════
const PROJECTS = [
  {
    id: 1,
    title: "Firewall Request Review Tool",
    org: "Baosight Software · AI Research Institute",
    year: "2026",
    category: "AI / LLM",
    desc: "Private Qwen LLM automating multi-step firewall approval workflows. Natural-language interface cuts per-request processing from ~15 min to ~2 min.",
    github: null, demo: null,
  },
  {
    id: 2,
    title: "PivotPoint AI",
    org: "NYU Stern · Real Estate Data Science, AI & ML",
    year: "2026",
    category: "Full-Stack",
    desc: "Office-to-residential feasibility scoring for 7,194 NYC buildings — integrating PLUTO records, transit data, and zoning text with LLM-generated explanations. Top 30% pitch competition.",
    github: "https://github.com/skyexry/PivotPointAI", demo: null,
  },
  {
    id: 3,
    title: "Hotel Revenue Management Dashboard",
    org: "NYU Stern · Database Design & Implementation",
    year: "2025",
    category: "Full-Stack",
    desc: "SQL-driven revenue management system built on real hotel booking data. Interactive dashboard for occupancy trends, pricing analysis, and revenue optimization — extended from a course dataset with custom ETL and front-end visualizations.",
    github: "https://github.com/skyexry/hotel-revenue-dashboard",
    demo: "https://skyexry.github.io/hotel-revenue-dashboard/dashboard/index.html",
  },
  {
    id: 4,
    title: "Spatio-Temporal Demand Forecasting",

    org: "NYU Stern · Data Bootcamp",
    year: "2026",
    category: "Data / ML",
    desc: "Five-model benchmark for Citi Bike demand on a 28M+ row dataset. ~39% MAE improvement over baseline across multiple forecast horizons.",
    github: "https://github.com/skyexry/urban-mobility-forecast",
    demo: "https://citi-bike.streamlit.app",
    demoLabel: "EDA Dashboard",
  },
  {
    id: 5,
    title: "CNY/USD Volatility Modeling",
    org: "NYU Stern · Forecasting Time Series Data",
    year: "2025",
    category: "Data / ML",
    desc: "ARIMA-GARCH pipeline on 1,248 daily CNY/USD observations. Volatility-adaptive intervals ~40% tighter than the ARIMA benchmark.",
    github: "https://github.com/skyexry/cnyusd-volatility-modeling", demo: null,
  },
  {
    id: 6,
    title: "Representation Learning Competition",
    org: "NYU Shanghai · Machine Learning",
    year: "2025",
    category: "Data / ML",
    desc: "CNN encoder-decoder with self-attention and residual connections for unsupervised representation learning under low-data constraints. Top 15% of 90 students.",
    github: null, demo: null,
  },
];

const SKILLS = {
  "Languages": ["Python", "R", "SQL", "TypeScript", "JavaScript", "LaTeX"],
  "Frameworks": ["React", "Vite", "FastAPI", "PyTorch", "Pandas", "Scikit-learn"],
  "AI / ML":    ["ARIMA", "GARCH", "GNN", "Transformer", "LangChain", "RAG", "vLLM"],
  "Tools":      ["Docker", "Git", "PostgreSQL", "Supabase", "AWS S3", "Streamlit"],
};

const TIMELINE = [
  { date: "May 2026 – Present",       title: "AI Agent Development Intern — Baosight Software (宝信软件)",         desc: "Building production LLM tools for enterprise security workflows at the AI Research Institute." },
  { date: "Fall 2025 – Spring 2026",  title: "Exchange — NYU Stern School of Business, New York",                   desc: "Graduate-level courses: Forecasting Time Series, Real Estate Data Science AI & ML. Top 30% pitch competition." },
  { date: "May – Aug 2025",           title: "Strategy Consulting Intern — Allpku Management Consulting (北大纵横)", desc: "Co-authored 60+ page strategic deliverable for municipal infrastructure transformation. 10+ executive interviews." },
  { date: "Dec 2023 – Jan 2024",      title: "Procurement Data Analysis Intern — Jaguar Land Rover China",          desc: "Procurement data analysis using SAP/SRM systems." },
  { date: "Sep 2023",                 title: "NYU Shanghai — B.S. Data Science & Business and Finance",             desc: "Double major, GPA 3.77 / 4.0. Expected graduation Jun 2027." },
];

const CATEGORIES = ["All", "AI / LLM", "Full-Stack", "Data / ML"];
const NAV = ["About", "Projects", "Timeline", "Skills", "Contact"];

// ═══ STYLES ════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#fafaf8; --bg2:#f3f2ef; --bdr:#e5e3de;
  --txt:#1a1916; --txt2:#5c5a55; --txt3:#9c9a95;
  --acc:#1a1916; --acc-h:#333028;
  --hi:#1d6b5e; --hi-pale:#eaf4f2; --hi-l:#2d9c8a;
  --glow:rgba(29,107,94,.08);
  --fh:'Outfit',sans-serif; --fb:'Plus Jakarta Sans',sans-serif; --fm:'JetBrains Mono',monospace;
  --r:10px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--txt);font-family:var(--fb);line-height:1.6;overflow-x:hidden}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--bdr);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--txt3)}

.rv{opacity:0;transform:translateY(20px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}.rv.d4{transition-delay:.32s}

/* nav */
.nav{position:fixed;inset:0 0 auto 0;z-index:100;height:56px;padding:0 52px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.72);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(0,0,0,.06);transition:background .3s}
.nav.up{background:rgba(255,255,255,.82)}
.nav-logo{font-family:var(--fh);font-size:.95rem;font-weight:700;color:var(--txt);text-decoration:none;letter-spacing:-.02em}
.nav-links{display:flex;gap:26px;list-style:none}
.nav-links a{font-size:.82rem;font-weight:500;color:var(--txt2);text-decoration:none;position:relative;padding-bottom:2px;transition:color .2s}
.nav-links a::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:1.5px;background:var(--txt);transform:scaleX(0);transform-origin:left;transition:transform .25s cubic-bezier(.16,1,.3,1)}
.nav-links a:hover,.nav-links a.on{color:var(--txt)}
.nav-links a:hover::after,.nav-links a.on::after{transform:scaleX(1)}

/* hero */
.hero{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 52px 60px;overflow:hidden}
@keyframes bA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-18px) scale(1.05)}66%{transform:translate(-14px,22px) scale(.96)}}
@keyframes bB{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-22px,14px) scale(1.04)}75%{transform:translate(18px,-10px) scale(.97)}}
.blobs{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.blob{position:absolute;border-radius:50%;filter:blur(90px)}
.b1{width:460px;height:460px;background:radial-gradient(circle,rgba(29,107,94,.09),rgba(29,107,94,.03));top:-100px;right:-20px;animation:bA 13s ease-in-out infinite}
.b2{width:320px;height:320px;background:radial-gradient(circle,rgba(29,107,94,.07),transparent);bottom:-70px;left:-30px;animation:bB 16s ease-in-out infinite;animation-delay:-7s}
.b3{width:200px;height:200px;background:radial-gradient(circle,rgba(45,156,138,.07),transparent);top:40%;left:38%;animation:bA 10s ease-in-out infinite;animation-delay:-4s}
.hero-in{position:relative;z-index:1;max-width:620px}
@keyframes su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.avatar{width:80px;height:80px;border-radius:50%;border:1.5px solid var(--bdr);margin:0 auto 20px;opacity:0;animation:su .6s cubic-bezier(.16,1,.3,1) .15s forwards;overflow:hidden}
.avatar img{width:100%;height:100%;object-fit:cover;display:block}
.icon-btn{width:38px;height:38px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1.5px solid var(--bdr);color:var(--txt2);text-decoration:none;transition:all .2s cubic-bezier(.16,1,.3,1)}
.icon-btn i{font-size:1.15rem;color:inherit;line-height:1;display:block}
.icon-btn svg{display:block;flex-shrink:0}
.icon-btn:hover{background:var(--hi-pale);border-color:var(--hi-l);color:var(--hi);transform:translateY(-2px);box-shadow:0 0 14px rgba(29,107,94,.22)}
.h-ey{font-family:var(--fm);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--txt3);margin-bottom:12px;opacity:0;animation:su .6s cubic-bezier(.16,1,.3,1) .25s forwards}
.h-nm{font-family:var(--fh);font-size:clamp(2.2rem,4.5vw,3.6rem);font-weight:700;line-height:1.08;letter-spacing:-.03em;margin-bottom:16px;opacity:0;animation:su .7s cubic-bezier(.16,1,.3,1) .38s forwards}
.h-nm em{color:var(--hi);font-style:normal}
.h-bio{font-size:.93rem;color:var(--txt2);line-height:1.8;margin-bottom:28px;opacity:0;animation:su .7s cubic-bezier(.16,1,.3,1) .5s forwards}
.h-ctas{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;opacity:0;animation:su .7s cubic-bezier(.16,1,.3,1) .62s forwards}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
.h-scroll{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;opacity:0;animation:su .6s .6s cubic-bezier(.16,1,.3,1) 1.1s forwards}
.h-scr-t{font-family:var(--fm);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--txt3)}
.h-scr-a{font-size:.8rem;color:var(--txt3);animation:bounce 2s ease-in-out infinite}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;font-family:var(--fb);font-size:.83rem;font-weight:600;border-radius:7px;text-decoration:none;cursor:pointer;border:none;transition:transform .2s cubic-bezier(.16,1,.3,1),box-shadow .2s,background .2s,color .2s}
.btn:hover{transform:translateY(-1px)}
.btn-f{background:var(--acc);color:#fff}
.btn-f:hover{background:var(--acc-h);box-shadow:0 6px 18px rgba(0,0,0,.18)}
.btn-g{background:transparent;color:var(--txt);border:1.5px solid var(--bdr)}
.btn-g:hover{border-color:var(--txt3);background:var(--bg2)}

/* sections */
.sec{padding:80px 52px;max-width:1100px;margin:0 auto}
.sec-wide{background:var(--bg2)}
.sec-wide>.sec-in{max-width:1100px;margin:0 auto;padding:80px 52px}
.s-lbl{font-family:var(--fm);font-size:.67rem;letter-spacing:.14em;text-transform:uppercase;color:var(--hi);margin-bottom:8px;font-weight:500}
.s-ttl{font-family:var(--fh);font-size:1.85rem;font-weight:700;letter-spacing:-.025em;line-height:1.2;margin-bottom:36px}
.s-ttl em{color:var(--hi);font-style:normal}

/* about */
.about-p{font-size:.93rem;color:var(--txt2);line-height:1.85;max-width:640px;text-align:center;margin:0 auto}

/* project cards */
@keyframes cardIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.fbar{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:28px}
.fbtn{padding:5px 15px;border-radius:20px;font-family:var(--fb);font-size:.77rem;font-weight:500;cursor:pointer;background:transparent;border:1.5px solid var(--bdr);color:var(--txt2);transition:all .2s}
.fbtn:hover{border-color:var(--txt3);color:var(--txt)}
.fbtn.on{background:var(--acc);border-color:var(--acc);color:#fff}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;transition:opacity .18s}
.pgrid.fading{opacity:0}
.pcard{background:#fff;border:1px solid var(--bdr);border-radius:var(--r);padding:24px;display:flex;flex-direction:column;gap:10px;animation:cardIn .4s cubic-bezier(.16,1,.3,1) both;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s,border-color .25s}
.pcard:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.07);border-color:#ccc}
.pm{display:flex;justify-content:space-between;align-items:center}
.pcat{font-family:var(--fm);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--hi);background:var(--hi-pale);padding:3px 9px;border-radius:20px;font-weight:500}
.pyr{font-family:var(--fm);font-size:.65rem;color:var(--txt3)}
.ptitle{font-family:var(--fh);font-size:1.05rem;font-weight:600;letter-spacing:-.015em;line-height:1.3}
.porg{font-size:.73rem;color:var(--txt3);margin-top:-3px}
.pdesc{font-size:.84rem;color:var(--txt2);line-height:1.65;flex-grow:1}
.plinks{display:flex;gap:12px;margin-top:2px}
.plink{font-size:.78rem;font-weight:600;color:var(--hi);text-decoration:none;transition:color .2s}
.plink:hover{color:var(--hi-l);text-decoration:underline}

/* timeline */
.tl{position:relative}
.tl::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:1px;background:var(--bdr)}
.tl-item{display:flex;gap:22px;padding-bottom:26px;position:relative}
.tl-item:last-child{padding-bottom:0}
.tl-dot{width:15px;height:15px;border-radius:50%;border:1.5px solid var(--hi);background:var(--bg);flex-shrink:0;margin-top:3px;position:relative;z-index:1;transition:background .2s}
.tl-item:hover .tl-dot{background:var(--hi)}
.tl-body{flex:1}
.tl-date{font-family:var(--fm);font-size:.66rem;color:var(--hi);letter-spacing:.06em;margin-bottom:2px;font-weight:500}
.tl-title{font-family:var(--fh);font-size:.88rem;font-weight:600;color:var(--txt);margin-bottom:3px;line-height:1.4}
.tl-desc{font-size:.81rem;color:var(--txt3);line-height:1.5}

/* skills */
.sg{display:grid;grid-template-columns:1fr 1fr;gap:32px}
.sg-group{border-left:2px solid var(--hi-pale);padding-left:18px;transition:border-color .2s}
.sg-group:hover{border-color:var(--hi)}
.sg-t{font-family:var(--fm);font-size:.64rem;letter-spacing:.13em;text-transform:uppercase;color:var(--hi);margin-bottom:14px;font-weight:500}
.sktags{display:flex;flex-wrap:wrap;gap:7px}
.sktag{display:inline-flex;align-items:center;gap:7px;font-family:var(--fb);font-size:.8rem;font-weight:500;padding:6px 13px;border-radius:20px;border:1.5px solid var(--bdr);color:var(--txt2);background:#fff;transition:all .2s;cursor:default;line-height:1}
.sktag:hover{background:var(--hi-pale);border-color:var(--hi-l);color:var(--hi);transform:translateY(-1px);box-shadow:0 0 12px rgba(29,107,94,.18)}
.sktag i{font-size:1rem;color:var(--hi);transition:color .2s}
.sktag:not(:hover) i{color:var(--txt3)}
.sktag-dot{width:5px;height:5px;border-radius:50%;background:var(--bdr);flex-shrink:0;transition:background .2s}
.sktag:hover .sktag-dot{background:var(--hi)}

/* contact */
.ctact{background:var(--bg2);border:1px solid var(--bdr);border-radius:16px;padding:52px;text-align:center}
.ctact-t{font-family:var(--fh);font-size:2rem;font-weight:700;letter-spacing:-.03em;margin-bottom:10px}
.ctact-s{font-size:.88rem;color:var(--txt3);margin-bottom:26px;line-height:1.7}
.ctact-bs{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

.ftr{text-align:center;padding:22px 52px;font-family:var(--fm);font-size:.67rem;color:var(--txt3);border-top:1px solid var(--bdr)}

/* dark mode */
@media(prefers-color-scheme:dark){
  :root{--bg:#111110;--bg2:#1a1916;--bdr:#2e2c28;--txt:#f0ede8;--txt2:#a8a49e;--txt3:#6b6760;--acc:#f0ede8;--acc-h:#d8d4cc;--hi:#2d9c8a;--hi-pale:rgba(29,107,94,.15);--hi-l:#3dbfaa}
  .nav{background:rgba(17,17,16,.72);border-bottom-color:rgba(255,255,255,.06)}
  .nav.up{background:rgba(17,17,16,.88)}
  .btn-f{background:var(--hi);color:#fff}
  .btn-f:hover{background:var(--hi-l);box-shadow:0 6px 18px rgba(29,107,94,.3)}
  .btn-g{color:var(--txt2);border-color:#3a3835}
  .btn-g:hover{background:rgba(29,107,94,.12);border-color:var(--hi-l);color:var(--hi)}
  .pcard{background:#1c1b18;border-color:#2e2c28}
  .sktag{background:#1c1b18}
  .ctact{background:#1c1b18}
  .tl-dot{background:var(--bg)}
  .about-drk{background:#0a0908}
}
`;


// ═══ HOOKS ═════════════════════════════════════════════
function useDevicon() {
  useEffect(() => {
    const id = "devicon-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const secs = document.querySelectorAll("[data-sec]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.sec); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    secs.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

function useScrolled() {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const h = () => setUp(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return up;
}

// ═══ COMPONENTS ════════════════════════════════════════
function SkillTag({ name }) {
  const icon = ICON[name];
  return (
    <span className="sktag">
      {icon
        ? <i className={`devicon-${icon}`} />
        : <span className="sktag-dot" />
      }
      {name}
    </span>
  );
}

function Nav({ active, scrolled }) {
  return (
    <nav className={`nav${scrolled ? " up" : ""}`}>
      <a href="#hero" className="nav-logo">Skye Xi</a>
      <ul className="nav-links">
        {NAV.map(s => (
          <li key={s}>
            <a href={`#${s.toLowerCase()}`} className={active === s.toLowerCase() ? "on" : ""}>{s}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero" data-sec="hero">
      <div className="blobs">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      </div>
      <div className="hero-in">
        <div className="avatar">
          {/* <img src="/skye.jpg" alt="Skye Xi" /> */}
          <img src={import.meta.env.BASE_URL + "skye.jpg"} alt="Skye Xi" />
        </div>
        <p className="h-ey">NYU Shanghai · Class of 2027</p>
        <h1 className="h-nm">Skye <em>Ruiyun</em> Xi</h1>
        <p className="h-bio">
          Data Science & Finance × AI Engineering × Full-Stack<br />
          Double major at NYU Shanghai.<br />
          Based in Shanghai · AI Agent Development Intern at Baosight Software.
        </p>
        <div className="h-ctas">
          <a href="#projects" className="btn btn-f">View Projects ↓</a>
          <a href="https://github.com/skyexry" target="_blank" rel="noopener noreferrer" className="icon-btn" title="GitHub"><i className="devicon-github-original" /></a>
          <a href="https://www.linkedin.com/in/skye-xi-650769304/" target="_blank" rel="noopener noreferrer" className="icon-btn" title="LinkedIn"><i className="devicon-linkedin-plain" /></a>
          <a href="mailto:rx2285@nyu.edu" className="icon-btn" title="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="h-scroll">
        <span className="h-scr-t">scroll</span>
        <span className="h-scr-a">↓</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="about-drk" id="about" data-sec="about" style={{ background: "#1a1916" }}>
      <section className="sec" style={{ textAlign: "center" }}>
        <p className="s-lbl rv" style={{ color: "#2d9c8a" }}>About</p>
        <h2 className="s-ttl rv d1" style={{ color: "#f0ede8", marginBottom: "20px" }}>
          Building tools that bridge<br /><em style={{ color: "#2d9c8a" }}>data and decisions</em>
        </h2>
        <p className="about-p rv d2" style={{ color: "#9c9a95" }}>
          Double major in Data Science and Business & Finance at NYU Shanghai (GPA 3.77).
          Work spans ML forecasting, full-stack AI tooling, AI agent development, and strategy consulting —
          with a focus on building tools that are technically rigorous and actually deployable.
          Bilingual in Chinese and English, based in Shanghai.
        </p>
      </section>
    </div>
  );
}

function Projects() {
  const [cat, setCat] = useState("All");
  const [fading, setFading] = useState(false);
  const handleFilter = (c) => {
    if (c === cat) return;
    setFading(true);
    setTimeout(() => { setCat(c); setFading(false); }, 160);
  };
  const list = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === cat);
  return (
    <div className="sec-wide" id="projects" data-sec="projects">
      <div className="sec-in">
        <p className="s-lbl rv">Projects</p>
        <h2 className="s-ttl rv d1">Selected work</h2>
        <div className="fbar rv d2">
          {CATEGORIES.map(c => (
            <button key={c} className={`fbtn${cat === c ? " on" : ""}`} onClick={() => handleFilter(c)}>{c}</button>
          ))}
        </div>
        <div className={`pgrid${fading ? " fading" : ""}`}>
          {list.map((p, i) => (
            <div key={`${cat}-${p.id}`} className="pcard" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="pm">
                <span className="pcat">{p.category}</span>
                <span className="pyr">{p.year}</span>
              </div>
              <div>
                <h3 className="ptitle">{p.title}</h3>
                <p className="porg">{p.org}</p>
              </div>
              <p className="pdesc">{p.desc}</p>
              {(p.github || p.demo) && (
                <div className="plinks">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="plink">GitHub →</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="plink">{p.demoLabel || "Live Demo"} ↗</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <section className="sec" id="timeline" data-sec="timeline">
      <p className="s-lbl rv">Timeline</p>
      <h2 className="s-ttl rv d1">Experience & milestones</h2>
      <div className="tl rv d2">
        {TIMELINE.map((item, i) => (
          <div key={i} className="tl-item">
            <div className="tl-dot" />
            <div className="tl-body">
              <p className="tl-date">{item.date}</p>
              <p className="tl-title">{item.title}</p>
              <p className="tl-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <div className="sec-wide" id="skills" data-sec="skills">
      <div className="sec-in">
        <p className="s-lbl rv">Skills</p>
        <h2 className="s-ttl rv d1">Technical toolkit</h2>
        <div className="sg">
          {Object.entries(SKILLS).map(([group, items], i) => (
            <div key={group} className={`sg-group rv d${i + 1}`}>
              <p className="sg-t">{group}</p>
              <div className="sktags">
                {items.map(s => <SkillTag key={s} name={s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section className="sec" id="contact" data-sec="contact">
      <div className="ctact rv">
        <h2 className="ctact-t">Let's connect</h2>
        <p className="ctact-s">Open to data analyst, data science, and AI engineering internships.</p>
        <div className="ctact-bs">
          <a href="mailto:rx2285@nyu.edu" className="btn btn-f">rx2285@nyu.edu</a>
          <a href="https://github.com/skyexry" target="_blank" rel="noopener noreferrer" className="btn btn-g">GitHub</a>
          <a href="https://www.linkedin.com/in/skye-xi-650769304/" target="_blank" rel="noopener noreferrer" className="btn btn-g">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

// ═══ APP ═══════════════════════════════════════════════
export default function Portfolio() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  useReveal();
  useDevicon();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Nav active={active} scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <footer className="ftr">© 2026 Skye Ruiyun Xi</footer>
    </>
  );
}
