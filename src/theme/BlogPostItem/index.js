import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItem from "@theme-original/BlogPostItem";

// Docusaurus classic does not draw the `image` frontmatter (it only feeds
// og:image and the RSS enclosure). Render it as a 16:9 cover above each post,
// in the /blog list (linked to the post) and on the post page.
function BlogPostCover() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { frontMatter, permalink, title } = metadata;
  const src = useBaseUrl(frontMatter.image);
  if (!frontMatter.image) return null;

  const img = (
    <img
      className="frnd-blog-cover__img"
      src={src}
      alt={title}
      loading={isBlogPostPage ? "eager" : "lazy"}
      width="1280"
      height="720"
    />
  );

  return (
    <div className="frnd-blog-cover">
      {isBlogPostPage ? (
        img
      ) : (
        <Link to={permalink} tabIndex={-1} aria-hidden="true">
          {img}
        </Link>
      )}
    </div>
  );
}

export default function BlogPostItemWrapper(props) {
  return (
    <>
      <BlogPostCover />
      <BlogPostItem {...props} />
    </>
  );
}
