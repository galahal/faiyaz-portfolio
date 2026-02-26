export default function Navbar({ dark, setDark }) {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-xl text-black dark:text-white">
          Faiyaz<span className="text-purple-500">.</span>
        </h1>

        <div className="flex items-center gap-8 text-sm">
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition">About</a>
          <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition">Projects</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition">Contact</a>

          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}