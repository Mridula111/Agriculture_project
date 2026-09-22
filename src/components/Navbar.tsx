import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { 
  Wheat, 
  LogOut, 
  LayoutGrid, 
  Newspaper, 
  Moon, 
  Sun, 
  BarChart2, 
  CloudSun, 
  ClipboardList, 
  Radio, 
  PackageCheck,
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
    { path: "/home", icon: LayoutGrid, labelKey: "home" as const, fallback: "Command Center" },
    { path: "/analysis", icon: BarChart2, labelKey: "analysis" as const, fallback: "Yield & Analytics" },
    { path: "/weather", icon: CloudSun, labelKey: "weather" as const, fallback: "Microclimate" },
    { path: "/inventory", icon: PackageCheck, labelKey: "inventory" as const, fallback: "Stock & Biomass" },
    { path: "/iot", icon: Radio, labelKey: "iot" as const, fallback: "IoT Field Grid" },
    { path: "/reports", icon: ClipboardList, labelKey: "reports" as const, fallback: "Field Reports" },
    { path: "/news", icon: Newspaper, labelKey: "news" as const, fallback: "Agronomy Feed" },
  ];

  return (
    <>
      <aside className={`fixed top-0 left-0 h-screen z-50 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 transition-all duration-300 flex flex-col justify-between ${collapsed ? "w-20" : "w-64"}`}>
        
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
            <Link to="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
                <Wheat size={22} />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-stone-900 dark:text-stone-100 leading-none">
                    DesiCane
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-amber-600 dark:text-amber-400 font-bold mt-1">
                    Harvest Intelligence
                  </span>
                </div>
              )}
            </Link>
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle Navigation Width"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Links */}
          <nav className="p-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  title={collapsed ? link.fallback : undefined}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 shadow-xs border border-amber-200/50 dark:border-amber-800/40"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/70 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <link.icon size={18} className={isActive ? "text-amber-600 dark:text-amber-400" : "text-stone-400"} />
                  {!collapsed && <span>{t(link.labelKey) || link.fallback}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 space-y-1">
          <div className={`flex items-center ${collapsed ? "flex-col gap-2" : "justify-between"} px-2 py-1`}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Toggle Mode"
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
            title="Logout"
          >
            <LogOut size={18} />
            {!collapsed && <span>{t("logout")}</span>}
          </button>
        </div>
      </aside>

      {/* Keeps content layout aligned on desktop */}
      <div className={`hidden md:block transition-all duration-300 ${collapsed ? "w-20" : "w-64"} shrink-0`} />
    </>
  );
}
