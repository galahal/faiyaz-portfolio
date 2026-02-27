import { skills } from "../data/skills";

const marqueeItems = [...skills, ...skills];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden py-10 mt-6">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
        Technologies I work with
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10
                        bg-gradient-to-r from-white dark:from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10
                        bg-gradient-to-l from-white dark:from-black to-transparent" />

        <div className="flex gap-4 animate-marquee">
          {marqueeItems.map((skill, i) => (
            <div
              key={`${skill.id}-${i}`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full flex-shrink-0
                         border border-gray-200 dark:border-white/10
                         bg-gray-50 dark:bg-white/5
                         hover:border-purple-500/50 hover:bg-purple-500/5
                         transition-all duration-200 cursor-default"
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="w-5 h-5 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
          white-space: nowrap;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}