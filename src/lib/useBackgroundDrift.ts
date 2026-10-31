"use client";

import { useEffect } from "react";

/* The mountain behind the page drifts with the scroll: the top of the photo at the top of the page, its midpoint
   once you reach the bottom (see body::before in overrides.css). Scroll spent inside a pinned (sticky) section
   does not move the frame, so it does not move the photo either. */
export function useBackgroundDrift() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const held = (y: number) => {
      let sum = 0;
      for (const el of Array.from(document.querySelectorAll<HTMLElement>(".padding-global.is-products, .padding-global.is-perfom"))) {
        if (getComputedStyle(el).position !== "sticky" || !el.parentElement) continue;
        const sec = el.parentElement;
        const top = sec.getBoundingClientRect().top + window.scrollY;
        const hold = Math.max(0, sec.offsetHeight - el.offsetHeight);
        sum += Math.min(hold, Math.max(0, y - top));
      }
      return sum;
    };
    const paint = () => {
      raf = 0;
      const maxY = Math.max(1, root.scrollHeight - window.innerHeight);
      const max = Math.max(1, maxY - held(maxY));
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      root.style.setProperty("--bg-p", String(Math.min(1, Math.max(0, (y - held(y)) / max))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
}
