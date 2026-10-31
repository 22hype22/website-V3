"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/config/site";
import { BASES, CUSTOM_BASE, MODULES, MODULE_GROUPS, fmtRobux, fmtUsd, quote, quoteCustom, robux, type Base } from "@/lib/builder";
import { Mark, Split, useFadeUps } from "./primitives";

/* "Design your dream bot": either pick a packaged bot or build your own from individual modules, then give it
   a name, icon, banner and status. The Discord-style preview and the quote update as you go, and
   "Continue to payment" hands the selection to the store. */

const STATUS_MAX = 128;

type Mode = "packages" | "custom";
type Identity = { name: string; about: string; status: string; icon: string | null; banner: string | null };

function useObjectUrl() {
  const urls = useRef<string[]>([]);
  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);
  return (file: File | null) => { if (!file) return null; const u = URL.createObjectURL(file); urls.current.push(u); return u; };
}

export default function Build() {
  const [mode, setMode] = useState<Mode>("packages");
  const [picked, setPicked] = useState<string[]>([]);
  const [mods, setMods] = useState<string[]>([]);
  const [id, setId] = useState<Identity>({ name: "", about: "", status: "", icon: null, banner: null });
  const toUrl = useObjectUrl();
  const root = useRef<HTMLDivElement>(null);
  useFadeUps(root);

  const custom = mode === "custom";
  const q = useMemo(() => (custom ? quoteCustom(mods) : quote(picked)), [custom, mods, picked]);
  const toggleBase = (b: Base) => setPicked((p) => (p.includes(b.id) ? p.filter((x) => x !== b.id) : [...p, b.id]));
  const toggleMod = (m: string) => setMods((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  const pickedBases = BASES.filter((b) => picked.includes(b.id));
  const pickedMods = MODULES.filter((m) => mods.includes(m.id));
  const hasPick = custom ? mods.length > 0 : picked.length > 0;
  const erlcOnly = !custom && pickedBases.length > 0 && pickedBases.every((b) => b.group === "erlc");
  const name = id.name.trim() || "Your Bot";
  const handle = (id.name.trim() || "yourbot").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24) || "yourbot";

  // the store opens with the selection pre-filled
  const checkout = useMemo(() => {
    const u = new URL(site.buildUrl);
    if (custom) { if (mods.length) u.searchParams.set("modules", mods.join(",")); }
    else if (picked.length) u.searchParams.set("bases", picked.join(","));
    if (id.name.trim()) u.searchParams.set("name", id.name.trim());
    if (id.about.trim()) u.searchParams.set("about", id.about.trim().slice(0, 500));
    return u.toString();
  }, [custom, mods, picked, id.name, id.about]);

  const group = (g: Base["group"], label: string) => (
    <div className="build_group">
      <div className="build_group-label"><span>{label}</span></div>
      <div className="build_cards">
        {BASES.filter((b) => b.group === g).map((b) => {
          const on = picked.includes(b.id);
          const item = q.items.find((i) => i.base.id === b.id);
          return (
            <button type="button" key={b.id} className={`build_card${on ? " is-on" : ""}`} onClick={() => toggleBase(b)} aria-pressed={on}>
              <div className="build_card-top">
                <div className="build_card-name"><i className="build_check" aria-hidden="true" />{b.name}</div>
                {b.soon && <span className="build_pill">Coming soon</span>}
              </div>
              <div className="build_card-tag">{b.tagline}</div>
              <ul className="build_card-list">{b.bullets.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="build_card-price">
                {b.price > 0 ? (
                  <>
                    <span className="build_muted">one-time</span>
                    {item && item.note ? <><s>{fmtUsd(b.price)}</s><b>{fmtUsd(item.price)}</b></> : <b>{fmtUsd(b.price)}</b>}
                    <span className="build_muted">or</span><b>{fmtRobux(robux(item ? item.price : b.price))}</b>
                    {b.group === "discord" && <span className="build_muted">· $5/mo hosting</span>}
                  </>
                ) : <span className="build_muted">Price coming soon</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="build" className="section_build" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top">
            <Split>BUILD YOURS</Split>
            <div className="title-icon"><Mark /></div>
          </div>

          <div className="build_head">
            <Split as="h2">Design your dream bot.</Split>
            <p data-fade>Pick a packaged bot, or build your own from the parts you want. We&apos;ll quote your build and get the wheels spinning.</p>
          </div>

          <div className="build_layout">
            <div className="build_main">
              <div className="build_callout"><b>Every bot is yours to shape.</b> Name, icon, banner, bio, and status are all yours to set, and you can change any of them whenever you like. Changes go live right away.</div>

              <section className="build_step">
                <div className="build_step-head"><span className="build_num">1</span><h3>Pick a starting point</h3></div>
                <div className="build_modes" role="tablist" aria-label="How to start">
                  <button type="button" role="tab" aria-selected={!custom} className={`build_mode${!custom ? " is-on" : ""}`} onClick={() => setMode("packages")}>
                    <b>Packages</b><span>Ready-made bots. Pick one, mix two, or grab a pack.</span>
                  </button>
                  <button type="button" role="tab" aria-selected={custom} className={`build_mode${custom ? " is-on" : ""}`} onClick={() => setMode("custom")}>
                    <b>Build your own</b><span>Tick the parts you want. We put them together as one bot.</span>
                  </button>
                </div>

                {!custom ? (
                  <>
                    {group("erlc", "ER:LC bots")}
                    {group("discord", "Discord bots")}
                  </>
                ) : (
                  <>
                    <div className="build_custom-bar">
                      <div><b>Custom bot</b> <span className="build_muted">starts at {fmtUsd(CUSTOM_BASE)}, then add the parts below</span></div>
                      <div className="build_custom-count">{mods.length} {mods.length === 1 ? "part" : "parts"} picked{mods.length > 0 && <button type="button" onClick={() => setMods([])}>Clear</button>}</div>
                    </div>
                    {MODULE_GROUPS.map((gr) => (
                      <div className="build_group" key={gr.id}>
                        <div className="build_group-label"><span>{gr.label}</span></div>
                        <div className="build_mods">
                          {MODULES.filter((m) => m.group === gr.id).map((m) => {
                            const on = mods.includes(m.id);
                            return (
                              <button type="button" key={m.id} className={`build_mod${on ? " is-on" : ""}`} onClick={() => toggleMod(m.id)} aria-pressed={on}>
                                <i className="build_check" aria-hidden="true" />
                                <span className="build_mod-body"><b>{m.name}</b><small>{m.desc}</small></span>
                                <em>+{fmtUsd(m.price)}</em>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </section>

              <section className="build_step">
                <div className="build_step-head"><span className="build_num">2</span><h3>Bot identity</h3></div>
                <div className="build_uploads">
                  <label className="build_upload is-icon">
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setId({ ...id, icon: toUrl(e.target.files?.[0] ?? null) })} />
                    {id.icon ? <img src={id.icon} alt="" /> : <span>Upload icon</span>}
                  </label>
                  <label className="build_upload is-banner">
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setId({ ...id, banner: toUrl(e.target.files?.[0] ?? null) })} />
                    {id.banner ? <img src={id.banner} alt="" /> : <span>Upload banner</span>}
                  </label>
                </div>
                <div className="build_hint">PNG/JPG up to 4MB. Icon shows as the bot&apos;s avatar; banner appears at the top of the profile.</div>
                <label className="build_field">
                  <span>Name</span>
                  <input type="text" maxLength={32} placeholder="e.g. Oversite, .refined, The Six Roleplay" value={id.name} onChange={(e) => setId({ ...id, name: e.target.value })} />
                </label>
                <label className="build_field">
                  <span>Description</span>
                  <textarea rows={4} placeholder="Tell us about your bot: what it does, its personality, the vibe you're going for, and anything that makes it uniquely yours." value={id.about} onChange={(e) => setId({ ...id, about: e.target.value })} />
                </label>
                <label className="build_field">
                  <span>Discord bot status <em>(optional, max {STATUS_MAX} chars)</em></span>
                  <textarea rows={2} maxLength={STATUS_MAX} placeholder="The status shown under your bot's name, e.g. Watching over the server" value={id.status} onChange={(e) => setId({ ...id, status: e.target.value })} />
                  <small>{id.status.length}/{STATUS_MAX}</small>
                </label>
              </section>
            </div>

            <aside className="build_rail">
              <div className="build_profile">
                <div className="build_banner">{id.banner && <img src={id.banner} alt="" />}</div>
                <div className="build_avatar">{id.icon ? <img src={id.icon} alt="" /> : <Mark white />}</div>
                <div className="build_profile-body">
                  <div className="build_profile-name">{name} <span>APP</span></div>
                  <div className="build_profile-handle">{handle}#0001</div>
                  {id.status.trim() && <div className="build_status"><i aria-hidden="true" />{id.status}</div>}
                  <div className="build_addapp">+ Add App</div>
                  <div className="build_label">{custom ? "Parts" : "Roles"}</div>
                  <div className="build_roles">
                    {custom
                      ? (pickedMods.length ? pickedMods.map((m) => <span key={m.id}><i />{m.name}</span>) : <span className="is-empty"><i />Tick a part to add it</span>)
                      : (pickedBases.length ? pickedBases.map((b) => <span key={b.id}><i />{b.name}</span>) : <span className="is-empty"><i />Pick a bot to add a role</span>)}
                  </div>
                  <div className="build_message">Message @{name}</div>
                </div>
              </div>

              <div className="build_summary">
                <div className="build_summary-top">
                  <span>One-time payment</span>
                  <b>{fmtUsd(q.oneTime)}</b>
                </div>
                <div className="build_row"><span>Or with Robux</span><b>{q.oneTime > 0 ? fmtRobux(robux(q.oneTime)) : "R$ 0"}</b></div>
                {custom ? (
                  <>
                    <div className="build_row is-item"><span>Custom bot</span><b>{fmtUsd(CUSTOM_BASE)}</b></div>
                    <div className="build_row is-item"><span>{pickedMods.length} {pickedMods.length === 1 ? "part" : "parts"}</span><b>{fmtUsd(Math.round((q.oneTime - CUSTOM_BASE) * 100) / 100)}</b></div>
                  </>
                ) : q.items.map((i) => (
                  <div className="build_row is-item" key={i.base.id}>
                    <span>{i.base.name}{i.note ? <em> · {i.note}</em> : null}</span>
                    <b>{i.base.price > 0 ? fmtUsd(i.price) : "TBC"}</b>
                  </div>
                ))}
                {q.savings > 0 && <div className="build_row is-save"><span>Second-bot pricing</span><b>-{fmtUsd(q.savings)}</b></div>}

                <div className="build_hosting">
                  <div className="build_hosting-head"><i aria-hidden="true" />Managed hosting included</div>
                  {q.discordBots > 0 ? (
                    <>
                      <div className="build_hosting-price">+{fmtUsd(q.hostingMonthly)}/month</div>
                      <p>We host and keep your bot online 24/7. Buy a 3rd bot and its hosting is free: 1 bot $5/mo, 2 bots $10/mo, 3 bots still $10/mo.</p>
                    </>
                  ) : (
                    <p>{erlcOnly ? "These bots include free hosting, so there's no monthly charge." : "We host and keep your bot online 24/7. ER:LC bots are hosted free; Discord bots are $5/mo each."}</p>
                  )}
                </div>

                <a href={checkout} target="_blank" rel="noreferrer" className={`build_cta${hasPick ? "" : " is-off"}`} aria-disabled={!hasPick} onClick={(e) => { if (!hasPick) e.preventDefault(); }}>
                  Continue to payment <span aria-hidden="true">→</span>
                </a>
                <div className="build_fine">{custom ? "Custom builds are estimates. We confirm the final quote before any work begins." : "Final pricing depends on scope. We'll confirm everything before any work begins."}</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
