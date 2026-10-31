"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

/* The legal line under the footer: copyright on the left, the three policies in the middle, the support address on
   the right. The bar itself stays put. The three policy links are pinned near the bottom of the screen, faded, and
   once their slot in the bar scrolls into view they ride up with it (no jump) and brighten when they are home. */
const LINKS: [string, string][] = [[site.legal.privacy, "Privacy Policy"], [site.legal.terms, "Terms of Use"], [site.legal.refunds, "Sales and Refunds"]];
const REST = 16; // px above the bottom edge while floating

export default function LegalBar() {
  const slot = useRef<HTMLDivElement>(null);
  const links = useRef<HTMLElement>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = slot.current, l = links.current; if (!s || !l) return;
      const r = s.getBoundingClientRect();
      // distance from the viewport bottom to the slot's bottom edge; never lower than the resting offset
      const fromBottom = window.innerHeight - r.bottom;
      l.style.bottom = Math.max(REST, fromBottom) + "px";
      setDocked(fromBottom >= REST - 4);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const nav = (cls: string, hidden = false, ref?: React.Ref<HTMLElement>) => (
    <nav className={cls} aria-label="Legal" aria-hidden={hidden || undefined} ref={ref}>
      {LINKS.map(([href, label]) => <a href={href} key={label} tabIndex={hidden ? -1 : undefined}>{label}</a>)}
    </nav>
  );

  return (
    <div className="legal-bar">
      <div className="padding-global">
        <div className="container-large">
          <div className="legal-bar_row">
            <div className="legal-bar_copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
            <div className="legal-bar_slot" ref={slot}>{nav("legal-bar_links is-ghost", true)}</div>
            <a href={`mailto:${site.email}`} className="legal-bar_mail">{site.email}</a>
          </div>
        </div>
      </div>
      {nav(`legal-bar_links is-live${docked ? " is-docked" : ""}`, false, links)}
    </div>
  );
}
