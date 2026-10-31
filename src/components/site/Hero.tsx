"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/config/site";
import { Counter, Mark, Split } from "./primitives";

/* The hero: headline and subline fade up, the dashboard video sits inside the laptop lid in perspective, and as
   you scroll the lid opens flat while the video plays. Then "Key Figures" with the three counters. */
export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const [h1] = q(".hero_h1"), [p] = q(".hero_subline");
    if (!ready) { gsap.set([h1, p], { opacity: 0, y: 30 }); return; }
    gsap.to(h1, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 });
    gsap.to(p, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 });
  }, { scope: root, dependencies: [ready] });

  useGSAP(() => {
    const el = root.current; if (!el) return;
    const q = gsap.utils.selector(root);
    const screen = q(".hero_lottie")[0], laptop = q(".leptop")[0];
    // the lid opens: from the tilted, shrunken screen in the laptop to a flat, near full-width dashboard.
    // The live site uses different distances per breakpoint (measured): desktop 560px, tablet 390px,
    // phones start 50px down and open over ~250px with a steeper, less shrunken lid.
    // Once the lid is flat, a second stretch of scroll carries the whole dashboard down the page a little
    // faster than the scroll itself, so it visibly slides down before it is released.
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 992px)", tablet: "(min-width: 768px) and (max-width: 991px)", mobile: "(max-width: 767px)" }, (ctx) => {
      const { mobile, tablet } = ctx.conditions as { mobile: boolean; tablet: boolean };
      const open = mobile ? 285 : tablet ? 390 : 560, pan = mobile ? 260 : tablet ? 360 : 480;
      // the timeline runs in scroll pixels: one unit of duration is one pixel
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: mobile ? 50 : 0, end: "+=" + (open + pan), scrub: true } });
      if (mobile) {
        tl.fromTo(screen, { y: "-2.9rem", scaleX: 0.92, scaleY: 0.9, rotateX: -53 }, { y: "9.1rem", scaleX: 1, scaleY: 1, rotateX: 0, ease: "none", duration: 250 }, 0)
          .fromTo(laptop, { y: "0rem" }, { y: "-4.56rem", ease: "none", duration: open }, 0);
      } else {
        tl.fromTo(screen, { y: "-17rem", scaleX: 0.7, scaleY: 0.35, rotateX: -27 }, { y: "9rem", scaleX: 0.8, scaleY: 0.8, rotateX: 0, ease: "none", duration: open }, 0)
          .fromTo(laptop, { y: "0rem" }, { y: "-30rem", ease: "none", duration: open }, 0);
      }
      const rest = mobile ? "9.1rem" : "9rem";
      tl.fromTo(screen, { y: rest }, { y: `calc(${rest} + ${Math.round(pan * 1.2)}px)`, ease: "none", duration: pan, immediateRender: false }, open);
    });
    // the video starts on the first scroll, plays through, holds its last frame a second, then restarts
    const v = video.current;
    if (v) {
      v.loop = false; v.pause();
      let played = false;
      const st = ScrollTrigger.create({ start: 1, onEnter: () => { if (!played) { played = true; v.play().catch(() => {}); } } });
      const onEnded = () => setTimeout(() => { v.currentTime = 0; v.play().catch(() => {}); }, 1000);
      v.addEventListener("ended", onEnded);
      return () => { st.kill(); v.removeEventListener("ended", onEnded); };
    }
  }, { scope: root });

  return (
    <section className="section_hero" id="top" ref={root}>
      <a href="#scrin" className="btn-arrow-btm hide-tablet w-inline-block"><img src="/al/Arrow_Icon.svg" loading="lazy" alt="" className="arrow-icon" /></a>
      <div className="hero_icon hide-tablet"><Mark /></div>
      <div className="padding-global is-100">
        <div className="container-large is-100">
          <div className="hero_content">
            <div className="w-layout-vflex hero_h">
              <h1 className="hero_h1">Powering Communities<br />That Demand More</h1>
              <div className="p-40 text-color-secondary hero_subline">{site.name} is a leading provider of professional bot, web, and application development, delivering reliable solutions built to work for you.</div>
            </div>
            <div className="hero_leptop-wrap">
              <div className="hero_lottie-wrap is-video">
                <div className="hero_lottie is-video w-background-video w-background-video-atom">
                  <video ref={video} muted playsInline preload="auto" poster="/video/Hom_poster.0000000.jpg" style={{ backgroundImage: "url(/video/Hom_poster.0000000.jpg)" }}>
                    <source src="/video/Hom_mp4.mp4" type="video/mp4" />
                    <source src="/video/Hom_webm.webm" type="video/webm" />
                  </video>
                </div>
              </div>
              <img src="/al/lep.webp" loading="eager" alt="" className="leptop" />
            </div>
          </div>
          <div className="w-layout-vflex hero_h-btm">
            <div className="hero-h-wrap"><Split as="h3" className="heading">By the Numbers</Split></div>
            <div className="div-block-3" />
            <div className="w-layout-grid hero_statistics">
              <div className="hero_st-item"><div className="hero_number-wrap"><Counter to={143} className="hero_number counter" /><div className="hero_number">k+</div></div><div>Members served</div></div>
              <div className="hero_st-item"><div className="hero_number-wrap"><Counter to={1} className="hero_number counter" /><div className="hero_number">k+</div></div><div>Servers</div></div>
              <div className="hero_st-item"><div className="hero_number-wrap"><Counter to={24} className="hero_number counter" /><div className="hero_number">/7</div></div><div>Staff</div></div>
            </div>
          </div>
        </div>
      </div>
      <div id="scrin" className="hero_trigger" />
    </section>
  );
}
