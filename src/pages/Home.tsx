import { useState } from "react";
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
    descKey: "analysisDesc" as const,
    defaultDesc: "Calculate estimated sugar recovery (ESR) and crop biomass per hectare.",
    icon: Calculator,
    link: "/analysis",
    badge: "Calculator",
  },
  {
    titleKey: "weather" as const,
    defaultTitle: "Microclimate Telemetry",
    descKey: "weatherDesc" as const,
    defaultDesc: "Rainfall deficit forecasts and humidity metrics for cane ripening.",
    icon: CloudRain,
    link: "/weather",
    badge: "Radar",
  },
  {
    titleKey: "iot" as const,
    defaultTitle: "Field Sensor Mesh",
    descKey: "iotDesc" as const,
    defaultDesc: "Real-time edge nodes for soil salinity, nitrogen, and canal flow.",
    icon: Cpu,
    link: "/iot",
    badge: "Hardware",
  },
  {
    titleKey: "inventory" as const,
    defaultTitle: "Cane Stocks & Fertilizer",
    descKey: "inventoryDesc" as const,
    defaultDesc: "Urea, potash allocation, and harvest transport scheduling.",
    icon: Package,
    link: "/inventory",
    badge: "Logistics",
  },
  {
    titleKey: "reports" as const,
    defaultTitle: "Diagnostics & Audits",
    descKey: "reportsDesc" as const,
    defaultDesc: "Laboratory field reports, mill compliance certificates, and export logs.",
    icon: FileText,
    link: "/reports",
    badge: "Compliance",
  },
];

const trajectoryPoints = [
  { name: "Germination", days: "Day 0–45", yieldTPA: "12 t/ac", brix: "8.2° Bx", cx: 40, cy: 180 },
  { name: "Tillering Phase", days: "Day 45–120", yieldTPA: "26 t/ac", brix: "12.4° Bx", cx: 210, cy: 135 },
  { name: "Grand Growth", days: "Day 120–270", yieldTPA: "44 t/ac", brix: "16.8° Bx", cx: 390, cy: 90 },
  { name: "Milling Ripening", days: "Day 270–360", yieldTPA: "59.8 t/ac", brix: "20.5° Bx", cx: 560, cy: 40 },
];

