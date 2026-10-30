"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import { site } from "@/config/site";

/* The loading screen: two points of light, the mark draws in between them, the name types out beside it,
   a hold, then the black fades to white and the site underneath comes through. */
export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const [mark] = q(".loader-mark img"), [dotA] = q(".loader-dot-a"), [dotB] = q(".loader-dot-b"), [word] = q(".loader-word"), [lockup] = q(".loader-lockup");
    document.documentElement.classList.add("is-loading");

    const tl = gsap.timeline({ onComplete: () => { document.documentElement.classList.remove("is-loading"); onDone(); } });

    if (reduceMotion()) {
      tl.set(mark, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }).set(word, { text: site.name }).to({}, { duration: 0.6 });
    } else {
      tl.to(dotA, { opacity: 1, duration: 0.25 }, 0.25)                                   // two points of light
        .to(dotB, { opacity: 1, duration: 0.25 }, 0.37)
        .to(mark, { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }, 0.63) // the mark draws in
        .to([dotA, dotB], { opacity: 0, duration: 0.2 }, 0.88)
        .to(word, { text: { value: site.name }, duration: 0.07 * site.name.length, ease: "none" }, 1.5) // the name types out
        .to({}, { duration: 1 });                                                          // hold
    }

    tl.to(root.current, { backgroundColor: "#ffffff", duration: 0.8, ease: "inOut", onComplete: onReveal }) // fade to white
      .to(lockup, { opacity: 0, duration: 0.3 }, "<0.3")
      .to(root.current, { opacity: 0, duration: 0.5 }, "<0.3");
  }, { scope: root });

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-glow" />
      <div className="loader-lockup">
        <div className="loader-mark">
          <img src="/assets/oversite-mark-white.png" alt="" />
          <span className="loader-dot loader-dot-a" />
          <span className="loader-dot loader-dot-b" />
        </div>
        <span className="loader-word" />
      </div>
    </div>
  );
}
