"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { site } from "@/config/site";
import { Mark, Split } from "./primitives";

const POSTS = [
  { img: "photo_2026-04-24_18-25-48.avif", min: 5, date: "2026-04-27", title: "How to Spot Strategy Drift, Slippage, and Execution Problems in MT4/MT5", text: "Is your strategy failing, or is your execution getting worse? Learn how to spot strategy drift, slippage, and execution problems in MT4/MT5 before they quietly damage performance." },
  { img: "photo_2026-04-24_18-25-47.avif", min: 6, date: "2026-04-27", title: "Beyond the Diary: Why Serious Traders are Migrating to Performance Intelligence in 2026", text: `Is a trading journal enough? Discover why 2026 requires Performance Intelligence. Compare retail journals with ${site.name}'s audited analytics and HPC infrastructure.` },
  { img: "photo_2_2026-04-16_18-46-34.avif", min: 6, date: "2026-04-27", title: "How to Verify Your Trading Track Record Before Approaching Investors", text: "Screenshots and spreadsheets are not enough. Learn what makes a trading track record credible, what investors look for, and how to present verified performance with more trust." },
  { img: "photo_1_2026-04-16_18-46-34.avif", min: 8, date: "2026-04-16", title: "How to Pass a Prop Firm Challenge Without Violating Daily Drawdown", text: "Daily drawdown is one of the main reasons traders fail prop firm challenges. Learn how to manage position size, risk buffers, and real-time performance so you stay within the rules." },
  { img: "photo_2026-04-14_14-13-00.avif", min: 4, date: "2026-04-16", title: "The 7 Trading Metrics That Actually Matter More Than Win Rate", text: "Win rate alone doesn't tell you if a strategy is actually strong. Learn the 7 trading performance metrics serious traders use to evaluate edge, risk, and consistency." },
];

/* "OVERSITE NEWS": the Swiper carousel with arrow buttons and a progress bar, as on the live site. */
export default function Blog() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div id="blog" className="section_blog" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="blog_top">
            <div className="title-top">
              <Split>{site.name} news</Split>
              <div className="title-icon"><Mark /></div>
            </div>
          </div>
          <div className="blog_content">
            <div className="w-layout-vflex heading-wrap is-blog">
              <div className="heading-wrap-left"><Split as="h2" effect="letters-fade" className="blog_h">Stories and Trends Shaping the Future of Finance</Split></div>
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
                {POSTS.map((p) => (
                  <SwiperSlide className="w-dyn-item" key={p.title}>
                    <a href={site.blogUrl} className="blog_item custom-cursor-img w-inline-block">
                      <img loading="lazy" src={`/al/${p.img}`} alt="" className="blog_img" />
                      <div className="w-layout-vflex blog_text">
                        <div className="blog_read-date">
                          <div className="blog_time-wrap"><div className="blog_time">{p.min}</div><div className="blog_time">min read</div></div>
                          <img loading="lazy" src="/al/Ellipse_8535.svg" alt="" className="card-dot" />
                          <div className="blog_time">{p.date}</div>
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
            <div className="btn-wrap-center"><a href={site.blogUrl} className="button w-button">Our Blog</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
