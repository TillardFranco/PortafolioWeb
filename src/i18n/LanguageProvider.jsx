import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, ui } from "@/i18n/ui";

const STORAGE_KEY = "portfolio-lang";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(stored)) return stored;
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted, but the switch still works for this visit.
    }
  }, []);

  const value = useMemo(() => {
    const strings = ui[lang];
    return {
      lang,
      setLang,
      /** UI string by dotted key, e.g. t("nav.projects"). */
      t: (key) => key.split(".").reduce((node, part) => node?.[part], strings) ?? key,
      /** Content field that may be localized as { en, es }. */
      pick: (field) =>
        field && typeof field === "object" && !Array.isArray(field) && lang in field
          ? field[lang]
          : field,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
