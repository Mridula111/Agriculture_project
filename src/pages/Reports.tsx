import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Download, FileText } from "lucide-react";

export default function Reports() {
  const { t } = useLanguage();

  const reports = [
    { title: "Weekly Sucrose Brix Analysis", date: "May 2026", type: "Laboratory PDF", status: "Certified" },
    { title: "Quarterly Water Footprint Audit", date: "April 2026", type: "Environmental Report", status: "Submitted" },
    { title: "Sugar Mill Delivery Schedule & Quota", date: "April 2026", type: "Logistics Manifest", status: "Approved" },
    { title: "Soil Salinity & Nitrogen Depletion Map", date: "March 2026", type: "Agronomy Scan", status: "Archived" },
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
                {t("reportsBadge", "Audits & Compliance")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t("reportsTitle", "Field Reports & Mill Export Logs")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              {t("reportsDesc", "Agronomy diagnostics, factory quality certificates, and season yield sheets.")}
            </p>
          </header>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
            <div className="space-y-3">
              {reports.map((rep, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900 dark:text-white">{rep.title}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{rep.date} • {rep.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/40">
                      {rep.status}
                    </span>
                    <button className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
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
