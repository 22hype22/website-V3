"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/config/site";
import { answer, type Msg } from "@/lib/assistant";

/* The help chat as an open scene: a teal haze over the page, the conversation floating in a single column, a
   glass pill toolbar for new chat / earlier chats, and a dark rounded dock holding quick topics and the composer.
   Fades and rises in, sinks and fades out. Opened from the FAQ's "Got something else?" button. */
const SUGGESTIONS = ["How do I invite my bot to my server?", "Can I pay with Robux?", "How do refunds work?", "What happens when I cancel?"];
const CHIPS: [string, string][] = [["Setup", "How fast can I get set up?"], ["Pricing", "How much does it cost?"], ["Robux", "Can I pay with Robux?"], ["Refunds", "How do refunds work?"], ["Talk to a person", "I want to talk to a person"]];
const EXIT_MS = 380;

type Chat = { id: number; title: string; messages: Msg[] };

export default function Assistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [showChats, setShowChats] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const chat = chats.find((c) => c.id === current) ?? null;

  const close = () => { if (closing) return; setClosing(true); setTimeout(() => { setClosing(false); onClose(); }, EXIT_MS); };

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("chat-open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    setTimeout(() => input.current?.focus({ preventScroll: true }), 400);
    return () => { document.documentElement.classList.remove("chat-open"); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => { stage.current?.scrollTo({ top: stage.current.scrollHeight, behavior: "smooth" }); }, [chat?.messages.length, typing]);

  const send = async (text: string) => {
    const q = text.trim(); if (!q || busy) return;
    setDraft(""); setShowChats(false);
    let id = current;
    let history: Msg[];
    if (id === null) {
      id = Date.now();
      const title = q.length > 42 ? q.slice(0, 40).trimEnd() + "…" : q;
      history = [{ role: "user", content: q }];
      setChats((cs) => [{ id: id as number, title, messages: history }, ...cs]);
      setCurrent(id);
    } else {
      history = [...(chat?.messages ?? []), { role: "user", content: q }];
      setChats((cs) => cs.map((c) => (c.id === id ? { ...c, messages: history } : c)));
    }
    setBusy(true);
    const reply = await answer(history);
    const words = reply.split(" ");
    let shown = "";
    for (let i = 0; i < words.length; i++) {
      shown += (i ? " " : "") + words[i];
      setTyping(shown);
      await new Promise((r) => setTimeout(r, 22 + Math.random() * 18));
    }
    setTyping("");
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, messages: [...c.messages, { role: "assistant", content: reply }] } : c)));
    setBusy(false);
    input.current?.focus({ preventScroll: true });
  };

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div className={`ast${closing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`${site.name} assistant`}>
      <img className="ast_photo" src="/assets/assistant-bg.webp" alt="" aria-hidden="true" />
      <div className="ast_haze" aria-hidden="true"><i /><i /><i /></div>

      <header className="ast_top">
        <button type="button" className="ast_round" aria-label="Close" onClick={close}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="ast_pillbar">
          <button type="button" className="ast_round is-white" aria-label="New chat" title="New chat" onClick={() => { setCurrent(null); setDraft(""); setShowChats(false); input.current?.focus({ preventScroll: true }); }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          </button>
          <button type="button" className={`ast_tool${showChats ? " is-on" : ""}`} aria-label="Earlier chats" title="Earlier chats" onClick={() => setShowChats((v) => !v)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h8M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </button>
          <span className="ast_who">{site.name}&apos;s assistant</span>
        </div>
      </header>

      <div className="ast_stage" ref={stage} data-lenis-prevent>
        <div className="ast_col">
          {showChats && (
            <div className="ast_history">
              {chats.length === 0 ? <span className="ast_muted">Chats you start show up here.</span> : chats.map((c) => (
                <button type="button" key={c.id} className={`ast_pill${c.id === current ? " is-on" : ""}`} onClick={() => { setCurrent(c.id); setShowChats(false); }}>{c.title}</button>
              ))}
            </div>
          )}
          {!chat ? (
            <>
              <h2 className="ast_title">What do you need<br />help with?</h2>
              <p className="ast_lead">Setup, billing, refunds, paying in Robux, or anything in the dashboard. Ask in your own words.</p>
              <div className="ast_questions">
                {SUGGESTIONS.map((s) => (
                  <button type="button" key={s} onClick={() => send(s)}>
                    <span>{s}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11l8-8M5 3h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="ast_thread">
              {chat.messages.map((m, i) => m.role === "user"
                ? <div className="ast_u" key={i}><span>{m.content}</span></div>
                : <p className="ast_a" key={i}>{m.content}</p>)}
              {busy && (typing ? <p className="ast_a">{typing}<i className="ast_caret" /></p> : <p className="ast_a ast_thinking"><i /><i /><i /></p>)}
            </div>
          )}
        </div>
      </div>

      <footer className="ast_dock">
        <div className="ast_chips">
          {CHIPS.map(([label, q]) => <button type="button" key={label} onClick={() => send(q)}>{label}</button>)}
        </div>
        <form className="ast_composer" onSubmit={(e) => { e.preventDefault(); send(draft); }}>
          <textarea ref={input} rows={1} placeholder="Tap here to ask…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }} />
          <button type="submit" className="ast_round is-white" aria-label="Send" disabled={!draft.trim() || busy}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </form>
        <p className="ast_note">Answers come from an AI, so check anything that matters. <a href={site.discordUrl} target="_blank" rel="noreferrer">Talk to a person</a> from the team, or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </footer>
    </div>,
    document.body,
  );
}
