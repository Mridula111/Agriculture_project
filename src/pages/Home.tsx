import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Map, Droplets, Brain, ArrowRight, AlertCircle, Lightbulb, Newspaper } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { icon: Users, labelKey: "farmersServed" as const, value: "2,400+", color: "from-green-500 to-emerald-600" },
  { icon: Map, labelKey: "plotsDigitized" as const, value: "850", color: "from-lime-500 to-green-600" },
  { icon: Droplets, labelKey: "waterSaved" as const, value: "32%", color: "from-teal-500 to-cyan-600" },
  { icon: Brain, labelKey: "aiModels" as const, value: "3", color: "from-emerald-500 to-green-700" },
];

const exploreCards = [
  {
    titleKey: "exploreProblem" as const,
    descKey: "exploreProblemDesc" as const,
    icon: AlertCircle,
    color: "from-amber-400 to-orange-500",
    link: "#",
  },
  {
    titleKey: "exploreSolution" as const,
    descKey: "exploreSolutionDesc" as const,
    icon: Lightbulb,
    color: "from-green-400 to-emerald-500",
    link: "#",
  },
  {
    titleKey: "exploreNews" as const,
    descKey: "exploreNewsDesc" as const,
    icon: Newspaper,
    color: "from-blue-400 to-indigo-500",
    link: "/news",
  },
];

export default function Home() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="page-container bg-neutral-50 min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Full Bleed Hero Section */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img
              src="/img1.jpg"
              alt="Sugarcane fields"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-neutral-900/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t("welcomePrefix")} {currentUser?.name || "Farmer"}
              </h1>
              <p className="text-neutral-200 mt-4 text-lg sm:text-xl font-medium leading-relaxed">
                {t("homePitch")}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-white font-semibold tracking-wide text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 shadow-lg">
                  KIAAR × Godavari Biorefineries Ltd.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-4 sm:px-8 max-w-[1200px] mx-auto -mt-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 stagger-children">
            {stats.map((stat) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-xl shadow-green-900/5 border border-neutral-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-current/20`}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-neutral-500 font-medium mt-1">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Explore Cards */}
        <section className="px-4 sm:px-8 max-w-[1200px] mx-auto py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {t("exploreCards")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {exploreCards.map((card) => (
              <Link
                key={card.titleKey}
                to={card.link}
                className="group bg-white rounded-2xl border border-neutral-100 p-6 sm:p-8 shadow-md hover:shadow-2xl shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-neutral-900 text-xl tracking-tight">
                  {t(card.titleKey)}
                </h3>
                <p className="text-base text-neutral-600 mt-2 leading-relaxed">
                  {t(card.descKey)}
                </p>
                <div className="flex items-center gap-2 text-primary-600 text-sm font-bold mt-6 group-hover:gap-3 transition-all">
                  <span className="uppercase tracking-wider">{t("readMore")}</span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
