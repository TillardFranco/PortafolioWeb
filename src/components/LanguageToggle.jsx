import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGUAGES } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const next = lang === "en" ? "es" : "en";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t("nav.switchLanguage")}
      title={t("nav.switchLanguage")}
      className="relative inline-flex h-9 items-center rounded-full border bg-card p-1 font-mono text-[11px] font-medium uppercase transition-colors hover:border-foreground/30 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {LANGUAGES.map((code) => (
        <span
          key={code}
          className={cn(
            "relative z-10 grid h-7 w-6 place-items-center sm:w-7 rounded-full transition-colors duration-300",
            lang === code ? "text-background" : "text-muted-foreground"
          )}
        >
          {lang === code && (
            <motion.span
              layoutId="language-pill"
              className="absolute inset-0 -z-10 rounded-full bg-foreground"
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
            />
          )}
          {code}
        </span>
      ))}
    </button>
  );
}
