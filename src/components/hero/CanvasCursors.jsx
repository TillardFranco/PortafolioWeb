import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
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

// Grabbing the cursor needs a mouse; touch screens just watch it.
const canGrab = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * A fake teammate cursor that wanders the hero, like a multiplayer canvas.
 * Visitors can grab it: it stops, complains in a bubble, and goes back to
 * wandering once released.
 */
export const CollaboratorCursor = ({ containerRef, name, visible, messages }) => {
  const [size, setSize] = useState(null);
  const [grabbed, setGrabbed] = useState(false);
  const [message, setMessage] = useState(0);
  const [grabbable] = useState(canGrab);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useRef([]);
  const resumeTimer = useRef(0);

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

  const stop = useCallback(() => {
    controls.current.forEach((control) => control.stop());
    controls.current = [];
  }, []);

  const wander = useCallback(() => {
    if (!size) return;
    stop();
    const options = { duration: 18, ease: "easeInOut", repeat: Infinity };
    controls.current = [
      animate(x, PATH.map(([px]) => px * size.width), options),
      animate(y, PATH.map(([, py]) => py * size.height), options),
    ];
  }, [size, stop, x, y]);

  // Glides back to the start of the path, then keeps wandering.
  const resume = useCallback(() => {
    if (!size) return;
    stop();
    const [px, py] = PATH[0];
    controls.current = [
      animate(x, px * size.width, { duration: 1.4, ease: "easeInOut", onComplete: wander }),
      animate(y, py * size.height, { duration: 1.4, ease: "easeInOut" }),
    ];
  }, [size, stop, wander, x, y]);

  useEffect(() => {
    if (visible) wander();
    return () => {
      clearTimeout(resumeTimer.current);
      stop();
    };
  }, [visible, wander, stop]);

  const grab = () => {
    if (!grabbable) return;
    clearTimeout(resumeTimer.current);
    stop();
    setMessage((index) => (index + 1) % messages.length);
    setGrabbed(true);
    window.addEventListener(
      "pointerup",
      () => {
        setGrabbed(false);
        // A short pause so the complaint can be read before it walks off.
        resumeTimer.current = setTimeout(resume, 500);
      },
      { once: true }
    );
  };

  if (!size || reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="collaborator"
          aria-hidden="true"
          drag={grabbable}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={containerRef}
          onPointerDown={grab}
          style={{ x, y }}
          className={`absolute left-0 top-0 z-20 hidden select-none md:block ${
            grabbable ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: grabbed ? 1.08 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <MousePointer2
            className="absolute h-5 w-5 text-foreground"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <Tag tone="ink">{name}</Tag>
          <AnimatePresence>
            {grabbed && (
              <motion.span
                key={message}
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="absolute bottom-full left-6 mb-1 whitespace-nowrap rounded-2xl rounded-bl-sm bg-brand px-3 py-2 text-xs font-medium text-brand-foreground shadow-[0_10px_30px_-12px_rgba(15,20,35,0.5)]"
              >
                {messages[message]}
              </motion.span>
            )}
          </AnimatePresence>
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
