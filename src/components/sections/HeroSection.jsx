import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Users } from "lucide-react";
import GridLines from "@/components/GridLines";
import PixelWord from "@/components/hero/PixelWord";
import SelectionFrame from "@/components/hero/SelectionFrame";
import { CollaboratorCursor, VisitorTag } from "@/components/hero/CanvasCursors";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const wordClass =
  "text-[clamp(3.25rem,11.5vw,10rem)] font-semibold uppercase leading-none tracking-[-0.04em]";

/** A word on the canvas: click to select it, drag it around, it springs back. */
const CanvasWord = ({ selected, onSelect, label, children }) => (
  <motion.div
    drag
    dragSnapToOrigin
    dragElastic={0.35}
    dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
    whileDrag={{ scale: 1.02 }}
    onPointerDown={onSelect}
    className="relative inline-block cursor-grab touch-none select-none active:cursor-grabbing"
  >
    {children}
    {selected && <SelectionFrame label={label} />}
  </motion.div>
);

const Switch = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="group inline-flex items-center gap-3 rounded-full py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span
      className={cn(
        "flex h-6 w-10 items-center rounded-full p-1 transition-colors duration-300",
        checked ? "justify-end bg-brand" : "justify-start bg-foreground/15"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="h-4 w-4 rounded-full bg-background shadow-sm"
      />
    </span>
    {label}
  </button>
);

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [pixelated, setPixelated] = useState(true);
  const [selected, setSelected] = useState("first");
  const [collab, setCollab] = useState(true);
  const { t, pick } = useLanguage();

  const togglePixels = (value) => {
    setPixelated(value);
    setSelected(value ? "first" : "last");
  };

  return (
    <section
      id="hero"
      ref={canvasRef}
      className="relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <GridLines className="text-foreground/[0.07]" />
      <CollaboratorCursor
        containerRef={canvasRef}
        name={profile.firstName}
        visible={collab}
      />
      <VisitorTag containerRef={canvasRef} label={t("hero.you")} />

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1400px] flex-col px-4 pb-12 pt-6 md:px-6 md:pt-8">
        <motion.div {...enter(0)} className="flex flex-wrap items-center gap-3">
          {profile.available && (
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {t("hero.available")}
            </a>
          )}
          <button
            type="button"
            onClick={() => setCollab((value) => !value)}
            aria-pressed={collab}
            className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t(collab ? "hero.collabOn" : "hero.collabOff")}
          </button>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center py-14 md:py-10">
          <h1 id="hero-title" className="sr-only">
            {profile.fullName}, {pick(profile.role)}
          </h1>

          <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
            <motion.div {...enter(0.1)} className="order-1 lg:order-none lg:col-span-7" aria-hidden="true">
              <CanvasWord
                selected={selected === "first"}
                onSelect={() => setSelected("first")}
                label={t("hero.selection")}
              >
                <span className={wordClass}>{profile.firstName}</span>
              </CanvasWord>
            </motion.div>

            <motion.p
              {...enter(0.25)}
              className="order-3 max-w-[44ch] text-base leading-relaxed text-muted-foreground md:text-lg lg:order-none lg:col-span-4 lg:col-start-9 lg:pt-3"
            >
              {pick(profile.bio)}
            </motion.p>

            <motion.div
              {...enter(0.2)}
              className="order-2 lg:order-none lg:col-span-9 lg:col-start-4"
              aria-hidden="true"
            >
              <CanvasWord
                selected={selected === "last"}
                onSelect={() => setSelected("last")}
                label={t("hero.selection")}
              >
                <span className={cn(wordClass, "block")}>
                  {pixelated ? (
                    <PixelWord text={profile.lastName.toUpperCase()} />
                  ) : (
                    profile.lastName
                  )}
                </span>
              </CanvasWord>
            </motion.div>

            <motion.div
              {...enter(0.35)}
              className="order-4 flex flex-wrap items-center gap-x-8 gap-y-4 lg:order-none lg:col-span-6 lg:col-start-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-background shadow-[0_12px_30px_-14px_rgba(15,20,35,0.55)] transition-transform active:scale-[0.98]"
              >
                {t("hero.discover")}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <Switch
                checked={pixelated}
                onChange={togglePixels}
                label={t("hero.pixelMode")}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
