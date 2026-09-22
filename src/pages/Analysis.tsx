import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, Wheat, Beaker, TrendingUp, IndianRupee,
  ChevronDown, Leaf, Sprout,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PieChart } from "@/components/charts/PieChart";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";

/* ── Agri-science constants ── */
const VARIETIES = [
  { name: "Co 86032", baseTPA: 45, sugarRecovery: 11.2 },
  { name: "CoC 671", baseTPA: 42, sugarRecovery: 10.8 },
  { name: "Co 62175", baseTPA: 40, sugarRecovery: 10.5 },
  { name: "CoVSI 9805", baseTPA: 48, sugarRecovery: 11.5 },
  { name: "SNK 7698", baseTPA: 44, sugarRecovery: 10.9 },
];

const SOIL_FACTORS: Record<string, number> = {
  "Black Cotton (Vertisol)": 1.05,
  "Red Laterite": 0.92,
  "Alluvial": 1.0,
  "Sandy Loam": 0.88,
  "Clay Loam": 0.97,
};

const IRRIGATION_FACTORS: Record<string, number> = {
  "Drip": 1.15,
  "Sprinkler": 1.05,
  "Furrow (Flood)": 1.0,
  "Rain-fed": 0.75,
};

const SEASON_FACTORS: Record<string, number> = {
  "Adsali (Jul-Aug)": 1.10,
  "Pre-seasonal (Oct-Nov)": 1.05,
  "Suru (Jan-Feb)": 1.0,
  "Ratoon": 0.80,
};

const COST_ITEMS = [
  { name: "Seed / Setts", costPerAcre: 6000, color: "#d97706" },
  { name: "Fertilizers", costPerAcre: 8500, color: "#f59e0b" },
  { name: "Irrigation / Water", costPerAcre: 5000, color: "#06b6d4" },
  { name: "Labor", costPerAcre: 12000, color: "#b45309" },
  { name: "Pesticides", costPerAcre: 3500, color: "#ef4444" },
  { name: "Transport", costPerAcre: 4000, color: "#8b5cf6" },
  { name: "Misc / Rent", costPerAcre: 3000, color: "#ec4899" },
];

const MONTHLY_WATER = [
  { label: "Jan", value: 2.5 }, { label: "Feb", value: 3.2 }, { label: "Mar", value: 4.8 },
  { label: "Apr", value: 5.5 }, { label: "May", value: 6.0 }, { label: "Jun", value: 2.0 },
  { label: "Jul", value: 0.8 }, { label: "Aug", value: 0.5 }, { label: "Sep", value: 1.2 },
  { label: "Oct", value: 3.0 }, { label: "Nov", value: 4.0 }, { label: "Dec", value: 3.5 },
];

