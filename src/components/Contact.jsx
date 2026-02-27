import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      label: "Email",
      value: "faiyaz.mkhan.research@gmail.com",
      href: "mailto:faiyaz.mkhan.research@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+880 1552 427399",
      href: "tel:+8801552427399",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: "Mohammadpur, Dhaka, Bangladesh",
      href: null,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "faiyazmorshedkhan",
      href: "https://www.linkedin.com/in/faiyazmorshedkhan/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const researchProfiles = [
    { label: "ResearchGate", href: "#" },
    { label: "ORCiD",        href: "#" },
    { label: "ACM DL",       href: "https://doi.org/10.1145/3772318.3791250" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2 block">
            Let's connect
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
            Whether you have a project in mind, a research collaboration, or just want to say hi —
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5 hover:border-purple-500/40
                           hover:bg-purple-500/5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center
                                text-purple-500 flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200
                                 hover:text-purple-500 dark:hover:text-purple-400 transition-colors break-all"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Research Profiles */}
            <div className="p-4 rounded-2xl border border-gray-200 dark:border-white/10
                            bg-gray-50/50 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Research Profiles
              </p>
              <div className="flex flex-col gap-2">
                {researchProfiles.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400
                               hover:text-purple-500 transition-colors"
                  >
                    {p.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/10
                            bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1.5">
                      Name
                    </label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl text-sm
                                 border border-gray-200 dark:border-white/10
                                 bg-white dark:bg-white/5 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1.5">
                      Email
                    </label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm
                                 border border-gray-200 dark:border-white/10
                                 bg-white dark:bg-white/5 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1.5">
                    Subject
                  </label>
                  <input
                    name="subject" value={form.subject} onChange={handleChange} required
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl text-sm
                               border border-gray-200 dark:border-white/10
                               bg-white dark:bg-white/5 text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-500
                               focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell me about your project, research collaboration, or just say hi!"
                    className="w-full px-4 py-2.5 rounded-xl text-sm resize-none
                               border border-gray-200 dark:border-white/10
                               bg-white dark:bg-white/5 text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-500
                               focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                  />
                </div>

                {status === "success" && (
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
                    ✓ Message sent! I'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    Something went wrong. Email me directly at faiyaz.mkhan.research@gmail.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full
                             bg-purple-600 hover:bg-purple-700 disabled:opacity-60
                             text-white font-medium transition-all duration-200
                             shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                             hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}