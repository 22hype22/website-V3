"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { site } from "@/config/site";
import { Mark, Split } from "./primitives";

const BOTS = [
  { img: "fleet-protection.svg", tag: "Bot 01", price: "$99 one-time", title: `${site.name} Protection`, text: "Stops raids before they ever land. Auto-moderation, verification and a real-time threat shield, always on." },
  { img: "fleet-support.svg", tag: "Bot 02", price: "$99 one-time", title: `${site.name} Support`, text: "Turns the chaos into clean tickets: routing, transcripts, claim system and staff tools so nothing slips through." },
  { img: "fleet-utilities.svg", tag: "Bot 03", price: "$99 one-time", title: `${site.name} Utilities`, text: "Everything else your server runs on: leveling, giveaways, live AI radio and the stats that keep it moving." },
  { img: "fleet-all-in-one.svg", tag: "Pack", price: "$199 one-time", title: "All in One Pack", text: "Protection, Support and Utilities fused into a single bot. Every base your server needs, one install." },
  { img: "fleet-erlc.svg", tag: "Coming soon", price: "Waitlist open", title: `${site.name} ER:LC`, text: "Emergency Response: Liberty County tools: sessions, in-game moderation and live server stats. Landing soon." },
];

/* "THE OVERSITE FLEET": the Swiper carousel with arrow buttons and a progress bar, one card per bot. */
export default function Blog() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div id="blog" className="section_blog" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="blog_top">
            <div className="title-top">
              <Split>The {site.name} fleet</Split>
              <div className="title-icon"><Mark /></div>
            </div>
          </div>
          <div className="blog_content">
            <div className="w-layout-vflex heading-wrap is-blog">
              <div className="heading-wrap-left"><Split as="h2" effect="letters-fade" className="blog_h">Every Bot in the Fleet, Built to Work as One</Split></div>
              <div className="w-layout-hflex slider-nav">
                <div className="swiper-btn-prev" tabIndex={0} role="button" aria-label="Previous slide">
                  <div className="icon w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.99996 11C5.99996 11 1.00001 7.31756 1 5.99996C0.999989 4.68237 6 1 6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                <div className="swiper-btn-next is-right" tabIndex={0} role="button" aria-label="Next slide">
                  <div className="icon w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 6L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 11C12 11 17 7.31756 17 5.99996C17 4.68237 12 1 12 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog_wrap-slider">
              <Swiper
                className="w-dyn-list"
                modules={[Navigation, Pagination, FreeMode]}
                loop
                freeMode
                slidesPerView={1}
                spaceBetween={24}
                breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 20 } }}
                navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
                pagination={{ el: ".swiper-pagination", type: "progressbar" }}
              >
                {BOTS.map((p) => (
                  <SwiperSlide className="w-dyn-item" key={p.title}>
                    <a href={site.botsUrl} className="blog_item custom-cursor-img w-inline-block">
                      <img loading="lazy" src={`/assets/${p.img}`} alt="" className="blog_img" />
                      <div className="w-layout-vflex blog_text">
                        <div className="blog_read-date">
                          <div className="blog_time-wrap"><div className="blog_time">{p.tag}</div></div>
                          <img loading="lazy" src="/al/Ellipse_8535.svg" alt="" className="card-dot" />
                          <div className="blog_time">{p.price}</div>
                        </div>
                        <div className="blog_name text-style-2lines">{p.title}</div>
                        <div className="blog_descr text-style-2lines">{p.text}</div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal" />
            </div>
            <div className="btn-wrap-center"><a href={site.buildUrl} className="button w-button">Build your bot</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
