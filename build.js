/*
 * build.js — generate a single self-contained index.html
 *
 * Reads template.html (the editable HTML shell), styles.css, data.js and
 * app.js, and inlines them into ONE file: index.html. The output has zero
 * external references, so it works the same when opened:
 *   - from GitHub Pages
 *   - from a phone browser
 *   - as a local file (file://) where supported
 *
 * Run it after editing any source file:
 *   node build.js
 *
 * No dependencies — plain Node. (You only need this to rebuild; using the
 * tracker itself needs nothing but a browser.)
 */

const fs = require("fs");
const path = require("path");

const dir = __dirname;
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");

const template = read("template.html");
const css = read("styles.css");
const data = read("data.js");
const app = read("app.js");

let out = template
  .replace(
    /\s*<link rel="stylesheet" href="styles.css" \/>/,
    "\n  <style>\n" + css + "\n  </style>"
  )
  .replace(
    /\s*<script src="data.js"><\/script>/,
    "\n  <script>\n" + data + "\n  </script>"
  )
  .replace(
    /\s*<script src="app.js"><\/script>/,
    "\n  <script>\n" + app + "\n  </script>"
  );

// Safety: make sure no external reference survived the inlining.
if (/href="styles\.css"/.test(out) || /src="data\.js"/.test(out) || /src="app\.js"/.test(out)) {
  console.error("Build failed: an external reference was not inlined.");
  process.exit(1);
}

fs.writeFileSync(path.join(dir, "index.html"), out);
console.log("Built index.html (" + out.length + " bytes) — fully self-contained.");