const YIELD_TRENDS = [
  { label: "2019", value: 36 }, { label: "2020", value: 38 }, { label: "2021", value: 40 },
  { label: "2022", value: 39 }, { label: "2023", value: 43 }, { label: "2024", value: 45 },
  { label: "2025", value: 47 }, { label: "2026", value: 50 },
];

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-stone-400 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-stone-900 text-stone-100">{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function Analysis() {
  const [plotArea, setPlotArea] = useState(5);
  const [variety, setVariety] = useState(VARIETIES[0].name);
  const [soil, setSoil] = useState(Object.keys(SOIL_FACTORS)[0]);
  const [irrigation, setIrrigation] = useState(Object.keys(IRRIGATION_FACTORS)[0]);
  const [season, setSeason] = useState(Object.keys(SEASON_FACTORS)[0]);
  const [brix, setBrix] = useState(20.5);
  const [pol, setPol] = useState(18.2);
  const [expandedSection, setExpandedSection] = useState<string | null>("yield");

  const selectedVariety = VARIETIES.find((v) => v.name === variety) || VARIETIES[0];

  // ── Yield prediction ──
  const yieldCalc = useMemo(() => {
    const baseTPA = selectedVariety.baseTPA;
    const soilF = SOIL_FACTORS[soil];
    const irrigF = IRRIGATION_FACTORS[irrigation];
    const seasonF = SEASON_FACTORS[season];
    const estimatedTPA = baseTPA * soilF * irrigF * seasonF;
    const totalYield = estimatedTPA * plotArea;
    return { baseTPA, soilF, irrigF, seasonF, estimatedTPA, totalYield };
  }, [selectedVariety, soil, irrigation, season, plotArea]);

  // ── Sugar recovery (CCS formula) ──
  const sugarCalc = useMemo(() => {
    const ccs = (pol * 0.946) - ((brix - pol) * 0.53);
    const frpBase = 340;
    const premiumPerPoint = 3.87;
    const baseRecovery = 10.25;
    const adjustedFRP = frpBase + ((ccs - baseRecovery) / 0.1) * premiumPerPoint;
    const revenuePerAcre = (yieldCalc.estimatedTPA * 10) * adjustedFRP;
    const totalRevenue = revenuePerAcre * plotArea;
    return { ccs, frpBase, adjustedFRP, revenuePerAcre, totalRevenue };
  }, [brix, pol, yieldCalc]);

  // ── Cost-benefit ──
  const costCalc = useMemo(() => {
    const totalCostPerAcre = COST_ITEMS.reduce((sum, item) => sum + item.costPerAcre, 0);
    const totalCost = totalCostPerAcre * plotArea;
    const profit = sugarCalc.totalRevenue - totalCost;
    const roi = ((profit / totalCost) * 100);
    return { totalCostPerAcre, totalCost, profit, roi };
  }, [sugarCalc, plotArea]);

  const costPieData = COST_ITEMS.map((item) => ({
    label: item.name,
    value: item.costPerAcre * plotArea,
    color: item.color,
  }));

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 w-full">
      {/* Sticky Left Sidebar */}
      <Navbar />

      {/* Main Content Area filling remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
          {/* Header Banner */}
          <header className="pb-8 border-b border-stone-800 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Agronomic Science Engine
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                <Beaker size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sugarcane Analysis & Sucrose Recovery
              </h1>
            </div>
            <p className="text-stone-400 text-sm mt-2 max-w-3xl leading-relaxed">
              Real-time yield prediction, commercial cane sugar (CCS) extraction indices, and harvest cost-benefit calculations.
            </p>
          </header>

          <div className="space-y-6 w-full">
            {/* ═══ YIELD PREDICTION ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 rounded-2xl border border-stone-800 shadow-md overflow-hidden w-full"
            >
              <button
                onClick={() => toggleSection("yield")}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-800/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Yield Prediction Calculator</h2>
                    <p className="text-xs text-stone-400">Based on regional agronomy trial calibration</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${expandedSection === "yield" ? "rotate-180" : ""}`} />
              </button>

              {expandedSection === "yield" && (
                <div className="px-6 pb-6 border-t border-stone-800/60 pt-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">Plot Area (Acres)</label>
                      <input
                        type="number"
                        value={plotArea}
                        onChange={(e) => setPlotArea(Math.max(0.5, Number(e.target.value)))}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        min={0.5}
                        step={0.5}
                      />
                    </div>
                    <SelectField label="Variety" value={variety} onChange={setVariety} options={VARIETIES.map((v) => v.name)} />
                    <SelectField label="Soil Type" value={soil} onChange={setSoil} options={Object.keys(SOIL_FACTORS)} />
                    <SelectField label="Irrigation Method" value={irrigation} onChange={setIrrigation} options={Object.keys(IRRIGATION_FACTORS)} />
                    <SelectField label="Season / Planting" value={season} onChange={setSeason} options={Object.keys(SEASON_FACTORS)} />
                  </div>

                  {/* Formula Display */}
                  <div className="bg-stone-950 rounded-xl p-4 mb-6 border border-stone-800">
                    <p className="text-xs font-mono text-stone-400 mb-2">Computational Formula:</p>
                    <p className="text-sm font-mono text-stone-300">
                      Yield = Base({yieldCalc.baseTPA}t) × Soil({yieldCalc.soilF}) × Irrigation({yieldCalc.irrigF}) × Season({yieldCalc.seasonF})
                    </p>
                    <p className="text-sm font-mono text-amber-400 font-bold mt-1">
                      = {yieldCalc.estimatedTPA.toFixed(1)} tonnes/acre
                    </p>
                  </div>

                  {/* Result Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { icon: Wheat, label: "Yield / Acre", value: `${yieldCalc.estimatedTPA.toFixed(1)}t` },
                      { icon: Sprout, label: "Total Yield", value: `${yieldCalc.totalYield.toFixed(0)}t` },
                      { icon: TrendingUp, label: "Sugar Recovery", value: `${selectedVariety.sugarRecovery}%` },
                      { icon: Leaf, label: "Variety Factor", value: `${selectedVariety.baseTPA}t base` },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="bg-stone-950 rounded-xl p-4 border border-stone-800 text-center"
                      >
                        <div className="w-10 h-10 bg-stone-900 border border-stone-800 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <card.icon size={18} />
                        </div>
                        <p className="text-xl font-black text-white">{card.value}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{card.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>

            {/* ═══ SUGAR RECOVERY ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 rounded-2xl border border-stone-800 shadow-md overflow-hidden w-full"
            >
              <button
                onClick={() => toggleSection("sugar")}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-800/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
                    <Beaker size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Sugar Recovery (CCS) Analysis</h2>
                    <p className="text-xs text-stone-400">Commercial Cane Sugar calculation — Mill Standards</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${expandedSection === "sugar" ? "rotate-180" : ""}`} />
              </button>

              {expandedSection === "sugar" && (
                <div className="px-6 pb-6 border-t border-stone-800/60 pt-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">Brix Reading (%)</label>
                      <input
                        type="number"
                        value={brix}
                        onChange={(e) => setBrix(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        min={10} max={30} step={0.1}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">Pol / Sucrose (%)</label>
                      <input
                        type="number"
                        value={pol}
                        onChange={(e) => setPol(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        min={5} max={25} step={0.1}
                      />
                    </div>
                  </div>

                  {/* CCS Formula */}
                  <div className="bg-stone-950 rounded-xl p-4 mb-6 border border-stone-800">
                    <p className="text-xs font-mono text-amber-400 mb-2">CCS Formula (Standard):</p>
                    <p className="text-sm font-mono text-stone-300">
                      CCS% = (Pol × 0.946) − ((Brix − Pol) × 0.53)
                    </p>
                    <p className="text-sm font-mono text-stone-400 mt-1">
                      CCS% = ({pol} × 0.946) − (({brix} − {pol}) × 0.53)
                    </p>
                    <p className="text-sm font-mono text-amber-400 font-bold mt-1">
                      = {sugarCalc.ccs.toFixed(2)}%
                    </p>
                  </div>

                  {/* Revenue Results */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: "CCS Recovery", value: `${sugarCalc.ccs.toFixed(2)}%`, sub: "Commercial Cane Sugar" },
                      { label: "Adjusted FRP", value: `₹${sugarCalc.adjustedFRP.toFixed(0)}`, sub: "Per quintal" },
                      { label: "Revenue / Acre", value: `₹${(sugarCalc.revenuePerAcre / 1000).toFixed(1)}k`, sub: `At ${yieldCalc.estimatedTPA.toFixed(1)}t/acre` },
                      { label: "Total Revenue", value: `₹${(sugarCalc.totalRevenue / 100000).toFixed(2)}L`, sub: `For ${plotArea} acres` },
                    ].map((card, i) => (
                      <div key={i} className="bg-stone-950 rounded-xl p-4 border border-stone-800">
                        <p className="text-xl font-black text-white">{card.value}</p>
                        <p className="text-xs font-semibold text-amber-400 mt-1">{card.label}</p>
                        <p className="text-[10px] text-stone-500">{card.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>

            {/* ═══ COST-BENEFIT ═══ */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 rounded-2xl border border-stone-800 shadow-md overflow-hidden w-full"
            >
              <button
                onClick={() => toggleSection("cost")}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-800/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
                    <IndianRupee size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Cost-Benefit Analysis</h2>
                    <p className="text-xs text-stone-400">Input costs vs. expected revenue — ROI calculation</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-stone-400 transition-transform duration-300 ${expandedSection === "cost" ? "rotate-180" : ""}`} />
              </button>

              {expandedSection === "cost" && (
                <div className="px-6 pb-6 border-t border-stone-800/60 pt-4">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-stone-300 mb-3">Cost Breakdown (per acre)</h3>
                      <div className="space-y-2">
                        {COST_ITEMS.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-stone-800">
                            <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-stone-300">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-white">₹{item.costPerAcre.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between py-2 font-bold">
                          <span className="text-sm text-white">Total per Acre</span>
                          <span className="text-sm text-amber-400">₹{costCalc.totalCostPerAcre.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3 border border-stone-800 bg-stone-950">
                          <p className="text-lg font-black text-amber-400">
                            ₹{(costCalc.profit / 100000).toFixed(2)}L
                          </p>
                          <p className="text-xs text-stone-400">Net Profit</p>
                        </div>
                        <div className="rounded-xl p-3 border border-stone-800 bg-stone-950">
                          <p className="text-lg font-black text-amber-400">
                            {costCalc.roi.toFixed(1)}%
                          </p>
                          <p className="text-xs text-stone-400">Estimated ROI</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <PieChart data={costPieData} title="Expense Distribution" />
                    </div>
                  </div>
                </div>
              )}
            </motion.section>

            {/* ═══ CHARTS SECTION ═══ */}
            <div className="grid lg:grid-cols-2 gap-6 w-full">
              <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 shadow-md w-full">
                <BarChart
                  data={MONTHLY_WATER}
                  title="Monthly Water Requirement (lakh litres/acre)"
                  height={220}
                  barColor="#d97706"
                />
              </div>

              <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 shadow-md w-full">
                <LineChart
                  data={YIELD_TRENDS}
                  title="Yield Trend (tonnes/acre) — Karnataka Regional Average"
                  height={220}
                  unit="t"
                  lineColor="#f59e0b"
                />
              </div>
            </div>

            {/* ═══ GROWTH STAGES TABLE ═══ */}
            <section className="bg-stone-900 rounded-2xl border border-stone-800 p-6 shadow-md w-full">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sprout size={18} className="text-amber-500" />
                Growth Stage Physiological Requirements
              </h2>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-800">
                      {["Stage", "Duration", "Water Need", "Fertilizer", "Key Action"].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-bold text-stone-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { stage: "Germination", duration: "0–45 days", water: "Low", fertilizer: "Minimal", action: "Maintain moisture" },
                      { stage: "Tillering", duration: "45–120 days", water: "Moderate", fertilizer: "N + Full P", action: "Avoid waterlogging" },
                      { stage: "Grand Growth", duration: "120–270 days", water: "HIGH ⚡", fertilizer: "N + K", action: "No moisture stress" },
                      { stage: "Maturation", duration: "270–360 days", water: "Reduce", fertilizer: "None", action: "Withhold 2wk pre-harvest" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-stone-800/60 hover:bg-stone-800/30 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">{row.stage}</td>
                        <td className="py-3 px-3 text-stone-400">{row.duration}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            row.water === "HIGH ⚡" ? "bg-rose-950/60 text-rose-400 border border-rose-800/40" :
                            row.water === "Moderate" ? "bg-amber-950/60 text-amber-400 border border-amber-800/40" :
                            "bg-stone-800 text-stone-300"
                          }`}>
                            {row.water}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-stone-400">{row.fertilizer}</td>
                        <td className="py-3 px-3 text-stone-400">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
