import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCheck, AlertTriangle, ArrowUpDown, Truck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Inventory() {
  const stocks = [
    { item: "Urea (Granular)", qty: "14.2 MT", target: "20.0 MT", status: "Adequate" },
    { item: "MOP (Muriate of Potash)", qty: "3.1 MT", target: "8.0 MT", status: "Low Stock" },
    { item: "DAP (Diammonium Phosphate)", qty: "8.5 MT", target: "10.0 MT", status: "Adequate" },
    { item: "Drip Lateral Tubing (16mm)", qty: "1,200 m", target: "1,500 m", status: "Adequate" },
    { item: "Bagasse Solid Biomass", qty: "48.0 MT", target: "30.0 MT", status: "Surplus" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 w-full">
      <Navbar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6">
          <header className="pb-8 border-b border-stone-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Resource Logistics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cane Stocks & Fertilizer Allocation
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Field depot storage, input balances, and mill transport staging.
            </p>
          </header>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <PackageCheck size={18} className="text-amber-400" />
              Warehouse Depot Reserves
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-left text-xs uppercase tracking-wider text-stone-400 font-bold">
                    <th className="py-3 px-3">Resource Item</th>
                    <th className="py-3 px-3">Available Reserve</th>
                    <th className="py-3 px-3">Sector Target</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((s, idx) => (
                    <tr key={idx} className="border-b border-stone-800/60 hover:bg-stone-800/30">
                      <td className="py-3 px-3 font-semibold text-white">{s.item}</td>
                      <td className="py-3 px-3 text-stone-300 font-mono">{s.qty}</td>
                      <td className="py-3 px-3 text-stone-400 font-mono">{s.target}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          s.status === "Low Stock"
                            ? "bg-rose-950/60 text-rose-400 border border-rose-800/40"
                            : s.status === "Surplus"
                            ? "bg-blue-950/60 text-blue-400 border border-blue-800/40"
                            : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
