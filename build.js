const fs = require("fs");
const path = require("path");

const root = __dirname;
const outDir = path.join(root, "dist");
const entries = [
  "index.html",
  "404.html",
  "impressum.html",
  "datenschutz.html",
  "assets"
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) continue;
  const target = path.join(outDir, entry);
  fs.cpSync(source, target, { recursive: true });
}

console.log("Static site built in dist/");
