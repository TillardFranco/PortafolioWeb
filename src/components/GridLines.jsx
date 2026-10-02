import React from "react";
import { cn } from "@/lib/utils";

/** Vertical column guides, aligned with the page container. Color via text color. */
const GridLines = ({ className }) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none absolute inset-0", className)}
  >
    <div className="mx-auto grid h-full max-w-[1400px] grid-cols-4 px-4 md:grid-cols-6 md:px-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "border-l border-current",
            i === 3 && "border-r md:border-r-0",
            i >= 4 && "hidden md:block",
            i === 5 && "md:border-r"
          )}
        />
      ))}
    </div>
  </div>
);

export default GridLines;