export default function Home() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [activePoint, setActivePoint] = useState<typeof trajectoryPoints[0] | null>(null);

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 w-full transition-colors duration-200">
      {/* Sticky Left Sidebar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
          
          {/* Header Ribbon */}
          <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-stone-200 dark:border-stone-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400">
                  {t("platformBadge", "Sugarcane Agronomy & Milling Platform")}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                {t("consoleTitle", "Harvest Command Console")}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {t("welcomePrefix", "Welcome back,")}{" "}
                <span className="font-semibold text-amber-700 dark:text-amber-400">
                  {currentUser?.name || t("fieldOfficer", "Field Officer")}
                </span>{" "}
                • {t("stationSector", "Station Sector 4")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/40">
                {t("millingCycleBadge", "Milling Cycle: 2026 Season")}
              </span>
            </div>
          </header>

          {/* Top Metric Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {stats.map((stat, i) => (
              <Card key={i} className="hover:border-amber-400 dark:hover:border-amber-700/60 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      {t(stat.labelKey) || stat.defaultLabel}
                    </p>
                    <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <span className="inline-block text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                      {stat.change}
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <stat.icon size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Telemetry Visualizer Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800/80">
                <div>
                  <CardTitle className="text-stone-900 dark:text-stone-200">
                    {t("trajectoryTitle", "Sugarcane Biomass & Sucrose Trajectory")}
                  </CardTitle>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {t("trajectorySub", "Tons per Acre Growth Curve")}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {activePoint ? (
                    <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-600/50 px-3 py-1 rounded-md transition-all">
                      {activePoint.name}: <strong className="text-stone-900 dark:text-white">{activePoint.yieldTPA}</strong> ({activePoint.brix})
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/40 px-2.5 py-1 rounded-md">
                      {t("targetYield", "+24% Target Yield")}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4 pb-6">
                <div className="h-72 w-full relative">
                  <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="caneAmberGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {[30, 80, 130, 180].map((y) => (
                      <line
                        key={y}
                        x1="20"
                        y1={y}
                        x2="580"
                        y2={y}
                        stroke="currentColor"
                        className="text-stone-200 dark:text-stone-800/80"
                        strokeDasharray="4 4"
                      />
                    ))}

                    <path
                      d="M 40,180 C 150,165 210,135 300,110 C 390,90 480,55 560,40 L 560,200 L 40,200 Z"
                      fill="url(#caneAmberGradient)"
                    />

                    <motion.path
                      d="M 40,180 C 150,165 210,135 300,110 C 390,90 480,55 560,40"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {trajectoryPoints.map((pt, idx) => {
                      const isSelected = activePoint?.name === pt.name;
                      return (
                        <g
                          key={idx}
                          className="cursor-pointer"
                          onMouseEnter={() => setActivePoint(pt)}
                          onMouseLeave={() => setActivePoint(null)}
                        >
                          <circle cx={pt.cx} cy={pt.cy} r="18" fill="transparent" />

                          {isSelected && (
                            <circle
                              cx={pt.cx}
                              cy={pt.cy}
                              r="12"
                              className="fill-amber-500/20 stroke-amber-400 stroke-1 animate-pulse"
                            />
                          )}

                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isSelected ? "7" : "5"}
                            className={`transition-all duration-200 fill-white dark:fill-stone-900 stroke-[3px] ${
                              isSelected ? "stroke-amber-400 scale-125" : "stroke-amber-600"
                            }`}
                          />

                          {isSelected && (
                            <g className="transition-all duration-150">
                              <rect
                                x={pt.cx - 50}
                                y={pt.cy - 48}
                                width="100"
                                height="36"
                                rx="8"
                                className="fill-stone-900 dark:fill-stone-950 stroke border stroke-amber-500/60 shadow-xl"
                              />
                              <text
                                x={pt.cx}
                                y={pt.cy - 34}
                                textAnchor="middle"
                                className="fill-amber-300 text-[11px] font-bold"
                              >
                                {pt.yieldTPA}
                              </text>
                              <text
                                x={pt.cx}
                                y={pt.cy - 19}
                                textAnchor="middle"
                                className="fill-stone-300 text-[9px] font-mono"
                              >
                                {pt.days}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  <div className="grid grid-cols-4 text-center text-xs font-medium text-stone-500 dark:text-stone-400 mt-2 px-2 border-t border-stone-100 dark:border-stone-800/60 pt-3">
                    {trajectoryPoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className={`cursor-pointer transition-colors ${
                          activePoint?.name === pt.name ? "text-amber-600 dark:text-amber-400 font-bold" : "hover:text-stone-900 dark:hover:text-stone-200"
                        }`}
                        onMouseEnter={() => setActivePoint(pt)}
                        onMouseLeave={() => setActivePoint(null)}
                      >
                        <p className="truncate">{pt.name}</p>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">{pt.days}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Metrics */}
            <Card className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
              <CardHeader className="border-stone-100 dark:border-stone-800">
                <CardTitle className="text-stone-900 dark:text-stone-300">
                  {t("operationalPortals", "Telemetry Status")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-600 dark:text-stone-300">
                      {t("soilMoistureThreshold", "Soil Moisture Threshold")}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400">76% Optimal</span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-600 dark:text-stone-300">
                      {t("sucroseContentIndex", "Sucrose Content Index (Brix)")}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400">19.4° Bx</span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-stone-600 dark:text-stone-300">
                      {t("edgeGatewaySync", "Edge Gateway Sync")}
                    </span>
                    <span className="text-stone-400">Live (30s)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Modules Grid */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold tracking-tight uppercase text-stone-500 dark:text-stone-400">
                {t("operationalPortals", "Operational Portals")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {operations.map((mod, i) => (
                <Link
                  key={i}
                  to={mod.link}
                  className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 text-stone-700 dark:text-stone-300 group-hover:text-amber-600 transition-colors flex items-center justify-center">
                        <mod.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                        {mod.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {t(mod.titleKey) || mod.defaultTitle}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      {t(mod.descKey) || mod.defaultDesc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 mt-4 transition-colors">
                    <span>{t("enter", "Enter")}</span>
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
