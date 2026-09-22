import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Download, FileText } from "lucide-react";

export default function Reports() {
  const reports = [
    { title: "Weekly Sucrose Brix Analysis", date: "May 2026", type: "Laboratory PDF", status: "Certified" },
    { title: "Quarterly Water Footprint Audit", date: "April 2026", type: "Environmental Report", status: "Submitted" },
    { title: "Sugar Mill Delivery Schedule & Quota", date: "April 2026", type: "Logistics Manifest", status: "Approved" },
    { title: "Soil Salinity & Nitrogen Depletion Map", date: "March 2026", type: "Agronomy Scan", status: "Archived" },
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
                Audits & Compliance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Field Reports & Mill Export Logs
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Agronomy diagnostics, factory quality certificates, and season yield sheets.
            </p>
          </header>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-sm">
            <div className="space-y-3">
              {reports.map((rep, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-stone-950 border border-stone-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{rep.title}</p>
                      <p className="text-xs text-stone-400">{rep.date} • {rep.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-950/40 text-amber-300 border border-amber-800/40">
                      {rep.status}
                    </span>
                    <button className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
