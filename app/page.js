"use client";
import { useState } from "react";

const TARGETS = [
  { rank: 1, name: "Amazon", pool: "Fortune 500", sector: "Technology", rivalry: "Walmart", employees: "1,570,000", emailBase: "~350,000", turmoil: 4.6, composite: 4.2, timing: "30K layoffs Jan 2026. RTO mandate ongoing.", status: "not_started", angle: "The biggest layoff in Amazon history. What do 350K corporate employees think?" },
  { rank: 2, name: "Dept. of Veterans Affairs", pool: "Federal Gov", sector: "Government", rivalry: "Cross-agency", employees: "482,000", emailBase: "~460,000", turmoil: 4.8, composite: 4.1, timing: "80K targeted reductions. Congressional pause expired.", status: "not_started", angle: "80K VA employees may lose their jobs. They serve people who served the country." },
  { rank: 3, name: "Oracle", pool: "Fortune 500", sector: "Technology", rivalry: "—", employees: "162,000", emailBase: "~130,000", turmoil: 4.8, composite: 4.1, timing: "30K fired via 6am email, Mar 31. Emotions raw NOW.", status: "not_started", angle: "Fired by a 6am email. Survivors told to stretch. $6B quarterly income." },
  { rank: 4, name: "OpenAI", pool: "Private", sector: "Technology / AI", rivalry: "Anthropic", employees: "~4,000", emailBase: "~4,000", turmoil: 3.8, composite: 3.7, timing: "For-profit conversion. Constant leadership drama.", status: "not_started", angle: "The company building AGI. What do people inside think about safety vs. speed?" },
  { rank: 5, name: "Anthropic", pool: "Private", sector: "Technology / AI", rivalry: "OpenAI", employees: "~1,100–5,000", emailBase: "~1,100–5,000", turmoil: 3.0, composite: 2.9, timing: "Essential rivalry pair with OpenAI.", status: "not_started", angle: "The safety-first AI lab. How do they compare to OpenAI on burnout and mission?" },
  { rank: 6, name: "Meta", pool: "Fortune 500", sector: "Technology", rivalry: "—", employees: "67,000", emailBase: "~67,000", turmoil: 4.2, composite: 4.0, timing: "Ongoing performance layoffs. Trust crisis.", status: "not_started", angle: "Masculine energy. Performance layoffs nobody believes. Where is this company heading?" },
  { rank: 7, name: "Disney", pool: "Fortune 500", sector: "Media", rivalry: "Warner Bros", employees: "225,000", emailBase: "~55,000", turmoil: 4.0, composite: 3.6, timing: "4th round of layoffs in a year.", status: "not_started", angle: "Four rounds of layoffs while revenue goes up. What do the people who make the magic think?" },
  { rank: 8, name: "Warner Bros Discovery", pool: "Fortune 500", sector: "Media", rivalry: "Disney", employees: "37,000", emailBase: "~28,000", turmoil: 4.2, composite: 3.8, timing: "Ongoing cable cuts. Merger culture clash.", status: "not_started", angle: "Two media giants merged and nobody's sure it's working." },
  { rank: 9, name: "Citigroup", pool: "Fortune 500", sector: "Finance", rivalry: "Morgan Stanley", employees: "240,000", emailBase: "~200,000", turmoil: 4.4, composite: 3.9, timing: "Layoffs begin Apr 14–18. TWO WEEK WINDOW.", status: "not_started", angle: "CEO: 'We are not graded on effort.' Employee: 'Total implosion.' 20K jobs cut." },
  { rank: 10, name: "Morgan Stanley", pool: "Fortune 500", sector: "Finance", rivalry: "Citigroup", employees: "82,000", emailBase: "~75,000", turmoil: 3.6, composite: 3.4, timing: "2,500 cut March 2026. Record profits + cuts.", status: "not_started", angle: "Record profits. 2,500 laid off anyway. Wall Street sentiment showdown with Citi." },
  { rank: 11, name: "Boeing", pool: "Fortune 500", sector: "Manufacturing", rivalry: "Lockheed Martin", employees: "170,000", emailBase: "~140,000", turmoil: 4.4, composite: 3.9, timing: "Safety crisis ongoing.", status: "not_started", angle: "Doors flying off. Criminal investigations. Do employees trust management to fix it?" },
  { rank: 12, name: "Target", pool: "Fortune 500", sector: "Retail", rivalry: "Walmart", employees: "440,000", emailBase: "~18,000", turmoil: 3.8, composite: 3.1, timing: "New CEO Feb 2026. 12 quarters falling sales.", status: "not_started", angle: "12 straight quarters down. New CEO. Can this ship turn around?" },
  { rank: 13, name: "HHS", pool: "Federal Gov", sector: "Government", rivalry: "Cross-agency", employees: "83,000", emailBase: "~80,000", turmoil: 4.8, composite: 4.0, timing: "Most DOGE-targeted agency. Cuts ongoing.", status: "not_started", angle: "Medicare, CDC, FDA — all under the knife. What do HHS employees think?" },
  { rank: 14, name: "Dept. of Education", pool: "Federal Gov", sector: "Government", rivalry: "Cross-agency", employees: "4,400", emailBase: "~4,400", turmoil: 5.0, composite: 3.9, timing: "Proposing 50% workforce cut. Existential.", status: "not_started", angle: "Half the agency might be eliminated. What do the people inside think?" },
  { rank: 15, name: "Nike", pool: "Fortune 500", sector: "Retail / Consumer", rivalry: "Adidas", employees: "79,000", emailBase: "~32,000", turmoil: 3.4, composite: 3.3, timing: "Distribution layoffs. Automation push.", status: "not_started", angle: "The swoosh vs. the stripes. Automation replacing jobs." },
  { rank: 16, name: "Planned Parenthood", pool: "Large NGO", sector: "Public Sector", rivalry: "—", employees: "12,000", emailBase: "~9,000", turmoil: 4.2, composite: 3.3, timing: "Internal turmoil. Political pressure never stops.", status: "not_started", angle: "Mission-driven employees navigating political warfare and internal turmoil." },
];

