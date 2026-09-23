import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Wifi } from "lucide-react";

export default function IoT() {
  const { t } = useLanguage();

  const nodes = [
    { id: "NODE-CAN-01", sector: "Block 1 (North)", soilMoist: "78%", ec: "1.2 dS/m", battery: "94%", status: "Active" },
    { id: "NODE-CAN-02", sector: "Block 2 (Ratoon)", soilMoist: "62%", ec: "1.5 dS/m", battery: "88%", status: "Active" },
    { id: "NODE-CAN-03", sector: "Block 3 (Canal East)", soilMoist: "71%", ec: "1.1 dS/m", battery: "91%", status: "Active" },
    { id: "NODE-CAN-04", sector: "Block 4 (Subsurface Drip)", soilMoist: "84%", ec: "1.4 dS/m", battery: "79%", status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 w-full transition-colors duration-200">
      <Navbar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6">
          <header className="pb-8 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400">
                {t("iotBadge", "Sensor Telemetry Mesh")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t("iotTitle", "IoT Edge Gateways & Soil Probes")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              {t("iotDesc", "Real-time wireless capacitive sensors, salinity probes, and valve actuators.")}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nodes.map((node) => (
              <div key={node.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800/80 mb-3">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">{node.id}</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Wifi size={12} /> {node.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-stone-900 dark:text-stone-200 font-semibold text-sm">{node.sector}</p>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800/60">
                    <span>Soil Moisture:</span>
                    <span className="text-stone-900 dark:text-white font-mono font-medium">{node.soilMoist}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Conductivity (EC):</span>
                    <span className="text-stone-900 dark:text-white font-mono font-medium">{node.ec}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Gateway Battery:</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono font-medium">{node.battery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
