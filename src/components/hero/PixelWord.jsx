import React, { useEffect, useRef } from "react";

// Extra room around the word so scattered pixels are not clipped.
const BLEED = 48;
const REPEL_RADIUS = 80;
const REPEL_FORCE = 5;
const SPRING = 0.07;
const FRICTION = 0.8;

/**
 * Renders a word as a grid of brand-colored pixels that scatter away from the
 * pointer and spring back. The invisible text keeps layout and selection box
 * identical to the plain-text version of the same word.
 */
const PixelWord = ({ text }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;
    let inView = true;
    let color = "";
    let fontsReady = false;
    let introPlayed = false;
    const pointer = { x: 0, y: 0, active: false };

    const readColor = () => {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand")
        .trim();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `hsl(${color})`;
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      let moving = false;
      const r2 = REPEL_RADIUS * REPEL_RADIUS;

      for (const p of particles) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        p.vx = (p.vx + (p.ox - p.x) * SPRING) * FRICTION;
        p.vy = (p.vy + (p.oy - p.y) * SPRING) * FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        if (
          Math.abs(p.vx) > 0.02 ||
          Math.abs(p.vy) > 0.02 ||
          Math.abs(p.ox - p.x) > 0.2 ||
          Math.abs(p.oy - p.y) > 0.2
        ) {
          moving = true;
        }
      }

      draw();

      if ((moving || pointer.active) && inView) {
        frame = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || reduceMotion || !inView) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const style = getComputedStyle(wrap);
      width = rect.width + BLEED * 2;
      height = rect.height + BLEED * 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = Math.ceil(height);
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if ("letterSpacing" in octx) octx.letterSpacing = style.letterSpacing;
      octx.textBaseline = "alphabetic";
      const metrics = octx.measureText(text);
      const capHeight = metrics.actualBoundingBoxAscent;
      const baseline = BLEED + rect.height / 2 + capHeight / 2;
      octx.fillStyle = "#000";
      octx.fillText(text, BLEED, baseline);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const cell = rect.height < 90 ? 4 : 6;
      const next = [];

      for (let y = 0; y < off.height; y += cell) {
        for (let x = 0; x < off.width; x += cell) {
          const sx = Math.min(off.width - 1, Math.floor(x + cell / 2));
          const sy = Math.min(off.height - 1, Math.floor(y + cell / 2));
          if (data[(sy * off.width + sx) * 4 + 3] < 128) continue;

          // Dithered tone that fades toward the end of the word.
          const fade = 1 - ((x - BLEED) / rect.width) * 0.55;
          const tone = [1, 0.8, 0.55, 0.35][Math.floor(Math.random() * 4)];
          // Pixels fly in only on the first build, not on every resize.
          const scatter = reduceMotion || introPlayed ? 0 : 1;
          next.push({
            ox: x,
            oy: y,
            x: x + (Math.random() - 0.5) * width * 0.6 * scatter,
            y: y + (Math.random() - 0.5) * height * 0.8 * scatter,
            vx: 0,
            vy: 0,
            size: cell - 1,
            alpha: Math.max(0.2, tone * fade),
          });
        }
      }

      particles = next;
      introPlayed = true;
      readColor();
      draw();
      start();
    };

    const onPointerMove = (event) => {
      if (!inView) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const near =
        x > -REPEL_RADIUS &&
        y > -REPEL_RADIUS &&
        x < rect.width + REPEL_RADIUS &&
        y < rect.height + REPEL_RADIUS;
      pointer.x = x;
      pointer.y = y;
      pointer.active = near;
      if (near) start();
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    // Wait for the web font so the pixels match the real glyphs.
    const resizeObserver = new ResizeObserver(() => {
      if (fontsReady) build();
    });
    resizeObserver.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
    });
    viewObserver.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    const onFontsReady = () => {
      fontsReady = true;
      build();
    };
    if (document.fonts) document.fonts.ready.then(onFontsReady);
    else onFontsReady();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [text]);

  return (
    <span ref={wrapRef} className="relative inline-block">
      <span className="invisible">{text}</span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ left: -BLEED, top: -BLEED }}
      />
    </span>
  );
};

export default PixelWord;
