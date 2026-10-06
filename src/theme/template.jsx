import React from "react";
import { slugify } from "../../util";

const AdmonitionTemplate = {
  name: "Admonition",
  ui: {
    defaultItem: {
      type: "note",
      title: "Note",
    },
    itemProps: (item) => {
      return { label: item?.title };
    },
  },
  fields: [
    {
      name: "type",
      label: "Type",
      type: "string",
      options: [
        {
          label: "Note",
          value: "note",
        },
        {
          label: "Tip",
          value: "tip",
        },
        {
          label: "Info",
          value: "info",
        },
        {
          label: "Caution",
          value: "caution",
        },
        {
          label: "Danger",
          value: "danger",
        },
      ],
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "children",
      label: "Content",
      type: "rich-text",
    },
  ],
};

const DetailsTemplate = {
  name: "Details",
  fields: [
    {
      name: "summary",
      label: "Summary",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      name: "children",
      label: "Details",
      type: "rich-text",
    },
  ],
};

const CodeBlockTemplate = {
  name: "CodeBlock",
  label: "Code Block",
  fields: [
    {
      name: "title",
      label: "Filename",
      type: "string",
    },
    {
      name: "language",
      label: "Language",
      type: "string",
    },
    {
      name: "children",
      label: "Code",
      type: "rich-text",
      required: true,
    },
  ],
};

const TabsTemplate = {
  name: "Tabs",
  fields: [
    {
      name: "children",
      label: "Tabs",
      type: "rich-text",
      templates: [
        {
          name: "TabItem",
          label: "Tab",
          ui: {
            defaultItem: {
              label: "Tab",
              value: "tab",
            },
          },
          fields: [
            {
              name: "label",
              label: "Label",
              type: "string",
              isTitle: true,
              required: true,
            },
            {
              name: "value",
              type: "string",
              ui: {
                component: ({ input, tinaForm }) => {
                  React.useEffect(() => {
                    input.onChange(slugify(tinaForm.values.label));
                  }, [JSON.stringify(tinaForm.values)]);

                  return (
                    <input
                      type="text"
                      id={input.name}
                      className="hidden"
                      {...input}
                    />
                  );
                },
              },
            },
            {
              name: "children",
              label: "Content",
              type: "string",
              ui: {
                component: "textarea",
              },
            },
          ],
        },
      ],
    },
  ],
};

const DocCardListTemplate = {
  name: "DocCardList",
  label: "Doc Card List",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};

// Video templates for the What's New post body only (rendered by
// src/components/MediaEmbed). Newsletter bodies become email, where video
// does not play, so they are not part of the shared MDXTemplates.
const VideoTemplate = {
  name: "Video",
  label: "Video (upload)",
  ui: {
    itemProps: (item) => ({ label: item?.caption || item?.src || "Video" }),
  },
  fields: [
    {
      name: "src",
      label: "Video file",
      type: "image",
      description:
        "Upload or pick an .mp4 / .webm from the Media Manager (keep it small, it is stored in git; max 100 MB). For long videos use the YouTube block.",
      required: true,
    },
    {
      name: "poster",
      label: "Poster image",
      type: "image",
      description: "Optional still shown before the video plays.",
    },
    { name: "caption", label: "Caption", type: "string" },
  ],
};

const S3VideoTemplate = {
  name: "S3Video",
  label: "Video (S3 link)",
  ui: {
    itemProps: (item) => ({ label: item?.caption || item?.url || "S3 video" }),
  },
  fields: [
    {
      name: "url",
      label: "S3 video URL",
      type: "string",
      description:
        "Public https link to an .mp4 / .webm on AWS S3 or CloudFront, e.g. https://frnd.s3.ap-southeast-3.amazonaws.com/path/demo.mp4. The object must be public. Do not paste a pre-signed link (?X-Amz-Signature=…): it expires and the video breaks.",
      required: true,
    },
    {
      name: "poster",
      label: "Poster image",
      type: "image",
      description: "Optional still shown before the video plays.",
    },
    { name: "caption", label: "Caption", type: "string" },
  ],
};

const YouTubeTemplate = {
  name: "YouTube",
  label: "YouTube",
  ui: {
    itemProps: (item) => ({ label: item?.title || item?.url || "YouTube" }),
  },
  fields: [
    {
      name: "url",
      label: "YouTube URL",
      type: "string",
      description: "e.g. https://www.youtube.com/watch?v=… or https://youtu.be/…",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "Accessible title for the player.",
    },
    { name: "caption", label: "Caption", type: "string" },
  ],
};

export const VideoTemplates = [VideoTemplate, S3VideoTemplate, YouTubeTemplate];

export const MDXTemplates = [
  AdmonitionTemplate,
  DetailsTemplate,
  CodeBlockTemplate,
  TabsTemplate,
  DocCardListTemplate,
];
