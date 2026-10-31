#!/usr/bin/env node
// Oversite website: serves the static export in out/ (built by `npm run build`).
// Railway runs `npm start`; the port comes from PORT. /health answers for Railway's healthcheck.
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { gate } from "./access-gate.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "out");
const PORT = +(process.env.PORT || 8080);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".webp": "image/webp", ".mp4": "video/mp4",
};

// Hashed build assets never change, so browsers may keep them; pages are always re-checked.
const cacheFor = (path) => (path.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate");

const send = (res, file, status = 200) => {
  const type = TYPES[extname(file)] || "application/octet-stream";
  res.writeHead(status, { "content-type": type, "cache-control": cacheFor(file.slice(ROOT.length).split(sep).join("/")), "content-length": statSync(file).size });
  createReadStream(file).pipe(res);
};

http.createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === "/health") { res.writeHead(200, { "content-type": "text/plain" }); return res.end("ok"); }

  // Preview lock: with ACCESS_CODE set, nothing below is served without the code.
  if (gate(req, res)) return;

  // resolve inside out/ only
  const safe = normalize(path).replace(/^(\.\.[/\\])+/, "");
  let file = join(ROOT, safe);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && existsSync(file + ".html")) file += ".html";
  if (existsSync(file) && statSync(file).isFile()) return send(res, file);

  const notFound = join(ROOT, "404.html");
  if (existsSync(notFound)) return send(res, notFound, 404);
  res.writeHead(404, { "content-type": "text/plain" }); res.end("Not found");
}).listen(PORT, () => console.log(`Oversite website on http://localhost:${PORT}`));
