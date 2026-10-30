"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, reduceMotion } from "@/lib/gsap";

import Loader from "./Loader";
import Nav from "./Nav";
import Hero from "./Hero";
import Experience from "./Experience";
import Highlights from "./Highlights";
import Products from "./Products";
import Bento from "./Bento";
import Performance from "./Performance";
import Funding from "./Funding";
import Why from "./Why";
import Pricing from "./Pricing";
import About from "./About";
import Cta from "./Cta";
import News from "./News";
import Footer from "./Footer";

export default function Site() {
  const lenisRef = useRef<LenisRef>(null);
  const [revealed, setRevealed] = useState(false); // the loader has faded to white: the site is visible
  const [loaded, setLoaded] = useState(false);     // the loader is gone

  // Lenis ticks inside GSAP's ticker and feeds ScrollTrigger, so pins and scrubs stay in sync with the smoothed scroll.
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    lenis?.stop();
    return () => { gsap.ticker.remove(update); lenis?.off("scroll", ScrollTrigger.update); };
  }, []);

  // Scrolling stays locked at the top until the loader has handed over.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    if (revealed) { lenis.scrollTo(0, { immediate: true, force: true }); lenis.start(); ScrollTrigger.refresh(); }
    else lenis.stop();
  }, [revealed]);

  // Every in-page link scrolls through Lenis.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href") || "");
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, { duration: reduceMotion() ? 0 : 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, smoothWheel: !reduceMotion() }}>
      {!loaded && <Loader onReveal={() => setRevealed(true)} onDone={() => setLoaded(true)} />}
      <div className={`page${revealed ? " is-ready" : ""}`}>
        <Nav ready={revealed} />
        <Hero ready={revealed} />
        <Experience />
        <Highlights />
        <Products />
        <Bento />
        <div className="dark-wrap">
          <Performance />
          <Funding />
          <Why />
          <Pricing />
          <About />
        </div>
        <Cta />
        <News />
        <Footer />
      </div>
    </ReactLenis>
  );
}
