import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/profile";
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

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [titleTop, titleBottom] = t("projects.title");

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
      </div>

      <div className="mx-auto max-w-[1400px] border-t md:border-x">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.image}
            project={project}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
