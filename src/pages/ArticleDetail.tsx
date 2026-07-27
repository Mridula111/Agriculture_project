import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, FileQuestion, Moon, Sun } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_ARTICLES } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const article = MOCK_ARTICLES.find((a) => a.id === id);

  // Article not found fallback
  if (!article) {
    return (
      <div className="page-container bg-gradient-to-b from-green-50/50 to-white min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-4 py-20"
          >
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FileQuestion size={40} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-[Outfit]">
              {t("articleNotFound")}
            </h1>
            <p className="text-neutral-500 mt-2 max-w-sm mx-auto">
              {t("articleNotFoundDesc")}
            </p>
            <div className="mt-6">
              <Button
                variant="secondary"
                onClick={() => navigate("/news")}
              >
                {t("backToNews")}
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // Render body paragraphs (split by double newline)
  const paragraphs = article.body.split("\n\n");

  return (
    <div className={`${isDark ? 'dark bg-neutral-950' : 'bg-gradient-to-b from-green-50/50 to-white'} page-container min-h-screen transition-colors duration-300`}>
      <Navbar />

      <main className="flex-1 content-wrapper py-8 max-w-3xl">
        {/* Controls: Back and Theme Toggle */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-green-700 dark:text-green-400 font-semibold text-sm hover:text-green-800 dark:hover:text-green-300 hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={16} />
              {t("backToNews")}
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:scale-105 transition-all shadow-sm"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dark:text-neutral-200"
        >
          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100 dark:border-neutral-800 mb-6">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900 dark:text-green-400 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>
                {new Date(article.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Body */}
          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => {
              // Handle bold text markers
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h3
                    key={index}
                    className="font-bold text-xl text-neutral-900 dark:text-white mt-8 mb-2 tracking-tight"
                  >
                    {paragraph.replace(/\*\*/g, "")}
                  </h3>
                );
              }

              // Handle sections with bold headers
              if (paragraph.startsWith("**")) {
                const parts = paragraph.split("**");
                return (
                  <div key={index}>
                    {parts.map((part, i) =>
                      i % 2 === 1 ? (
                        <h3
                          key={i}
                          className="font-bold text-xl text-neutral-900 dark:text-white mt-8 mb-2 tracking-tight"
                        >
                          {part}
                        </h3>
                      ) : part.trim() ? (
                        <p
                          key={i}
                          className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg"
                        >
                          {part}
                        </p>
                      ) : null
                    )}
                  </div>
                );
              }

              // Handle list items
              if (paragraph.includes("\n- ") || paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter(Boolean);
                return (
                  <ul key={index} className="space-y-2 ml-5">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg list-disc"
                      >
                        {item.replace(/^- /, "").replace(/^\d+\.\s/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Handle numbered lists
              if (/^\d+\./.test(paragraph)) {
                const items = paragraph.split("\n").filter(Boolean);
                return (
                  <ol key={index} className="space-y-2 ml-5">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg list-decimal"
                      >
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Regular paragraph
              return (
                <p
                  key={index}
                  className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.article>
      </main>
    </div>
  );
}
