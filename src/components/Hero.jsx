import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";

const roles = [
  "Full Stack Engineer",
  "HCI Researcher",
  "ICT4D Researcher",
  "React Developer",
  "MERN Stack Dev",
];

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
      label: "GitHub",
      href: "https://github.com/galahal",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/faiyazmorshedkhan/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/dothraki.93/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16">

        {/* ── Left ── */}
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

          {/* CHI 2026 Paper Callout */}
          <a
            href="https://doi.org/10.1145/3772318.3791250"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-start gap-3
                       border border-purple-500/25 hover:border-purple-500/60
                       bg-purple-500/5 hover:bg-purple-500/10
                       rounded-2xl px-4 py-3 transition-all duration-200 max-w-xl w-full"
          >
            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20
                             flex items-center justify-center text-base">📄</span>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                  CHI 2026 · Published Research
                </span>
                <svg className="w-3 h-3 text-purple-400 flex-shrink-0
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">
                The Digital Democracy Paradox: When Usability and Literacy Barriers
                Undermine Inclusive E-Government
              </p>
            </div>
          </a>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 md:justify-start justify-center">
            <a
              href="/Faiyaz_Morshed_Khan_CV.pdf"
              download="Faiyaz_Morshed_Khan_CV.pdf"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                         bg-purple-600 hover:bg-purple-700 text-white font-medium
                         transition-all duration-200 shadow-lg shadow-purple-500/25
                         hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Resume
            </a>

            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/20
                         text-gray-700 dark:text-gray-300 font-medium
                         hover:border-purple-500 hover:text-purple-500
                         dark:hover:border-purple-400 dark:hover:text-purple-400
                         transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-5 md:justify-start justify-center">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm
                           text-gray-500 dark:text-gray-400
                           hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                {s.label}
                <svg className="w-3 h-3 opacity-40 group-hover:opacity-100
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-violet-600
                          blur-2xl opacity-30 scale-110 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40
                          animate-spin-slow pointer-events-none" />
          <img src={profile} alt="Faiyaz"
            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full
                       grayscale hover:grayscale-0 transition-all duration-700
                       border-4 border-purple-500/60 shadow-2xl shadow-purple-500/20" />
          <div className="absolute -bottom-4 -right-4 backdrop-blur-lg bg-white/10 dark:bg-white/5
                          border border-white/20 px-4 py-2 rounded-2xl shadow-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
            <p className="text-lg font-bold text-purple-500">2+ Years</p>
          </div>
          <div className="absolute -top-4 -left-4 backdrop-blur-lg bg-white/10 dark:bg-white/5
                          border border-white/20 px-4 py-2 rounded-2xl shadow-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
            <p className="text-lg font-bold text-purple-500">CHI '26</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </section>
  );
}