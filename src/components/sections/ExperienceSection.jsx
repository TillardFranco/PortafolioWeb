import React from "react";
import { motion } from "framer-motion";
import { education, experience } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const Entry = ({ period, title, place, description, children, delay }) => (
  <motion.li {...reveal(delay)} className="grid gap-2 py-8 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
    <p className="pt-1 font-mono text-xs text-muted-foreground">{period}</p>
    <div className="space-y-2">
      <h3 className="text-xl font-medium tracking-tight">{title}</h3>
      {place && <p className="text-sm font-medium text-muted-foreground">{place}</p>}
      <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children && <div className="pt-3">{children}</div>}
    </div>
  </motion.li>
);

const Column = ({ title, children }) => (
  <div>
    <h3 className="mb-8 border-b pb-4 text-sm font-medium uppercase tracking-[0.08em]">
      {title}
    </h3>
    <ul>{children}</ul>
  </div>
);

const ExperienceSection = () => {
  const { t, pick } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <motion.h2
          {...reveal()}
          className="mb-14 max-w-[14ch] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] md:mb-20"
        >
          {t("experience.title")}
        </motion.h2>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Column title={t("experience.work")}>
            {experience.map((item, i) => (
              <Entry
                key={item.id}
                period={pick(item.period)}
                title={pick(item.role)}
                place={item.company}
                description={pick(item.description)}
                delay={i * 0.08}
              >
                <dl className="space-y-3 border-l pl-4 pt-1 text-sm">
                  {item.highlights.map((highlight) => (
                    <div key={pick(highlight.name)}>
                      <dt className="font-medium">{pick(highlight.name)}</dt>
                      <dd className="text-muted-foreground">{pick(highlight.detail)}</dd>
                    </div>
                  ))}
                </dl>
              </Entry>
            ))}
          </Column>

          <Column title={t("experience.education")}>
            {education.map((item, i) => (
              <Entry
                key={item.id}
                period={pick(item.period)}
                title={pick(item.title)}
                place={item.place}
                description={pick(item.description)}
                delay={i * 0.08}
              />
            ))}
          </Column>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
