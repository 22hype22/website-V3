"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Counter, Mark, Split, useFadeUps } from "./primitives";

/* "THE FLEET — Three Bots. One Server."
   The section is 260rem tall and its inner block is sticky, so the three cards travel sideways with the scroll.
   Near the end the white background turns black and the four-step process grid scrolls up underneath. */
export default function Products() {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  useFadeUps(root);

  useGSAP(() => {
    const section = root.current; if (!section) return;
    // One timeline over the whole 260rem section; positions are fractions of the section, measured off the live site.
    // the live IX2 timeline runs over the full 260rem section height (not just the pinned distance);
    // phones get the stacked layout instead (section_c-mb) and no scroll choreography at all
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
    tl.fromTo(".products_cards", { xPercent: 0 }, { xPercent: -65.8, ease: "none", duration: 0.45 }, 0)
      .fromTo(".products_img-1", { xPercent: 0 }, { xPercent: -26, ease: "none", duration: 0.15 }, 0)
      .fromTo(".products_arrow-wrap", { x: "0rem" }, { x: "17rem", ease: "none", duration: 0.12 }, 0)
      .fromTo(".products_img-2.is-on", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.1 }, 0.14)
      // the badge grows and travels down out of the third card into the centre slot of the bento below
      .fromTo(".products_img-3", { width: "13rem", height: "13rem", left: "19.94rem", y: "0rem" }, { width: "24.5rem", height: "24.5rem", left: "14.19rem", y: "36rem", ease: "none", duration: 0.23 }, 0.458)
      .fromTo(section, { backgroundColor: "#ffffff" }, { backgroundColor: "#020202", ease: "none", duration: 0.03 }, 0.65)
      .fromTo(".products_c-content > h5", { color: "#020202" }, { color: "#ffffff", ease: "none", duration: 0.03 }, 0.65)
      .fromTo(".cards_heading", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.03 }, 0.65)
      .to({}, { duration: 0.32 });
    });
  }, { scope: root });

  return (
    <div id="fleet" className="section_products" ref={root}>
      <div className="padding-global is-products">
        <div className="products_track">
          <div className="container-large">
            <div className="title-top is-products">
              <Split>THE FLEET</Split>
              <div className="title-icon"><Mark /></div>
            </div>
            <div className="products_content">
              <div className="products_arrow-wrap">
                <img src="/al/arrow-left-02-round.svg" loading="lazy" alt="" className="arrow-icon" />
                <div>Scroll</div>
              </div>
              <div className="products_c-content">
                <Split as="h5">Three Bots. One Server.</Split>
                <div className="products_cards" ref={cards}>

                  <div className="products_c-1">
                    <div className="w-layout-vflex products_c-text">
                      <img src="/al/Product_Icon.svg" loading="lazy" alt="" className="products_icon-card" />
                      <div className="products_c-btm">
                        <Split className="products_card-title">Roleplay</Split>
                        <div>Everything an ER:LC roleplay community runs on. Tickets, Roblox<br />verification and rank sync, logs, giveaways, music and economy.</div>
                        <div className="products_wrap-btn"><a href={site.botsUrl} className="button is-white w-button">Explore Roleplay</a></div>
                      </div>
                    </div>
                    <div className="products_img-1">
                      <div className="lottie-dashboard w-background-video w-background-video-atom">
                        <video autoPlay loop muted playsInline poster="/video/Home_poster.0000000.jpg" style={{ backgroundImage: "url(/video/Home_poster.0000000.jpg)" }}>
                          <source src="/video/Home_mp4.mp4" type="video/mp4" />
                          <source src="/video/Home_webm.webm" type="video/webm" />
                        </video>
                      </div>
                      <img src="/al/4b4f713eb9a8932b22a99f6fc0ddd8e9.webp" loading="lazy" alt="" className="products_leptop" />
                    </div>
                    <img src="/al/c-bg-1.svg" loading="lazy" alt="" className="products_bg" />
                  </div>

                  <div className="products_c-2">
                    <img src="/al/53320e10f1c682c91307b5d6df3ac61954453d6a.avif" loading="lazy" alt="" className="products_img-2 is-on" />
                    <img src="/al/laptop0.avif" loading="lazy" alt="" className="products_img-2" />
                    <div className="w-layout-vflex products_c-text is-2">
                      <img src="/al/p.svg" loading="lazy" alt="" className="products_icon-card" />
                      <div className="products_c-btm">
                        <div className="products_card-title">Dispatch</div>
                        <div>An AI voice dispatcher that reads 911 calls aloud and talks back. Nearest-unit dispatch, officer-down alerts, BOLOs.</div>
                      </div>
                    </div>
                    <img src="/al/c-bg.svg" loading="lazy" alt="" className="products_bg is-2" />
                  </div>

                  <div className="products_c-3">
                    <div className="products_c-3-r">
                      <div className="w-layout-vflex products_numb-item is-r"><div className="products_wrap-numb"><div className="products_number">+</div><Counter to={250} className="products_number counter" /><div className="products_number">XP</div></div><div>Leveling &amp; Economy</div></div>
                      <div className="w-layout-vflex products_numb-item is-r"><div className="products_wrap-numb"><div className="products_number" /><div className="products_number">Live</div><div className="products_number" /></div><div>Twitch / YouTube Alerts</div></div>
                    </div>
                    <div className="products_c-3-l">
                      <div className="w-layout-vflex products_numb-item"><div className="products_wrap-numb"><div className="products_number" /><Counter to={24} className="products_number counter" /><div className="products_number">/7</div></div><div>Oversite Radio, On Air</div></div>
                      <div className="w-layout-vflex products_numb-item"><div className="products_wrap-numb"><div className="products_number" /><div className="products_number">Unlimited</div><div className="products_number" /></div><div>Reaction Roles</div></div>
                    </div>
                    <div className="products_h-3"><div className="products_card-title">Utilities &amp;<br />Everything Else</div></div>
                    <Badge className="products_img-3-mb" />
                    <Badge className="products_img-3" />
                    <div className="products_t-3"><div>Leveling, economy, giveaways, server stats and a live AI radio with a DJ that never repeats a line.</div></div>
                    <img src="/al/Vector_1.svg" loading="lazy" alt="" className="products_bg" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="cards_wrap">
        <div className="w-layout-vflex cards_heading">
          <h4>Ready in <span className="span-gradient">Minutes</span>, Not Weekends</h4>
        </div>
        <div className="cards_grid hide-mobile-landscape">
          <div className="cards_left">
            <div className="cards_hover-l" />
            <div className="w-layout-vflex cards_top"><div className="cards_icon w-embed"><FundingIcon /></div><div>01</div></div>
            <div className="w-layout-vflex cards_btm">
              <Split as="h6" className="cards_title">Connect</Split>
              <div data-fade>Authorize {site.name} and link your server.<br />No tokens to generate, nothing to host, no command line.</div>
            </div>
          </div>
          <div className="cards_center"><CenterBadge /></div>
          <div className="cards_right">
            <div className="cards_hover-r" />
            <div className="w-layout-vflex cards_top"><div>02</div><div className="cards_icon w-embed"><ShieldIcon /></div></div>
            <div className="w-layout-vflex cards_btm is-right">
              <Split as="h6" className="cards_title">Configure</Split>
              <div data-fade>Choose your bots and toggle exactly the features you want, all from one visual dashboard.</div>
            </div>
          </div>
        </div>
        <div className="cards_grid is-btm hide-mobile-landscape">
          <div className="cards_left-btm">
            <div className="cards_hover-btm" />
            <div className="cards_icon w-embed"><EdgeIcon /></div>
            <div className="cards_bottom">
              <div className="w-layout-vflex cards_btm is-left is-btm">
                <Split as="h6" className="cards_title">Deploy</Split>
                <div data-fade>Our auto-deploy pipeline pushes your setup live in under sixty seconds. No restarts, no downtime, instant rollback.</div>
              </div>
              <div>03</div>
            </div>
            <img src="/al/67b494a73d2f4be34ddde300_left.svg" loading="lazy" alt="" className="cards_left-bg" />
          </div>
          <div className="cards_right-btm">
            <div className="cards_hover-btm" />
            <div className="cards_icon w-embed"><DiscoveredIcon /></div>
            <div className="w-layout-vflex cards_bottom">
              <div>04<br /></div>
              <div className="w-layout-vflex cards_btm is-right-btm">
                <Split as="h6" className="cards_title">Automate</Split>
                <div data-fade className="text-block-4">Moderation, tickets and utilities run themselves around the clock. Rules enforce, raids get caught, and every change lands in the audit log.</div>
              </div>
            </div>
            <img src="/al/67b494a73d2f4be34ddde300_left.svg" loading="lazy" alt="" className="cards_right-bg" />
          </div>
        </div>
      </div>
      </div>

      <div id="process" className="features-trigger" />
    </div>
  );
}

