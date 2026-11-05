"use client";

import { useEffect, useRef, useState } from "react";
import { planForTeam } from "@/lib/plans";
import { selectPlan } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { faDigits } from "@/lib/site";
import { tweenNumber } from "@/lib/motion";

const WORK_DAYS = 22;
const HOURS_PER_DAY = 8;
const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");

/// عددی که با تغییر اسلایدرها نرم به مقدار جدید می‌رسد.
function AnimNum({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const last = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fa(value);
    } else {
      tweenNumber(el, last.current, value, fa);
    }
    last.current = value;
  }, [value]);
  return (
    <b className="num" ref={ref}>
      {fa(value)}
    </b>
  );
}

/// ماشین‌حساب «ثبت نادقیق چقدر خرج دارد». عمداً فرض‌ها (دقیقهٔ اختلاف در روز) را خود کاربر
/// تنظیم می‌کند و نتیجه صریحاً «برآورد» نامیده می‌شود؛ عددی که کاربر خودش ساخته باور می‌شود.
export function RoiCalculator() {
  const [team, setTeam] = useState(8);
  const [salary, setSalary] = useState(15);
  const [minutes, setMinutes] = useState(10);
  const [touched, setTouched] = useState(false);

  const use = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    if (!touched) {
      setTouched(true);
      track("calc_use");
    }
  };

  const hourly = (salary * 1_000_000) / (WORK_DAYS * HOURS_PER_DAY);
  const monthlyLoss = team * (minutes / 60) * WORK_DAYS * hourly;
  const plan = planForTeam(team);
  const monthlyCost = plan ? plan.price / 12 : null;
  const ratio = monthlyCost ? monthlyLoss / monthlyCost : null;
  const barMax = Math.max(monthlyLoss, monthlyCost ?? 0, 1);
  const lossPct = Math.max(3, (monthlyLoss / barMax) * 100);
  const costPct = monthlyCost ? Math.max(3, (monthlyCost / barMax) * 100) : 0;

  return (
    <section className="lp-section" id="calculator">
      <div className="lp-wrap lp-grid">
        <div className="lp-roi-type lp-reveal">
          <p className="lp-label">
            صرفه‌جویی
          </p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            ثبت نادقیقِ ساعت کار، ماهی چقدر خرج دارد؟
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            تأخیرِ ثبت‌نشده، خروجِ زودهنگام و اضافه‌کاریِ اشتباه، هر روز چند دقیقه از حقوقِ
            پرداخت‌شده را بی‌کارکرد می‌کند. عددها را با تیم خودتان تنظیم کنید.
          </p>
          <p className="lp-note">این یک برآورد ساده است، نه تعهد؛ فرض‌ها را خودتان تغییر دهید.</p>
        </div>

        <div className="lp-roi lp-reveal">
          <div className="lp-roi-field">
            <label htmlFor="roi-team">
              تعداد کارکنان <b className="num">{faDigits(team)}</b>
            </label>
            <input
              id="roi-team"
              type="range"
              min={1}
              max={10}
              value={team}
              onChange={(e) => use(setTeam)(Number(e.target.value))}
            />
          </div>
          <div className="lp-roi-field">
            <label htmlFor="roi-salary">
              میانگین حقوق ماهانه <b className="num">{faDigits(salary)}</b> میلیون تومان
            </label>
            <input
              id="roi-salary"
              type="range"
              min={8}
              max={60}
              step={1}
              value={salary}
              onChange={(e) => use(setSalary)(Number(e.target.value))}
            />
          </div>
          <div className="lp-roi-field">
            <label htmlFor="roi-min">
              اختلافِ ثبت‌نشده در روز، برای هر نفر <b className="num">{faDigits(minutes)}</b> دقیقه
            </label>
            <input
              id="roi-min"
              type="range"
              min={2}
              max={45}
              step={1}
              value={minutes}
              onChange={(e) => use(setMinutes)(Number(e.target.value))}
            />
          </div>

          <div className="lp-roi-out" aria-live="polite">
            <div>
              <span>برآورد هزینهٔ ماهانهٔ اختلاف</span>
              <AnimNum value={monthlyLoss} />
              <small>تومان</small>
            </div>
            <div>
              <span>{plan ? `هزینهٔ ${plan.name} (ماهانه)` : "تیم بزرگ‌تر از ۱۰ نفر"}</span>
              {monthlyCost ? (
                <>
                  <AnimNum value={monthlyCost} />
                  <small>تومان</small>
                </>
              ) : (
                <b>تماس بگیرید</b>
              )}
            </div>
          </div>

          <div className="lp-roi-bars" aria-hidden="true">
            <div>
              <span>اختلاف ثبت‌نشده</span>
              <i className="is-loss" style={{ width: `${lossPct}%` }} />
            </div>
            {monthlyCost !== null && (
              <div>
                <span>هزینهٔ سامانه</span>
                <i className="is-cost" style={{ width: `${costPct}%` }} />
              </div>
            )}
          </div>

          {ratio !== null && ratio >= 1.5 && (
            <p className="lp-roi-verdict">
              با این فرض‌ها، اختلافِ ثبت‌نشده حدود <b className="num">{faDigits(ratio.toFixed(1))}</b>{" "}
              برابر هزینهٔ سامانه است.
            </p>
          )}

          <a
            href="#contact"
            className="lp-btn"
            onClick={() => {
              if (plan) selectPlan(plan.name);
              track("cta_click", { place: "calculator" });
            }}
          >
            {plan ? `مشاوره برای ${plan.name}` : "درخواست مشاوره"}
          </a>
        </div>
      </div>
    </section>
  );
}
