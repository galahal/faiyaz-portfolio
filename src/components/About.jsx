export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 border-t border-gray-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold mb-12">
          About <span className="text-purple-500">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-gray-600 dark:text-gray-400 leading-relaxed">

          <p>
            I'm a full-stack engineer focused on building scalable
            applications with modern technologies like React, Node.js,
            and cloud-native architectures.
          </p>

          <p>
            I care deeply about performance, clean architecture,
            and building products that feel fast, intuitive,
            and reliable.
          </p>

        </div>

      </div>
    </section>
  );
}