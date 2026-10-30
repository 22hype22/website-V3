"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import { site } from "@/config/site";

/* The loading screen. The live site plays a Lottie of its wordmark drawing in, then the layer slides up to reveal
   the page. Here the Oversite mark draws in between two points of light, the name types out, and the layer slides up. */
export default function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const [layer] = q(".preloader-layer"), [mark] = q(".preloader-mark img"), [dotA] = q(".preloader-dot.a"), [dotB] = q(".preloader-dot.b"), [word] = q(".preloader-word"), [lockup] = q(".preloader-lockup");
    const tl = gsap.timeline({ onComplete: onDone });
    if (reduceMotion()) {
      tl.set(mark, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }).set(word, { text: site.name }).to({}, { duration: 0.5 });
    } else {
      tl.to(dotA, { opacity: 1, duration: 0.25 }, 0.25)
        .to(dotB, { opacity: 1, duration: 0.25 }, 0.37)
        .to(mark, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "out" }, 0.63)
        .to([dotA, dotB], { opacity: 0, duration: 0.2 }, 0.88)
        .to(word, { text: { value: site.name }, duration: 0.07 * site.name.length, ease: "none" }, 1.5)
        .to({}, { duration: 0.9 });
    }
    tl.add(onReveal)
      .to(lockup, { opacity: 0, duration: 0.3 })
      .to(layer, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "<0.1");
  }, { scope: root });

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-layer">
        <div className="preloader-glow" />
        <div className="preloader-lockup">
          <div className="preloader-mark">
            <img src="/assets/oversite-mark-white.png" alt="" />
            <span className="preloader-dot a" />
            <span className="preloader-dot b" />
          </div>
          <span className="preloader-word" />
        </div>
      </div>
    </div>
  );
}
