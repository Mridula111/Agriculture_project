import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Map, 
  Droplets, 
  Brain, 
  ArrowUpRight, 
  TrendingUp, 
  CloudRain, 
  ShieldCheck, 
  Calculator, 
  FileText, 
  Cpu, 
  Package,
  Layers
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const stats = [
  { icon: Users, label: "Registered Planters", value: "2,400+", change: "+14% MoM" },
  { icon: Map, label: "Digitized Acreage", value: "850 ha", change: "Verified" },
  { icon: Droplets, label: "Irrigation Efficiency", value: "+32%", change: "Optimized" },
  { icon: Brain, label: "Active Inference Engines", value: "3 Online", change: "v2.4" },
];

const operations = [
  {
    title: "Yield & Moisture Analytics",
    desc: "Precision soil moisture & predictive crop yield forecasting.",
    icon: Calculator,
    link: "/analysis",
    badge: "Engine",
  },
  {
    title: "Microclimate Telemetry",
    desc: "Precipitation probability and localized humidity indexes.",
    icon: CloudRain,
    link: "/weather",
    badge: "Live",
  },
  {
    title: "Field Sensor Mesh (IoT)",
    desc: "Real-time edge gateway status and flow meter parameters.",
    icon: Cpu,
    link: "/iot",
    badge: "Hardware",
  },
  {
    title: "Crops & Resource Stock",
    desc: "Fertilizer distribution, batch tracking, and harvest ledgers.",
    icon: Package,
    link: "/inventory",
    badge: "Logistics",
  },
  {
    title: "Agronomy Diagnostics",
    desc: "Exportable compliance audits and laboratory field insights.",
    icon: FileText,
    link: "/reports",
    badge: "Audit",
  },
];

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#070b13] text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 p-6 lg:p-10 max-w-[1500px]">
        {/* Top Control Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Precision Agri Platform</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Agronomy Command Center
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Assigned to: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{currentUser?.name || "Field Specialist"}</span> • Bio-Intelligence Unit
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Station: Godavari Research Labs
            </span>
          </div>
        </header>

        {/* Executive KPI Stat Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {stats.map((stat, i) => (
            <Card key={i} className="hover:border-slate-300 dark:hover:border-slate-700">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  <span className="inline-block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {stat.change}
                  </span>
                </div>
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <stat.icon size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Bento Overview Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Telemetry Visualizer Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Crop Yield Variance Curve</CardTitle>
                <p className="text-xs text-slate-400">Field Trial Biomass Index (Tons / Acre)</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                +24.8% Projected
              </span>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full relative pt-4">
                <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Subtle Grid Lines */}
                  {[40, 90, 140, 190].map((y) => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                  ))}

                  {/* Shaded Area */}
                  <path
                    d="M 0,180 C 150,170 240,110 380,80 C 480,60 540,30 600,20 L 600,200 L 0,200 Z"
                    fill="url(#curveGradient)"
                  />

                  {/* Main Curve */}
                  <motion.path
                    d="M 0,180 C 150,170 240,110 380,80 C 480,60 540,30 600,20"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Marker Nodes */}
                  {[{ cx: 0, cy: 180 }, { cx: 240, cy: 110 }, { cx: 380, cy: 80 }, { cx: 600, cy: 20 }].map((p, idx) => (
                    <circle key={idx} cx={p.cx} cy={p.cy} r="5" className="fill-white dark:fill-slate-900 stroke-emerald-600 stroke-[3px]" />
                  ))}
                </svg>

                <div className="flex justify-between text-xs font-semibold text-slate-400 mt-4 px-1">
                  <span>Q1 Inception</span>
                  <span>Q2 Nitrogen Cycle</span>
                  <span>Q3 Tillering</span>
                  <span>Q4 Peak Maturation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics Aside */}
          <Card>
            <CardHeader>
              <CardTitle>System Diagnostics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Soil Moisture Threshold</span>
                  <span className="text-emerald-600 dark:text-emerald-400">76%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "76%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Edge Gateway Uptime</span>
                  <span className="text-emerald-600 dark:text-emerald-400">99.8%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99.8%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Telemetry Sync</span>
                  <span className="text-slate-400">Every 60s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Operational Modules Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Operational Modules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {operations.map((mod, i) => (
              <Link
                key={i}
                to={mod.link}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 transition-colors flex items-center justify-center">
                      <mod.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-4 transition-colors">
                  <span>Open</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
