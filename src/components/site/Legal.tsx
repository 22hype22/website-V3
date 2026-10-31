"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { EFFECTIVE, ENTITY, LEGAL, type LegalDoc } from "@/content/legal";
import Page from "./Page";
import { Mark, Split, useFadeUps } from "./primitives";

/* One policy page: eyebrow, title, effective date, a switcher for the other two documents, and the sections. */
export default function Legal({ doc }: { doc: LegalDoc }) {
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);
  return (
    <Page>
      <div className="section_legal" ref={root}>
        <div className="padding-global padding-section-medium">
          <div className="container-large">
            <div className="title-top">
              <Split>LEGAL</Split>
              <div className="title-icon"><Mark /></div>
            </div>
            <div className="legal_head">
              <Split as="h1">{doc.title}</Split>
              <p data-fade>{doc.blurb}</p>
              <div className="legal_meta" data-fade>Effective {EFFECTIVE} · {ENTITY}</div>
            </div>
            <div className="legal_layout">
              <aside className="legal_side" data-fade>
                <div className="legal_side-label">Policies</div>
                {LEGAL.map((d) => <a key={d.slug} href={d.file} className={`legal_tab${d.slug === doc.slug ? " is-on" : ""}`}>{d.title}</a>)}
                <div className="legal_side-note">Questions about any of these? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</div>
              </aside>
              <article className="legal_body">
                {doc.sections.map((s, i) => (
                  <section className="legal_section" key={s.h} data-fade>
                    <h2><span>{String(i + 1).padStart(2, "0")}</span>{s.h}</h2>
                    {s.p.map((p, j) => <p key={j}>{p}</p>)}
                  </section>
                ))}
                <div className="legal_foot">{ENTITY}. Questions: <a href={`mailto:${site.email}`}>{site.email}</a>.</div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
