"use client";

import Link from "next/link";
import { useState } from "react";
import { PLANS, planForTeam } from "@/lib/plans";
import { selectPlan } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { faDigits } from "@/lib/site";

const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");

/// کمترین پلنی که هر نیاز را دارد (ایندکس در PLANS).
const NEEDS = [
  { key: "leave", label: "مرخصی و مأموریت با گردش تأیید", min: 1 },
  { key: "payroll", label: "حقوق و فیش ماهانهٔ خودکار", min: 2 },
  { key: "branch", label: "چند شعبه", min: 3 },
  { key: "penalty", label: "جریمهٔ پرسنل", min: 3 },
] as const;

/// انتخابگر پلن: تعداد کارمند + امکانات لازم ← پلن پیشنهادی. اگر ظرفیت پلنِ لازم کم باشد،
/// پلن بالاتر پیشنهاد می‌شود و دلیلش گفته می‌شود.
export function PlanPicker() {
  const [team, setTeam] = useState(4);
  const [needs, setNeeds] = useState<string[]>([]);

  const bySize = planForTeam(team);
  const sizeIdx = bySize ? PLANS.indexOf(bySize) : -1;
  const needIdx = Math.max(0, ...NEEDS.filter((n) => needs.includes(n.key)).map((n) => n.min));
  const tooBig = team > PLANS[PLANS.length - 1].seats;
  const idx = Math.max(sizeIdx, needIdx);
  const plan = tooBig ? null : PLANS[idx];

  const reason = tooBig
    ? "تیم شما از ظرفیت پلن‌های استاندارد بزرگ‌تر است؛ برای نیروی اضافه تماس بگیرید."
    : needIdx > sizeIdx
      ? `برای امکانات انتخابی‌تان حداقل «${PLANS[needIdx].name}» لازم است؛ ظرفیتش تا ${faDigits(PLANS[needIdx].seats)} کاربر است.`
      : `ظرفیت ${plan!.name} تا ${faDigits(plan!.seats)} کاربر است و همهٔ امکانات انتخابی‌تان را دارد.`;

  const toggle = (k: string) => setNeeds((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k]));

  return (
    <section className="lp-section" id="picker">
      <div className="lp-wrap lp-grid">
        <div className="lp-roi-type lp-reveal">
          <p className="lp-label">کدام پلن؟</p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            در ده ثانیه پلن مناسب تیم‌تان را پیدا کنید.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            تعداد کارکنان و امکاناتی را که لازم دارید مشخص کنید. پلن پیشنهادی همان لحظه نمایش داده می‌شود.
          </p>
        </div>

        <div className="lp-roi lp-picker lp-reveal">
          <div className="lp-roi-field">
            <label htmlFor="pick-team">
              تعداد کارکنان <b className="num">{faDigits(team)}</b>
              {team > 10 && " (بیش از ۱۰)"}
            </label>
            <input
              id="pick-team"
              type="range"
              min={1}
              max={12}
              value={team}
              onChange={(e) => setTeam(Number(e.target.value))}
            />
          </div>

          <fieldset className="lp-picker-needs">
            <legend>چه امکاناتی لازم دارید؟</legend>
            {NEEDS.map((n) => (
              <label key={n.key} className={needs.includes(n.key) ? "is-on" : undefined}>
                <input type="checkbox" checked={needs.includes(n.key)} onChange={() => toggle(n.key)} />
                <span>{n.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="lp-picker-out" aria-live="polite">
            {plan ? (
              <>
                <small>پلن پیشنهادی</small>
                <b>{plan.name}</b>
                <div className="lp-picker-price">
                  <span className="num">{fa(plan.price)}</span>
                  <small>تومان / سال · حدود {fa(plan.price / 12)} تومان در ماه</small>
                </div>
              </>
            ) : (
              <>
                <small>پلن پیشنهادی</small>
                <b>تماس بگیرید</b>
              </>
            )}
            <p>{reason}</p>
          </div>

          <Link
            href="#contact"
            className="lp-btn"
            onClick={() => {
              if (plan) selectPlan(plan.name);
              track("cta_click", { place: "picker" });
            }}
          >
            {plan ? `مشاوره برای ${plan.name}` : "درخواست مشاوره"}
          </Link>
        </div>
      </div>
    </section>
  );
}
