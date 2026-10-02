import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const COPY_LABEL_KEY = {
  idle: "contact.copyEmail",
  copied: "contact.copied",
  error: "contact.copyFailed",
};

const ContactSection = () => {
  const [copyState, setCopyState] = useState("idle");
  const { t } = useLanguage();
  const [titleTop, titleBottom] = t("contact.title");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 2000);
  };

  const links = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: ArrowUpRight, external: true },
    { label: "GitHub", href: profile.links.github, icon: ArrowUpRight, external: true },
    { label: t("contact.downloadCv"), href: profile.cv, icon: Download, download: true },
  ];

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-20 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <motion.h2
            {...reveal()}
            className="text-[clamp(2.75rem,8vw,7rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em]"
          >
            {titleTop}
            <br />
            {titleBottom}
          </motion.h2>
          <motion.p
            {...reveal(0.1)}
            className="mt-8 max-w-[48ch] text-muted-foreground md:text-lg"
          >
            {t("contact.lead")}
          </motion.p>

          <motion.div {...reveal(0.2)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-background transition-transform active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              {t("contact.getInTouch")}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 font-mono text-xs transition-colors hover:border-foreground/30 active:scale-[0.98]"
              aria-label={t(COPY_LABEL_KEY.idle)}
            >
              {copyState === "copied" ? (
                <Check className="h-3.5 w-3.5 text-success" />
              ) : (
                <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
              )}
              <span aria-live="polite">
                {copyState === "idle" ? profile.email : t(COPY_LABEL_KEY[copyState])}
              </span>
            </button>
          </motion.div>
        </div>

        <motion.ul {...reveal(0.25)} className="self-end lg:col-span-3 lg:col-start-10">
          {links.map(({ label, href, icon: Icon, external, download }) => (
            <li key={label} className="border-b first:border-t">
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                {...(download && { download: true })}
                className="group flex items-center justify-between py-4 text-sm uppercase tracking-[0.08em] transition-colors hover:text-brand"
              >
                {label}
                <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      <footer className="border-t">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:px-6">
          <span>&copy; {new Date().getFullYear()} {profile.fullName}</span>
          <a href="#hero" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            {t("contact.backToTop")} <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
