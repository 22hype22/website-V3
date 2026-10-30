"use client";

import { useRef } from "react";
import { Play, ArrowDown } from "lucide-react";
import SplitText from "@/components/SplitText";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/config/site";
import Laptop from "./Laptop";

const TITLE = "Unlock Your Trading Potential";

/* The hero: the headline comes in word by word, each word clearing from a blur (React Bits SplitText on GSAP),
   then the subline, the scroll hint and the corner mark follow. Nothing animates until the loader has handed over. */
export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const after = [...q(".hero-sub"), ...q(".scroll-hint"), ...q(".hero-corner-mark"), ...q(".hero-film"), ...q(".hero-mockup")];
    if (!ready) { gsap.set(after, { opacity: 0 }); return; }
    const tl = gsap.timeline();
    tl.fromTo(q(".hero-sub"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
      .to([...q(".scroll-hint"), ...q(".hero-corner-mark")], { opacity: 1, duration: 0.6 }, 1);
    if (site.heroMockup) {
      tl.fromTo(q(".hero-film"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo(q(".hero-mockup"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.4 }, 0.5);
      // the mockup drifts up a touch faster than the page as you leave the hero
      gsap.to(q(".hero-mockup"), { y: -80, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }
    ScrollTrigger.refresh();
  }, { scope: root, dependencies: [ready] });

  return (
    <section className={`hero${site.heroMockup ? " hero-with-mockup" : ""}`} id="top" ref={root}>
      {site.heroMockup && <a className="hero-film" href="#film"><Play size={9} strokeWidth={2.5} /> Watch the film</a>}
      {ready ? (
        <SplitText tag="h1" className="hero-title" text={TITLE} splitType="words" effect="blur" trigger="load" delay={80} duration={1} textAlign="center" />
      ) : (
        <h1 className="hero-title" style={{ visibility: "hidden" }}>{TITLE}</h1>
      )}
      <p className="hero-sub">{site.name} connects traders and investors with analytics,<br />verified performance, and new opportunities.</p>
      {site.heroMockup && <div className="hero-mockup"><Laptop view="front" /></div>}
      <a className="scroll-hint" href="#experience" aria-label="Scroll down"><ArrowDown size={12} strokeWidth={2} /></a>
      <img className="hero-corner-mark" src="/assets/oversite-mark-black.png" alt="" />
    </section>
  );
}
