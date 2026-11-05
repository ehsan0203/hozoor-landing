import { PLANS } from "@/lib/plans";

const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");

/// هزینهٔ ماهانهٔ هر کاربر در هر پلن (قیمت سالانه ÷ ۱۲ ÷ ظرفیت). همه از دادهٔ خودِ تعرفه محاسبه می‌شود.
export function PerSeat() {
  const rows = PLANS.map((p) => ({ p, v: p.price / 12 / p.seats }));
  const max = Math.max(...rows.map((r) => r.v));
  const best = rows.reduce((a, b) => (b.v < a.v ? b : a));

  return (
    <section className="lp-section">
      <div className="lp-wrap lp-grid">
        <div className="lp-roi-type lp-reveal">
          <p className="lp-label">قیمت هر کاربر</p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            هر کاربر در ماه چقدر خرج دارد؟
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            قیمت سالانهٔ هر پلن را بر ماه‌ها و ظرفیت کاربرش تقسیم کرده‌ایم. اگر ظرفیت پلن را کامل پر
            کنید، <b>{best.p.name}</b> کمترین هزینه برای هر نفر را دارد.
          </p>
          <p className="lp-note">عددها برآورد محاسباتی از روی تعرفهٔ همین صفحه‌اند.</p>
        </div>

        <div className="lp-seatbars lp-reveal" role="list">
          {rows.map(({ p, v }) => (
            <div className={`lp-seatbar${p.id === best.p.id ? " is-best" : ""}`} role="listitem" key={p.id}>
              <div className="lp-seatbar-head">
                <b>{p.name}</b>
                <span>تا {p.seats.toLocaleString("fa-IR")} کاربر</span>
              </div>
              <div className="lp-seatbar-track">
                <i style={{ width: `${(v / max) * 100}%` }} />
              </div>
              <div className="lp-seatbar-val">
                <b className="num">{fa(v)}</b>
                <small>تومان / کاربر / ماه</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
