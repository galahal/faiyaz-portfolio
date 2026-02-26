export default function Projects() {
  return (
    <section
      id="projects"
      className="py-32 px-6 border-t border-gray-200 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-16">
          Selected <span className="text-purple-500">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="group p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-purple-500 transition">
            <h3 className="text-2xl font-semibold mb-4">
              MERN E-Commerce Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Full-stack marketplace with authentication,
              payments, and admin dashboard.
            </p>
            <span className="text-purple-500 group-hover:translate-x-2 inline-block transition">
              View Project →
            </span>
          </div>

          <div className="group p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-purple-500 transition">
            <h3 className="text-2xl font-semibold mb-4">
              SaaS Analytics Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Role-based dashboard with real-time analytics and API integrations.
            </p>
            <span className="text-purple-500 group-hover:translate-x-2 inline-block transition">
              View Project →
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}