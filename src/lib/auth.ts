"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

/* Signed-in detection for a static site. There is no auth backend here yet, so a session is recognised in two
   ways: a cookie named site.sessionCookie (set by the real sign-in flow on the same domain), or the localStorage
   key below (handy for testing and for a sign-in page that lives elsewhere). Both are checked on load, whenever the
   tab regains focus, and when another tab changes storage. */
const KEY = "oversite:signed-in";

export function isSignedIn(): boolean {
  if (typeof document === "undefined") return false;
  const cookie = document.cookie.split(";").some((c) => c.trim().startsWith(site.sessionCookie + "="));
  let stored = false;
  try { stored = localStorage.getItem(KEY) === "1"; } catch {}
  return cookie || stored;
}

export function setSignedIn(on: boolean) {
  try { on ? localStorage.setItem(KEY, "1") : localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new Event("oversite:auth"));
}

export function useSignedIn() {
  const [signedIn, set] = useState(false);
  useEffect(() => {
    const sync = () => set(isSignedIn());
    sync();
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("oversite:auth", sync);
    // console helpers while there is no real sign-in: oversite.signIn() / oversite.signOut()
    (window as unknown as { oversite: object }).oversite = { signIn: () => setSignedIn(true), signOut: () => setSignedIn(false) };
    return () => { window.removeEventListener("focus", sync); window.removeEventListener("storage", sync); window.removeEventListener("oversite:auth", sync); };
  }, []);
  return signedIn;
}
