// Turns the static export in out/ into out-relative/, a copy whose asset paths are relative to the page, so the
// site runs when hosted under any sub-path (a static artifact host, a CDN directory, a plain folder).
//
// - HTML: script/link/image paths become page-relative; the Turbopack chunk base path is set on the page so the
//   runtime loads further chunks relative to the page too.
// - CSS: font urls become relative to the stylesheet.
// - JS: public asset paths (images, video, lottie) are rewritten; they end up in src attributes or fetches
//   resolved against the page.
import { cpSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync, renameSync, mkdirSync } from "node:fs";
import { join, relative, dirname, extname } from "node:path";

// `node scripts/relative-export.mjs --next-dir n/_next` also moves the _next folder, for hosts that reserve
// top-level names starting with an underscore. (The Next runtime requires a "/_next/" segment in the path, so
// nest it rather than rename it.)
const args = process.argv.slice(2);
const NEXT_DIR = args.includes("--next-dir") ? args[args.indexOf("--next-dir") + 1] : "_next";
const SRC = "out", DST = args.includes("--out") ? args[args.indexOf("--out") + 1] : "out-relative";
rmSync(DST, { recursive: true, force: true });
cpSync(SRC, DST, { recursive: true });
if (NEXT_DIR !== "_next") { mkdirSync(dirname(join(DST, NEXT_DIR)), { recursive: true }); renameSync(join(DST, "_next"), join(DST, NEXT_DIR)); }

// every folder under public/ that the page refers to with a root-absolute path
const PUBLIC = "(assets|al|fonts|video|lottie)";
const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let touched = 0;
for (const file of walk(DST)) {
  const ext = extname(file);
  if (![".html", ".js", ".css", ".txt"].includes(ext)) continue;
  let s = readFileSync(file, "utf8");
  const before = s;
  if (ext === ".css") {
    const up = relative(dirname(file), DST).replace(/\\/g, "/");
    s = s.replace(/url\((['"]?)\/_next\//g, `url($1${up}/${NEXT_DIR}/`).replace(new RegExp(`url\\((['"]?)/${PUBLIC}/`, "g"), `url($1${up}/$2/`);
  } else if (ext === ".js") {
    s = s.replace(new RegExp(`(["'])/${PUBLIC}/`, "g"), "$1$2/").replace(/(["'])\/favicon\.ico/g, "$1favicon.ico");
    s = s.replace(/\uFFFD/g, "\\uFFFD"); // some hosts reject the literal replacement character; the escape is equivalent
  } else {
    s = s.replace(/(["'(])\/_next\//g, `$1${NEXT_DIR}/`).replace(new RegExp(`(["'(])/${PUBLIC}/`, "g"), "$1$2/").replace(/(["'])\/favicon\.ico/g, "$1favicon.ico");
    if (ext === ".html") s = s.replace("<head>", `<head><script>self.TURBOPACK_CHUNK_BASE_PATH="${NEXT_DIR}/"</script>`);
  }
  if (s !== before) { writeFileSync(file, s); touched++; }
}
console.log(`relative export written to ${DST}/ (${touched} files rewritten)`);
