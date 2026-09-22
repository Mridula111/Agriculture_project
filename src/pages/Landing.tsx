import { Link, Navigate } from "react-router-dom";
import { Sprout, BarChart2, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Landing() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Simple Nav */}
      <header className="max-w-7xl mx-auto w-full px-6 h-20 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Sprout size={22} />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            AgroPulse <span className="text-emerald-400 font-normal text-sm ml-1">OS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-900">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">
              Register Account
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Autonomous Sugarcane Intelligence & Yield Engineering
        </motion.div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-white">
          Precision telemetry for modern agricultural yield.
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Integrated crop moisture analytics, IoT node orchestration, and predictive yield models designed for modern agronomy stations.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup">
            <Button variant="primary" className="px-8 py-3.5 text-base">
              Launch Farm Console <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="px-8 py-3.5 text-base bg-slate-900 hover:bg-slate-800 text-slate-200">
              Access Credentials
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-4">
              <BarChart2 size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Moisture Diagnostics</h3>
            <p className="text-sm text-slate-400 mt-2">Continuous sensor validation and deficit calculations.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-4">
              <Cpu size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Edge IoT Sync</h3>
            <p className="text-sm text-slate-400 mt-2">Low-latency soil gateway telemetry across plot sectors.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Predictive Harvest</h3>
            <p className="text-sm text-slate-400 mt-2">Biomass curve estimation with machine-learned calibration.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        AgroPulse Telemetry Platform • Academic Research Edition
      </footer>
    </div>
  );
}
