"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

/* The legal line under the footer: copyright on the left, the three policies in the middle, the support address on
   the right. The bar itself stays put. The three policy links float at the bottom of the screen, faded, while you
   scroll, and drop back into their slot in the bar once the bar comes into view. */
const LINKS: [string, string][] = [[site.legal.privacy, "Privacy Policy"], [site.legal.terms, "Terms of Use"], [site.legal.refunds, "Sales and Refunds"]];

export default function LegalBar() {
  const slot = useRef<HTMLDivElement>(null);
  const [floating, setFloating] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = slot.current; if (!el) return;
      const r = el.getBoundingClientRect();
      // float until the slot in the bar is fully on screen, then drop into it
      setFloating(r.bottom > window.innerHeight - 8);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const links = (cls: string, hidden = false) => (
    <nav className={cls} aria-label="Legal" aria-hidden={hidden || undefined}>
      {LINKS.map(([href, label]) => <a href={href} key={label} tabIndex={hidden ? -1 : undefined}>{label}</a>)}
    </nav>
  );

  return (
    <div className="legal-bar">
      <div className="padding-global">
        <div className="container-large">
          <div className="legal-bar_row">
            <div className="legal-bar_copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
            <div className="legal-bar_slot" ref={slot}>
              {links("legal-bar_links is-ghost", true)}
              {links(`legal-bar_links${floating ? " is-floating" : ""}`)}
            </div>
            <a href={`mailto:${site.email}`} className="legal-bar_mail">{site.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
