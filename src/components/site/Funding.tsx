"use client";

import { useRef } from "react";
import { ShieldAlert, Users, ShieldCheck, BadgeCheck } from "lucide-react";
import { fmt } from "@/lib/gsap";
import { useReveal, useCountUp } from "@/lib/hooks";

/* "Prove Your Skills": the headline, the blue verification marker, and the enormous counter that climbs to
   1,000,000 with GSAP as the section arrives, three small icon orbs sitting on the digits. */
export default function Funding() {
  const root = useRef<HTMLElement>(null);
  const big = useRef<HTMLDivElement>(null);
  const num = useCountUp<HTMLSpanElement>(1000000, fmt, { duration: 3.2, ease: "power3.out", trigger: big });
  useReveal(root);

  return (
    <section className="funding" id="funding" ref={root}>
      <h2 data-fade>Prove Your Skills and Unlock <em>Life-<br />Changing</em> Funding</h2>
      <p className="verified" data-fade><BadgeCheck size={14} strokeWidth={2} color="#fff" fill="#1d9bf0" /> Transparent Selection</p>
      <div className="big-number" ref={big} data-fade>
        <span ref={num}>0</span>
        <span className="orb o1"><ShieldAlert size={15} strokeWidth={1.6} /></span>
        <span className="orb o2"><Users size={15} strokeWidth={1.6} /></span>
        <span className="orb o3"><ShieldCheck size={15} strokeWidth={1.6} /></span>
      </div>
      <p className="funding-text" data-fade>Connect your trading account, and if our algorithm recognizes your<br />potential, you&apos;ll be invited to join our incubator program with a<br />chance to secure significant funding.</p>
      <a className="btn btn-light" href="#trial" data-fade>Start Trading</a>
    </section>
  );
}
