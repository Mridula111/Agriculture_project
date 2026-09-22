import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { 
  Sprout, 
  LogOut, 
  LayoutDashboard, 
  Newspaper, 
  Moon, 
  Sun, 
  BarChart3, 
  CloudSun, 
  FileSpreadsheet, 
  Cpu, 
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function Navbar() {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const isDarkStored = localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDarkStored) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/home", icon: LayoutDashboard, label: "Console" },
    { path: "/analysis", icon: BarChart3, label: "Analytics" },
    { path: "/weather", icon: CloudSun, label: "Telemetry" },
    { path: "/inventory", icon: Layers, label: "Crops & Stock" },
    { path: "/iot", icon: Cpu, label: "IoT Sensors" },
    { path: "/reports", icon: FileSpreadsheet, label: "Diagnostics" },
    { path: "/news", icon: Newspaper, label: "Bulletins" },
  ];

  return (
    <>
      {/* ── Left Sidebar Navigation ── */}
      <aside className={`fixed top-0 left-0 h-screen z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${collapsed ? "w-20" : "w-64"}`}>
        
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <Link to="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Sprout size={22} />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                    AgroPulse
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    Sugarcane OS
                  </span>
                </div>
              )}
            </Link>
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  title={collapsed ? link.label : undefined}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-semibold shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <link.icon size={19} className={isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <div className={`flex items-center ${collapsed ? "flex-col gap-2" : "justify-between"} px-2 py-1`}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="shrink-0 scale-90">
              <LanguageToggle />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ${collapsed ? "justify-center" : ""}`}
            title="Sign Out"
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Spacer to push content right on desktop */}
      <div className={`hidden md:block transition-all duration-300 ${collapsed ? "w-20" : "w-64"} shrink-0`} />
    </>
  );
}
