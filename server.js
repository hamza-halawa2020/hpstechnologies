const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const root = __dirname;
const preferredPort = Number(process.env.PORT || 8099);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function handler(req, res) {
  const cleanUrl = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.resolve(root, "." + cleanUrl);

  if (!filePath.toLowerCase().startsWith(root.toLowerCase())) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = types[ext] || "application/octet-stream";

  if (ext === ".html") {
    let html = fs.readFileSync(filePath, "utf8");

    html = html
      .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, "")
      .replace("</head>", '<style>astro-island,astro-slot,astro-static-slot{display:contents!important}.transition,.transition--root-hidden,.transition--slide,.transition--fade,.transition--scale,.transition--slide-left,.transition--slide-right,.transition--blur,.transition--rise,[data-animation-role],[data-animation-role=image],[data-animation-role=block-element]{opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}</style></head>');

    res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-store" });
    res.end(html);
    return;
  }

  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
}

function listen(port) {
  const server = http.createServer(handler);

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}`;
    console.log(`HPS mirror running at ${url}`);
    if (process.env.OPEN_BROWSER !== "0") {
      exec(`start "" "${url}"`);
    }
  });
}

listen(preferredPort);
