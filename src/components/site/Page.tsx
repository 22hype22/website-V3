"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, reduceMotion } from "@/lib/gsap";
import { useBackgroundDrift } from "@/lib/useBackgroundDrift";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LegalBar from "./LegalBar";
import CookieNotice from "./CookieNotice";
import Cursor from "./Cursor";

/* The frame around every page that is not the home page: the same nav, mountain, footer and legal line, no
   preloader. In-page links point back at the home page from here. */
export default function Page({ children, footer = true }: { children: React.ReactNode; footer?: boolean }) {
  const lenisRef = useRef<LenisRef>(null);
  useBackgroundDrift();

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(update); };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 0.7, smoothWheel: !reduceMotion() }}>
      <div className="page-wrapper">
        <a href="#top" className="skip-link">Skip to content</a>
        <Navbar ready sub />
        <main id="top" className="main-wrapper">
          {children}
          {footer && <Footer sub />}
        </main>
        <LegalBar />
        <CookieNotice />
      </div>
      <Cursor />
    </ReactLenis>
  );
}
