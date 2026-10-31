"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import Page from "./Page";
import { Split, useFadeUps } from "./primitives";

/* The 404: a hero-sized number over the mountain, one line of copy, and the way back. */
export default function NotFound() {
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);
  return (
    <Page footer={false}>
      <div className="section_nf" ref={root}>
        <div className="padding-global">
          <div className="container-large nf_content">
            <div className="nf_code" aria-hidden="true">404</div>
            <Split as="h1" className="nf_h1">This page wandered off.</Split>
            <p data-fade>The link may be old, or the page has moved. Head back home, or ask the assistant and we&apos;ll point you the right way.</p>
            <div className="nf_actions" data-fade>
              <a href="./" className="button w-button">Back home</a>
              <a href="./#build" className="button is-white w-button">Design a bot</a>
              <a href={site.discordUrl} target="_blank" rel="noreferrer" className="nf_link">Join the Discord</a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
