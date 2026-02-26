// Research experience from CV — placed under Blogs or as a separate section
// This can be used as the Blogs page or you can rename to Research.jsx

const research = [
  {
    title: "The Digital Democracy Paradox: When Usability and Literacy Barriers Undermine Inclusive E-Government",
    venue: "ACM CHI 2026",
    status: "Accepted & Published",
    period: "Sep 2025 – Apr 2026",
    doi: "https://doi.org/10.1145/3772318.3791250",
    description:
      "An extended and publication-ready version of my undergraduate thesis with refined framing, clearer methods, and strengthened contributions.",
    contributions: [
      "Added clear research questions, improved mixed-methods clarity and expanded methodological transparency.",
      "Streamlined narrative around key usability and literacy barriers using the LAUF framework.",
      "Clarified contribution novelty, including Civix UI and OSDSC design enhancements.",
    ],
    tags: ["HCI", "ICT4D", "E-Government", "Usability", "Digital Literacy"],
    highlight: true,
  },
  {
    title: "Exploring Usability Issues of E-Government Websites in Bangladesh and Their Impact on Users with Limited Digital Literacy",
    venue: "BRAC University — Undergraduate Thesis",
    status: "Completed",
    period: "Oct 2024 – Jun 2025",
    doi: null,
    description:
      "Comprehensive mixed-methods research on Bangladesh's e-government platforms, developing standardized design solutions to improve digital accessibility and usability for citizens with limited technical skills.",
    contributions: [
      "Evaluated government websites, identifying UX issues and recommending design improvements.",
      "Developed Civix UI, a standardized, accessible component library for e-government platforms.",
      "Built prototypes like E-Passport Redesigned with optimized user flows and better form handling.",
    ],
    tags: ["UX Research", "Bangladesh", "Accessibility", "Civic Tech", "Mixed Methods"],
    highlight: false,
  },
];

const blogPosts = [
  {
    title: "Coming Soon",
    description: "I'm working on writing about my research and engineering experiences. Check back soon!",
    date: "2026",
    tag: "Upcoming",
    emoji: "✍️",
  },
];

export default function Blogs() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">
            Research & Writing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blogs & Research</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            My published research work in HCI and ICT4D, and writings on engineering and design.
          </p>
        </div>

        {/* ── Research Papers ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> Research Publications
          </h2>

          <div className="flex flex-col gap-6">
            {research.map((r, i) => (
              <div key={i}
                className={`relative p-6 rounded-2xl border transition-all duration-200
                  ${r.highlight
                    ? "border-purple-500/50 bg-purple-500/5 hover:border-purple-500/80"
                    : "border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/5"
                  }`}
              >
                {r.highlight && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5
                                  text-xs font-semibold text-purple-400 border border-purple-500/30
                                  px-2.5 py-1 rounded-full bg-purple-500/10">
                    ✦ Featured
                  </div>
                )}

                {/* Venue & Status */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-500">
                    {r.venue}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${r.status === "Accepted & Published"
                      ? "bg-green-500/10 text-green-500 border border-green-500/30"
                      : "bg-gray-200/80 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                    }`}>
                    {r.status}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">{r.period}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  {r.description}
                </p>

                {/* Contributions */}
                <ul className="flex flex-col gap-1.5 mb-4">
                  {r.contributions.map((c, j) => (
                    <li key={j} className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="text-purple-500 mt-0.5 flex-shrink-0">→</span>
                      {c}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {r.tags.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 text-xs rounded-full
                                             bg-gray-200/80 dark:bg-white/10
                                             text-gray-600 dark:text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* DOI Link */}
                {r.doi && (
                  <a href={r.doi} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-500 hover:underline">
                    Read Paper
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Blog Posts ── */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.map((post, i) => (
              <div key={i}
                className="p-6 rounded-2xl border border-dashed border-gray-300 dark:border-white/10
                           bg-gray-50/30 dark:bg-white/5 flex flex-col gap-3">
                <span className="text-3xl">{post.emoji}</span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    {post.tag}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}