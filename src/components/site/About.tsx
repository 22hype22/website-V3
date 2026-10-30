"use client";

import { useRef } from "react";
import { ArrowUpRight, TrendingUp, Search, ShieldCheck, User, Landmark, Wallet, Clock, Coins, BarChart3, Fingerprint } from "lucide-react";
import { useReveal, useCountUp } from "@/lib/hooks";

/* "More about us": four dark panels. Radar with floating orbs, the funding donut, the protected-data card on a
   brushed surface, and the fingerprint on its halo. */
export default function About() {
  const root = useRef<HTMLElement>(null);
  const pct = useCountUp<HTMLElement>(10, (v) => Math.round(v) + "%", { duration: 1.6 });
  useReveal(root);

  return (
    <section className="about" id="about" ref={root}>
      <div className="rule-row rule-row-dark">
        <span>MORE ABOUT US</span>
        <ArrowUpRight className="rule-arrow" size={10} strokeWidth={2.5} />
      </div>
      <div className="about-grid">
        <div className="acard a1" data-fade>
          <span className="bnum">01</span>
          <h3>Real-time<br /><em>insights of Trading</em></h3>
          <p>Verified strategies with a proven track<br />record, ready to be shared with<br />investor pools for maximum impact.</p>
          <div className="radar">
            <span className="radar-ring" />
            <span className="radar-orb r1"><TrendingUp size={11} strokeWidth={1.8} /></span>
            <span className="radar-orb r2"><Coins size={11} strokeWidth={1.8} /></span>
            <span className="radar-orb r3"><BarChart3 size={11} strokeWidth={1.8} /></span>
            <span className="radar-search"><Search size={20} strokeWidth={1.6} /></span>
          </div>
        </div>
        <div className="acard a2" data-fade>
          <span className="bnum">02</span>
          <h3>Get up to $1,000,000<br />in <em>trading capital</em></h3>
          <ul className="legend">
            <li><Wallet size={9} /> Traders with funding up to $100 k</li>
            <li><Wallet size={9} /> Traders with funding up to $100K</li>
            <li><Landmark size={9} /> Traders with funding<br />between $500,000</li>
            <li><Clock size={9} /> Traders awaiting selection</li>
          </ul>
          <div className="donut">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#181818" strokeWidth="22" />
              <circle cx="60" cy="60" r="46" fill="none" stroke="#2a2a2a" strokeWidth="22" strokeDasharray="130 289" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="46" fill="none" stroke="#0f0f0f" strokeWidth="22" strokeDasharray="60 289" strokeDashoffset="-130" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="46" fill="none" stroke="#1e1e1e" strokeWidth="22" strokeDasharray="70 289" strokeDashoffset="-190" transform="rotate(-90 60 60)" />
            </svg>
            <div className="donut-center"><b ref={pct}>0%</b><span>Traders awaiting<br />selection</span></div>
            <span className="donut-orb d1"><Wallet size={8} /></span><span className="donut-orb d2"><Clock size={8} /></span><span className="donut-orb d3"><Landmark size={8} /></span><span className="donut-orb d4"><Coins size={8} /></span>
          </div>
        </div>
        <div className="acard a3" data-fade>
          <span className="bnum">03</span>
          <span className="acard-icon"><ShieldCheck size={13} strokeWidth={1.6} /></span>
          <h3>Your Data is<br /><em>Fully Protected</em></h3>
          <div className="id-card">
            <span className="id-avatar"><User size={13} strokeWidth={1.6} /></span>
            <span className="id-lines"><i style={{ width: "70%" }} /><i style={{ width: "45%" }} /><i style={{ width: "55%" }} /></span>
          </div>
        </div>
        <div className="acard a4" data-fade>
          <span className="bnum">04</span>
          <h3>Verifying the<br /><em>Track Records</em></h3>
          <div className="finger"><Fingerprint size={84} strokeWidth={1.1} color="#9a9a9a" /></div>
        </div>
      </div>
    </section>
  );
}
