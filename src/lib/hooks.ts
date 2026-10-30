import { useRef, type RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, fmt } from "@/lib/gsap";

/* Everything marked data-fade inside the scope rises in once as it scrolls into view;
   children of data-stagger come in one after another. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", scope.current);
    if (fades.length) {
      ScrollTrigger.batch(fades, {
        start: "top 85%", once: true,
        onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, overwrite: true }),
      });
    }
    gsap.utils.toArray<HTMLElement>("[data-stagger]", scope.current).forEach((group) => {
      gsap.fromTo(group.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, scrollTrigger: { trigger: group, start: "top 85%", once: true } });
    });
  }, { scope });
}

/* A number that counts up from 0 the first time it scrolls into view. */
export function useCountUp<T extends HTMLElement = HTMLElement>(to: number, render: (v: number) => string, opts: { duration?: number; ease?: string; trigger?: RefObject<HTMLElement | null> } = {}) {
  const ref = useRef<T>(null);
  const { duration = 2.2, ease = "expo.out", trigger } = opts;
  useGSAP(() => {
    const el = ref.current; if (!el) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: to, duration, ease,
      onUpdate: () => { el.textContent = render(o.v); },
      scrollTrigger: { trigger: trigger?.current || el, start: "top 80%", once: true },
    });
  }, { dependencies: [to] });
  return ref;
}

export const thousands = (suffix: string, div = 1) => (v: number) => fmt(v / div) + suffix;
export const money = (pre: string, suf: string, dec: number) => (v: number) => pre + v.toFixed(dec) + suf;
