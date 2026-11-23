import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once so every component shares the same plugin instances.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared curves, matching the cubic-bezier(0.16, 1, 0.3, 1) used by framer-motion reveals.
export const EASE_OUT = "expo.out";

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
