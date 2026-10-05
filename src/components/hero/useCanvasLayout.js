import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";

const STORAGE_KEY = "portfolio-hero-layout";
const DESKTOP_QUERY = "(min-width: 1024px)";

const readLayout = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const writeLayout = (layout) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // Storage can be blocked; positions then last only for this visit.
  }
};

// Desktop and mobile use different grids, so each keeps its own positions.
const currentBreakpoint = () =>
  window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile";

/**
 * Positions of the draggable hero items, persisted per visitor in localStorage.
 * Items that would end up outside the hero (after a resize) go back home.
 */
export const useCanvasLayout = (containerRef) => {
  const firstX = useMotionValue(0);
  const firstY = useMotionValue(0);
  const lastX = useMotionValue(0);
  const lastY = useMotionValue(0);
  const bioX = useMotionValue(0);
  const bioY = useMotionValue(0);

  const positions = useMemo(
    () => ({
      first: { x: firstX, y: firstY },
      last: { x: lastX, y: lastY },
      bio: { x: bioX, y: bioY },
    }),
    [firstX, firstY, lastX, lastY, bioX, bioY]
  );

  const elements = useRef({});
  const [moved, setMoved] = useState(false);

  const register = useCallback(
    (id) => (node) => {
      elements.current[id] = node;
    },
    []
  );

  const persist = useCallback(() => {
    const layout = readLayout();
    const entry = {};
    Object.entries(positions).forEach(([id, { x, y }]) => {
      if (x.get() || y.get()) entry[id] = { x: Math.round(x.get()), y: Math.round(y.get()) };
    });
    layout[currentBreakpoint()] = entry;
    writeLayout(layout);
    setMoved(Object.keys(entry).length > 0);
  }, [positions]);

  // Sends home any item whose center fell outside the hero.
  const keepInside = useCallback(() => {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    let changed = false;
    Object.entries(positions).forEach(([id, { x, y }]) => {
      const rect = elements.current[id]?.getBoundingClientRect();
      if (!rect || (!x.get() && !y.get())) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (cx < container.left || cx > container.right || cy < container.top || cy > container.bottom) {
        x.set(0);
        y.set(0);
        changed = true;
      }
    });
    if (changed) persist();
  }, [containerRef, positions, persist]);

  const restore = useCallback(() => {
    const saved = readLayout()[currentBreakpoint()] ?? {};
    Object.entries(positions).forEach(([id, { x, y }]) => {
      x.set(saved[id]?.x ?? 0);
      y.set(saved[id]?.y ?? 0);
    });
    setMoved(Object.keys(saved).length > 0);
    requestAnimationFrame(keepInside);
  }, [positions, keepInside]);

  useEffect(() => {
    restore();
    const query = window.matchMedia(DESKTOP_QUERY);
    query.addEventListener("change", restore);
    const observer = new ResizeObserver(() => keepInside());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      query.removeEventListener("change", restore);
      observer.disconnect();
    };
  }, [containerRef, restore, keepInside]);

  const reset = useCallback(() => {
    Object.values(positions).forEach(({ x, y }) => {
      animate(x, 0, { type: "spring", stiffness: 260, damping: 28 });
      animate(y, 0, { type: "spring", stiffness: 260, damping: 28 });
    });
    const layout = readLayout();
    delete layout[currentBreakpoint()];
    writeLayout(layout);
    setMoved(false);
  }, [positions]);

  return { positions, register, persist, reset, moved };
};
