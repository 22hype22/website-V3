"use client";

import { useEffect, useRef, useState } from "react";
import { inView } from "motion";
import { Settings, CirclePlus } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";

const LINKS: [string, string][] = [["top", "Home"], ["features", "Features"], ["dashboard", "Dashboard"], ["pricing", "Pricing"], ["contact", "Contact"]];

export default function Nav({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("top");

  // The nav waits, hidden, until the loader hands over; then its pieces fade in left to right.
  useGSAP(() => {
    const bits = gsap.utils.toArray<HTMLElement>(".brand, .nav-links a, .nav-actions > *", root.current);
    if (!ready) { gsap.set(bits, { opacity: 0 }); return; }
    gsap.to(bits, { opacity: 1, duration: 0.6, stagger: 0.04, delay: 0.3 });
  }, { scope: root, dependencies: [ready] });

  // The link for the section on screen is the active one (Motion's inView).
  useEffect(() => {
    const stops = LINKS.map(([id]) => {
      const el = document.getElementById(id);
      return el ? inView(el, () => { setActive(id); }, { amount: 0.2 }) : null;
    });
    return () => stops.forEach((s) => s && s());
  }, []);

  return (
    <header className="nav" ref={root}>
      <a className="brand" href="#top">
        <img className="brand-mark" src="/assets/oversite-mark-black.png" alt="" />
        <span className="brand-name">{site.name}</span>
      </a>
      <nav className="nav-links">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "is-active" : undefined}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="nav-login" href="#login"><Settings size={11} strokeWidth={2} /> Login</a>
        <a className="btn btn-dark" href="#trial"><CirclePlus size={11} strokeWidth={2.2} /> Start Your Trial</a>
      </div>
    </header>
  );
}
