"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/hooks";
import { site } from "@/config/site";

export default function Cta() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="cta" id="trial" ref={root}>
      <h2 data-fade>Stay Ahead in Trading<br />with {site.name}</h2>
      <p data-fade>Join us today and take your trading to the next level. {site.name}<br />is your partner in achieving financial success.</p>
      <a className="btn btn-dark" href="#login" data-fade>Create Account</a>
    </section>
  );
}