const CHANNELS = [
  { name: "Blind", type: "Community", priority: "High", targets: "Tech, Finance", status: "not_started", notes: "10M+ verified users. Amazon 124K, Meta 50K+. Anthropic ranked #1 on Blind." },
  { name: "Reddit", type: "Community", priority: "High", targets: "Fed Gov, Tech, Retail", status: "not_started", notes: "r/fednews 359K members. r/oracle, r/Target, r/boeing all active." },
  { name: "LinkedIn", type: "Social", priority: "High", targets: "All pools", status: "not_started", notes: "Carousel posts get 7% engagement. Personal profiles > company pages." },
  { name: "Press / PR", type: "Content", priority: "High", targets: "Data stories", status: "not_started", notes: "Rivalry data is journalist catnip. Target labor/workplace beats." },
  { name: "Newsletters", type: "Content", priority: "High", targets: "Workplace audience", status: "not_started", notes: "Work3 (30K+), Future of Work Culture, Working Life." },
  { name: "TikTok / Reels", type: "Social", priority: "Medium", targets: "Broad reach", status: "not_started", notes: "#CorporateTikTok 4.9B views. DeAndre Brown 1.1M followers." },
  { name: "Podcasts", type: "Content", priority: "Medium", targets: "Thought leadership", status: "not_started", notes: "WorkLife w/ Adam Grant, How to be Awesome (25M+ downloads)." },
  { name: "X / Twitter", type: "Social", priority: "Medium", targets: "Tech, Media, Gov", status: "not_started", notes: "Hot takes from survey data. Ride trending workplace stories." },
  { name: "Discord / Slack", type: "Community", priority: "Medium", targets: "Tech, Fed Gov", status: "not_started", notes: "Slack FedRAMP authorized. ReactiFlux 200K+ devs." },
  { name: "Facebook Groups", type: "Community", priority: "Medium", targets: "Gov, Healthcare, NGO", status: "not_started", notes: "Strong for nurses, teachers, federal worker groups." },
  { name: "Physical / QR", type: "Offline", priority: "Low", targets: "Coworking, events", status: "not_started", notes: "QR codes in WeWork spaces, HR Tech conferences." },
];

