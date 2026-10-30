"use client";

import { useRef } from "react";
import { ArrowUpRight, ArrowLeft, Landmark, Fingerprint } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCountUp, money } from "@/lib/hooks";
import Dashboard from "./Dashboard";
import Laptop from "./Laptop";
import Shield from "./Shield";

function FStat({ to, format, label, right }: { to: number; format: (v: number) => string; label: string; right?: boolean }) {
  const ref = useCountUp<HTMLElement>(to, format, { duration: 2.4 });
  return (
    <div className={`fstat${right ? " right" : ""}`}>
      <strong ref={ref}>{format(0)}</strong>
      <span>{label}</span>
    </div>
  );
}

/* "Our Products": the section pins while the three cards travel sideways with the scroll. */
export default function Products() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = root.current, el = track.current;
    if (!section || !el) return;
    const distance = () => Math.max(0, el.scrollWidth + el.offsetLeft - section.clientWidth + 48);
    gsap.to(el, {
      x: () => -distance(), ease: "none",
      scrollTrigger: {
        trigger: section, start: "top top", end: () => "+=" + (distance() + window.innerHeight * 0.6),
        pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
      },
    });
  }, { scope: root });

  return (
    <section className="products" id="dashboard" ref={root}>
      <div className="products-inner">
        <div className="rule-row rule-row-thin">
          <span>OUR PRODUCTS</span>
          <ArrowUpRight className="rule-arrow" size={10} strokeWidth={2.5} />
        </div>
        <div className="products-head">
          <span className="scroll-journey"><ArrowLeft size={10} strokeWidth={2} /> SCROLL JOURNEY</span>
          <h2>Our Products</h2>
        </div>
        <div className="products-track" ref={track}>

          <article className="product-card product-analytics">
            <div className="icon-chip"><Landmark size={15} strokeWidth={1.6} /></div>
            <div className="product-copy">
              <h3>Analytics</h3>
              <p>Access precise, real-time analytics<br />to make informed decisions.</p>
              <a className="btn btn-light" href="#trial">Start Trading</a>
            </div>
            <div className="product-screen"><Dashboard /></div>
          </article>

          <article className="product-card product-leaderboard">
            <div className="icon-chip"><Fingerprint size={15} strokeWidth={1.6} /></div>
            <div className="product-laptop"><Laptop view="iso" screen={<Leaderboard />} /></div>
            <div className="product-copy product-copy-right">
              <h3>Verified &amp; Audited<br />Leaderboard</h3>
              <p>Ranked strategies, independently audited<br />for transparency and reliability.</p>
              <a className="btn btn-light" href="#trial">Start Trading</a>
            </div>
          </article>

          <article className="product-card product-funding">
            <h3>Funding for Top<br />Strategies</h3>
            <div className="funding-grid">
              <FStat to={9.35} format={money("$", "M", 2)} label="Total profit" />
              <FStat to={49.1} format={money("$", "M", 1)} label="Earnings" right />
              <FStat to={98.7} format={money("$", "M", 1)} label="Revenue Growth" />
              <FStat to={12.5} format={money("+", "%", 1)} label="ROI" right />
              <Shield size="sm" />
            </div>
            <p className="funding-note">Invest in top-performing strategies with proven<br />track records and trusted data.</p>
          </article>

        </div>
      </div>
    </section>
  );
}

/* The leaderboard screen shown on the laptop: a ranked table with a highlighted row. */
function Leaderboard() {
  return (
    <div className="lb">
      <div className="lb-head"><img src="/assets/oversite-mark-white.png" alt="" /><span>Leaderboard</span><i /><i /></div>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={`lb-row${i === 2 ? " on" : ""}`}><b>{i + 1}</b><i style={{ width: `${34 + ((i * 17) % 30)}%` }} /><em>{(242 - i * 19.3).toFixed(1)}%</em><u /></div>
      ))}
    </div>
  );
}
