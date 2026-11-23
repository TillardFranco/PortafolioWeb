import React, { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const GAP = 0.07; // seconds between letters landing
const HOVER = "(hover: hover) and (pointer: fine)";
const IS_LETTER = /\p{L}/u;

/**
 * Drops every `[data-letter]` inside `scopeRef` into place: letters fall from above
 * in a shuffled order, spinning, and land with a bounce. The first one starts upside down.
 * `sideCount` letters slide in from the left or right instead of falling.
 * Plays on mount, or the first time the scope scrolls into view when `onScroll` is set.
 *
 * Returns a pointer-enter handler that makes a hovered letter hop (mouse devices only).
 */
export const useLetterDrop = (
  scopeRef,
  { delay = 0, onScroll = false, start = "top 80%", sideCount = 0, gap = GAP, deps = [] } = {}
) => {
  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const letters = gsap.utils.toArray("[data-letter]", scopeRef.current);
        if (!letters.length) return;

        const order = gsap.utils.shuffle(letters.map((_, i) => i));
        // Side entries go to real letters (not punctuation), never the flipped first one.
        const candidates = letters
          .map((letter, i) => i)
          .filter((i) => i > 0 && IS_LETTER.test(letters[i].textContent));
        const fromSide = new Set(gsap.utils.shuffle(candidates).slice(0, sideCount));

        const tl = gsap.timeline({
          delay,
          scrollTrigger: onScroll
            ? { trigger: scopeRef.current, start, once: true }
            : undefined,
        });

        letters.forEach((letter, i) => {
          const at = order[i] * gap;
          tl.from(letter, { autoAlpha: 0, duration: 0.2, ease: "none" }, at);

          if (fromSide.has(i)) {
            const dir = gsap.utils.random([-1, 1]);
            tl.from(
              letter,
              {
                xPercent: dir * gsap.utils.random(280, 420),
                rotation: dir * gsap.utils.random(20, 45),
                duration: 1.1,
                ease: "back.out(1.4)",
              },
              at
            );
            return;
          }

          const spin = i === 0 ? 180 : gsap.utils.random(-70, 70);
          tl.from(letter, { yPercent: gsap.utils.random(-220, -140), duration: 0.9, ease: "bounce.out" }, at)
            .from(letter, { rotation: spin, duration: 1.2, ease: "elastic.out(1, 0.6)" }, at);
        });
      });
      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: deps, revertOnUpdate: true }
  );

  return contextSafe((event) => {
    if (!window.matchMedia(`${HOVER} and ${FULL_MOTION}`).matches) return;
    const letter = event.currentTarget;
    if (gsap.isTweening(letter)) return;
    gsap
      .timeline()
      .to(letter, {
        yPercent: -22,
        rotation: gsap.utils.random(-14, 14),
        duration: 0.22,
        ease: "power2.out",
      })
      .to(letter, { yPercent: 0, rotation: 0, duration: 0.7, ease: "bounce.out" });
  });
};

/** One animatable glyph. Spaces become non-breaking so they keep their width. */
export const Letter = ({ children, onHop, className }) => (
  <span
    data-letter
    onPointerEnter={onHop}
    className={cn("inline-block origin-[50%_70%] will-change-transform", className)}
  >
    {children === " " ? " " : children}
  </span>
);

/** A single word or short name rendered letter by letter with the drop-in effect. */
const DropLetters = ({ text, delay = 0, onScroll = false, start, sideCount = 0 }) => {
  const rootRef = useRef(null);
  const hop = useLetterDrop(rootRef, { delay, onScroll, start, sideCount, deps: [text] });

  return (
    <span ref={rootRef} className="inline-block">
      {Array.from(text).map((char, i) => (
        <Letter key={`${char}-${i}`} onHop={hop}>
          {char}
        </Letter>
      ))}
    </span>
  );
};

export default DropLetters;
