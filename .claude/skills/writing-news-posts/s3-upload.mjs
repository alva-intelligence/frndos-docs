/**
 * Shared S3 helpers for news-video.mjs and news-image.mjs.
 *
 * Bucket frnd, prefix frndos-update/, region ap-southeast-3. Objects are PUT
 * with ACL public-read via curl --aws-sigv4 (no npm dependency); the secret
 * goes to curl through its stdin config, never argv.
 *
 * Credentials: FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET from the
 * environment or ./.env (run from the frndos-docs root). Scope:
 * s3-uploader-policy.json.
 */
import { execFileSync } from "child_process";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

export const BUCKET = "frnd";
export const REGION = "ap-southeast-3";
export const PREFIX = "frndos-update";

export const die = (msg, code = 1) => {
  console.error(msg);
  process.exit(code);
};

export const publicUrlFor = (key) => `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

export const tempDir = (name) => fs.mkdtempSync(path.join(os.tmpdir(), `${name}-`));

/** Anonymous HEAD. Objects under the prefix are public-read, so 200 = exists. */
export const head = async (url) => {
  const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(15000) });
  return { status: res.status, type: res.headers.get("content-type") || "", length: res.headers.get("content-length") };
};

/** Refuse keys that already exist, unless force. Returns the existing ones (for the error). */
export const existingKeys = async (keys) => {
  const found = [];
  for (const key of keys) {
    const h = await head(publicUrlFor(key));
    if (h.status === 200) found.push(`${publicUrlFor(key)} (${h.length} bytes)`);
  }
  return found;
};

export const credentials = () => {
  const env = {};
  const file = path.join(process.cwd(), ".env");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
    }
  }
  const keyId = process.env.FRNDOS_NEWS_S3_KEY_ID || env.FRNDOS_NEWS_S3_KEY_ID;
  const secret = process.env.FRNDOS_NEWS_S3_SECRET || env.FRNDOS_NEWS_S3_SECRET;
  return keyId && secret ? { keyId, secret } : null;
};

/**
 * PUT a local file to s3://frnd/<key> (public-read), then prove the public URL.
 * Returns { ok: true, url, type, length } or { ok: false, error }.
 */
export const putPublic = async (file, key, contentType, creds) => {
  const url = publicUrlFor(key);
  const sha256 = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  const respFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "s3-put-")), "response.xml");
  let status;
  try {
    status = execFileSync(
      "curl",
      [
        "-sS", "-K", "-", "-w", "%{http_code}", "-o", respFile,
        "--aws-sigv4", `aws:amz:${REGION}:s3`,
        "-X", "PUT", "-T", file,
        "-H", `Content-Type: ${contentType}`,
        "-H", "x-amz-acl: public-read",
        "-H", `x-amz-content-sha256: ${sha256}`,
        url,
      ],
      { input: `user = "${creds.keyId}:${creds.secret}"\n`, encoding: "utf8", stdio: ["pipe", "pipe", "inherit"] }
    ).trim();
  } catch {
    status = "curl error";
  }
  if (status !== "200") {
    const body = fs.existsSync(respFile) ? fs.readFileSync(respFile, "utf8") : "";
    const s3err = [body.match(/<Code>(.*?)<\/Code>/)?.[1], body.match(/<Message>(.*?)<\/Message>/)?.[1]]
      .filter(Boolean)
      .join(": ");
    return { ok: false, error: `S3 PUT ${key} failed (${status}${s3err ? `, ${s3err}` : ""})` };
  }
  const after = await head(url);
  if (after.status !== 200 || !after.type.startsWith(contentType.split("/")[0] + "/")) {
    return { ok: false, error: `uploaded ${key}, but anonymous HEAD returned ${after.status} "${after.type}"; check the object ACL / bucket settings` };
  }
  return { ok: true, url, type: after.type, length: after.length };
};

/** Lark: fetch the doc once as markdown (keeps <img>/<source> tags with tokens). */
export const fetchLarkDoc = (docUrl) =>
  execFileSync("lark-cli", ["docs", "+fetch", "--doc", docUrl, "--doc-format", "markdown", "-q", ".data.document.content"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

/** Lark: download one media token into dir as <name>.<ext>; returns the path. */
export const downloadLarkMedia = (token, dir, name) => {
  // lark-cli only accepts an output path relative to its cwd; no extension = it adds one from Content-Type
  execFileSync("lark-cli", ["docs", "+media-download", "--token", token, "--output", `./${name}`, "--overwrite"], {
    cwd: dir,
    stdio: ["ignore", "ignore", "inherit"],
  });
  const file = fs.readdirSync(dir).find((f) => f === name || f.startsWith(`${name}.`));
  if (!file) die(`Lark download of ${token} produced no file`);
  return path.join(dir, file);
};
