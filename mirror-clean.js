const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const baseUrl = "https://hpstechnologies.my";
const pages = [
  "",
  "engineering-solutions",
  "cfd-and-simulation-engineers",
  "embedded-electrical-and-software-engineering-services",
  "mechanical-engineering-services",
  "engineering-services",
  "industry-solutions-engineering-solutions",
  "engineering-randd-services",
];

const mirroredHosts = new Set([
  "hpstechnologies.my",
  "assets.zyrosite.com",
  "videos.pexels.com",
  "images.pexels.com",
  "cdn.zyrosite.com",
  "fonts.gstatic.com",
]);

const downloaded = new Set();

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function pagePath(slug) {
  return slug ? path.join(slug, "index.html") : "index.html";
}

function hash(input) {
  return crypto.createHash("sha1").update(input).digest("hex").slice(0, 8);
}

function safeName(name) {
  return name.replace(/[^A-Za-z0-9._-]/g, "-");
}

function localPathFor(absoluteUrl) {
  const url = new URL(absoluteUrl);

  if (url.host === "hpstechnologies.my") {
    let pathname = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!pathname) return "index.html";
    if (!path.extname(pathname)) return path.join(pathname, "index.html");
    return pathname;
  }

  let name = safeName(path.basename(url.pathname));
  if (!name || !path.extname(name)) return null;

  if (url.search) {
    const ext = path.extname(name);
    const stem = ext ? name.slice(0, -ext.length) : name;
    name = `${stem}-${hash(url.search)}${ext}`;
  }

  return path.join("assets", "mirrored", url.host, name);
}

function shouldMirror(rawUrl, currentUrl) {
  if (!rawUrl || /^(data:|mailto:|tel:|#|javascript:)/i.test(rawUrl)) return false;

  let absolute;
  try {
    absolute = new URL(rawUrl, currentUrl);
  } catch {
    return false;
  }

  return mirroredHosts.has(absolute.host);
}

function relativeFrom(filePath, targetPath) {
  const fromDir = path.dirname(path.resolve(filePath));
  return path.relative(fromDir, path.resolve(targetPath)).replace(/\\/g, "/") || path.basename(targetPath);
}

async function download(absoluteUrl, localPath) {
  if (downloaded.has(localPath) || fs.existsSync(localPath)) return;

  ensureDir(localPath);
  const response = await fetch(absoluteUrl);
  if (!response.ok) {
    console.warn(`Skipped ${response.status}: ${absoluteUrl}`);
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(localPath, buffer);
  downloaded.add(localPath);
}

async function rewriteContent(content, currentUrl, filePath) {
  const tasks = [];

  content = content.replace(
    /\b(href|src|poster|component-url|renderer-url|before-hydration-url)=("|')([^"']+)\2/g,
    (full, attr, quote, rawUrl) => {
      if (!shouldMirror(rawUrl, currentUrl)) return full;

      const absolute = new URL(rawUrl, currentUrl).href;
      const localPath = localPathFor(absolute);
      if (!localPath) return full;

      if (!localPath.endsWith("index.html")) {
        tasks.push(download(absolute, localPath));
      }

      return `${attr}=${quote}${relativeFrom(filePath, localPath)}${quote}`;
    }
  );

  content = content.replace(/url\((["']?)([^)"']+)\1\)/g, (full, quote, rawUrl) => {
    if (!shouldMirror(rawUrl, currentUrl)) return full;

    const absolute = new URL(rawUrl, currentUrl).href;
    const localPath = localPathFor(absolute);
    if (!localPath) return full;

    if (!localPath.endsWith("index.html")) {
      tasks.push(download(absolute, localPath));
    }

    return `url(${quote}${relativeFrom(filePath, localPath)}${quote})`;
  });

  await Promise.all(tasks);
  return content;
}

async function mirrorPage(slug) {
  const url = slug ? `${baseUrl}/${slug}` : `${baseUrl}/`;
  const outPath = pagePath(slug);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  let html = await response.text();
  html = await rewriteContent(html, url, outPath);
  ensureDir(outPath);
  fs.writeFileSync(outPath, html, "utf8");
}

async function rewriteDownloadedAssets() {
  const files = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile() && /\.(css|js)$/i.test(entry.name)) files.push(full);
    }
  };

  walk("_astro-1784990859179");
  walk(path.join("assets", "mirrored"));

  for (const file of files) {
    const currentUrl = `${baseUrl}/`;
    const before = fs.readFileSync(file, "utf8");
    const after = await rewriteContent(before, currentUrl, file);
    if (after !== before) fs.writeFileSync(file, after, "utf8");
  }
}

(async () => {
  for (const slug of pages) {
    await mirrorPage(slug);
  }

  await rewriteDownloadedAssets();
  console.log(`Mirrored pages: ${pages.length}`);
  console.log(`Downloaded resources this run: ${downloaded.size}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
