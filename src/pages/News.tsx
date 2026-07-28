import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, FileQuestion, ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_ARTICLES } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";

const ITEMS_PER_PAGE = 4;

export default function News() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter articles by keyword
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_ARTICLES;
    const q = searchQuery.toLowerCase();
    return MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="page-container bg-gradient-to-b from-green-50/50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 content-wrapper py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 dark:text-green-400 font-[Outfit]">
            {t("newsTitle")}
          </h1>

          {/* Search bar */}
          <div className="relative mt-4 max-w-lg">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
            />
            <input
              id="news-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on search
              }}
              placeholder={t("newsSearch")}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-500 focus:border-green-500 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
          </div>
        </motion.div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 bg-neutral-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
              <FileQuestion size={32} className="text-neutral-400 dark:text-neutral-500" />
            </div>
            <p className="text-lg font-semibold text-neutral-600 dark:text-neutral-300">
              {t("noArticles")}
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
              Try a different search term
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mt-6 stagger-children">
              {displayedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    to={`/article/${article.id}`}
                    className="group block bg-white dark:bg-slate-900 rounded-xl border border-green-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/70 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 mb-2">
                        <Calendar size={12} />
                        <span>{new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-slate-100 text-base leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                        <span>{t("readMore")}</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  id="load-more"
                  variant="secondary"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                >
                  {t("loadMore")}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
