import React from "react";
import { motion } from "framer-motion";

const HANDLES = [
  "-left-1 -top-1",
  "-right-1 -top-1",
  "-left-1 -bottom-1",
  "-right-1 -bottom-1",
];

/** Design-tool style selection box. Shared layoutId makes it glide between words. */
const SelectionFrame = ({ label = "Text" }) => (
  <motion.span
    layoutId="hero-selection"
    aria-hidden="true"
    transition={{ type: "spring", stiffness: 320, damping: 30 }}
    className="pointer-events-none absolute -inset-x-3 -inset-y-2 border border-brand md:-inset-x-4 md:-inset-y-3"
  >
    <span className="absolute -top-6 left-0 rounded-[3px] bg-brand px-1.5 py-0.5 font-sans text-[10px] font-medium leading-none tracking-normal text-brand-foreground normal-case">
      {label}
    </span>
    {HANDLES.map((position) => (
      <span
        key={position}
        className={`absolute h-2 w-2 border border-brand bg-background ${position}`}
      />
    ))}
  </motion.span>
);

export default SelectionFrame;
