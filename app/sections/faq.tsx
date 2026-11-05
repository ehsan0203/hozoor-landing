"use client";

import Link from "next/link";
import { FAQ, type FaqItem } from "@/lib/faq";
import { track } from "@/lib/analytics";
import { IconPhone } from "@/components/icons";
import { formatPhone } from "@/lib/site";
import { useSupportPhone } from "@/lib/site-hooks";

export function FaqRow({ f }: { f: FaqItem }) {
  return (
    <details onToggle={(e) => e.currentTarget.open && track("faq_open", { q: f.q })}>
      <summary>
        {f.q}
        <span className="lp-plus" aria-hidden="true" />
      </summary>
      <p className="lp-faq-body">{f.a}</p>
    </details>
  );
}

/// صفحهٔ معرفی: شش پرسش اول + پیوند به همهٔ پرسش‌ها.
export function Faq({ limit, moreHref }: { limit?: number; moreHref?: string }) {
  const phone = useSupportPhone();
  const items = limit ? FAQ.slice(0, limit) : FAQ;

  return (
    <section className="lp-section" id="faq">
      <div className="lp-wrap lp-faq-layout">
        <aside className="lp-faq-aside lp-reveal">
          <p className="lp-label">پرسش‌ها</p>
          <h2 className="lp-h2">آنچه معمولاً می‌پرسند.</h2>

          <div className="lp-faq-help">
            <b>سؤال دیگری دارید؟</b>
            <p>اگر پاسخ سؤالتان این‌جا نیست، مستقیم با ما صحبت کنید.</p>
            <a
              href={`tel:${phone}`}
              className="lp-btn lp-btn-line"
              onClick={() => track("call_click", { place: "faq" })}
            >
              <IconPhone />
              <span className="num">{formatPhone(phone)}</span>
            </a>
          </div>
        </aside>

        <div>
          <div className="lp-faq lp-reveal">
            {items.map((f) => (
              <FaqRow key={f.q} f={f} />
            ))}
          </div>
          {moreHref && (
            <div className="lp-more lp-reveal" style={{ justifyContent: "flex-start" }}>
              <Link href={moreHref} className="lp-btn lp-btn-line">
                همهٔ {FAQ.length.toLocaleString("fa-IR")} پرسش
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/// فهرست کوچک و موضوعی برای صفحه‌های دیگر (تعرفه، تماس).
export function MiniFaq({ label, title, questions }: { label: string; title: string; questions: string[] }) {
  const items = questions.map((q) => FAQ.find((f) => f.q === q)).filter(Boolean) as FaqItem[];
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">{label}</p>
          <h2 className="lp-h2">{title}</h2>
        </div>
        <div className="lp-faq lp-reveal">
          {items.map((f) => (
            <FaqRow key={f.q} f={f} />
          ))}
        </div>
        <div className="lp-more lp-reveal" style={{ justifyContent: "flex-start" }}>
          <Link href="/faq/" className="lp-btn lp-btn-line">
            همهٔ پرسش‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}
