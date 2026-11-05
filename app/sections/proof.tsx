import { TESTIMONIALS, CLIENTS, STATS } from "@/lib/proof";

/// اگر هیچ داده‌ای در lib/proof.ts نباشد، چیزی رندر نمی‌شود.
export function Proof() {
  if (!TESTIMONIALS.length && !CLIENTS.length && !STATS.length) return null;

  return (
    <section className="lp-section" id="proof">
      <div className="lp-wrap">
        {STATS.length > 0 && (
          <dl className="lp-stats lp-reveal">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="num">{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {TESTIMONIALS.length > 0 && (
          <div className="lp-quotes lp-reveal">
            {TESTIMONIALS.map((t) => (
              <figure className="lp-quote" key={t.name + t.company}>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>
                    {t.role} · {t.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {CLIENTS.length > 0 && (
          <ul className="lp-clients lp-reveal" aria-label="مشتریان حضوریار">
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
