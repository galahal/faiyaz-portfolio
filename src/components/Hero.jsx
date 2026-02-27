import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import profile from "../assets/profile.jpg";
import TechMarquee from "./TechMarquee";

const roles = [
  "Full Stack Engineer",
  "HCI Researcher",
  "ICT4D Researcher",
  "React Developer",
  "MERN Stack Dev",
];

const featuredProjects = [
  {
    title: "MediHelp",
    desc: "Emergency pharmacy platform with real-time medicine availability and NLP chatbot.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    emoji: "💊",
    live: "https://medi-help-react.vercel.app/",
    code: "https://github.com/galahal",
  },
  {
    title: "BoxQuest",
    desc: "2D puzzle-adventure game in Python/OpenGL using custom midpoint graphics algorithms.",
    stack: ["Python", "OpenGL", "GLUT"],
    emoji: "🎮",
    live: null,
    code: "https://github.com/galahal",
  },
  {
    title: "Online Library Management",
    desc: "Database-driven web app for managing books, users and transactions with optimized SQL.",
    stack: ["SQL", "PHP", "HTML", "CSS", "JavaScript"],
    emoji: "📚",
    live: null,
    code: "https://github.com/galahal",
  },
];

const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const RightArrow = ({ className = "" }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        const p = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(p);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  const socials = [
    {
      label: "GitHub", href: "https://github.com/galahal",
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
    },
    {
      label: "LinkedIn", href: "https://www.linkedin.com/in/faiyazmorshedkhan/",
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      label: "Facebook", href: "https://www.facebook.com/dothraki.93/",
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
  ];

  return (
    <div>

      {/* ══════ SECTION 1 — Hero intro ══════ */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16">

          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            border border-purple-500/30 bg-purple-500/10
                            text-purple-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Hi, I'm <span className="text-purple-500">Faiyaz</span>
            </h1>

            <div className="mt-3 h-10 flex items-center md:justify-start justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300">
                {displayed}
                <span className="inline-block w-0.5 h-7 bg-purple-500 ml-1 animate-blink align-middle" />
              </h2>
            </div>

            <p className="mt-5 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              Full Stack Engineer & HCI Researcher at BRAC University. I build scalable web
              applications and research how digital systems can be more inclusive for everyone.
            </p>

            {/* CHI Paper */}
            <a href="https://doi.org/10.1145/3772318.3791250" target="_blank" rel="noopener noreferrer"
              className="group mt-6 inline-flex items-start gap-3
                         border border-purple-500/25 hover:border-purple-500/60
                         bg-purple-500/5 hover:bg-purple-500/10
                         rounded-2xl px-4 py-3 transition-all duration-200 max-w-xl w-full">
              <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20
                               flex items-center justify-center text-base">📄</span>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    CHI 2026 · Published Research
                  </span>
                  <span className="text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowIcon />
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">
                  The Digital Democracy Paradox: When Usability and Literacy Barriers Undermine Inclusive E-Government
                </p>
              </div>
            </a>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4 md:justify-start justify-center">
              <a href="/Resume_Faiyaz_Morshed_Khan.pdf" download="Resume_Faiyaz_Morshed_Khan.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                           bg-purple-600 hover:bg-purple-700 text-white font-medium
                           transition-all duration-200 shadow-lg shadow-purple-500/25
                           hover:shadow-purple-500/40 hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Resume
              </a>
              <button onClick={() => navigate("/contact")}
                className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/20
                           text-gray-700 dark:text-gray-300 font-medium
                           hover:border-purple-500 hover:text-purple-500
                           dark:hover:border-purple-400 dark:hover:text-purple-400
                           transition-all duration-200 hover:-translate-y-0.5">
                Contact Me
              </button>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-5 md:justify-start justify-center">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm
                             text-gray-500 dark:text-gray-400
                             hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                  {s.label}
                  <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150">
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile image — only CHI '26 badge */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-violet-600
                            blur-2xl opacity-30 scale-110 pointer-events-none" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40
                            animate-spin-slow pointer-events-none" />
            <img src={profile} alt="Faiyaz"
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full
                         grayscale hover:grayscale-0 transition-all duration-700
                         border-4 border-purple-500/60 shadow-2xl shadow-purple-500/20" />

            {/* Only CHI '26 badge — top left */}
            <div className="absolute -top-4 -left-4 backdrop-blur-lg bg-white/80 dark:bg-white/5
                            border border-white/20 px-4 py-2 rounded-2xl shadow-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
              <p className="text-lg font-bold text-purple-500">CHI '26</p>
            </div>
            <div className="absolute -bottom-4 -right-4 backdrop-blur-lg bg-white/80 dark:bg-white/5
                            border border-white/20 px-4 py-2 rounded-2xl shadow-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Projects Built</p>
              <p className="text-lg font-bold text-purple-500">10+</p>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="max-w-6xl w-full">
          <TechMarquee />
        </div>
      </section>

      {/* ══════ SECTION 2 — About snippet ══════ */}
      <section id="about" className="px-6 py-20 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">Who I am</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">About Me</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              I'm a Computer Science graduate from BRAC University with a deep interest in both
              engineering and research. I specialize in building full-stack MERN applications
              with clean architecture and thoughtful UX.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Alongside my engineering work, I research human-computer interaction — specifically
              how inclusive design can bridge digital divides for underserved communities in Bangladesh.
            </p>
            <Link to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-500
                         hover:text-purple-400 transition-colors group">
              Read more about me
              <RightArrow className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 flex-shrink-0 w-full md:w-72">
            {[
              { label: "Published Paper",  value: "CHI '26", icon: "📄" },
              { label: "Projects Built",   value: "6+",      icon: "🔨" },
              { label: "Years Experience", value: "2+",      icon: "💼" },
              { label: "CGPA",             value: "3.53",    icon: "🎓" },
            ].map((s) => (
              <div key={s.label}
                className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 3 — Research highlight ══════ */}
      <section id="blogs" className="px-6 py-20 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">Research</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Published Work</h2>
            <Link to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-500
                         hover:text-purple-400 transition-colors group flex-shrink-0">
              View all research
              <RightArrow className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <a href="https://doi.org/10.1145/3772318.3791250" target="_blank" rel="noopener noreferrer"
            className="group block p-6 md:p-8 rounded-2xl border border-purple-500/30
                       bg-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/10
                       transition-all duration-200">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400
                               border border-purple-500/30 px-3 py-1 rounded-full">ACM CHI 2026</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full
                               bg-green-500/10 text-green-500 border border-green-500/30">Published</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug
                           group-hover:text-purple-500 transition-colors">
              The Digital Democracy Paradox: When Usability and Literacy Barriers Undermine Inclusive E-Government
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 max-w-3xl">
              Mixed-methods research exploring how Bangladesh's e-government platforms fail citizens with
              limited digital literacy — using the LAUF framework to diagnose UX barriers and propose
              accessible, standardized design solutions including Civix UI.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-500">
              Read on ACM Digital Library
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowIcon />
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* ══════ SECTION 4 — Featured projects ══════ */}
      <section id="projects" className="px-6 py-20 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">Work</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <Link to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-500
                         hover:text-purple-400 transition-colors group flex-shrink-0">
              View all projects
              <RightArrow className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((p, i) => (
              <div key={i}
                className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                           hover:bg-purple-500/5 transition-all duration-200">
                <span className="text-3xl mb-3">{p.emoji}</span>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded-full
                                             bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={p.code} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium
                               text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Code
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium
                                 text-purple-500 hover:text-purple-400 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 5 — Contact teaser ══════ */}
      <section id="contact" className="px-6 py-20 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">Get in touch</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8">
            Whether it's a project, a research collaboration, or just a chat — I'd love to hear from you.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                       bg-purple-600 hover:bg-purple-700 text-white font-medium
                       transition-all duration-200 shadow-lg shadow-purple-500/25
                       hover:shadow-purple-500/40 hover:-translate-y-0.5">
            Contact Me
            <RightArrow />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
}            