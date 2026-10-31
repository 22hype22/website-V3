"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, reduceMotion } from "@/lib/gsap";

import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Get from "./Get";
import Products from "./Products";
import CardsMobile from "./CardsMobile";
import Perfom from "./Perfom";
import Faq from "./Faq";
import Stay from "./Stay";
import Footer from "./Footer";
import LegalBar from "./LegalBar";
import Cursor from "./Cursor";

export default function Site() {
  const lenisRef = useRef<LenisRef>(null);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lenis ticks inside GSAP's ticker and feeds ScrollTrigger (the live site runs Lenis at lerp .1, wheel ×0.7).
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    lenis?.stop();
    return () => { gsap.ticker.remove(update); lenis?.off("scroll", ScrollTrigger.update); };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    if (revealed) { lenis.scrollTo(0, { immediate: true, force: true }); lenis.start(); ScrollTrigger.refresh(); }
    else lenis.stop();
  }, [revealed]);

  // in-page links scroll through Lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href === "#") { e.preventDefault(); return; }
      const target = document.querySelector(href);
      if (!target) { e.preventDefault(); return; }
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, { duration: reduceMotion() ? 0 : 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 0.7, smoothWheel: !reduceMotion() }}>
      <div className="page-wrapper">
        <Navbar ready={revealed} />
        {!loaded && <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoaded(true)} />}
        <main id="top" className="main-wrapper">
          <Hero ready={revealed} />
          <Get />
          <Products />
          <CardsMobile />
          <Perfom />
          <Faq />
          <Stay />
          <Footer />
        </main>
        <LegalBar />
      </div>
      <Cursor />
    </ReactLenis>
  );
}
