"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Counter, type CounterHandle, LottiePlayer, type LottieHandle, Mark, Split } from "./primitives";

/* "Why Oversite is the platform serious servers run on": three columns. Hovering one counts its figure up, shows its
   number and note, and plays its chart animation (the live site's Lottie files). */
export default function Why() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".why_heading h5", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".why_heading", start: "top 85%", once: true } });
  }, { scope: root });

  const columns = [
    { title: <>Deploy in<br />seconds</>, pre: "", value: 47, dec: 0, post: "s", note: <>Authorize, toggle what you want,<br />and the auto-deploy pipeline<br />has you live.</>, lottie: "/lottie/data.json" },
    { title: <>Always<br />online</>, pre: "", value: 100, dec: 0, post: "%", note: <>Uptime across the fleet, with<br />updates that roll out without<br />downtime or resets.</>, lottie: "/lottie/data2.json" },
    { title: <>Trusted<br />at scale</>, pre: "", value: 1, dec: 0, post: "k+", note: <>Servers running {site.name} bots,<br />serving hundreds of thousands<br />of members.</>, lottie: "/lottie/3.json" },
  ];

  return (
    <div className="section_why" id="why" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top">
            <Split className="text-block">Why {site.name}</Split>
            <div className="title-icon is-white"><Mark white /></div>
          </div>
          <div className="why_content">
            <div className="why_heading">
              <h5 style={{ opacity: 0 }}>Why {site.name} is the <span className="span-gradient">platform serious servers run on</span></h5>
              <a href={site.appUrl} className="button is-white w-button">Deploy now</a>
            </div>
            <div className="vertical-divider" />
            {columns.map((c, i) => <Column key={i} index={i + 1} {...c} />)}
            <div className="vertical-divider" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ index, title, pre, value, dec, post, note, lottie }: { index: number; title: React.ReactNode; pre: string; value: number; dec: number; post: string; note: React.ReactNode; lottie: string }) {
  const counter = useRef<CounterHandle>(null);
  const anim = useRef<LottieHandle>(null);
  return (
    <div className="column1" onMouseEnter={() => { counter.current?.play(); anim.current?.play(); }}>
      <div className="why-num">0{index}</div>
      <div className="w-layout-vflex why_card-top">
        <div className="w-layout-vflex why_top"><div className="why_left-t"><div>{title}</div></div></div>
        <div className="why_wrap-cifra">
          <div className="why_cifra-wrap">
            <div className="why_cifra">{pre}</div>
            <Counter ref={counter} to={value} decimals={dec} duration={1} manual className="why_cifra hover-counter" />
            <div className="why_cifra">{post}</div>
          </div>
          <div className="why-abs-text">{note}</div>
        </div>
      </div>
      <div className="why-img-wrap"><LottiePlayer ref={anim} src={lottie} trigger="manual" className="why-img" /></div>
    </div>
  );
}
