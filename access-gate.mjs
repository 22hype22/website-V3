// Preview lock for the staging site (v3.oversite.shop).
//
// With ACCESS_CODE set, every page asks for the code first. A correct code
// sets a cookie holding an HMAC of the code, so changing ACCESS_CODE signs
// everyone out. Without ACCESS_CODE the site is open, as it will be at launch.
// While locked, every answer carries noindex so search engines skip it.
import { createHmac, timingSafeEqual } from "node:crypto";

const CODE = (process.env.ACCESS_CODE || "").trim();
const COOKIE = "ovs_preview";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const gateOn = () => CODE.length > 0;

const sign = () => createHmac("sha256", CODE).update("oversite-preview-v1").digest("base64url");

const cookieOf = (req) => {
  const raw = req.headers.cookie || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === COOKIE) return v.join("=");
  }
  return "";
};

const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Whether this request already carries the right cookie. */
export const unlocked = (req) => !gateOn() || same(cookieOf(req), sign());

// Wrong guesses per address, so the code can't be tried at speed.
const tries = new Map();
const limited = (ip) => {
  const now = Date.now();
  const t = (tries.get(ip) || []).filter((at) => now - at < 10 * 60_000);
  tries.set(ip, t);
  return t.length >= 10;
};
const miss = (ip) => tries.set(ip, [...(tries.get(ip) || []), Date.now()]);

const page = (msg = "") => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Oversite preview</title>
<style>
  :root{--bg:#293038;--ink:#20262D;--line:#56626E;--head:#E8EEF3;--body:#A8B4BF;--faint:#788591;--accent:#C9DBE6;--accent-ink:#1E242B;--bad:#F87171}
  *{box-sizing:border-box}html,body{margin:0;height:100%}
  body{background:var(--bg);color:var(--body);font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;display:grid;place-items:center;padding:16px}
  form{width:100%;max-width:340px;background:var(--ink);border:1px solid rgb(86 98 110/.5);border-radius:20px;padding:28px}
  h1{margin:0 0 6px;color:var(--head);font-size:20px;letter-spacing:-.01em}
  p{margin:0 0 18px;font-size:13.5px}
  input{width:100%;height:44px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--head);font-size:18px;letter-spacing:.2em;text-align:center;padding:0 12px}
  input:focus{outline:2px solid var(--accent);outline-offset:1px}
  button{margin-top:12px;width:100%;height:44px;border:0;border-radius:12px;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:14px;cursor:pointer}
  .err{margin:10px 0 0;color:var(--bad);font-size:13px;min-height:1em}
</style></head>
<body><form method="post" action="/__access">
  <h1>Oversite preview</h1>
  <p>This version of the site is not public yet. Enter the access code to continue.</p>
  <input name="code" type="password" inputmode="numeric" autocomplete="off" autofocus aria-label="Access code" required>
  <button type="submit">Continue</button>
  <p class="err" role="alert">${msg}</p>
</form></body></html>`;

const show = (res, status, msg) => {
  res.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex, nofollow",
  });
  res.end(page(msg));
};

/**
 * Handle the lock for one request. Returns true when it answered (the form,
 * a wrong code, or the redirect after a right one); false lets the site serve.
 */
export function gate(req, res) {
  if (!gateOn()) return false;
  res.setHeader("x-robots-tag", "noindex, nofollow");
  const path = new URL(req.url, "http://x").pathname;

  if (path === "/__access" && req.method === "POST") {
    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    if (limited(ip)) { show(res, 429, "Too many tries. Wait ten minutes and try again."); return true; }
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 2000) req.destroy(); });
    req.on("end", () => {
      const code = (new URLSearchParams(body).get("code") || "").trim();
      if (!same(code, CODE)) { miss(ip); show(res, 401, "That code isn't right."); return; }
      const secure = String(req.headers["x-forwarded-proto"] || "").includes("https") ? "; Secure" : "";
      res.writeHead(303, {
        location: "/",
        "set-cookie": `${COOKIE}=${sign()}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
        "cache-control": "no-store",
      });
      res.end();
    });
    return true;
  }

  if (unlocked(req)) return false;
  show(res, 401, "");
  return true;
}
