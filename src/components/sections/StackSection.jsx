import React from "react";
import { stack } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

const Track = ({ hidden }) => (
  <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {stack.map((tech) => (
      <li
        key={tech}
        className="flex items-center gap-8 pr-8 text-[clamp(2rem,5vw,4rem)] font-semibold uppercase tracking-[-0.03em] md:gap-12 md:pr-12"
      >
        {tech}
        <span className="h-3 w-3 bg-brand md:h-4 md:w-4" aria-hidden="true" />
      </li>
    ))}
  </ul>
);

const StackSection = () => {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="stack-title" className="overflow-hidden border-b py-12 md:py-16">
      <h2 id="stack-title" className="label-caps mx-auto mb-8 max-w-[1400px] px-4 md:px-6">
        {t("stack.title")}
      </h2>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:px-4">
        <Track />
        <div className="motion-reduce:hidden">
          <Track hidden />
        </div>
      </div>
    </section>
  );
};

export default StackSection;
