import { useState, useEffect, useCallback } from "react";

// ── Tiny bar chart component ──────────────────────────────────────────────────
function BarChart({ data, color = "bg-purple-500" }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return (
    <div className="flex flex-col gap-2">
      {entries.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 w-28 flex-shrink-0 truncate text-right">
            {label}
          </span>
          <div className="flex-1 h-5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${color} rounded-full transition-all duration-500`}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-6 text-right">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Daily sparkline ───────────────────────────────────────────────────────────
function Sparkline({ data }) {
  const values = Object.values(data);
  const labels = Object.keys(data);
  const max = Math.max(...values, 1);
  const w = 600;
  const h = 80;
  const pad = 4;
  const step = (w - pad * 2) / (values.length - 1);

  const points = values
    .map((v, i) => `${pad + i * step},${h - pad - ((v / max) * (h - pad * 2))}`)
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
        {/* Area fill */}
        <polygon
          points={`${pad},${h} ${points} ${pad + (values.length - 1) * step},${h}`}
          fill="rgba(139,92,246,0.15)"
        />
        {/* Line */}
        <polyline points={points} fill="none" stroke="#8b5cf6" strokeWidth="2" />
        {/* Dots */}
        {values.map((v, i) => (
          <circle
            key={i}
            cx={pad + i * step}
            cy={h - pad - ((v / max) * (h - pad * 2))}
            r="3"
            fill="#8b5cf6"
          />
        ))}
      </svg>
      {/* First and last date labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}

// ── Main Stats page ───────────────────────────────────────────────────────────
export default function Stats() {
  const [password, setPassword]     = useState("");
  const [authed, setAuthed]         = useState(false);
  const [authError, setAuthError]   = useState("");
  const [loading, setLoading]       = useState(false);
  const [data, setData]             = useState(null);
  const [error, setError]           = useState("");
  const [activeTab, setActiveTab]   = useState("overview");
  const [visitorPage, setVisitorPage] = useState(1);
  const [uniqueOnly, setUniqueOnly] = useState(false);
  const [contactPage, setContactPage] = useState(1);
  const [expandedMsg, setExpandedMsg] = useState(null);
  const PER_PAGE = 20;

  const fetchStats = useCallback(async (pwd) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", {
        headers: { "x-stats-password": pwd },
      });
      if (res.status === 401) {
        setAuthError("Wrong password");
        setAuthed(false);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setAuthed(true);
    } catch {
      setError("Failed to load stats. Check your connection.");
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    fetchStats(password);
  };

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-4xl">🔒</span>
            <h1 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">Stats Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm
                         border border-gray-200 dark:border-white/10
                         bg-white dark:bg-white/5 text-gray-900 dark:text-white
                         placeholder-gray-400 focus:outline-none
                         focus:border-purple-500 transition-colors"
            />
            {authError && (
              <p className="text-sm text-red-500 text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700
                         text-white font-medium transition-all disabled:opacity-50"
            >
              {loading ? "Checking..." : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-sm text-gray-500">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const { visitors, contacts } = data;
  const vLogs  = visitors.logs;

  // Filter unique IPs if checkbox enabled
  const filteredVLogs = uniqueOnly
    ? Object.values(
        vLogs.reduce((acc, log) => {
          if (!acc[log.ip]) acc[log.ip] = log; // keep first occurrence
          return acc;
        }, {})
      )
    : vLogs;

  const cLogs  = contacts.logs;
  const vPages = Math.ceil(filteredVLogs.length / PER_PAGE);
  const cPages = Math.ceil(cLogs.length / PER_PAGE);
  const vSlice = filteredVLogs.slice(
    (visitorPage - 1) * PER_PAGE,
    visitorPage * PER_PAGE
  );
  const cSlice = cLogs.slice((contactPage - 1) * PER_PAGE, contactPage * PER_PAGE);

  const tabs = ["overview", "visitors", "contacts"];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-1 block">
              Private
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Stats Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchStats(password)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                         border border-gray-200 dark:border-white/10
                         text-gray-600 dark:text-gray-400
                         hover:border-purple-500 hover:text-purple-500 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setData(null); setPassword(""); }}
              className="px-4 py-2 rounded-full text-sm border border-gray-200 dark:border-white/10
                         text-gray-600 dark:text-gray-400 hover:border-red-400 hover:text-red-400 transition-all"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Visits",    value: visitors.total,    icon: "👁️" },
            { label: "Unique IPs",      value: visitors.uniqueIPs, icon: "🌐" },
            { label: "Messages",        value: contacts.total,    icon: "✉️" },
            { label: "Countries",       value: Object.keys(visitors.countryCount).length, icon: "🗺️" },
          ].map((s) => (
            <div key={s.label}
              className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                         bg-gray-50/50 dark:bg-white/5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-100 dark:border-white/10 pb-0">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-all
                border-b-2 -mb-px
                ${activeTab === t
                  ? "border-purple-500 text-purple-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-purple-500"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">

            {/* Daily chart */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Visits — Last 30 Days
              </h2>
              <Sparkline data={visitors.dailyLast30} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Browser</h2>
                <BarChart data={visitors.browserCount} color="bg-purple-500" />
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Operating System</h2>
                <BarChart data={visitors.osCount} color="bg-violet-500" />
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Device</h2>
                <BarChart data={visitors.deviceCount} color="bg-indigo-500" />
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Country</h2>
                <BarChart data={visitors.countryCount} color="bg-pink-500" />
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Top Pages</h2>
                <BarChart data={visitors.pageCount} color="bg-emerald-500" />
              </div>
            </div>
          </div>
        )}

        {/* ── VISITORS TAB ── */}
        {activeTab === "visitors" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {visitors.total} total visits · {visitors.uniqueIPs} unique IPs
              </p>

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uniqueOnly}
                  onChange={(e) => {
                    setUniqueOnly(e.target.checked);
                    setVisitorPage(1); // reset pagination when toggled
                  }}
                  className="accent-purple-600"
                />
                Show unique IPs only
              </label>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/10
                                   bg-gray-50 dark:bg-white/5 text-xs uppercase tracking-widest text-gray-400">
                      <th className="text-left px-4 py-3">Time</th>
                      <th className="text-left px-4 py-3">IP</th>
                      <th className="text-left px-4 py-3">Location</th>
                      <th className="text-left px-4 py-3">Browser</th>
                      <th className="text-left px-4 py-3">OS</th>
                      <th className="text-left px-4 py-3">Device</th>
                      <th className="text-left px-4 py-3">Page</th>
                      <th className="text-left px-4 py-3">Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vSlice.map((v, i) => (
                      <tr key={String(v.id)}
                        className={`border-b border-gray-100 dark:border-white/5
                          ${i % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-white/[0.02]"}`}>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(v.visitedAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                          {v.ip}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {v.city && v.city !== "Unknown" ? `${v.city}, ` : ""}{v.country || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{v.browser}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{v.os}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{v.device}</td>
                        <td className="px-4 py-3 text-purple-500 font-mono text-xs">{v.page}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs max-w-[120px] truncate">
                          {v.referrer || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {vPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-400">
                  Page {visitorPage} of {vPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVisitorPage((p) => Math.max(1, p - 1))}
                    disabled={visitorPage === 1}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10
                               disabled:opacity-40 hover:border-purple-500 hover:text-purple-500 transition-all"
                  >← Prev</button>
                  <button
                    onClick={() => setVisitorPage((p) => Math.min(vPages, p + 1))}
                    disabled={visitorPage === vPages}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10
                               disabled:opacity-40 hover:border-purple-500 hover:text-purple-500 transition-all"
                  >Next →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {activeTab === "contacts" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{contacts.total} total messages</p>
            {cSlice.map((c) => (
              <div key={String(c.id)}
                className="p-5 rounded-2xl border border-gray-200 dark:border-white/10
                           bg-gray-50/50 dark:bg-white/5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{c.name}</span>
                      {c.anonymous && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10
                                         text-gray-500 dark:text-gray-400">
                          🕵️ Anonymous
                        </span>
                      )}
                    </div>
                    {!c.anonymous && (
                      <a href={`mailto:${c.email}`}
                        className="text-xs text-purple-500 hover:underline">{c.email}</a>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{c.ip}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {c.subject}
                </p>
                <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed
                               ${expandedMsg === String(c.id) ? "" : "line-clamp-2"}`}>
                  {c.message}
                </p>
                {c.message.length > 120 && (
                  <button
                    onClick={() => setExpandedMsg(expandedMsg === String(c.id) ? null : String(c.id))}
                    className="text-xs text-purple-500 hover:underline mt-1"
                  >
                    {expandedMsg === String(c.id) ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            ))}

            {/* Pagination */}
            {cPages > 1 && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">Page {contactPage} of {cPages}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContactPage((p) => Math.max(1, p - 1))}
                    disabled={contactPage === 1}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10
                               disabled:opacity-40 hover:border-purple-500 hover:text-purple-500 transition-all"
                  >← Prev</button>
                  <button
                    onClick={() => setContactPage((p) => Math.min(cPages, p + 1))}
                    disabled={contactPage === cPages}
                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-white/10
                               disabled:opacity-40 hover:border-purple-500 hover:text-purple-500 transition-all"
                  >Next →</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}