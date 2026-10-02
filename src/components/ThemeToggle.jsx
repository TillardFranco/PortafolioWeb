import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { t } = useLanguage();

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("nav.toggleTheme")}
      title={t("nav.toggleTheme")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-foreground transition-colors hover:border-foreground/30 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" strokeWidth={1.75} />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" strokeWidth={1.75} />
    </button>
  );
}
