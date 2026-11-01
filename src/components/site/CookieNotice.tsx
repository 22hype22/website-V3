"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

const KEY = "oversite:cookie-notice";

/* A small notice the first time someone visits: this site keeps only essential storage, nothing that tracks.
   Dismissed once, it stays dismissed on that browser. */
export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true); } catch { setShow(true); }
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(KEY, String(Date.now())); } catch {}
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="region" aria-label="Cookie notice">
      <div className="cookie_text">
        <b>Only the essentials.</b> This site stores two things on your device: whether you&apos;re signed in, and that you&apos;ve seen this notice. No tracking cookies, no ad networks, and fonts are served from our own servers.
      </div>
      <div className="cookie_actions">
        <a href={site.legal.cookies} className="cookie_link">Cookie policy</a>
        <button type="button" className="cookie_btn" onClick={dismiss}>Got it</button>
      </div>
    </div>
  );
}
