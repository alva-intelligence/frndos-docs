/**
 * Swizzled (eject) — Phosphor Icons (regular weight, MIT).
 * https://github.com/phosphor-icons/core
 */
import React from "react";

export default function IconMenu({
  width = 30,
  height = 30,
  className,
  ...restProps
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 256 256"
      aria-hidden="true"
      {...restProps}
    >
      <path
        fill="currentColor"
        d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
      />
    </svg>
  );
}
