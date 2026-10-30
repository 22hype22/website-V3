"use client";

import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { useReveal } from "@/lib/hooks";
import { site } from "@/config/site";

/* The footer: link column, centred brand block, contact button, legal line, and the oversized wordmark
   whose letters clear from a blur one by one as it scrolls into view. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const wm = useRef<HTMLSpanElement>(null);
  useReveal(root);

  useGSAP(() => {
    if (!wm.current) return;
    const split = SplitText.create(wm.current, { type: "chars", charsClass: "l" });
    gsap.fromTo(split.chars, { opacity: 0.15, y: 20, filter: "blur(6px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.06,
      scrollTrigger: { trigger: wm.current, start: "top 95%", once: true },
    });
    return () => split.revert();
  }, { scope: root });

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-grid">
        <nav className="footer-links" data-stagger>
          <a href="#top">Home</a>
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#pricing">Pricing</a>
          <a href="#news">News</a>
          <a className="to-top" href="#top" aria-label="Back to top"><ArrowUp size={12} strokeWidth={2} /></a>
        </nav>
        <div className="footer-center" data-fade>
          <a className="brand brand-lg" href="#top"><img className="brand-mark" src="/assets/oversite-mark-black.png" alt="" /><span className="brand-name">{site.name}</span></a>
          <p>Dynamic solutions to elevate your trading success. Discover our<br />unmatched performance, trusted by top traders worldwide.</p>
          <a className="btn btn-dark" href="#trial">Start Trading</a>
        </div>
        <div className="footer-right" data-fade>
          <a className="btn btn-dark" href={`mailto:${site.email}`}>Contact us</a>
          <span className="credit">Website by eloqwnt</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© All rights reserved. 2024 {site.name}</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span><a href="#terms">Terms of Service</a> <i>•</i> <a href="#privacy">Privacy Policy</a></span>
      </div>
      <div className="footer-wordmark" aria-hidden="true"><span ref={wm}>{site.name}</span></div>
    </footer>
  );
}
