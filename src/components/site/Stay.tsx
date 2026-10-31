"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { Split, useFadeUps } from "./primitives";

/* "Put Your Server on Autopilot": the patterned closing call to action. */
export default function Stay() {
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);
  return (
    <div className="section_stay" ref={root}>
      <div className="stay_content">
        <Split as="h2">Put Your Server on Autopilot</Split>
        <div className="stay_t-wrap"><div data-fade>Deploy the bots, set it once, and let {site.name} run the rest. Moderation, support, and utilities, always on call.</div></div>
        <a href={site.appUrl} className="button w-button" data-fade>Deploy now</a>
      </div>
    </div>
  );
}
