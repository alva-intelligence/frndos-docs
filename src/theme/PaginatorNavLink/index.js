/**
 * Swizzled (eject) — renders the prev/next arrows as Phosphor Caret icons
 * instead of the Infima « » text glyphs (see styles.module.css, which
 * suppresses the original ::before / ::after content).
 *
 * Phosphor Icons (regular weight, MIT) — https://github.com/phosphor-icons/core
 */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

function CaretLeft() {
  return (
    <svg
      className={styles.caret}
      viewBox="0 0 256 256"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"
      />
    </svg>
  );
}

function CaretRight() {
  return (
    <svg
      className={styles.caret}
      viewBox="0 0 256 256"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
      />
    </svg>
  );
}

export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      className={clsx(
        "pagination-nav__link",
        isNext ? "pagination-nav__link--next" : "pagination-nav__link--prev",
      )}
      to={permalink}
    >
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className={clsx("pagination-nav__label", styles.label)}>
        {!isNext && <CaretLeft />}
        <span>{title}</span>
        {isNext && <CaretRight />}
      </div>
    </Link>
  );
}
