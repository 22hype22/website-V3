"use client";

import { useRef } from "react";
import { Play, ChevronRight } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { site } from "@/config/site";

/* The highlight paragraph lights up word by word, tied to the scroll position. */
export default function Highlights() {
  const root = useRef<HTMLElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!para.current) return;
    const split = SplitText.create(para.current, { type: "words", wordsClass: "w" });
    gsap.to(split.words, {
      color: "#0a0a0a", ease: "none", stagger: 0.15,
      scrollTrigger: { trigger: para.current, start: "top 90%", end: "bottom 45%", scrub: 0.4 },
    });
    return () => split.revert();
  }, { scope: root });

  return (
    <section className="highlights" id="features" ref={root}>
      <div className="rule-row">
        <span>GET THE HIGHLIGHTS</span>
        <div className="rule-links">
          <a href="#film">WATCH THE FILM <Play size={8} strokeWidth={2.5} /></a>
          <a href="#event">WATCH THE EVENT <ChevronRight size={9} strokeWidth={2.5} /></a>
        </div>
      </div>
      <div className="highlight-body">
        <img className="small-mark" src="/assets/oversite-mark-black.png" alt="" />
        <p className="highlight-text" ref={para}>{site.name} revolutionizes trading with intuitive design and algorithmic tools. For traders optimizing strategies and investors seeking data-driven insights, we provide real-time analytics, secure connections, and automated solutions to keep you ahead.</p>
      </div>
    </section>
  );
}
