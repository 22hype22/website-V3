"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/hooks";

/* The black "Exceptional Performance" section: the copy fades in on the left, the circuit board slides in from the
   right and its four callouts pop up one after another. The board is drawn in SVG. */
export default function Performance() {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  useReveal(root);

  useGSAP(() => {
    const el = board.current; if (!el) return;
    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } })
      .fromTo(el, { x: 260, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 })
      .fromTo(gsap.utils.toArray(".callout", el), { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.18 }, 0.7);
  }, { scope: root });

  const grid = (x: number, y: number) => (
    <g stroke="#8a8a8a" strokeWidth=".6" opacity=".7">
      {Array.from({ length: 10 }).map((_, i) => <path key={"h" + i} d={`M${x} ${y + i * 10}h90`} />)}
      {Array.from({ length: 10 }).map((_, i) => <path key={"v" + i} d={`M${x + i * 10} ${y}v90`} />)}
    </g>
  );

  return (
    <section className="performance" id="performance" ref={root}>
      <div className="perf-copy">
        <h2 data-fade>Exceptional Performance<br />for Large-Scale AI and HPC</h2>
        <p data-fade>Lorem lorem lorem peed and<br />Bandwidth for Terabyte-Scale</p>
      </div>
      <div className="board" ref={board}>
        <svg className="board-svg" viewBox="0 0 720 420" aria-hidden="true">
          <defs>
            <pattern id="pcb" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 9h18M9 0v18" stroke="#1a1a1a" strokeWidth="1" /></pattern>
            <linearGradient id="chipg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c2c2c" /><stop offset="1" stopColor="#0d0d0d" /></linearGradient>
            <linearGradient id="dieg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5a5a5a" /><stop offset="1" stopColor="#262626" /></linearGradient>
          </defs>
          <g transform="skewY(-6) translate(0 40)">
            <rect x="0" y="0" width="720" height="380" rx="10" fill="#0a0a0a" stroke="#1f1f1f" />
            <rect x="0" y="0" width="720" height="380" rx="10" fill="url(#pcb)" opacity=".7" />
            <g fill="#131313" stroke="#222">
              {[30, 90, 150, 210, 270].map((y) => <rect key={"l" + y} x="30" y={y} width="60" height="40" rx="3" />)}
              {[30, 90, 150, 210, 270].map((y) => <rect key={"r" + y} x="630" y={y} width="60" height="40" rx="3" />)}
            </g>
            <rect x="140" y="60" width="200" height="200" rx="8" fill="url(#chipg)" stroke="#2e2e2e" />
            <rect x="185" y="105" width="110" height="110" rx="4" fill="url(#dieg)" stroke="#6a6a6a" />
            {grid(195, 115)}
            <rect x="400" y="60" width="200" height="200" rx="8" fill="url(#chipg)" stroke="#2e2e2e" />
            <rect x="445" y="105" width="110" height="110" rx="4" fill="url(#dieg)" stroke="#6a6a6a" />
            {grid(455, 115)}
            <g fill="#1b1b1b" stroke="#2a2a2a"><rect x="140" y="290" width="460" height="22" rx="3" /><rect x="140" y="322" width="460" height="22" rx="3" /></g>
            <g fill="#333"><circle cx="20" cy="20" r="5" /><circle cx="700" cy="20" r="5" /><circle cx="20" cy="360" r="5" /><circle cx="700" cy="360" r="5" /></g>
          </g>
        </svg>
        <div className="callout c1"><b>80GB HBM2e RAM</b><span>Think big. Think fast.</span></div>
        <div className="callout c2"><b>80GB HBM2e RAM</b><span>Think big. Think fast.</span></div>
        <div className="callout c3"><b>H100 GPU: 68 TFLOPS FP64</b><span>Powered by Nvidia N100</span></div>
        <div className="callout c4"><b>H100 GPU: 68 TFLOPS FP64</b><span>Powered by Nvidia N100</span></div>
      </div>
    </section>
  );
}
