"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FAQ, FAQ_GROUPS, type FaqGroup } from "@/lib/faq";
import { FaqRow } from "./faq";

/// یکسان‌سازی «ي/ك» عربی و فاصله‌های نیم‌فاصله برای جستجوی فارسی.
const norm = (s: string) => s.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/‌/g, " ").toLowerCase();

/// صفحهٔ پرسش‌ها: فیلتر موضوعی و جستجوی زنده روی همهٔ پرسش‌ها.
export function FaqExplorer() {
  const [group, setGroup] = useState<FaqGroup | "all">("all");
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const q = norm(query.trim());
    return FAQ.filter((f) => (group === "all" || f.g === group) && (!q || norm(f.q + " " + f.a).includes(q)));
  }, [group, query]);

  // فهرست با هر فیلتر نرم دوباره وارد می‌شود
  useEffect(() => {
    const el = listRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = el.querySelectorAll("details");
    const t = gsap.fromTo(rows, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.035, clearProps: "transform,opacity" });
    return () => void t.kill();
  }, [group, query]);

  const countOf = (g: FaqGroup) => FAQ.filter((f) => f.g === g).length;

  return (
    <section className="lp-section" id="faq">
      <div className="lp-wrap">
        <div className="lp-faq-tools lp-reveal">
          <div className="lp-faq-chips" role="group" aria-label="موضوع پرسش‌ها">
            <button type="button" className={`lp-tag${group === "all" ? " is-on" : ""}`} onClick={() => setGroup("all")}>
              همه <span className="num">{FAQ.length.toLocaleString("fa-IR")}</span>
            </button>
            {FAQ_GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                className={`lp-tag${group === g.key ? " is-on" : ""}`}
                onClick={() => setGroup(g.key)}
              >
                {g.label} <span className="num">{countOf(g.key).toLocaleString("fa-IR")}</span>
              </button>
            ))}
          </div>
          <label className="lp-faq-search">
            <span className="sr-only">جستجو در پرسش‌ها</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو؛ مثلاً «آیفون» یا «فیش»"
            />
          </label>
        </div>

        <div className="lp-faq" ref={listRef} aria-live="polite">
          {items.map((f) => (
            <FaqRow key={f.q} f={f} />
          ))}
          {!items.length && <p className="lp-note" style={{ padding: "var(--s3) 0" }}>پرسشی با این جستجو پیدا نشد. فرم یا شمارهٔ تماس پایین صفحه را امتحان کنید.</p>}
        </div>
      </div>
    </section>
  );
}
