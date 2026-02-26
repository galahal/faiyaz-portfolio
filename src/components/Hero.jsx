import profile from "../assets/profile1.jpg";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 px-6 bg-white dark:bg-black transition-colors duration-300">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-purple-500 mb-4">Hi, I'm Faiyaz</p>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Full Stack <br />
            <span className="text-purple-500">Software Engineer</span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg">
            I build scalable web applications using React, Node, and modern databases.
            Focused on performance, accessibility, and clean architecture.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:opacity-90 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-3 border border-gray-300 dark:border-white/20 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {/* <div className="flex justify-center">
          <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-purple-500">
            <img
              src={profile}
              alt="Faiyaz"
              className="w-full h-full object-cover"
            />
          </div>
        </div> */}
        <div className="flex justify-center">
          <div className="relative w-80 h-80 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-indigo-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-black">
              <img
                src={profile}
                alt="Faiyaz"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}