import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { devbit, projects } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const Field = ({ label, children }) => (
  <div className="space-y-3">
    <p className="label-caps">{label}</p>
    {children}
  </div>
);

const ProjectLink = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors hover:border-foreground/30 active:scale-[0.98]"
  >
    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
    {children}
  </a>
);

const ProjectRow = ({ project, reversed }) => {
  const { t, pick } = useLanguage();
  const title = pick(project.title);

  return (
    <motion.article
      {...reveal}
      className="grid grid-cols-1 border-b lg:grid-cols-12"
    >
      <div
        className={cn(
          "flex flex-col gap-8 px-4 py-10 md:px-8 lg:col-span-4",
          reversed ? "lg:order-2 lg:border-l" : "lg:border-r"
        )}
      >
        <Field label={t("projects.project")}>
          <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{pick(project.subtitle)}</p>
        </Field>

        <Field label={t("projects.technologies")}>
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Field>

        <Field label={t("projects.description")}>
          <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            {pick(project.description)}
          </p>
        </Field>

        {(project.link || project.github) && (
          <div className="mt-auto flex flex-wrap gap-2">
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

      <div className="p-4 md:p-6 lg:col-span-8">
        <div
          className={cn(
            "group relative aspect-[16/10] overflow-hidden border",
            project.imageIsLogo ? "grid place-items-center bg-white" : "bg-secondary"
          )}
        >
          <img
            src={project.image}
            alt={`${title} ${t(project.imageIsLogo ? "projects.logo" : "projects.screenshot")}`}
            loading="lazy"
            className={cn(
              "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
              project.imageIsLogo
                ? "h-1/2 w-auto object-contain"
                : "h-full w-full object-cover object-top"
            )}
          />
        </div>
      </div>
    </motion.article>
  );
};

const ClientCard = ({ project }) => {
  const { t, pick } = useLanguage();

  return (
    <article className="flex flex-col border-b md:odd:border-r">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="group m-4 block aspect-[3/2] overflow-hidden border bg-secondary md:m-6"
      >
        <img
          src={project.image}
          alt=""
          width="1200"
          height="800"
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </a>
      <div className="flex flex-1 flex-col gap-4 px-4 pb-10 md:px-6">
        <p className="label-caps">{pick(project.category)}</p>
        <h3 className="text-2xl font-medium leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
          {pick(project.description)}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <ProjectLink href={project.link} icon={ArrowUpRight}>
            {t("projects.liveSite")}
          </ProjectLink>
        </div>
      </div>
    </article>
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

  return (
    <section id="projects" className="relative scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-4 pb-14 pt-20 md:px-6 md:pt-28">
        <motion.h2
          {...reveal}
          className="text-[clamp(2.5rem,6vw,5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]"
        >
          {titleTop}
          <br />
          {titleBottom}
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="mt-6 max-w-[52ch] text-muted-foreground md:text-lg"
        >
          {t("projects.lead")}
        </motion.p>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          className="mt-10"
        >
          <ProjectTabs active={tab} onChange={setTab} />
        </motion.div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1400px] border-t md:border-x"
        >
          {tab === "featured" ? (
            projects.map((project, index) => (
              <ProjectRow
                key={project.image}
                project={project}
                reversed={index % 2 === 1}
              />
            ))
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-6 md:px-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2">
                {devbit.projects.map((project) => (
                  <ClientCard key={project.title} project={project} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
