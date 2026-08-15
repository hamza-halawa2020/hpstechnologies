const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile() && entry.name === "index.html") files.push(full);
  }
  return files;
}

for (const file of walk(".")) {
  let html = fs.readFileSync(file, "utf8");
  const rel = path.relative(path.dirname(file), path.resolve("static-fix.css")).replace(/\\/g, "/") || "static-fix.css";

  if (!html.includes("static-fix.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="${rel}"></head>`);
  }

  html = html.replace(/\s+srcset="[^"]*assets\.zyrosite\.com[^"]*"/g, "");
  html = html.replace(/\s+srcset="[^"]*images\.pexels\.com[^"]*"/g, "");
  html = html.replace(/\s+srcset="[^"]*videos\.pexels\.com[^"]*"/g, "");

  fs.writeFileSync(file, html, "utf8");
  console.log(`fixed ${file}`);
}
