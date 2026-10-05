import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motionValue } from "framer-motion";

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
 * Items register by id the first time they render; items that would end up
 * outside the hero (after a resize) go back home.
 */
export const useCanvasLayout = (containerRef) => {
  const values = useRef(new Map());
  const elements = useRef({});
  const [moved, setMoved] = useState(false);

  /** Motion values for an item, created on first use from the saved layout. */
  const position = useCallback((id) => {
    if (!values.current.has(id)) {
      const saved = readLayout()[currentBreakpoint()]?.[id];
      values.current.set(id, { x: motionValue(saved?.x ?? 0), y: motionValue(saved?.y ?? 0) });
    }
    return values.current.get(id);
  }, []);

  const register = useCallback(
    (id) => (node) => {
      elements.current[id] = node;
    },
    []
  );

  const persist = useCallback(() => {
    const layout = readLayout();
    const entry = {};
    values.current.forEach(({ x, y }, id) => {
      if (x.get() || y.get()) entry[id] = { x: Math.round(x.get()), y: Math.round(y.get()) };
    });
    layout[currentBreakpoint()] = entry;
    writeLayout(layout);
    setMoved(Object.keys(entry).length > 0);
  }, []);

  // Sends home any item whose center fell outside the hero.
  const keepInside = useCallback(() => {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    let changed = false;
    values.current.forEach(({ x, y }, id) => {
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
  }, [containerRef, persist]);

  const restore = useCallback(() => {
    const saved = readLayout()[currentBreakpoint()] ?? {};
    values.current.forEach(({ x, y }, id) => {
      x.set(saved[id]?.x ?? 0);
      y.set(saved[id]?.y ?? 0);
    });
    setMoved(Object.keys(saved).length > 0);
    requestAnimationFrame(keepInside);
  }, [keepInside]);

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
    values.current.forEach(({ x, y }) => {
      animate(x, 0, { type: "spring", stiffness: 260, damping: 28 });
      animate(y, 0, { type: "spring", stiffness: 260, damping: 28 });
    });
    const layout = readLayout();
    delete layout[currentBreakpoint()];
    writeLayout(layout);
    setMoved(false);
  }, []);

  return { position, register, persist, reset, moved };
};
