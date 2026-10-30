"use client";

import { useEffect, useRef } from "react";

/* The "drag" cursor that follows the pointer over the news cards. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => { el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`; };
    const over = (e: MouseEvent) => { el.style.opacity = (e.target as HTMLElement).closest(".custom-cursor-img") ? "1" : "0"; };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div className="custom-cursor" ref={ref}>
      <img src="/al/drag.svg" loading="lazy" alt="" className="cursor-icon" />
    </div>
  );
}
