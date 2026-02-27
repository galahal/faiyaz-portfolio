import { skills } from "../data/skills";

const education = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "BRAC University, Dhaka",
    period: "Oct 2021 – Sep 2025",
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Dhaka Residential Model College, Dhaka",
    period: "Jul 2018 – Mar 2020",
  },
  {
    degree: "Secondary School Certificate (Science)",
    institution: "Dhaka Residential Model College, Dhaka",
    period: "Jan 2016 – Feb 2018",
  },
];

const skillGroups = [
  { title: "Languages",      ids: [1, 2, 3, 4] },
  { title: "Frontend",       ids: [10, 11, 12, 13, 14, 16, 17, 20, 21] },
  { title: "Backend",        ids: [30, 31, 32] },
  { title: "Database & ORM", ids: [40, 41, 42, 44, 45] },
  { title: "Cloud & DevOps", ids: [50, 51] },
  { title: "Tools",          ids: [60, 62] },
];

const languages = [
  { lang: "Bangla",  level: "Native", pct: 100 },
  { lang: "English", level: "Fluent",  pct: 88 },
  { lang: "Chinese", level: "Basic",   pct: 25 },
];

const references = [
  {
    name: "Dr. Jannatun Noor Mukta",
    title: "Associate Professor & Director, B.Sc. in Data Science",
    dept: "Dept. of Computer Science and Engineering",
    institution: "United International University (UIU)",
    email: "jannatun@cse.uiu.ac.bd",
  },
  {
    name: "Anika Priodorshinee Mrittika",
    title: "Lecturer, School of Data Science",
    dept: "Dept. of Computer Science and Engineering",
    institution: "BRAC University",
    email: "anika.mrittika@bracu.ac.bd",
  },
];

