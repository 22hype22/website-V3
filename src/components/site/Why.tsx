"use client";

import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/hooks";
import { site } from "@/config/site";

const CARDS = [
  { title: ["Real-Time", "Analytics"], value: "+55.46%" },
  { title: ["Your data is", "fully protected"], value: "+32.46%" },
  { title: ["Seamless Trading", "Experience"], value: "35.4k" },
];

/* "Why Oversite": three tall chart cards. The one under the pointer opens wide; its chart draws itself in
   (DrawSVG for the lines, a rise for the bars and areas). */
export default function Why() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(2);
  useReveal(root);

  useGSAP(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".why-cards", start: "top 75%", once: true } });
    tl.fromTo(".wcard", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 })
      .fromTo(".wchart .draw", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.15, ease: "power2.inOut" }, 0.4)
      .fromTo(".wchart .rise", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 1.1, stagger: 0.08 }, 0.5)
      .fromTo(".wchart .dot", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, stagger: 0.15 }, 1.4);
  }, { scope: root });

  return (
    <section className="why" id="why" ref={root}>
      <div className="rule-row rule-row-dark">
        <span>WHY {site.name.toUpperCase()}</span>
        <img className="rule-mark" src="/assets/oversite-mark-white.png" alt="" />
      </div>
      <div className="why-body">
        <div className="why-copy">
          <h2 data-fade>Why <em>{site.name}</em> is the<br />ultimate trading platform</h2>
          <a className="btn btn-light" href="#trial" data-fade>Start Trading</a>
          <a className="scroll-hint scroll-hint-dark" href="#pricing" aria-label="Scroll down"><ArrowDown size={12} strokeWidth={2} /></a>
        </div>
        <div className="why-cards">
          {CARDS.map((c, i) => (
            <div key={i} className={`wcard${open === i ? " is-open" : ""}`} onMouseEnter={() => setOpen(i)} onClick={() => setOpen(i)}>
              <h4>{c.title[0]}<br />{c.title[1]}</h4>
              <strong>{c.value}</strong>
              <p>Find the perfect plan tailored to elevate<br />your trading experience</p>
              <div className={`wchart${i === 2 ? " wchart-axis" : ""}`}>
                {i === 0 && (
                  <svg viewBox="0 0 220 140" preserveAspectRatio="none">
                    <defs><linearGradient id="barg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a4a4a" /><stop offset="1" stopColor="#111" /></linearGradient></defs>
                    <g className="rise"><rect x="20" y="50" width="44" height="90" fill="url(#barg)" /><rect x="20" y="49" width="44" height="2" fill="#bbb" /></g>
                    <g className="rise"><rect x="88" y="30" width="44" height="110" fill="url(#barg)" /><rect x="88" y="29" width="44" height="2" fill="#fff" /></g>
                    <g className="rise"><rect x="156" y="38" width="44" height="102" fill="url(#barg)" /><rect x="156" y="37" width="44" height="2" fill="#bbb" /></g>
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 220 140" preserveAspectRatio="none">
                    <defs><linearGradient id="areag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a3a3a" /><stop offset="1" stopColor="#0a0a0a" /></linearGradient></defs>
                    <path className="rise" d="M0 110 L30 80 L50 40 L80 70 L110 60 L140 90 L170 40 L200 15 L220 10 L220 140 L0 140z" fill="url(#areag)" />
                    <path className="draw" d="M0 110 L30 80 L50 40 L80 70 L110 60 L140 90 L170 40 L200 15 L220 10" fill="none" stroke="#e5e5e5" strokeWidth="1.2" />
                    <line className="draw" x1="50" y1="40" x2="50" y2="140" stroke="#888" strokeWidth=".8" /><circle className="dot" cx="50" cy="40" r="3" fill="#fff" />
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 260 140" preserveAspectRatio="none">
                    <defs><linearGradient id="areag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2e2e2e" /><stop offset="1" stopColor="#0a0a0a" /></linearGradient></defs>
                    <g stroke="#333" strokeWidth=".6" strokeDasharray="2 3">{[20, 40, 60, 80, 100, 120].map((y) => <line key={y} x1="20" y1={y} x2="260" y2={y} />)}</g>
                    <g fill="#666" fontSize="7" fontFamily="inherit">{[["60", 23], ["50", 43], ["40", 63], ["30", 83], ["20", 103], ["10", 123]].map(([t, y]) => <text key={t} x="2" y={y}>{t}</text>)}<text x="6" y="139">0</text></g>
                    <path className="rise" d="M20 130 C60 60, 90 60, 120 95 S180 60, 200 85 S240 40, 260 20 L260 140 L20 140z" fill="url(#areag2)" />
                    <path className="draw" d="M20 130 C60 60, 90 60, 120 95 S180 60, 200 85 S240 40, 260 20" fill="none" stroke="#e5e5e5" strokeWidth="1.2" />
                    <line className="draw" x1="120" y1="95" x2="120" y2="140" stroke="#888" strokeWidth=".8" /><circle className="dot" cx="120" cy="95" r="3" fill="#fff" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
