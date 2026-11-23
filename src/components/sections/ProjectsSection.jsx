import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Grid2x2, Grid3x3, Rows } from "lucide-react";
import { devbit, projects } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Card sizes the visitor can pick; on phones every size collapses to one column. */
const SIZES = [
  { id: "sm", labelKey: "projects.sizeSmall", icon: Grid3x3, grid: "md:grid-cols-2 lg:grid-cols-3" },
  { id: "md", labelKey: "projects.sizeMedium", icon: Grid2x2, grid: "md:grid-cols-2" },
  { id: "lg", labelKey: "projects.sizeLarge", icon: Rows, grid: "" },
];
const SIZE_KEY = "projects-card-size";

// Remember the chosen size per visitor; storage can be unavailable (private mode), so never rely on it.
const readSize = () => {
  try {
    const saved = window.localStorage.getItem(SIZE_KEY);
    return SIZES.some((size) => size.id === saved) ? saved : "sm";
  } catch {
    return "sm";
  }
};

const writeSize = (value) => {
  try {
    window.localStorage.setItem(SIZE_KEY, value);
  } catch {
    // Not persisted; the choice still applies for this visit.
  }
};

const ProjectLink = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors hover:border-foreground/30 active:scale-[0.98]"
  >
    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
    {children}
  </a>
);

/** One project, shared by the Featured and Dev.Bit tabs. */
const ProjectCard = ({ project, size }) => {
  const { t, pick } = useLanguage();
  const title = pick(project.title);
  const eyebrow = pick(project.subtitle ?? project.category);
  const wide = size === "lg";

  return (
    <article className={cn("flex flex-col border bg-card", wide && "lg:grid lg:grid-cols-12")}>
      <div
        className={cn(
          "group relative overflow-hidden border-b",
          project.imageIsLogo ? "grid aspect-[16/10] place-items-center bg-white" : "aspect-[16/10] bg-secondary",
          wide && "lg:col-span-7 lg:border-b-0 lg:border-r"
        )}
      >
        <img
          src={project.image}
          alt={`${title} ${t(project.imageIsLogo ? "projects.logo" : "projects.screenshot")}`}
          loading="lazy"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
            project.imageIsLogo ? "h-2/5 w-auto object-contain" : "h-full w-full object-cover object-top"
          )}
        />
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-5", wide && "lg:col-span-5 lg:gap-4 lg:p-8")}>
        {eyebrow && <p className="label-caps">{eyebrow}</p>}
        <h3
          className={cn(
            "font-medium leading-tight tracking-tight",
            wide ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            size === "sm" && "line-clamp-3"
          )}
        >
          {pick(project.description)}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        {(project.link || project.github) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.link && (
              <ProjectLink href={project.link} icon={ArrowUpRight}>
                {t("projects.liveSite")}
              </ProjectLink>
            )}
            {project.github && (
              <ProjectLink href={project.github} icon={Github}>
                {t("projects.sourceCode")}
              </ProjectLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const SizePicker = ({ value, onChange }) => {
  const { t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t("projects.viewSize")}
      className="hidden rounded-full border bg-card p-1 md:inline-flex"
    >
      {SIZES.map(({ id, labelKey, icon: Icon }) => {
        const checked = id === value;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            onClick={() => onChange(id)}
            className={cn(
              "grid h-8 w-9 place-items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              checked ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
};

const TABS = [
  { id: "featured", labelKey: "projects.tabFeatured", count: projects.length },
  { id: "devbit", labelKey: "projects.tabDevbit", count: devbit.projects.length },
];

const ProjectTabs = ({ active, onChange }) => {
  const { t } = useLanguage();

  // Arrow keys move between tabs, as in the WAI-ARIA tabs pattern.
  const onKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const index = TABS.findIndex((tab) => tab.id === active);
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(index + step + TABS.length) % TABS.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={t("projects.tabs")}
      onKeyDown={onKeyDown}
      className="inline-flex rounded-full border bg-card p-1"
    >
      {TABS.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative isolate rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {selected && (
              <motion.span
                layoutId="projects-tab"
                className="absolute inset-0 -z-10 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">
              {t(tab.labelKey)}
              <sup className={cn("ml-1 font-mono text-[10px]", selected ? "text-background/70" : "text-brand")}>
                {tab.count}
              </sup>
            </span>
          </button>
        );
      })}
    </div>
  );
};

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [titleTop, titleBottom] = t("projects.title");
  const [tab, setTab] = useState("featured");
  const [size, setSize] = useState(readSize);

  const changeSize = (value) => {
    setSize(value);
    writeSize(value);
  };

  const list = tab === "featured" ? projects : devbit.projects;
  const grid = SIZES.find((option) => option.id === size).grid;

  return (
    <section id="projects" className="relative scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-20 md:px-6 md:pt-28">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">
          {titleTop}
          <br />
          {titleBottom}
        </h2>
        <p className="mt-6 max-w-[52ch] text-muted-foreground md:text-lg">
          {t("projects.lead")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <ProjectTabs active={tab} onChange={setTab} />
          <SizePicker value={size} onChange={changeSize} />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1400px] px-4 pb-20 md:px-6 md:pb-28"
        >
          {tab === "devbit" && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-[52ch] text-sm text-muted-foreground md:text-base">
                {t("projects.devbitLead")}
              </p>
              <a
                href={devbit.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.08em] transition-colors hover:text-brand"
              >
                {t("projects.devbitVisit")}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>
          )}

          <div className={cn("grid grid-cols-1 gap-4 md:gap-6", grid)}>
            {list.map((project) => (
              <ProjectCard key={project.image} project={project} size={size} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
