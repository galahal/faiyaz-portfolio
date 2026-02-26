import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home",     path: "/" },
    { label: "About",    path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Blogs",    path: "/blogs" },
    { label: "Contact",  path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed top-6 w-full flex justify-center z-50 px-4">
      <nav
        className={`
          backdrop-blur-xl bg-white/10 dark:bg-white/5
          border border-white/20 dark:border-white/10
          px-6 py-3 rounded-full flex items-center gap-4
          transition-all duration-300
          ${scrolled
            ? "shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "shadow-md"
          }
        `}
      >
        {/* Name */}
        <Link
          to="/"
          className="text-sm font-bold tracking-wide text-gray-900 dark:text-white
                     hover:text-purple-500 dark:hover:text-purple-400 transition-colors mr-1"
        >
        <h1 className="font-bold text-xl text-black dark:text-white">
          Faiyaz<span className="text-purple-500">.</span>
        </h1>
        </Link>

        {/* Divider */}
        <span className="w-px h-4 bg-black/10 dark:bg-white/10 hidden sm:block" />

        {/* Nav links — desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`
                relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                ${isActive(path)
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                }
              `}
            >
              {isActive(path) && (
                <span className="absolute inset-0 rounded-full bg-purple-500/10 dark:bg-purple-400/10" />
              )}
              {label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <span className="w-px h-4 bg-black/10 dark:bg-white/10 hidden sm:block" />

        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10
                     flex items-center justify-center text-base
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 items-center justify-center w-8 h-8"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
        >
          <span className={`w-5 h-0.5 bg-current rounded transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-current rounded transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-current rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2
                        backdrop-blur-xl bg-white/80 dark:bg-black/60
                        border border-white/20 dark:border-white/10
                        rounded-2xl shadow-xl px-4 py-3 flex flex-col gap-1 w-52 sm:hidden">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`text-sm font-medium px-3 py-2 rounded-xl transition text-left
                ${isActive(path)
                  ? "text-purple-500 bg-purple-500/10"
                  : "hover:bg-purple-500/10 hover:text-purple-500 text-gray-700 dark:text-gray-300"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}