export default function About() {
  const getSkillsById = (ids) =>
    ids.map((id) => skills.find((s) => s.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">
            Get to know me
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">About Me</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            I'm a Full Stack Engineer and HCI Researcher based in Dhaka, Bangladesh.
            My work sits at the intersection of technology and human experience — I build
            production-grade software and conduct research on how digital systems can be made more
            accessible and inclusive.
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed mt-4">
            My research focuses on e-government usability and ICT4D — specifically exploring 
            how literacy and usability barriers prevent citizens from accessing digital public 
            services. My work has been accepted and published at{" "}
            <a href="https://chi2026.acm.org/" target="_blank" rel="noopener noreferrer"
              className="text-purple-500 hover:underline">
              ACM CHI 2026
            </a>{"."}
          </p>
        </div>

        {/* ── EDUCATION ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ Education
              </span>
              <h2 className="text-2xl font-bold mt-1">My Education</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                A journey of continuous learning in computer science and problem-solving,
                built on a strong foundation in science and mathematics.
              </p>
            </div>
            <div className="flex-1 flex flex-col divide-y divide-gray-100 dark:divide-white/10">
              {education.map((e, i) => (
                <div key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between
                             py-5 gap-1 hover:pl-2 transition-all duration-200">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {e.degree}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{e.institution}</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 sm:text-right">
                    {e.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THESIS ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ My Thesis
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row gap-8 items-start lg:-ml-16">

                {/* Photo card — put your photo at public/images/thesis-photo.jpg */}
                {/* Photo card */}
                <div className="w-full lg:w-80 flex-shrink-0">
                  <div
                    className="rounded-3xl overflow-hidden
                              border border-gray-200 dark:border-white/10
                              shadow-xl bg-gray-100 dark:bg-white/5
                              p-2"
                  >
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src="/images/thesis-photo.jpg"
                        alt="Faiyaz with thesis"
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.parentElement.querySelector(
                            ".thesis-fallback"
                          ).style.display = "flex";
                        }}
                      />
                      <div
                        className="thesis-fallback hidden w-full aspect-[3/4]
                                  flex-col items-center justify-center gap-2
                                  bg-gradient-to-br from-purple-500/10 to-violet-600/10"
                      >
                        <span className="text-5xl">🎓</span>
                        <span className="text-xs text-gray-400">
                          Add photo at public/images/thesis-photo.jpg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                    Oct 2024 – Jun 2025 · BRAC University
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                    Exploring Usability Issues of E-Government Websites in Bangladesh and Their
                    Impact on Users with Limited Digital Literacy
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    Conducted comprehensive mixed-methods research on Bangladesh's e-government platforms
                    and developed standardized design solutions to improve digital accessibility and
                    usability for citizens with limited technical skills.
                  </p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {[
                      "Evaluated government websites, identifying UX issues and recommending design improvements.",
                      <>Built <span className="text-purple-500 font-medium">Civix UI</span>, a standardized, accessible component library for e-government platforms.</>,
                      "Built prototypes like E-Passport Redesigned with optimized user flows and better form handling.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-purple-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    {/* CIVIX UI */}
                    <a
                      href="https://civix-ui.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium
                                transition-all duration-200 shadow-md shadow-purple-500/25"
                    >
                      🖥 View Civix UI
                    </a>

                    {/* E-Passport Reimagined */}
                    <a
                      href="https://epassport-reimagined.vercel.app/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                border border-gray-300 dark:border-white/20
                                text-gray-700 dark:text-gray-300 text-sm font-medium
                                hover:border-purple-500 hover:text-purple-500 transition-all duration-200"
                    >
                      E-Passport Reimagined
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHI 2026 ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ Publication
              </span>
            </div>
            <div className="flex-1">
              <a href="https://doi.org/10.1145/3772318.3791250" target="_blank" rel="noopener noreferrer"
                className="group block p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5
                           hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-200">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400
                                   border border-purple-500/30 px-2.5 py-0.5 rounded-full">ACM CHI 2026</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/30">
                    Accepted & Published
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">Sep 2025 – Apr 2026</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug
                               group-hover:text-purple-500 transition-colors">
                  The Digital Democracy Paradox: When Usability and Literacy Barriers Undermine Inclusive E-Government
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                  An extended publication-ready version of my thesis with refined framing, clearer methods,
                  and strengthened contributions using the LAUF framework. Includes Civix UI and OSDSC design enhancements.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-500">
                  Read on ACM Digital Library
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SKILLS with logos ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ Skills
              </span>
              <h2 className="text-2xl font-bold mt-1">Technical Stack</h2>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400
                                 dark:text-gray-500 mb-3">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getSkillsById(group.ids).map((skill) => (
                      <div key={skill.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                   border border-gray-200 dark:border-white/10
                                   bg-gray-50 dark:bg-white/5
                                   hover:border-purple-500/40 hover:bg-purple-500/5
                                   transition-all duration-150 cursor-default">
                        <img src={skill.image} alt={skill.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => { e.target.style.display = "none"; }} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LANGUAGES ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ Languages
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-4 max-w-sm">
              {languages.map(({ lang, level, pct }) => (
                <div key={lang}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{lang}</span>
                    <span className="text-gray-500 dark:text-gray-400">{level}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REFERENCES ── */}
        {/* <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-56 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">
                ✦ References
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {references.map((r, i) => (
                <div key={i}
                  className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                             bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                             hover:bg-purple-500/5 transition-all duration-200">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{r.name}</h3>
                  <p className="text-xs text-purple-500 mt-0.5 font-medium">{r.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.dept}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.institution}</p>
                  <a href={`mailto:${r.email}`}
                    className="inline-flex items-center gap-1 text-xs text-purple-500 hover:underline mt-2 break-all">
                    {r.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Download CV */}
        <div className="flex justify-center pt-4">
          <a href="/Resume_Faiyaz_Morshed_Khan.pdf" download="Resume_Faiyaz_Morshed_Khan.pdf"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                       bg-purple-600 hover:bg-purple-700 text-white font-medium
                       transition-all duration-200 shadow-lg shadow-purple-500/25
                       hover:shadow-purple-500/40 hover:-translate-y-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download Full CV
          </a>
        </div>

      </div>
    </div>
  );
}