/**
 * Swizzled (eject) — Phosphor Icons (regular weight, MIT).
 * https://github.com/phosphor-icons/core
 */
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function IconEdit({ className, ...restProps }) {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 256 256"
      className={clsx(styles.iconEdit, className)}
      aria-hidden="true"
      {...restProps}
    >
      <path
        fill="currentColor"
        d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
      />
    </svg>
  );
}
