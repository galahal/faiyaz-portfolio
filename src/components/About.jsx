export default function About() {
  const education = [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "BRAC University — School of Data and Sciences",
      location: "Badda, Dhaka",
      period: "Oct 2021 – Sep 2025",
      grade: "CGPA: 3.53 / 4.00",
      icon: "🎓",
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      institution: "Dhaka Residential Model College",
      location: "Mohammadpur, Dhaka",
      period: "Jul 2018 – Mar 2020",
      grade: "GPA: 5.00 / 5.00",
      icon: "📗",
    },
    {
      degree: "Secondary School Certificate (Science)",
      institution: "Dhaka Residential Model College",
      location: "Mohammadpur, Dhaka",
      period: "Jan 2016 – Feb 2018",
      grade: "GPA: 5.00 / 5.00",
      icon: "📘",
    },
  ];

  const skillGroups = [
    {
      title: "Languages & Scripting",
      skills: ["Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "Redux", "Tailwind CSS", "Bootstrap", "DaisyUI"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Flask"],
    },
    {
      title: "Database & ORM",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Mongoose", "SQLAlchemy"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["Firebase", "Vercel", "Docker", "AWS", "Nginx", "VPS (Ubuntu)"],
    },
    {
      title: "Tools & Other",
      skills: ["Git", "Postman", "GraphQL", "REST API", "JWT", "OAuth2"],
    },
  ];

  const languages = [
    { lang: "Bangla", level: "Native", pct: 100 },
    { lang: "English", level: "Fluent", pct: 88 },
    { lang: "Chinese", level: "Basic", pct: 25 },
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

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">
            Get to know me
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            I'm a Full Stack Engineer and HCI Researcher based in Dhaka, Bangladesh.
            My work sits at the intersection of technology and human experience — I build
            production-grade software and conduct research on how digital systems can be
            made more accessible and inclusive.
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed mt-4">
            My research focuses on e-government usability and ICT4D — specifically exploring
            how literacy and usability barriers prevent citizens from accessing digital public
            services. My work has been accepted and published at{" "}
            <a href="https://doi.org/10.1145/3772318.3791250"
               target="_blank" rel="noopener noreferrer"
               className="text-purple-500 hover:underline">
              ACM CHI 2026
            </a>.
          </p>
        </div>

        {/* ── Education ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> Education
          </h2>
          <div className="flex flex-col gap-4">
            {education.map((e, i) => (
              <div key={i}
                className="group flex gap-4 p-5 rounded-2xl border border-gray-200 dark:border-white/10
                           hover:border-purple-500/40 bg-gray-50/50 dark:bg-white/5
                           hover:bg-purple-500/5 transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center
                                text-xl flex-shrink-0 mt-0.5">
                  {e.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{e.degree}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {e.institution} · {e.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{e.period}</span>
                      <p className="text-sm font-semibold text-purple-500 mt-0.5">{e.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((group, i) => (
              <div key={i}
                className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                           hover:bg-purple-500/5 transition-all duration-200">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill}
                      className="px-2.5 py-1 text-xs rounded-full
                                 bg-gray-200/80 dark:bg-white/10
                                 text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Languages ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> Languages
          </h2>
          <div className="flex flex-col gap-4 max-w-lg">
            {languages.map(({ lang, level, pct }) => (
              <div key={lang}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{lang}</span>
                  <span className="text-gray-500 dark:text-gray-400">{level}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── References ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">◆</span> References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((r, i) => (
              <div key={i}
                className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                           hover:bg-purple-500/5 transition-all duration-200">
                <h3 className="font-semibold text-gray-900 dark:text-white">{r.name}</h3>
                <p className="text-sm text-purple-500 mt-0.5">{r.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{r.dept}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{r.institution}</p>
                <a href={`mailto:${r.email}`}
                  className="inline-flex items-center gap-1 text-sm text-purple-500 hover:underline mt-2">
                  {r.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Download CTA ── */}
        <div className="flex justify-center">
          <a
            href="/Faiyaz_Morshed_Khan_CV.pdf"
            download="Faiyaz_Morshed_Khan_CV.pdf"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                       bg-purple-600 hover:bg-purple-700 text-white font-medium
                       transition-all duration-200 shadow-lg shadow-purple-500/25
                       hover:shadow-purple-500/40 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Full CV
          </a>
        </div>

      </div>
    </div>
  );
}