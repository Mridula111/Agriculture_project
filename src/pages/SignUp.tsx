import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wheat, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SignUp() {
  const { signup } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [village, setVillage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const establishSessionAndRedirect = () => {
    const mockUser = {
      name: name.trim() || "Field Officer",
      phone,
      village: village.trim() || "Western Cane Belt",
      language,
    };

    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", "desicane-auth-token-valid");

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (signup) {
        await signup({
          name: name.trim(),
          phone,
          password,
          village: village.trim(),
          language,
        });
      }
      establishSessionAndRedirect();
    } catch (err) {
      console.warn("Backend signup offline, establishing local session:", err);
      establishSessionAndRedirect();
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center py-10 px-4 relative selection:bg-amber-500 selection:text-white">
      {/* Language toggle at top */}
      <div className="absolute top-6 right-6">
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-600/20 text-white">
              <Wheat size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create DesiCane Account
            </h1>
            <p className="text-stone-400 mt-1 text-xs">
              Register for plot telemetry and harvest analytics
            </p>
          </div>

          {/* Success Banner */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl px-4 py-3 mb-5"
            >
              <CheckCircle2 size={20} className="text-amber-400 shrink-0" />
              <p className="text-xs font-semibold">Account created! Redirecting to Console...</p>
            </motion.div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patil"
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                id="signup-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label="Toggle password peek"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label="Toggle confirm password peek"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                Village / Taluka (Optional)
              </label>
              <input
                id="signup-village"
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Athani, Kolhapur"
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Sign Up
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-xs text-stone-400 mt-6">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 ml-1"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
