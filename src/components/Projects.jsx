const projects = [
  {
    title: "MediHelp – Emergency Pharmacy Platform",
    stack: ["React", "Node.js", "Express", "MongoDB", "Figma"],
    category: "Full Stack",
    description:
      "A web-based emergency pharmacy platform helping users locate nearby pharmacies and access real-time medicine availability.",
    bullets: [
      "Designed intuitive UI/UX prototypes in Figma and built responsive frontend with React.",
      "Built REST APIs and backend services using Node.js and Express.",
      "Integrated an NLP-based chatbot to handle basic queries and assist navigation.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "💊",
  },
  {
    title: "BoxQuest – 2D Puzzle Game",
    stack: ["Python", "OpenGL", "GLUT"],
    category: "Graphics",
    description:
      "An interactive 2D puzzle-adventure game built using OpenGL with custom graphics algorithms and real-time rendering.",
    bullets: [
      "Implemented Midpoint Line and Circle Drawing algorithms for precise graphical rendering.",
      "Expanded level-based gameplay logic for enhanced engagement.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "🎮",
  },
  {
    title: "Mobile Banking Service",
    stack: ["Assembly Language", "x86 Architecture", "EMU8086"],
    category: "Systems",
    description:
      "A simulated banking system demonstrating low-level hardware control and secure transaction processing using Assembly Language.",
    bullets: [
      "Applied register manipulation, memory addressing, and branching logic in x86 architecture.",
      "Simulated transaction validation and error handling mechanisms.",
      "Strengthened understanding of low-level system operations and algorithm design.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "🏦",
  },
  {
    title: "Online Library Management System",
    stack: ["SQL", "PHP", "HTML", "CSS", "JavaScript"],
    category: "Web",
    description:
      "A database-driven web application for managing books, users, and transactions with secure and optimized backend operations.",
    bullets: [
      "Created relational database schema with optimized SQL queries ensuring data integrity.",
      "Improved efficiency of record management compared to manual systems.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "📚",
  },
  {
    title: "Smart Solar Tracker",
    stack: ["STM32", "Arduino", "Bluetooth", "Embedded C"],
    category: "Embedded",
    description:
      "A dual-axis solar tracking and safety monitoring embedded system integrating multiple sensors for real-time environmental analysis and automated control.",
    bullets: [
      "Initiated LDR-based servo motor control for automatic dual-axis solar panel alignment.",
      "Enabled wireless communication and alerts using Bluetooth module.",
      "Designed embedded firmware for real-time sensor data processing and actuator control.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "☀️",
  },
  {
    title: "Water Level Detector & Pump Controller",
    stack: ["MOSFET", "Comparator Circuit", "Electronics"],
    category: "Hardware",
    description:
      "An automated water level monitoring system designed to prevent overflow and optimize pump control using cost-effective electronic components.",
    bullets: [
      "Built comparator and MOSFET-based switching circuit for automatic pump activation.",
      "Reduced water wastage through an efficient and reliable tank monitoring system.",
    ],
    codeLink: "#",
    liveLink: null,
    emoji: "💧",
  },
];

const categories = ["All", "Full Stack", "Web", "Graphics", "Systems", "Embedded", "Hardware"];

import { useState } from "react";

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">
            What I've built
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            A collection of projects ranging from full-stack web apps and embedded systems
            to graphics programming and low-level assembly.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${active === cat
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-purple-500/40 hover:text-purple-500"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((p, i) => (
            <div key={i}
              className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-white/10
                         bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                         hover:bg-purple-500/5 transition-all duration-200">

              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-xs font-semibold uppercase tracking-widest
                                 text-purple-500 border border-purple-500/30 px-2.5 py-1 rounded-full">
                  {p.category}
                </span>
              </div>

              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {p.description}
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5 mb-5">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-purple-500 mt-0.5 flex-shrink-0">→</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {p.stack.map((s) => (
                  <span key={s}
                    className="px-2 py-0.5 text-xs rounded-full
                               bg-gray-200/80 dark:bg-white/10
                               text-gray-600 dark:text-gray-300">
                    {s}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {p.codeLink && (
                  <a href={p.codeLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium
                               text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    Code
                  </a>
                )}
                {p.liveLink && (
                  <a href={p.liveLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium
                               text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}