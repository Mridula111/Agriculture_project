import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Droplets, Wind, Thermometer, Compass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Weather() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 w-full transition-colors duration-200">
      <Navbar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6">
          <header className="pb-8 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400">
                {t("weatherBadge", "Microclimate Telemetry")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t("weatherTitle", "Canopy Weather & Evapotranspiration")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              {t("weatherDesc", "Field radar metrics, precipitation deficits, and cane growth thermal units (GDD).")}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Ambient Temp", value: "31.4°C", icon: Thermometer, sub: "Optimal range 28-34°C" },
              { label: "Canopy Humidity", value: "68%", icon: Droplets, sub: "Dew point index normal" },
              { label: "Wind Velocity", value: "14 km/h", icon: Wind, sub: "SSE direction" },
              { label: "Barometric Pressure", value: "1012 hPa", icon: Compass, sub: "Stable front" },
            ].map((item, i) => (
              <Card key={i} className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">{item.label}</p>
                    <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">{item.value}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">{item.sub}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <item.icon size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
              <CardHeader className="border-b border-stone-100 dark:border-stone-800/80">
                <CardTitle className="text-stone-900 dark:text-stone-200">5-Day Precipitation & Irrigation Outlook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {[
                  { day: "Today", rain: "0 mm", advice: "Schedule 45 min drip interval in Block 2" },
                  { day: "Tomorrow", rain: "2 mm", advice: "Maintain regular fertigation schedule" },
                  { day: "Friday", rain: "18 mm", advice: "Withhold canal supply; natural rainfall sufficient" },
                  { day: "Saturday", rain: "8 mm", advice: "Check perimeter runoff drainage" },
                  { day: "Sunday", rain: "0 mm", advice: "Resume sensor monitoring" },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm">
                    <span className="font-semibold text-stone-900 dark:text-white">{row.day}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono text-xs">{row.rain}</span>
                    <span className="text-stone-500 dark:text-stone-400 text-xs text-right">{row.advice}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-xs">
              <CardHeader className="border-b border-stone-100 dark:border-stone-800/80">
                <CardTitle className="text-stone-900 dark:text-stone-200">Growing Degree Days (GDD) Metric</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">Accumulated Heat Units</p>
                  <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">1,842 GDD</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Target for current tillering batch: 2,100 GDD</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Thermal time model indicates cane maturation rate is running 4 days ahead of typical seasonal curves.
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
