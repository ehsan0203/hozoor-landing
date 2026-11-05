"use client";

import { IconTick, IconCross } from "@/components/icons";
import { PLANS, PLAN_MATRIX, inheritedFeatures } from "@/lib/plans";
import { selectPlan } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { formatPhone, faDigits } from "@/lib/site";
import { useSupportPhone } from "@/lib/site-hooks";

const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");

export function Pricing() {
  const phone = useSupportPhone();

  return (
    <section className="lp-section" id="pricing">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            تعرفه
          </p>
          <h2 className="lp-h2">هر پلن، همهٔ امکانات پلن قبل از خودش را هم دارد.</h2>
          <p className="lp-lead">
            چهار پلن سالانه بر اساس تعداد کاربر. با رشد تیم‌تان فقط پلن را ارتقا می‌دهید؛ چیزی از
            دست نمی‌رود و قرارداد بلندمدتی هم لازم نیست.
          </p>
        </div>

        <div className="lp-plans lp-reveal">
          {PLANS.map((p, i) => (
            <article className={`lp-plan${p.featured ? " is-main" : ""}`} key={p.id}>
              <div className="lp-plan-top">
                <h3 className="lp-h3">{p.name}</h3>
                {p.featured && <span className="lp-pill is-ok">پیشنهادی</span>}
              </div>
              <p className="lp-plan-price">
                <span className="num" data-count={p.price}>{fa(p.price)}</span>
                <small>تومان / سال · تا {faDigits(p.seats)} کاربر</small>
              </p>
              <p className="lp-plan-monthly">
                معادل <b className="num">{fa(p.price / 12)}</b> تومان در ماه
                <span>
                  هر کاربر ≈ <b className="num">{fa(p.price / 12 / p.seats)}</b> تومان
                </span>
              </p>
              <ul>
                {i > 0 && (
                  <li className="lp-plan-inherit">
                    <IconTick />
                    <span>همهٔ امکانات {PLANS[i - 1].name}</span>
                  </li>
                )}
                {p.adds.map((t) => (
                  <li key={t}>
                    <IconTick />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`lp-btn${p.featured ? "" : " lp-btn-line"}`}
                style={{ width: "100%" }}
                onClick={() => {
                  selectPlan(p.name);
                  track("plan_select", { plan: p.name });
                }}
              >
                مشاوره برای {p.name}
              </a>
            </article>
          ))}
        </div>

        <details className="lp-compare-plans lp-reveal">
          <summary>مقایسهٔ کامل پلن‌ها</summary>
          <div className="lp-table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">امکان</th>
                  {PLANS.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_MATRIX.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {PLANS.map((p, i) => (
                      <td key={p.id}>
                        {i >= row.from ? (
                          <span className="lp-yes" aria-label="دارد">
                            <IconTick />
                          </span>
                        ) : (
                          <span className="lp-no" aria-label="ندارد">
                            <IconCross />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">حداکثر کاربر</th>
                  {PLANS.map((p) => (
                    <td key={p.id} className="num">
                      {faDigits(p.seats)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </details>

        <p className="lp-note" style={{ marginTop: 20 }}>
          نیاز به ظرفیت بیشتر دارید؟ روی هر پلنی می‌شود نیروی اضافه خرید و پلن چهار امکان افزودن
          شعبهٔ اضافه هم دارد. برای مشاوره تماس بگیرید:{" "}
          <a
            href={`tel:${phone}`}
            className="num"
            onClick={() => track("call_click", { place: "pricing" })}
          >
            {formatPhone(phone)}
          </a>
        </p>
      </div>
    </section>
  );
}
