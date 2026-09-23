import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/lib/translations";
import { Globe, ChevronDown } from "lucide-react";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिंदी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center bg-stone-800/80 rounded-lg border border-stone-700/80 shadow-xs">
      <div className="pl-2 pointer-events-none text-amber-400">
        <Globe size={14} />
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-transparent py-1.5 pl-2 pr-7 text-xs font-semibold text-stone-200 outline-none focus:ring-1 focus:ring-amber-500 rounded-lg cursor-pointer"
        aria-label="Change Application Language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-stone-900 text-stone-100">
            {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 text-stone-400">
        <ChevronDown size={13} />
      </div>
    </div>
  );
}
