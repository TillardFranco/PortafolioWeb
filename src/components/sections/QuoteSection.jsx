import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import GridLines from "@/components/GridLines";
import DropLetters, { Letter, useLetterDrop } from "@/components/hero/DropLetters";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EASE_OUT, FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

/**
 * One line of the motto, letter by letter. Each word is a nowrap group so lines only
 * break between words; the quote marks are glued to the first/last word for the same reason.
 */
const QuoteLine = ({ text, before, after, onHop }) => {
  const words = text.split(" ");
  return words.map((word, i) => (
    <React.Fragment key={`${word}-${i}`}>
      {i > 0 && " "}
      <span className="whitespace-nowrap">
        {i === 0 && before}
        {Array.from(word).map((char, j) => (
          <Letter key={`${char}-${j}`} onHop={onHop}>
            {char}
          </Letter>
        ))}
        {i === words.length - 1 && after}
      </span>
    </React.Fragment>
  ));
};

const SocialLink = ({ href, children }) => (
  <a
    data-social
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink-foreground"
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>
);

const QuoteSection = () => {
  const { t, lang, pick } = useLanguage();
  const [first, second] = pick(profile.motto);
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const footerRef = useRef(null);

  // The motto drops in letter by letter like the hero name; a few letters slide in from the side.
  const hop = useLetterDrop(quoteRef, {
    onScroll: true,
    sideCount: 3,
    gap: 0.05,
    deps: [first, second],
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        // Photo spins in with a springy settle, then the availability dot pops.
        gsap
          .timeline({ scrollTrigger: { trigger: quoteRef.current, start: "top 80%", once: true } })
          .from("[data-photo]", {
            autoAlpha: 0,
            scale: 0.6,
            rotation: -25,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          })
          .from("[data-dot]", { scale: 0.3, autoAlpha: 0, duration: 0.5, ease: "back.out(3)" }, 0.45);

        // Footer: the divider draws left to right, then the links fade in one after another.
        // The name drops in on its own through DropLetters.
        gsap
          .timeline({ scrollTrigger: { trigger: footerRef.current, start: "top 92%", once: true } })
          .from("[data-rule]", { scaleX: 0, duration: 1.2, ease: EASE_OUT })
          .from(
            "[data-social]",
            { autoAlpha: 0, filter: "blur(4px)", duration: 0.6, stagger: 0.1, clearProps: "filter" },
            0.35
          );
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true }
  );

  const mark = (char) => (
    <Letter onHop={hop} className="text-brand">
      {char}
    </Letter>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink text-ink-foreground">
      <GridLines className="text-ink-foreground/[0.08]" />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-20 md:px-6 md:pt-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-2">
            <div data-photo className="relative h-24 w-24 md:h-28 md:w-28">
              <img
                src={profile.photo}
                alt={profile.fullName}
                width="112"
                height="112"
                loading="lazy"
                className="h-full w-full rounded-full object-cover"
              />
              {profile.available && (
                <span
                  data-dot
                  className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full border-2 border-ink bg-success md:h-5 md:w-5"
                  title={t("hero.available")}
                />
              )}
            </div>
          </div>

          <blockquote
            ref={quoteRef}
            className="text-[clamp(2rem,8.5vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] lg:col-span-10"
          >
            {/* Screen readers get the plain sentence; the split letters are visual only. */}
            <p className="sr-only">
              &ldquo;{first} {second}&rdquo;
            </p>
            <p aria-hidden="true">
              <QuoteLine text={first} before={mark("“")} onHop={hop} />
              <br />
              <span className="inline-block md:pl-[18%]">
                <QuoteLine text={second} after={mark("”")} onHop={hop} />
              </span>
            </p>
          </blockquote>
        </div>

        <div
          ref={footerRef}
          className="relative mt-16 flex flex-wrap items-center justify-between gap-4 pt-6 md:mt-24"
        >
          <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-ink-border" />
          <span className="font-medium">
            <span className="sr-only">{profile.fullName}</span>
            <span aria-hidden="true">
              <DropLetters text={profile.fullName} onScroll start="top 92%" />
            </span>
          </span>
          <div className="flex items-center gap-8 text-sm uppercase tracking-[0.08em]">
            <SocialLink href={profile.links.linkedin}>LinkedIn</SocialLink>
            <SocialLink href={profile.links.github}>GitHub</SocialLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
