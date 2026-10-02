import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MousePointer2 } from "lucide-react";

// Path the collaborator cursor walks, as fractions of the hero size.
// Each point appears twice so the cursor rests a moment on it.
const PATH = [
  [0.1, 0.2],
  [0.1, 0.2],
  [0.36, 0.42],
  [0.36, 0.42],
  [0.74, 0.3],
  [0.74, 0.3],
  [0.56, 0.66],
  [0.56, 0.66],
  [0.3, 0.8],
  [0.3, 0.8],
  [0.1, 0.2],
];

const Tag = ({ children, tone }) => (
  <span
    className={`ml-3 mt-4 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${
      tone === "brand"
        ? "bg-brand text-brand-foreground"
        : "bg-foreground text-background"
    }`}
  >
    {children}
  </span>
);

/** A fake teammate cursor that wanders the hero, like a multiplayer canvas. */
export const CollaboratorCursor = ({ containerRef, name, visible }) => {
  const [size, setSize] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  if (!size || reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="collaborator"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: PATH.map(([px]) => px * size.width),
            y: PATH.map(([, py]) => py * size.height),
          }}
          transition={{
            opacity: { duration: 0.3 },
            x: { duration: 18, ease: "easeInOut", repeat: Infinity },
            y: { duration: 18, ease: "easeInOut", repeat: Infinity },
          }}
        >
          <MousePointer2
            className="absolute h-5 w-5 text-foreground"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <Tag tone="ink">{name}</Tag>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** "You" tag that trails the visitor's real pointer inside the hero. */
export const VisitorTag = ({ containerRef, label }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 600, damping: 40 });
  const springY = useSpring(y, { stiffness: 600, damping: 40 });
  const [inside, setInside] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return undefined;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    };
    const onEnter = (event) => {
      onMove(event);
      springX.jump(x.get());
      springY.jump(y.get());
      setInside(true);
    };
    const onLeave = () => setInside(false);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, x, y, springX, springY]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{ opacity: inside ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none absolute left-0 top-0 z-30"
    >
      <Tag tone="brand">{label}</Tag>
    </motion.div>
  );
};
