"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { Split, useFadeUps } from "./primitives";

/* "Stay Ahead in Trading with Oversite": the patterned closing call to action. */
export default function Stay() {
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);
  return (
    <div className="section_stay" ref={root}>
      <div className="stay_content">
        <Split as="h2">Stay Ahead in Trading with {site.name}</Split>
        <div className="stay_t-wrap"><div data-fade>Join us today and take your trading to the next level. {site.name} is your partner in achieving financial success.</div></div>
        <a href={site.appUrl} className="button w-button" data-fade>Launch App</a>
      </div>
    </div>
  );
}
