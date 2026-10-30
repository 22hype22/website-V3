"use client";

import { createElement, useEffect, useImperativeHandle, useRef, forwardRef, type ReactNode, type CSSProperties } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
import { site } from "@/config/site";

/* ───────────── Split: the live site's text-split effects ─────────────
   words-right  → [words-slide-from-right]  words fade in from the right, staggered
   letters-fade → [letters-fade-in]         letters fade in one by one
   letters-up   → [letters-slide-up]        letters rise from below
   animate-1    → the section_get paragraph: words brighten from 20% as it scrolls in */
export type SplitEffect = "words-right" | "letters-fade" | "letters-up" | "animate-1";

export function Split({ as = "div", effect = "words-right", className, style, children }: { as?: keyof React.JSX.IntrinsicElements; effect?: SplitEffect; className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current; if (!el) return;
    const split = SplitText.create(el, { type: "words, chars", wordsClass: "word", charsClass: "char" });
    gsap.set(el, { opacity: 1 });
    const tl = gsap.timeline({ paused: true });
    if (effect === "words-right") tl.from(split.words, { opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 } });
    if (effect === "letters-fade") tl.from(split.chars, { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
    if (effect === "letters-up") tl.from(split.chars, { yPercent: 100, duration: 0.8, ease: "power2.out", stagger: { amount: 0.6 } });
    if (effect === "animate-1") tl.fromTo(split.words, { opacity: 0.2, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power1.out", stagger: 0.1 });
    ScrollTrigger.create({ trigger: el, start: "top bottom", onLeaveBack: () => { tl.progress(0); tl.pause(); } });
    ScrollTrigger.create({ trigger: el, start: "top 90%", onEnter: () => tl.play() });
    return () => split.revert();
  }, { scope: ref, dependencies: [effect] });
  return createElement(as, { ref, className, style: { opacity: 0, ...style } }, children);
}

/* ───────────── Counter: counts up from 0 (the live site's counterUp) ─────────────
   Plays when scrolled into view, or only when `play()` is called through the ref (hover counters). */
export type CounterHandle = { play: () => void };
export const Counter = forwardRef<CounterHandle, { to: number; decimals?: number; duration?: number; className?: string; manual?: boolean; separator?: string }>(
  function Counter({ to, decimals = 0, duration = 1.6, className, manual = false, separator = "" }, handle) {
    const ref = useRef<HTMLDivElement>(null);
    const format = (v: number) => {
      const s = v.toFixed(decimals);
      return separator ? s.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : s;
    };
    const play = () => {
      const el = ref.current; if (!el) return;
      const o = { v: 0 };
      gsap.to(o, { v: to, duration, ease: "none", onUpdate: () => { el.textContent = format(o.v); } });
    };
    useImperativeHandle(handle, () => ({ play }));
    useGSAP(() => {
      if (manual || !ref.current) return;
      ScrollTrigger.create({ trigger: ref.current, start: "top 85%", once: true, onEnter: play });
    }, { dependencies: [to, manual] });
    return <div ref={ref} className={className}>{manual ? format(to) : format(0)}</div>;
  }
);

/* ───────────── Lottie player on lottie-web ─────────────
   autoplay+loop for ambient ones; `trigger="view"` plays once when scrolled in; `trigger="manual"` exposes play(). */
export type LottieHandle = { play: () => void; stop: () => void; goToAndStop: (f: number) => void };
export const LottiePlayer = forwardRef<LottieHandle, { src: string; className?: string; loop?: boolean; autoplay?: boolean; trigger?: "load" | "view" | "manual"; style?: CSSProperties }>(
  function LottiePlayer({ src, className, loop = false, autoplay = false, trigger = "load", style }, handle) {
    const ref = useRef<HTMLDivElement>(null);
    const anim = useRef<import("lottie-web").AnimationItem | null>(null);
    useImperativeHandle(handle, () => ({
      play: () => { anim.current?.goToAndPlay(0, true); },
      stop: () => anim.current?.stop(),
      goToAndStop: (f: number) => anim.current?.goToAndStop(f, true),
    }));
    useEffect(() => {
      let dead = false;
      let st: ScrollTrigger | undefined;
      (async () => {
        const lottie = (await import("lottie-web")).default;
        if (dead || !ref.current) return;
        anim.current = lottie.loadAnimation({ container: ref.current, renderer: "svg", loop, autoplay: trigger === "load" && autoplay, path: src, rendererSettings: { preserveAspectRatio: "xMidYMid meet" } });
        if (trigger === "view") st = ScrollTrigger.create({ trigger: ref.current, start: "top 80%", once: true, onEnter: () => anim.current?.goToAndPlay(0, true) });
      })();
      return () => { dead = true; st?.kill(); anim.current?.destroy(); anim.current = null; };
    }, [src, loop, autoplay, trigger]);
    return <div ref={ref} className={className} style={style} />;
  }
);

/* ───────────── Brand: the Oversite lockup in place of the AlphaLedger logo files ───────────── */
export function Brand({ white = false, footer = false, className = "", href = "/" }: { white?: boolean; footer?: boolean; className?: string; href?: string }) {
  return (
    <a href={href} className={`brand-lockup${white ? " is-white" : ""}${footer ? " is-footer" : ""} ${className}`} aria-label="home">
      <img src={white ? "/assets/oversite-mark-white.png" : "/assets/oversite-mark-black.png"} alt="" />
      <span>{site.name}</span>
    </a>
  );
}

/* The small mark used in the section title rows ("title-icon"). */
export function Mark({ white = false, className = "icon-logo" }: { white?: boolean; className?: string }) {
  return <img src={white ? "/assets/oversite-mark-white.png" : "/assets/oversite-mark-black.png"} alt="" className={className} />;
}

/* Rise-in on scroll for the many elements the live site fades in (Webflow IX2 "fade up"). */
export function useFadeUps(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-fade]", scope.current);
    if (!items.length) return;
    ScrollTrigger.batch(items, {
      start: "top 90%", once: true,
      onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.08, overwrite: true }),
    });
  }, { scope });
}
