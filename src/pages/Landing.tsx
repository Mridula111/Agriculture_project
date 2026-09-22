import { Link, Navigate } from "react-router-dom";
import { Wheat, BarChart3, ShieldCheck, Radio, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Landing() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 h-20 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/30">
            <Wheat size={22} />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            CaneSense <span className="text-amber-400 font-normal text-xs uppercase ml-1 px-1.5 py-0.5 rounded border border-amber-500/30">Harvest OS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-stone-300 hover:text-white hover:bg-stone-900">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">
              Access Console
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-xs font-semibold mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Autonomous Sugarcane Biomass & Milling Telemetry
        </motion.div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-white">
          Intelligent crop telemetry for sugarcane harvests.
        </h1>

        <p className="mt-6 text-base sm:text-xl text-stone-400 max-w-2xl leading-relaxed">
          Monitor sucrose maturation curves, optimize irrigation scheduling, and track milling supply logistics in a unified platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup">
            <Button variant="primary" className="px-8 py-3.5 text-base">
              Launch Platform <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="px-8 py-3.5 text-base bg-stone-900 hover:bg-stone-800 text-stone-200">
              Existing Account
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 mb-4">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Sucrose Ripening Curve</h3>
            <p className="text-sm text-stone-400 mt-2">Accurately determine peak Brix levels for maximum mill extraction value.</p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 mb-4">
              <Radio size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Field Sensor Grid</h3>
            <p className="text-sm text-stone-400 mt-2">Live soil salinity and canal water flow rates synced via low-power nodes.</p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-white text-base">Automated Compliance</h3>
            <p className="text-sm text-stone-400 mt-2">Export laboratory audit reports and regulatory yield metrics instantly.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-900 py-6 text-center text-xs text-stone-600">
        CaneSense Harvest Platform • Field Research Edition
      </footer>
    </div>
  );
}
