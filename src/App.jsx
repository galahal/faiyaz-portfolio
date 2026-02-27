import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import useTracker from "./hooks/useTracker";

export default function App({ dark, setDark }) {
  // Fire visitor tracking on every page navigation
  useTracker();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar dark={dark} setDark={setDark} />
        <main>
          <Routes>
            <Route path="/"         element={<Hero />} />
            <Route path="/about"    element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs"    element={<Blogs />} />
            <Route path="/contact"  element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}