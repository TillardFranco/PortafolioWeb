import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GridLines from "@/components/GridLines";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const QuoteSection = () => {
  const { t, pick } = useLanguage();
  const [first, second] = pick(profile.motto);

  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <GridLines className="text-ink-foreground/[0.08]" />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-20 md:px-6 md:pt-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <motion.div {...reveal} className="lg:col-span-2">
            <div className="relative h-20 w-20 md:h-24 md:w-24">
              <img
                src={profile.photo}
                alt={profile.fullName}
                width="96"
                height="96"
                loading="lazy"
                className="h-full w-full rounded-full object-cover grayscale"
              />
              {profile.available && (
                <span
                  className="absolute right-0 top-0 h-4 w-4 rounded-full border-2 border-ink bg-success"
                  title={t("hero.available")}
                />
              )}
            </div>
          </motion.div>

          <motion.blockquote
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] lg:col-span-10"
          >
            <p>
              <span className="text-brand">&ldquo;</span>
              {first}
              <br />
              <span className="inline-block md:pl-[18%]">
                {second}
                <span className="text-brand">&rdquo;</span>
              </span>
            </p>
          </motion.blockquote>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink-border pt-6 md:mt-24">
          <span className="font-medium">{profile.fullName}</span>
          <div className="flex items-center gap-8 text-sm uppercase tracking-[0.08em]">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink-foreground"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink-foreground"
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