const RIVALRY_PAIRS = [
  { a: "OpenAI", b: "Anthropic", hook: "AI race: safety vs. speed", sector: "Technology / AI" },
  { a: "Amazon", b: "Walmart", hook: "Retail/tech empire clash", sector: "Technology / Retail" },
  { a: "Disney", b: "Warner Bros", hook: "Streaming wars", sector: "Media & Entertainment" },
  { a: "Citigroup", b: "Morgan Stanley", hook: "Wall Street layoff rivals", sector: "Finance" },
  { a: "Target", b: "Walmart", hook: "American retail duopoly", sector: "Retail" },
];

const STATUS_CONFIG = {
  not_started: { label: "Not Started", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  researching: { label: "Researching", color: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  seeding: { label: "Seeding", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  active: { label: "Active", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  paused: { label: "Paused", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
};

const POOL_COLORS = {
  "Fortune 500": "bg-blue-100 text-blue-700 border-blue-200",
  "Private": "bg-purple-100 text-purple-700 border-purple-200",
  "Federal Gov": "bg-red-100 text-red-700 border-red-200",
  "Large NGO": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function TurmoilBar({ score }) {
  const pct = (score / 5) * 100;
  const color = score >= 4.5 ? "bg-red-500" : score >= 3.5 ? "bg-orange-400" : "bg-yellow-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-500 w-8">{score.toFixed(1)}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PoolBadge({ pool }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${POOL_COLORS[pool] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {pool}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${colors[priority] || colors.Low}`}>
      {priority}
    </span>
  );
}

function CountdownBanner() {
  const diff = 26;
  const pct = ((30 - diff) / 30) * 100;
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-5 rounded-2xl flex items-center justify-between shadow-lg">
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Public Beta Launch</div>
        <div className="text-2xl font-bold mt-1 tracking-tight">May 1, 2026</div>
        <div className="mt-2 w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="text-right">
        <div className="text-5xl font-black tracking-tighter">{diff}</div>
        <div className="text-sm text-gray-400 -mt-1">days to go</div>
      </div>
    </div>
  );
}

function SummaryCards() {
  const totalEmail = "1.65M";
  const avgTurmoil = (TARGETS.reduce((s, t) => s + t.turmoil, 0) / TARGETS.length).toFixed(1);
  const urgentCount = TARGETS.filter(t => t.turmoil >= 4.5).length;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {[
        { label: "Targets", value: TARGETS.length, sub: "across 4 pools", icon: "🎯" },
        { label: "Addressable", value: totalEmail, sub: "est. corporate email", icon: "📧" },
        { label: "Avg Turmoil", value: avgTurmoil + "/5", sub: "higher = more opportunity", icon: "🔥" },
        { label: "Urgent", value: urgentCount, sub: "turmoil ≥ 4.5", icon: "⚡" },
        { label: "Rivalry Pairs", value: RIVALRY_PAIRS.length, sub: "viral mechanic", icon: "⚔️" },
      ].map((card, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2">
            <span className="text-lg">{card.icon}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{card.label}</span>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{card.value}</div>
          <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}

function TargetDetail({ target, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-black text-gray-900">#{target.rank}</span>
              <h2 className="text-2xl font-black text-gray-900">{target.name}</h2>
            </div>
            <div className="flex gap-2 mt-2">
              <PoolBadge pool={target.pool} />
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{target.sector}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Total Employees</div>
              <div className="text-lg font-bold mt-1">{target.employees}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Email Base</div>
              <div className="text-lg font-bold mt-1">{target.emailBase}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Turmoil Score</div>
            <TurmoilBar score={target.turmoil} />
          </div>

          {target.rivalry !== "—" && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="text-xs text-orange-600 uppercase font-semibold">Rivalry Pair</div>
              <div className="text-sm font-bold text-orange-800 mt-1">{target.name} vs. {target.rivalry}</div>
            </div>
          )}

          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Entry Angle</div>
            <p className="text-sm text-gray-700 italic">"{target.angle}"</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-xs text-yellow-600 uppercase font-semibold">Timing</div>
            <p className="text-sm text-yellow-800 mt-1">{target.timing}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase font-semibold">Status:</span>
            <StatusBadge status={target.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("targets");
  const [sortBy, setSortBy] = useState("rank");
  const [selectedTarget, setSelectedTarget] = useState(null);

  const sorted = [...TARGETS].sort((a, b) => {
    if (sortBy === "turmoil") return b.turmoil - a.turmoil;
    if (sortBy === "composite") return b.composite - a.composite;
    if (sortBy === "email") {
      const parseEmail = (s) => {
        const n = s.replace(/[^0-9]/g, "");
        return parseInt(n) || 0;
      };
      return parseEmail(b.emailBase) - parseEmail(a.emailBase);
    }
    return a.rank - b.rank;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Staff GTM Command Center</h1>
        </div>
        <p className="text-gray-500 text-sm">Go-to-market strategy tracker — 79seconds / staff.is</p>
      </div>

      <div className="space-y-4">
        <CountdownBanner />
        <SummaryCards />

        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1.5 w-fit shadow-sm">
          {[
            { id: "targets", label: "🎯 Targets", count: TARGETS.length },
            { id: "channels", label: "📡 Channels", count: CHANNELS.length },
            { id: "rivalries", label: "⚔️ Rivalries", count: RIVALRY_PAIRS.length },
            { id: "timeline", label: "📅 Timeline" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
              {t.count && <span className={`ml-1.5 text-xs ${tab === t.id ? "text-gray-400" : "text-gray-400"}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab === "targets" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">Target Companies</h2>
              <div className="flex gap-1.5 items-center">
                <span className="text-xs text-gray-400 mr-1">Sort by</span>
                {[
                  { key: "rank", label: "Rank" },
                  { key: "turmoil", label: "Turmoil" },
                  { key: "composite", label: "Score" },
                  { key: "email", label: "Email Base" },
                ].map((s) => (
                  <button key={s.key} onClick={() => setSortBy(s.key)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      sortBy === s.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 w-10">#</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Pool</th>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3">Rivalry</th>
                    <th className="px-4 py-3 text-right">Email Base</th>
                    <th className="px-4 py-3">Turmoil</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((t, i) => (
                    <tr
                      key={t.name}
                      onClick={() => setSelectedTarget(t)}
                      className={`border-b border-gray-50 cursor-pointer transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      } hover:bg-blue-50/60`}
                    >
                      <td className="px-5 py-3 text-gray-400 font-mono text-xs font-bold">{t.rank}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{t.name}</td>
                      <td className="px-4 py-3"><PoolBadge pool={t.pool} /></td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{t.sector}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{t.rivalry !== "—" ? `vs. ${t.rivalry}` : "—"}</td>
                      <td className="px-4 py-3 text-right font-mono text-gray-700 text-xs">{t.emailBase}</td>
                      <td className="px-4 py-3"><TurmoilBar score={t.turmoil} /></td>
                      <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "channels" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">Channel Strategy</h2>
              <p className="text-xs text-gray-400 mt-0.5">Prioritized distribution channels for seeding Staff</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3">Channel</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Best For</th>
                    <th className="px-4 py-3">Key Intel</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CHANNELS.map((ch, i) => (
                    <tr key={ch.name} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="px-5 py-3 font-semibold text-gray-900">{ch.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">{ch.type}</span>
                      </td>
                      <td className="px-4 py-3"><PriorityBadge priority={ch.priority} /></td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{ch.targets}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-xs">{ch.notes}</td>
                      <td className="px-4 py-3"><StatusBadge status={ch.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "rivalries" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Rivalry Pairs</h2>
              <p className="text-sm text-gray-500 mt-1">Each pair creates a natural "How does your company compare?" incentive to share Staff. This is the core viral mechanic.</p>
            </div>
            {RIVALRY_PAIRS.map((pair, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  <div className="flex-1 text-right">
                    <div className="text-xl font-black text-gray-900">{pair.a}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{pair.sector}</div>
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-sm shadow-lg">VS</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-black text-gray-900">{pair.b}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{pair.sector}</div>
                  </div>
                  <div className="flex-1 text-sm text-gray-600 border-l border-gray-200 pl-6 italic">
                    "{pair.hook}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "timeline" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 text-lg mb-1">26-Day Sprint to Public Beta</h2>
            <p className="text-sm text-gray-500 mb-6">Week-by-week execution plan — May 1, 2026 launch</p>
            <div className="space-y-0">
              {[
                { week: "Week 1", dates: "Apr 5–11", phase: "Foundation", color: "from-blue-500 to-blue-600", tasks: [
                  "Finalize target list and channel strategy",
                  "Begin seeding Oracle (emotions raw), Citi (layoffs Apr 14)",
                  "Draft rivalry pair content: OpenAI vs Anthropic",
                  "Identify and contact top 10 influencer/partnership targets",
                  "Set up profiles on Blind, join key Reddit communities",
                ]},
                { week: "Week 2", dates: "Apr 12–18", phase: "Seeding", color: "from-yellow-500 to-orange-500", tasks: [
                  "Citi layoffs hit Apr 14 — deploy Wall Street content on Blind + LinkedIn",
                  "First Reddit posts: r/fednews (federal angle), r/oracle",
                  "Launch 'Staff Says' carousel series on LinkedIn (Ross's profile)",
                  "Send partnership outreach to 3 newsletters + 3 podcasts",
                  "DM 2-3 TikTok workplace creators with data preview offer",
                ]},
                { week: "Week 3", dates: "Apr 19–25", phase: "Amplification", color: "from-green-500 to-emerald-500", tasks: [
                  "Double down on channels showing signal — cut what's not working",
                  "Launch rivalry pair content (OpenAI vs Anthropic)",
                  "Send first press pitch with early data insights",
                  "TikTok/Reels content: in-house or creator collab",
                  "First weekly review — revise strategy based on actual data",
                ]},
                { week: "Week 4", dates: "Apr 26–May 1", phase: "LAUNCH", color: "from-red-500 to-rose-600", tasks: [
                  "Full-court press across all active channels",
                  "Partnership content goes live",
                  "Press embargo lifts with launch story",
                  "🚀 PUBLIC BETA — MAY 1",
                  "Establish baseline metrics for all channels and targets",
                ]},
              ].map((w, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${w.color} flex items-center justify-center text-white text-sm font-black shadow-sm`}>
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-0.5 flex-1 bg-gray-200 my-2" />}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{w.week}</span>
                      <span className="text-sm text-gray-500">{w.dates}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${w.color}`}>{w.phase}</span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {w.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                          <span className={task.includes("PUBLIC BETA") || task.includes("🚀") ? "font-bold text-gray-900" : ""}>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTarget && <TargetDetail target={selectedTarget} onClose={() => setSelectedTarget(null)} />}

      <div className="mt-8 text-xs text-gray-400 text-center pb-4">
        Staff GTM Command Center v1.0 — Data as of April 5, 2026 — 79seconds
      </div>
    </div>
  );
}
