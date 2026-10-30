"use client";

import { useRef } from "react";
import { Landmark, ShieldCheck, LaptopMinimal, UserRoundCheck } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/hooks";
import { site } from "@/config/site";
import Shield from "./Shield";

/* The four feature cards around the badge. The section is white when it arrives and turns black as it scrolls
   up the screen, which is where the dark half of the site begins. */
export default function Bento() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(() => {
    const el = root.current; if (!el) return;
    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 55%", end: "top 5%", scrub: 0.5 } })
      .to(el, { backgroundColor: "#050505", color: "#ffffff", ease: "none" }, 0)
      .to(gsap.utils.toArray(".bcard", el), { backgroundColor: "#0e0e0e", borderColor: "#1d1d1d", ease: "none" }, 0)
      .to(gsap.utils.toArray(".bcard p", el), { color: "#7d7d7d", ease: "none" }, 0)
      .to(gsap.utils.toArray(".bicon", el), { color: "#d0d0d0", ease: "none" }, 0)
      .to(gsap.utils.toArray(".bnum", el), { color: "#555555", ease: "none" }, 0);
  }, { scope: root });

  return (
    <section className="bento" id="bento" ref={root}>
      <div className="bento-grid">
        <div className="bcard b1" data-fade>
          <Landmark className="bicon" size={22} strokeWidth={1.4} />
          <span className="bnum">01</span>
          <h3>Real-Time Insights</h3>
          <p>Real-time analytics deliver clear, actionable insights into market trends and individual performance.</p>
        </div>
        <Shield size="lg" />
        <div className="bcard b2 right" data-fade>
          <span className="bnum">02</span>
          <ShieldCheck className="bicon" size={22} strokeWidth={1.4} />
          <h3>Secure Trading</h3>
          <p>Trust {site.name}&apos;s secure platform for safe transactions and protection of sensitive data.</p>
        </div>
        <div className="bcard b3" data-fade>
          <LaptopMinimal className="bicon" size={22} strokeWidth={1.4} />
          <h3>Tech Driven Precision</h3>
          <p>Leverage algorithmic trading to maximize outcomes, with technology supporting both trading and investing.</p>
          <span className="bnum bnum-bottom">03</span>
        </div>
        <div className="bcard b4 right" data-fade>
          <UserRoundCheck className="bicon" size={22} strokeWidth={1.4} />
          <h3>Trading Community</h3>
          <p>Be a part of the largest best performing traders community.</p>
          <span className="bnum bnum-bottom">04</span>
        </div>
      </div>
    </section>
  );
}
