import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile, projects } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "projects", count: projects.length },
  { id: "experience" },
  { id: "contact" },
];

const useActiveSection = (ids) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const SECTION_IDS = ["hero", ...NAV_ITEMS.map((item) => item.id)];

const Navbar = () => {
  const active = useActiveSection(SECTION_IDS);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-2 px-4 md:gap-4 md:px-6">
        <a href="#hero" className="hidden items-center gap-2.5 min-[420px]:flex" aria-label={t("nav.home")}>
          <span className="grid h-8 w-8 place-items-center bg-brand font-mono text-xs font-bold text-brand-foreground">
            FT
          </span>
          <span className="hidden text-sm uppercase tracking-[0.08em] lg:inline">
            <span className="font-normal text-muted-foreground">{profile.firstName}</span>
            <span className="font-bold">{profile.lastName}</span>
          </span>
        </a>

        <ul className="flex items-center md:gap-4 lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-1 py-1.5 text-[11px] uppercase tracking-[0.02em] transition-colors sm:px-2.5 sm:text-xs sm:tracking-[0.08em] md:text-sm",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`nav.${item.id}`)}
                {item.count && (
                  <sup className="ml-0.5 font-mono text-[10px] text-brand">
                    {item.count}
                  </sup>
                )}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-1 -bottom-[13px] h-px bg-foreground sm:inset-x-2.5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-2 rounded-full border bg-card px-3.5 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors hover:border-foreground/30 md:inline-flex"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t("nav.cv")}
          </a>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
