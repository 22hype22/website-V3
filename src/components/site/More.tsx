"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { LottiePlayer, Mark, Split, useFadeUps } from "./primitives";

/* "MORE ABOUT US": four dark cards with the live site's Lottie illustrations, now about the dashboard and the data. */
export default function More() {
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);
  useGSAP(() => {
    gsap.fromTo(".more_img", { opacity: 0 }, { opacity: 1, duration: 1.2, scrollTrigger: { trigger: ".more_img", start: "top 85%", once: true } });
  }, { scope: root });

  return (
    <div id="dashboard" className="section_more" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top is-grey">
            <Split>More about us</Split>
            <div className="title-icon is-white"><Mark white /></div>
          </div>
          <div className="more_content">
            <div className="w-layout-grid more_top-cards">
              <div className="more_card is-1">
                <div className="w-layout-vflex more_t-wrap">
                  <div className="more_titlw-wrap"><div className="more_title" data-fade>One Dashboard, <br />Live Changes</div></div>
                  <div data-fade>Configure every bot, your team and all your settings in one place. Changes apply live across your server with no code, config files or restarts, straight from the <a href={site.dashboardUrl}><span className="text-span"><strong>dashboard</strong></span></a></div>
                </div>
                <div className="more_number"><div>01<br /></div></div>
                <LottiePlayer src="/lottie/1.json" loop autoplay className="more_lottie is-1" />
              </div>
              <div className="more_card is-2">
                <div className="w-layout-vflex more_t-wrap is-2">
                  <div className="more_title is-2" data-fade>Every Bot Is Yours to Shape</div>
                  <div className="more_list-wrap">
                    <div className="more_icon-wrap"><img src="/al/44.svg" loading="lazy" alt="" className="more_icon" /><div data-fade>Name, icon, banner, bio and status are yours</div></div>
                    <div className="more_icon-wrap"><img src="/al/33.svg" loading="lazy" alt="" className="more_icon" /><div data-fade>Change any of them whenever you like</div></div>
                    <div className="more_icon-wrap"><img src="/al/11.svg" loading="lazy" alt="" className="more_icon" /><div data-fade>Changes go live right away, no restarts</div></div>
                    <div className="more_icon-wrap"><img src="/al/22.svg" loading="lazy" alt="" className="more_icon" /><div data-fade>Invite staff and scope what they can touch</div></div>
                  </div>
                </div>
                <div className="more_number"><div>02</div></div>
                <LottiePlayer src="/lottie/about_us_animaiton_v004.json" trigger="view" className="more_lottie is-2" />
              </div>
            </div>
            <div className="w-layout-grid more_btm-cards">
              <div className="more_card is-3">
                <div className="w-layout-vflex more_t-wrap is-3">
                  <img src="/al/3-Icon.svg" loading="lazy" alt="" className="more_icon-3" />
                  <div className="more_title" data-fade>Your Data is Fully Protected</div>
                </div>
                <LottiePlayer src="/lottie/2.json" trigger="view" className="more_lottie is-3" />
                <div className="more_number"><div>03</div></div>
              </div>
              <div className="more_card">
                <div className="w-layout-vflex more_t-wrap is-4"><div className="more_title" data-fade>Audit Trail on <br />Every Change</div></div>
                <div className="more_number"><div>04</div></div>
                <img src="/al/img-4_1.svg" loading="lazy" alt="" className="more_img" style={{ opacity: 0 }} />
                <div className="overley-25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
