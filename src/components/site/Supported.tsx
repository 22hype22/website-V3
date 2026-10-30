"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Mark, Split } from "./primitives";

const BROKERS: [string, string, boolean][] = [
  ["MetaTrader 5", "MetaTrader_5.avif", false], ["MetaTrader 4", "MetaTrader4.avif", false], ["Interactive Brokers", "image_4.avif", true], ["Trading 212", "Trading_212.svg", true],
  ["Robinhood", "Robinhood.svg", true], ["Tastytrade", "Tastytrade.svg", true], ["Schwab", "Schwab.svg", true], ["Binance", "Binance.svg", true],
  ["TradeStation", "Tradestation.svg", true], ["Chase", "Chase.svg", true], ["Kraken", "Kraken.svg", true], ["Coinbase", "Coinbase.svg", true],
];

/* "BROKERS — Supported Platforms": the grid of twelve platform cards, fading in one after another. */
export default function Supported() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.fromTo(".supported_top h4", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".supported_top", start: "top 85%", once: true } });
    gsap.fromTo(".supported_card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, scrollTrigger: { trigger: ".supported_grid", start: "top 85%", once: true } });
  }, { scope: root });

  return (
    <section id="brokers" className="section_supported" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top">
            <Split>Brokers</Split>
            <div className="title-icon is-white"><Mark white /></div>
          </div>
          <div className="supported_wrap">
            <div className="w-layout-vflex supported_top"><h4 style={{ opacity: 0 }}>Supported Platforms</h4></div>
            <div className="w-dyn-list">
              <div role="list" className="supported_grid w-dyn-items">
                {BROKERS.map(([name, img, soon]) => (
                  <div role="listitem" className="w-dyn-item" key={name}>
                    <div className="supported_card" style={{ opacity: 0 }}>
                      <img src={`/al/${img}`} loading="lazy" alt="" className="supported_img" />
                      <div>{name}</div>
                      {soon ? <div className="supported_soon">Coming soon</div> : <div className="supported_soon w-dyn-bind-empty" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="supported_btn-wrap"><a href={site.helpUrl} className="button-100 is-white w-button">See all</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
