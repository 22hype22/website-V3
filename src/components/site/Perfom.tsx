"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Split } from "./primitives";

/* "Powered by Managed Infrastructure, Always On": the section is two screens tall and pins its content.
   The headline slides left as the GPU board rides in from the right, turns from grey to colour, and the four
   badges pop in over it. */
export default function Perfom() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current; if (!el) return;
    // on phones the live site shows the board statically; tablets and up get the ride-in
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 } });
    tl.fromTo(".perfom_wrap-scroll", { xPercent: 100 }, { xPercent: 0, ease: "none", duration: 0.48 }, 0)
      .fromTo(".perfom_h-1", { xPercent: 0 }, { xPercent: -70, ease: "none", duration: 0.48 }, 0)
      .fromTo(".perfom_h-2", { xPercent: 0 }, { xPercent: -90, ease: "none", duration: 0.48 }, 0)
      .fromTo(".perfom_img.is-color", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.055 }, 0.43)
      .fromTo(".perfom_badge", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, ease: "none", duration: 0.08 }, 0.39)
      .to({}, { duration: 0.5 });
    });
  }, { scope: root });

  return (
    <div className="section_perfom" ref={root}>
      <div className="padding-global is-perfom">
        <div className="perfom_content">
          <div className="w-layout-vflex perfom_h-wrap">
            <Split className="perfom_h-1">Powered by Managed</Split>
            <Split className="perfom_h-2">Infrastructure, Always On</Split>
          </div>
          <div className="perfom_t-wrap"><div /><div /></div>
          <div className="perfom_wrap-scroll">
            <div className="perfom_badge is-1"><div className="perfom_title">Managed Hosting</div><div className="text-block-5">Nothing to self-host</div></div>
            <div className="perfom_badge is-2"><div className="perfom_title">Auto-Deploy</div><div>Live in under 60 seconds</div></div>
            <div className="perfom_badge is-3"><div className="perfom_title">Zero Downtime</div><div>Updates without restarts</div></div>
            <div className="perfom_badge is-4"><div className="perfom_title">Isolated Data</div><div>Permission-gated per server</div></div>
            <div className="perfom_wrap-img">
              <img src="/al/perf.webp" loading="lazy" alt="" className="perfom_img" />
              <img src="/al/Color_1.webp" loading="lazy" alt="" className="perfom_img is-color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