/* The small badge card in the funding card: the live SVG with its wordmark removed, our name and mark on top. */
function Badge({ className }: { className: string }) {
  return (
    <div className={`${className} badge-card`}>
      <img src="/al/Central_Card.svg" alt="" />
      <span className="badge-name">{site.name}</span>
      <img src="/assets/oversite-mark-white.png" alt="" className="badge-mark" />
    </div>
  );
}
function CenterBadge() {
  return (
    <div className="badge-card is-center">
      <img src="/al/center.svg" alt="" />
      <span className="badge-name">{site.name}</span>
      <img src="/assets/oversite-mark-white.png" alt="" className="badge-mark" />
    </div>
  );
}

export function FundingIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.66675 23L4.66675 29.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.0001 13L18.0001 29.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34.6667 34.6665L1.33342 34.6665" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.3335 19.6665L31.3335 29.6665" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.33353 12.6665C6.72539 11.8569 5.7572 11.3333 4.66671 11.3333C2.82576 11.3333 1.33337 12.8256 1.33337 14.6666C1.33337 16.5075 2.82576 17.9999 4.66671 17.9999C6.50766 17.9999 8.00004 16.5075 8.00004 14.6666C8.00004 13.9161 7.75204 13.2236 7.33353 12.6665ZM7.33353 12.6665L15.3332 6.6667M15.3332 6.6667C15.9414 7.47627 16.9095 7.99992 18 7.99992C19.305 7.99992 20.4349 7.25001 20.9821 6.15762M15.3332 6.6667C14.9147 6.10957 14.6667 5.41704 14.6667 4.66658C14.6667 2.82564 16.1591 1.33325 18 1.33325C19.841 1.33325 21.3334 2.82564 21.3334 4.66659C21.3334 5.20255 21.2069 5.70897 20.9821 6.15762M20.9821 6.15762L28.3513 9.84221M28.3513 9.84221C28.1265 10.2909 28 10.7973 28 11.3333C28 13.1742 29.4924 14.6666 31.3334 14.6666C33.1743 14.6666 34.6667 13.1742 34.6667 11.3333C34.6667 9.4923 33.1743 7.99992 31.3334 7.99992C30.0284 7.99992 28.8986 8.74982 28.3513 9.84221Z" stroke="currentColor" strokeWidth="1.66667" />
    </svg>
  );
}
export function ShieldIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.997 3.33325C14.9841 3.33325 11.7337 6.69824 7.88954 7.92476C6.3265 8.42347 5.54497 8.67282 5.22869 9.02433C4.91241 9.37585 4.81979 9.8895 4.63456 10.9168C2.65241 21.9099 6.98485 32.0732 17.3172 36.029C18.4273 36.4541 18.9824 36.6666 20.0025 36.6666C21.0226 36.6666 21.5776 36.4541 22.6877 36.029C33.0194 32.0732 37.3477 21.9099 35.365 10.9168C35.1797 9.88932 35.087 9.37558 34.7706 9.02406C34.4543 8.67255 33.6728 8.42333 32.1099 7.9249C28.2643 6.69849 25.0102 3.33325 19.997 3.33325Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.9999 21.6667C14.9999 21.6667 16.6666 21.6667 18.3333 25C18.3333 25 23.6274 16.6667 28.3333 15" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function EdgeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.3334 24.1666V10.8333C33.3334 7.6906 33.3334 6.11925 32.3571 5.14294C31.3808 4.16663 29.8094 4.16663 26.6667 4.16663H13.3334C10.1907 4.16663 8.61937 4.16663 7.64306 5.14294C6.66675 6.11925 6.66675 7.6906 6.66675 10.8333V24.1666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3335 13.9892H13.6031C14.9554 13.9892 15.6315 13.9892 16.1478 14.2795C16.664 14.5698 16.896 15.0806 17.3602 16.1021L17.921 17.3364C18.226 18.0077 18.3785 18.3434 18.6245 18.3329C18.8706 18.3225 18.9784 17.9758 19.1939 17.2824L21.1222 11.0789C21.344 10.3654 21.4548 10.0087 21.7034 10C21.9519 9.99128 22.101 10.3389 22.3992 11.034L22.7369 11.8213C23.186 12.8683 23.4105 13.3918 23.9316 13.6905C24.4526 13.9892 25.1412 13.9892 26.5182 13.9892H26.6668" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.82953 25.859L6.69938 24.1666H33.2531L34.1706 25.859C36.5754 30.2949 37.1745 32.5128 36.2604 34.173C35.3463 35.8333 32.9228 35.8333 28.0758 35.8333L11.9245 35.8333C7.07752 35.8333 4.65402 35.8333 3.73995 34.173C2.82587 32.5128 3.42474 30.2949 5.82953 25.859Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function DiscoveredIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.8334 36.6667H10.9848C8.40919 36.6667 6.36056 35.4134 4.52114 33.661C0.755648 30.0736 6.93805 27.2067 9.296 25.8027C13.045 23.5703 17.4775 22.8516 21.6667 23.6464" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.8334 10.8334C25.8334 14.9755 22.4755 18.3334 18.3334 18.3334C14.1912 18.3334 10.8334 14.9755 10.8334 10.8334C10.8334 6.69124 14.1912 3.33337 18.3334 3.33337C22.4755 3.33337 25.8334 6.69124 25.8334 10.8334Z" stroke="currentColor" strokeWidth="1.66667" />
      <path d="M31.1518 24.2962L32.325 26.662C32.485 26.9913 32.9116 27.3072 33.2716 27.3677L35.398 27.7239C36.7578 27.9524 37.0778 28.9471 36.0979 29.9284L34.4448 31.5952C34.1648 31.8775 34.0115 32.4219 34.0981 32.8117L34.5714 34.875C34.9447 36.5082 34.0848 37.14 32.6516 36.2865L30.6585 35.0968C30.2986 34.8818 29.7053 34.8818 29.3387 35.0968L27.3456 36.2865C25.919 37.14 25.0525 36.5015 25.4258 34.875L25.899 32.8117C25.9857 32.4219 25.8324 31.8775 25.5524 31.5952L23.8993 29.9284C22.926 28.9471 23.2393 27.9524 24.5992 27.7239L26.7256 27.3677C27.0789 27.3072 27.5055 26.9913 27.6655 26.662L28.8387 24.2962C29.4787 23.0124 30.5185 23.0124 31.1518 24.2962Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
