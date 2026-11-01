"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { useSignedIn } from "@/lib/auth";
import { Brand } from "./primitives";

const LINKS = site.nav;

/* Fixed navigation. Hides while scrolling down, returns on the way up. On phones the menu button opens the stack. */
/* in-page links are written for the home page; from any other page they go home first */
export const rel = (href: string, sub: boolean) => (href === "/" ? "./" : sub && href.startsWith("#") ? "./" + href : href);

export default function Navbar({ ready, sub = false }: { ready: boolean; sub?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const signedIn = useSignedIn();
  // the one account button: "Sign in" for visitors, "Dashboard" once a session is present
  const account = signedIn ? { href: site.dashboardUrl, label: "Dashboard" } : { href: site.signInUrl, label: "Sign in" };

  useGSAP(() => {
    if (!ready) { gsap.set(root.current, { opacity: 0 }); return; }
    gsap.to(root.current, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
  }, { dependencies: [ready] });

  // slide the bar away while scrolling down, bring it back on the way up (the live site's IX2 behaviour)
  useGSAP(() => {
    // the wrapper has no height of its own, so (like the live IX2) it is the fixed .navbar that slides away
    gsap.to(root.current!.querySelector(".navbar"), { yPercent: hidden && !open ? -160 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
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
                    {LINKS.map((item, i) => item === "|" ? <div className="nav-divider" aria-hidden="true" key={"divider" + i} /> : (
                      <div className="link-wrapper" key={item[1]}>
                        <a href={rel(item[0], sub)} className={`nav-link${i === 0 && !sub ? " w--current" : ""}`} onClick={() => setOpen(false)} {...(item[0].startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{item[1]}</a>
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
                  <a href={account.href} className="button is-nav is-account hide-mobile-landscape w-inline-block">
                    <div>{account.label}</div>
                  </a>
                </div>
              </nav>
              <a href={account.href} className="button is-nav is-account hide-desktop w-inline-block">
                <div className="nav-btn-t">{account.label}</div>
              </a>
              <div className="menu-button w-nav-button" aria-label="Menu" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen((o) => !o)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}>
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
