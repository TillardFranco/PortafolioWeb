import React from "react";

/**
 * Terminal prompt ">_" mark, the same artwork as public/favicon.svg.
 * Strokes use currentColor so the mark follows the theme; the background comes from the parent.
 * Inside a `group`, hovering the group makes the caret blink like a terminal cursor.
 */
const LogoMark = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M8 10.5l6 5.5-6 5.5" />
    <path
      d="M17.5 22h7"
      className="group-hover:animate-[caret-blink_1s_step-end_infinite] motion-reduce:animate-none"
    />
  </svg>
);

export default LogoMark;
