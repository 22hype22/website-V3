// Turns the static export in out/ into out-relative/, a copy whose asset paths are relative to the page, so the
// site runs when hosted under any sub-path (a static artifact host, a CDN directory, a plain folder).
//
// - HTML: script/link/image paths become page-relative; the Turbopack chunk base path is set on the page so the
//   runtime loads further chunks relative to the page too.
// - CSS: font urls become relative to the stylesheet.
// - JS: only image/favicon paths are rewritten (they end up in src attributes, resolved against the page).
import { cpSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";

const SRC = "out", DST = "out-relative";
rmSync(DST, { recursive: true, force: true });
cpSync(SRC, DST, { recursive: true });

const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let touched = 0;
for (const file of walk(DST)) {
  const ext = extname(file);
  if (![".html", ".js", ".css", ".txt"].includes(ext)) continue;
  let s = readFileSync(file, "utf8");
  const before = s;
  if (ext === ".css") {
    const up = relative(dirname(file), DST).replace(/\\/g, "/");
    s = s.replace(/url\((['"]?)\/_next\//g, `url($1${up}/_next/`);
  } else if (ext === ".js") {
    s = s.replace(/(["'])\/(assets)\//g, "$1$2/").replace(/(["'])\/favicon\.ico/g, "$1favicon.ico");
  } else {
    s = s.replace(/(["'(])\/(_next|assets)\//g, "$1$2/").replace(/(["'])\/favicon\.ico/g, "$1favicon.ico");
    if (ext === ".html") s = s.replace("<head>", '<head><script>self.TURBOPACK_CHUNK_BASE_PATH="_next/"</script>');
  }
  if (s !== before) { writeFileSync(file, s); touched++; }
}
console.log(`relative export written to ${DST}/ (${touched} files rewritten)`);
