"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Brand } from "./primitives";

const LINKS: [string, string][] = [["/", "Home"], ["#discover", "Features"], ["#brokers", "Supported Platforms"], ["#pricing", "Pricing"], [site.helpUrl, "Help Center"]];

/* Fixed navigation. Hides while scrolling down, returns on the way up. On phones the menu button opens the stack. */
export default function Navbar({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!ready) { gsap.set(root.current, { opacity: 0 }); return; }
    gsap.to(root.current, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
  }, { dependencies: [ready] });

  // slide the bar away while scrolling down, bring it back on the way up (the live site's IX2 behaviour)
  useGSAP(() => {
    // the wrapper has no height of its own, so (like the live IX2) it is the fixed .navbar that slides away
    gsap.to(root.current!.querySelector(".navbar"), { yPercent: hidden && !open ? -100 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  }, { dependencies: [hidden, open] });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 40 && y > last - 2);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav_fixed" ref={root}>
      <div role="banner" className={`navbar w-nav${open ? " is-open" : ""}`}>
        <div className="padding-global">
          <div className="container-large is-nav">
            <div className="nav-components">
              <div className="brand w-nav-brand"><Brand /></div>
              <nav role="navigation" className="nav-manu w-nav-menu">
                <div className="nav-flex">
                  <div className="nav_wrap">
                    <div className="nav_menu-text">Menu</div>
                    {LINKS.map(([href, label], i) => (
                      <div className="link-wrapper" key={label}>
                        <a href={href} className={`nav-link${i === 0 ? " w--current" : ""}`} onClick={() => setOpen(false)}>{label}</a>
                        <div className="hover-line" />
                      </div>
                    ))}
                    <div className="w-layout-vflex nav_wrap-btn is-mb">
                      <a href={`mailto:${site.email}`} className="button-nav w-inline-block">
                        <div>Contact Us</div>
                        <div className="icon-arrow w-embed">
                          <svg width="0.7rem" height="0.7rem" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.955078 8.95168L8.45119 1.45557M8.45119 1.45557H0.955078M8.45119 1.45557V8.95168" stroke="currentColor" /></svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="nav-btn-wrap">
                  <a href={site.loginUrl} className="button is-nav-t is-black w-inline-block">
                    <div className="icon-arrow w-embed" style={{ color: "rgb(153, 153, 153)" }}>
                      <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.33337 1.96101C6.64978 0.387223 9.99606 1.23902 11.2176 3.74369M6.33337 12.7886C9.09065 13.1728 11.6667 11.022 11.6667 8.28917V6.02761M4.33337 12.0199C3.12438 11.1985 2.33337 9.83382 2.33337 8.28917V5.69175C2.33337 5.00066 2.49171 4.3456 2.77498 3.7591" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.33335 8.05C9.33335 9.4031 8.28868 10.5 7.00002 10.5C5.71136 10.5 4.66669 9.4031 4.66669 8.05V5.95C4.66669 5.57424 4.74725 5.21824 4.89123 4.9M7.00002 3.5C8.28868 3.5 9.33335 4.5969 9.33335 5.95" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 6.125L7 7.875" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-nav">Login</div>
                  </a>
                  <a href={site.appUrl} className="button is-nav hide-mobile-landscape w-inline-block">
                    <div className="start-icon-wrap"><img src="/al/6534.svg" loading="lazy" alt="" className="icon-start" /></div>
                    <div>&nbsp;&nbsp;Launch App&nbsp;&nbsp;&nbsp;</div>
                  </a>
                </div>
              </nav>
              <a href={site.appUrl} className="button is-nav hide-desktop w-inline-block">
                <div className="icon-arrow w-embed">
                  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8334 7.00033C12.8334 10.222 10.2217 12.8337 7.00002 12.8337C3.77836 12.8337 1.16669 10.222 1.16669 7.00033C1.16669 3.77866 3.77836 1.16699 7.00002 1.16699C10.2217 1.16699 12.8334 3.77866 12.8334 7.00033Z" stroke="currentColor" strokeWidth="0.875" />
                    <path d="M6.99998 7.58333C7.64431 7.58333 8.16665 7.061 8.16665 6.41667C8.16665 5.77233 7.64431 5.25 6.99998 5.25C6.35565 5.25 5.83331 5.77233 5.83331 6.41667C5.83331 7.061 6.35565 7.58333 6.99998 7.58333ZM6.99998 7.58333L6.99998 9.33333" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="nav-btn-t">Start Your Trial</div>
              </a>
              <div className="menu-button w-nav-button" aria-label="menu" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                <img loading="lazy" src="/al/Group_207275068.svg" alt="" className="menu-btn" />
                <img loading="lazy" src="/al/Group_2072750768.svg" alt="" className="menu-btn is-close" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
