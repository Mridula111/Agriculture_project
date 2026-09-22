import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Map, 
  Droplets, 
  Brain, 
  ArrowUpRight, 
  CloudRain, 
  Calculator, 
  FileText, 
  Cpu, 
  Package,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const stats = [
  { icon: Users, labelKey: "farmersServed" as const, defaultLabel: "Registered Planters", value: "2,400+", change: "+12% this cycle" },
  { icon: Map, labelKey: "plotsDigitized" as const, defaultLabel: "Cane Acreage", value: "850 ha", change: "GPS Mapped" },
  { icon: Droplets, labelKey: "waterSaved" as const, defaultLabel: "Drip Irrigation Saved", value: "32%", change: "1.2M L Net" },
  { icon: Brain, labelKey: "aiModels" as const, defaultLabel: "Predictive Models", value: "3 Active", change: "99.2% Accuracy" },
];

const operations = [
  {
    titleKey: "analysis" as const,
    defaultTitle: "Yield & Sucrose Analytics",
    desc: "Calculate estimated sugar recovery (ESR) and crop biomass per hectare.",
    icon: Calculator,
    link: "/analysis",
    badge: "Calculator",
  },
  {
    titleKey: "weather" as const,
    defaultTitle: "Microclimate Telemetry",
    desc: "Rainfall deficit forecasts and humidity metrics for cane ripening.",
    icon: CloudRain,
    link: "/weather",
    badge: "Radar",
  },
  {
    titleKey: "iot" as const,
    defaultTitle: "Field Sensor Mesh",
    desc: "Real-time edge nodes for soil salinity, nitrogen, and canal flow.",
    icon: Cpu,
    link: "/iot",
    badge: "Hardware",
  },
  {
    titleKey: "inventory" as const,
    defaultTitle: "Cane Stocks & Fertilizer",
    desc: "Urea, potash allocation, and harvest transport scheduling.",
    icon: Package,
    link: "/inventory",
    badge: "Logistics",
  },
  {
    titleKey: "reports" as const,
    defaultTitle: "Diagnostics & Audits",
    desc: "Laboratory field reports, mill compliance certificates, and export logs.",
    icon: FileText,
    link: "/reports",
    badge: "Compliance",
  },
];

export default function Home() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 w-full">
      {/* Sticky Left Sidebar */}
      <Navbar />

      {/* Main Content Area filling remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
          {/* Header Ribbon */}
          <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-stone-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                  Sugarcane Agronomy & Milling Platform
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Harvest Command Console
              </h1>
              <p className="text-sm text-stone-400 mt-0.5">
                Welcome back, <span className="font-semibold text-amber-400">{currentUser?.name || "Field Officer"}</span> • Station Sector 4
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-800/40">
                Milling Cycle: 2026 Season
              </span>
            </div>
          </header>

          {/* Top Metric Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {stats.map((stat, i) => (
              <Card key={i} className="hover:border-amber-700/60 bg-stone-900 border-stone-800">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      {t(stat.labelKey) || stat.defaultLabel}
                    </p>
                    <p className="text-2xl font-black text-white mt-1">
                      {stat.value}
                    </p>
                    <span className="inline-block text-[11px] font-bold text-amber-400 mt-1">
                      {stat.change}
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400">
                    <stat.icon size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Telemetry Visualizer Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-stone-900 border-stone-800">
              <CardHeader className="flex flex-row items-center justify-between border-stone-800">
                <div>
                  <CardTitle className="text-stone-300">Sugarcane Biomass & Sucrose Trajectory</CardTitle>
                  <p className="text-xs text-stone-400">Tons per Acre Growth Curve</p>
                </div>
                <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-md">
                  +24% Target Yield
                </span>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full relative pt-4">
                  <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="caneAmberGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {[40, 90, 140, 190].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="currentColor" className="text-stone-800" strokeDasharray="3 3" />
                    ))}

                    <path
                      d="M 0,180 C 150,170 240,110 380,80 C 480,60 540,30 600,20 L 600,200 L 0,200 Z"
                      fill="url(#caneAmberGradient)"
                    />

                    <motion.path
                      d="M 0,180 C 150,170 240,110 380,80 C 480,60 540,30 600,20"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {[{ cx: 0, cy: 180 }, { cx: 240, cy: 110 }, { cx: 380, cy: 80 }, { cx: 600, cy: 20 }].map((p, idx) => (
                      <circle key={idx} cx={p.cx} cy={p.cy} r="5" className="fill-stone-900 stroke-amber-500 stroke-[3px]" />
                    ))}
                  </svg>

                  <div className="flex justify-between text-xs font-semibold text-stone-400 mt-4 px-1">
                    <span>Planting / Germination</span>
                    <span>Tillering Phase</span>
                    <span>Grand Growth</span>
                    <span>Milling Ripening</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Metrics */}
            <Card className="bg-stone-900 border-stone-800">
              <CardHeader className="border-stone-800">
                <CardTitle className="text-stone-300">Telemetry Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-300">Soil Moisture Threshold</span>
                    <span className="text-amber-400">76% Optimal</span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-300">Sucrose Content Index (Brix)</span>
                    <span className="text-amber-400">19.4° Bx</span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-300">Edge Gateway Sync</span>
                    <span className="text-stone-400">Live (30s)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Modules Grid */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold tracking-tight uppercase text-stone-400">
                Operational Portals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {operations.map((mod, i) => (
                <Link
                  key={i}
                  to={mod.link}
                  className="group p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-stone-800 group-hover:bg-amber-950/40 text-stone-300 group-hover:text-amber-400 transition-colors flex items-center justify-center">
                        <mod.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                        {mod.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                      {t(mod.titleKey) || mod.defaultTitle}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-stone-400 group-hover:text-amber-400 mt-4 transition-colors">
                    <span>Enter</span>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
