import React from "react";
import styles from "./index.module.css";

// MDX components for the Tina `Video` and `YouTube` rich-text templates
// (src/theme/template.jsx). Registered in src/theme/MDXComponents.js.

const Caption = ({ children }) =>
  children ? <figcaption className={styles.caption}>{children}</figcaption> : null;

const Player = ({ src, poster, caption }) => (
  <figure className={styles.figure}>
    <video
      className={styles.frame}
      src={src}
      poster={poster || undefined}
      controls
      playsInline
      preload="metadata"
    />
    <Caption>{caption}</Caption>
  </figure>
);

// Self-hosted video uploaded through the Tina Media Manager (static/img/...).
export const Video = ({ src, poster, caption }) =>
  src ? <Player src={src} poster={poster} caption={caption} /> : null;

// Video hosted on AWS S3 / CloudFront, linked by URL. Only https, so the page
// never loads mixed content.
export const S3Video = ({ url, poster, caption }) =>
  /^https:\/\//.test(url || "") ? (
    <Player src={url} poster={poster} caption={caption} />
  ) : null;

const youTubeId = (url = "") => {
  const match = String(url).match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/
  );
  return match ? match[1] : null;
};

export const YouTube = ({ url, title, caption }) => {
  const id = youTubeId(url);
  if (!id) return null;
  return (
    <figure className={styles.figure}>
      <iframe
        className={styles.frame}
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title || caption || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
};
