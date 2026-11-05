export function ReportSection() {
  return (
    <section className="lp-section" id="report">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            خروجی
          </p>
          <h2 className="lp-h2">آخر ماه چیزی برای محاسبه‌کردن نمی‌ماند.</h2>
          <p className="lp-lead">
            تأخیر، تعجیل در خروج و اضافه‌کاری روزبه‌روز بر پایهٔ شیفتِ همان کارمند و تعطیلات
            رسمی محاسبه می‌شود. مرخصی و مأموریتِ تأییدشده هم غیبت حساب نمی‌شود.
          </p>
        </div>

        <dl className="lp-rsum">
          {SUMMARY.map((s) => (
            <div key={s.label} className={s.tone}>
              <dt>{s.label}</dt>
              <dd className="num">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="lp-report lp-reveal">
          <table>
            <caption className="sr-only">نمونهٔ گزارش تفصیلی هفتگی یک کارمند</caption>
            <thead>
              <tr>
                <th scope="col">روز</th>
                <th scope="col">شیفت</th>
                <th scope="col">ورود</th>
                <th scope="col">خروج</th>
                <th scope="col">کارکرد</th>
                <th scope="col">
                  <span className="sr-only">نمودار کارکرد</span>
                </th>
                <th scope="col">تأخیر</th>
                <th scope="col">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {REPORT_ROWS.map((r) => (
                <tr key={r.day}>
                  <td>{r.day}</td>
                  <td>{r.shift}</td>
                  <td>{r.in}</td>
                  <td>{r.out}</td>
                  <td>{r.worked}</td>
                  <td className="lp-wbar-cell" aria-hidden="true">
                    <span className="lp-wbar">
                      <i style={{ width: `${(r.hours / 10) * 100}%` }} />
                    </span>
                  </td>
                  <td>{r.late}</td>
                  <td>
                    <span className={`lp-pill ${r.tone}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>جمع هفته</td>
                <td>۳۶:۳۶</td>
                <td />
                <td>۰:۱۲</td>
                <td>—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

/// جمع کارکرد = ۹:۱۶ + ۸:۵۱ + ۹:۰۵ + ۹:۲۴ = ۳۶:۳۶
const SUMMARY = [
  { label: "جمع کارکرد هفته", value: "۳۶:۳۶", tone: "" },
  { label: "روز حاضر", value: "۴ از ۵", tone: "is-ok" },
  { label: "جمع تأخیر", value: "۰:۱۲", tone: "is-late" },
  { label: "مرخصی", value: "۱ روز", tone: "" },
];

const REPORT_ROWS = [
  { day: "شنبه", shift: "۰۸–۱۷", in: "۰۷:۵۸", out: "۱۷:۱۴", worked: "۹:۱۶", hours: 9.27, late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
  { day: "یکشنبه", shift: "۰۸–۱۷", in: "۰۸:۱۲", out: "۱۷:۰۳", worked: "۸:۵۱", hours: 8.85, late: "۰:۱۲", status: "تأخیر", tone: "is-late" },
  { day: "دوشنبه", shift: "۰۸–۱۷", in: "۰۷:۵۵", out: "۱۷:۰۰", worked: "۹:۰۵", hours: 9.08, late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
  { day: "سه‌شنبه", shift: "۰۸–۱۷", in: "—", out: "—", worked: "۰:۰۰", hours: 0, late: "—", status: "مرخصی", tone: "is-off" },
  { day: "چهارشنبه", shift: "۰۸–۱۷", in: "۰۸:۰۲", out: "۱۷:۲۶", worked: "۹:۲۴", hours: 9.4, late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
];
