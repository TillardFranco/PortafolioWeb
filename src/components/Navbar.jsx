import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { devbit, profile, projects } from "@/data/profile";
import LogoMark from "@/components/LogoMark";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

// Unique projects across both tabs, in case one is listed in both.
const PROJECT_COUNT = new Set(
  [...projects, ...devbit.projects].map((project) => project.title.en ?? project.title)
).size;

const NAV_ITEMS = [
  { id: "projects", count: PROJECT_COUNT },
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

// Below this width the section links move into the menu.
const INLINE_LINKS_QUERY = "(min-width: 640px)";

/** Open state for the small-screen menu; closes on Escape and when links fit inline. */
const useMobileMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const query = window.matchMedia(INLINE_LINKS_QUERY);
    const onResize = () => {
      if (query.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    query.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      query.removeEventListener("change", onResize);
    };
  }, [open]);

  return [open, setOpen];
};

const ProjectCount = ({ count }) =>
  count ? <sup className="ml-0.5 font-mono text-[10px] text-brand">{count}</sup> : null;

const Navbar = () => {
  const active = useActiveSection(SECTION_IDS);
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useMobileMenu();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-2 px-4 md:gap-4 md:px-6">
        <a href="#hero" className="group flex items-center gap-2.5" aria-label={t("nav.home")}>
          <span className="grid h-8 w-8 place-items-center bg-brand text-brand-foreground">
            <LogoMark className="h-8 w-8" />
          </span>
          <span className="hidden text-sm uppercase tracking-[0.08em] lg:inline">
            <span className="font-normal text-muted-foreground">{profile.firstName}</span>
            <span className="font-bold">{profile.lastName}</span>
          </span>
        </a>

        <ul className="hidden items-center sm:flex md:gap-4 lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-2.5 py-1.5 text-xs uppercase tracking-[0.08em] transition-colors md:text-sm",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`nav.${item.id}`)}
                <ProjectCount count={item.count} />
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-[13px] h-px bg-foreground"
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
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t(menuOpen ? "nav.closeMenu" : "nav.openMenu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card transition-colors hover:border-foreground/30 active:scale-[0.96] sm:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" strokeWidth={1.75} /> : <Menu className="h-4 w-4" strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-y bg-background/95 backdrop-blur-md sm:hidden"
          >
            <ul className="px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="border-b">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center py-3.5 text-sm uppercase tracking-[0.08em] transition-colors",
                      active === item.id ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {t(`nav.${item.id}`)}
                    <ProjectCount count={item.count} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv}
                  download
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-3.5 text-sm uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download className="h-4 w-4" strokeWidth={1.75} />
                  {t("contact.downloadCv")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
