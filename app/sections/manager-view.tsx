import { IconTick, IconWifi } from "@/components/icons";

const ROWS = [
  { name: "علی رضایی", place: "دفتر مرکزی", time: "۰۷:۵۸", via: "gps", status: "حاضر", tone: "is-ok" },
  { name: "سارا محمدی", place: "دفتر مرکزی", time: "۰۸:۱۲", via: "gps", status: "تأخیر ۱۲ دقیقه", tone: "is-late" },
  { name: "رضا کریمی", place: "انبار", time: "۰۸:۰۲", via: "wifi", status: "حاضر · وای‌فای", tone: "is-ok" },
  { name: "مریم احمدی", place: "—", time: "—", via: "none", status: "مرخصی", tone: "is-off" },
];

/// «مدیر چه می‌بیند؟» — نمونهٔ نمایشی وضعیت امروز، چون خریدار پیش از خرید می‌خواهد
/// خروجیِ پنل را ببیند. نام‌ها و ساعت‌ها ساختگی‌اند و صریحاً «نمونه» برچسب خورده‌اند.
export function ManagerView() {
  return (
    <section className="lp-section" id="manager">
      <div className="lp-wrap lp-grid">
        <div className="lp-mgr-type lp-reveal">
          <p className="lp-label">
            پنل مدیر
          </p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            بدون زنگ‌زدن، می‌دانید امروز چه کسی کجاست.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            وضعیت لحظه‌ای کارکنان، تأخیرها، مرخصی‌ها و روش تأیید هر تردد در یک صفحه. هر عدد
            قابل رد گرفتن تا تردد اصلی است.
          </p>
          <ul className="lp-mgr-points">
            <li>
              <IconTick />
              فاصلهٔ دقیق هر تردد تا محل کار ثبت می‌ماند
            </li>
            <li>
              <IconTick />
              ترددهای تأییدشده با وای‌فای جدا مشخص‌اند
            </li>
            <li>
              <IconTick />
              مرخصی و مأموریت تأییدشده غیبت حساب نمی‌شود
            </li>
          </ul>
        </div>

        <figure
          className="lp-mgr lp-reveal"
          role="img"
          aria-label="نمونهٔ نمایشی پنل مدیر: ۱۶ نفر حاضر، ۲ نفر با تأخیر، ۱ نفر در مرخصی، ۱ نفر هنوز ثبت نکرده."
        >
          <div className="lp-mgr-head">
            <b className="lp-mgr-title">
              وضعیت امروز
              <span className="lp-live">
                <i />
                زنده
              </span>
            </b>
            <span className="lp-mgr-sample">نمونهٔ نمایشی</span>
          </div>
          <div className="lp-mgr-counts">
            <div>
              <b className="num is-ok" data-count="16">۱۶</b>
              <span>حاضر</span>
            </div>
            <div>
              <b className="num is-late" data-count="2">۲</b>
              <span>تأخیر</span>
            </div>
            <div>
              <b className="num" data-count="1">۱</b>
              <span>مرخصی</span>
            </div>
            <div>
              <b className="num is-miss" data-count="1">۱</b>
              <span>ثبت نکرده</span>
            </div>
          </div>
          <ul className="lp-mgr-list" aria-hidden="true">
            {ROWS.map((r) => (
              <li key={r.name}>
                <span className="lp-mgr-who">
                  <b>{r.name}</b>
                  <small>{r.place}</small>
                </span>
                <time className="num">{r.time}</time>
                <span className={`lp-pill ${r.tone}`}>
                  {r.via === "wifi" && <IconWifi />}
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="lp-mgr-toast" aria-hidden="true">
            <span className="lp-mgr-toast-ico">
              <IconTick />
            </span>
            <span>
              <b>ورود جدید · کاوه نوری</b>
              <small>۰۸:۱۴ · تأیید با مکان · ۱۸ متر</small>
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
