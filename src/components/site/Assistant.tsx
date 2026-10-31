"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/config/site";
import { answer, type Msg } from "@/lib/assistant";

/* The help chat: a dark, full-window conversation with Oversite's assistant. A rail of chats on the left, a welcome
   prompt with suggested questions, the thread, and a composer. Opened from the FAQ's "Got something else?" button. */
const SUGGESTIONS = ["How do I invite my bot to my server?", "Can I pay with Robux?", "How do refunds work?", "What happens when I cancel?"];

type Chat = { id: number; title: string; messages: Msg[] };

export default function Assistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState("");
  const thread = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const chat = chats.find((c) => c.id === current) ?? null;

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("chat-open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    setTimeout(() => input.current?.focus(), 50);
    return () => { document.documentElement.classList.remove("chat-open"); window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  useEffect(() => { thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: "smooth" }); }, [chat?.messages.length, typing]);

  const send = async (text: string) => {
    const q = text.trim(); if (!q || busy) return;
    setDraft("");
    let id = current;
    let history: Msg[] = [];
    if (id === null) {
      id = Date.now();
      const title = q.length > 42 ? q.slice(0, 40).trimEnd() + "…" : q;
      setChats((cs) => [{ id: id as number, title, messages: [{ role: "user", content: q }] }, ...cs]);
      setCurrent(id);
      history = [{ role: "user", content: q }];
    } else {
      history = [...(chat?.messages ?? []), { role: "user", content: q }];
      setChats((cs) => cs.map((c) => (c.id === id ? { ...c, messages: history } : c)));
    }
    setBusy(true);
    const reply = await answer(history);
    // stream the reply in, a few words at a time
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
    input.current?.focus();
  };

  if (!open || typeof document === "undefined") return null;
  // rendered on <body>: the page wrapper paints in a contained layer, so a fixed overlay inside it would be clipped
  return createPortal(
    <div className="ast" role="dialog" aria-modal="true" aria-label={`${site.name} assistant`} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ast_window">
        <aside className="ast_rail">
          <button type="button" className="ast_new" onClick={() => { setCurrent(null); setDraft(""); input.current?.focus(); }}><span>New chat</span><span className="ast_plus">+</span></button>
          <div className="ast_chats">
            {chats.length === 0 && <div className="ast_hint">Chats you start show up here.</div>}
            {chats.map((c) => (
              <button type="button" key={c.id} className={`ast_chat${c.id === current ? " is-current" : ""}`} onClick={() => setCurrent(c.id)}>{c.title}</button>
            ))}
          </div>
        </aside>

        <section className="ast_main">
          <header className="ast_head">
            <div><strong>{chat ? chat.title : "New chat"}</strong><span>Answered by {site.name}&apos;s assistant</span></div>
            <button type="button" className="ast_close" aria-label="Close" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </header>

          <div className="ast_thread" ref={thread} data-lenis-prevent>
            {!chat ? (
              <div className="ast_welcome">
                <h3>What do you need help with?</h3>
                <p>Setup, billing, refunds, paying in Robux, or anything in the dashboard. Ask in your own words.</p>
                <div className="ast_suggest">
                  {SUGGESTIONS.map((s) => (
                    <button type="button" key={s} onClick={() => send(s)}>
                      <span>{s}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="ast_messages">
                {chat.messages.map((m, i) => (
                  <div className={`ast_msg is-${m.role}`} key={i}>
                    {m.role === "assistant" && <img src="/assets/oversite-mark-white.png" alt="" className="ast_avatar" />}
                    <div className="ast_bubble">{m.content}</div>
                  </div>
                ))}
                {busy && (
                  <div className="ast_msg is-assistant">
                    <img src="/assets/oversite-mark-white.png" alt="" className="ast_avatar" />
                    <div className="ast_bubble">{typing || <span className="ast_dots"><i /><i /><i /></span>}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <footer className="ast_foot">
            <form className="ast_composer" onSubmit={(e) => { e.preventDefault(); send(draft); }}>
              <textarea ref={input} rows={1} placeholder="Ask a question" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }} />
              <button type="submit" className="ast_send" aria-label="Send" disabled={!draft.trim() || busy}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </form>
            <p className="ast_note">Answers come from an AI, so check anything that matters. <a href={site.discordUrl} target="_blank" rel="noreferrer">Talk to a person</a> from the team here, or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </footer>
        </section>
      </div>
    </div>,
    document.body,
  );
}
