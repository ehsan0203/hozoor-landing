import { PhoneFrame } from "@/components/PhoneFrame";
import { REAL_SCREENS } from "@/lib/screens";
import { IconTick, IconCross, IconWifi } from "@/components/icons";

function StatusBar({ time = "۹:۴۱" }: { time?: string }) {
  return (
    <div className="lp-app-status" aria-hidden="true">
      <span className="num">{time}</span>
      <span className="lp-app-status-ico">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

function TabBar({ active }: { active: 0 | 1 | 2 | 3 }) {
  return (
    <div className="lp-app-tabs" aria-hidden="true">
      {["خانه", "گزارش", "مرخصی", "من"].map((t, i) => (
        <span key={t} className={i === active ? "is-on" : undefined}>
          <i />
          {t}
        </span>
      ))}
    </div>
  );
}

/// صفحهٔ ۱: ثبت ورود در حالت عادی (GPS سالم)
function PunchScreen() {
  return (
    <>
      <StatusBar />
      <div className="lp-app-top">
        <div>
          <small>سلام</small>
          <b>علی رضایی</b>
        </div>
        <span className="lp-app-avatar">ع</span>
      </div>

      <div className="lp-app-card">
        <div>
          <small>محل کار</small>
          <b>دفتر مرکزی</b>
        </div>
        <span className="lp-app-chip is-ok">
          <IconTick />
          در محدوده · ۲۴ متر
        </span>
      </div>

      <div className="lp-app-punch">
        <span className="lp-app-ping" />
        <span className="lp-app-ping" />
        <div className="lp-app-punch-btn">
          <b>ثبت ورود</b>
          <small className="num">۰۷:۵۸</small>
        </div>
      </div>

      <p className="lp-app-shift">شیفت امروز · ۰۸:۰۰ تا ۱۷:۰۰</p>
      <TabBar active={0} />
    </>
  );
}

/// صفحهٔ ۲: GPS قطع است و وای‌فای دفتر ورود را تأیید می‌کند (ویژگی شاخص)
function OutageScreen() {
  return (
    <div className="lp-app-outage">
      <StatusBar time="۸:۰۲" />
      <div className="lp-app-title">ثبت ورود</div>

      <div className="lp-app-banner lp-oa-banner">
        <IconCross />
        <span>
          <b>GPS در دسترس نیست</b>
          <small>سیگنال ماهواره‌ای دریافت نمی‌شود</small>
        </span>
      </div>

      <ul className="lp-app-steps">
        <li className="lp-oa-gps is-fail">
          <span className="lp-app-dot">
            <IconCross />
          </span>
          موقعیت مکانی
          <em>ناموفق</em>
        </li>
        <li className="lp-oa-wifi">
          <span className="lp-app-dot lp-oa-wifi-busy">
            <i />
          </span>
          <span className="lp-app-dot is-pass lp-oa-wifi-ok">
            <IconTick />
          </span>
          وای‌فای دفتر
          <em>شناسهٔ مودم</em>
        </li>
      </ul>

      <div className="lp-app-result lp-oa-result">
        <span className="lp-app-result-ico">
          <IconWifi />
        </span>
        <b>ورود ثبت شد</b>
        <small>
          <span className="num">۰۸:۰۲</span> · تأیید با وای‌فای
        </small>
      </div>
      <TabBar active={0} />
    </div>
  );
}

/// صفحهٔ ۳: کارنامهٔ هفته
function ReportScreen() {
  const days = [
    { d: "ش", h: 9.3, t: "۹:۱۶" },
    { d: "ی", h: 8.9, t: "۸:۵۱" },
    { d: "د", h: 9.1, t: "۹:۰۵" },
    { d: "س", h: 0, t: "—" },
    { d: "چ", h: 9.4, t: "۹:۲۴" },
  ];
  return (
    <>
      <StatusBar time="۱۷:۳۰" />
      <div className="lp-app-title">کارنامهٔ هفته</div>

      <div className="lp-app-total">
        <small>جمع کارکرد</small>
        <b className="num">۳۶:۳۶</b>
        <span className="lp-app-chip is-late">۰:۱۲ تأخیر</span>
      </div>

      <div className="lp-app-bars" aria-hidden="true">
        {days.map((x) => (
          <div key={x.d}>
            <i style={{ height: `${(x.h / 10) * 100}%` }} />
            <span>{x.d}</span>
          </div>
        ))}
      </div>

      <ul className="lp-app-list">
        {[
          ["شنبه", "۹:۱۶", "حاضر", "is-ok"],
          ["یکشنبه", "۸:۵۱", "تأخیر", "is-late"],
          ["سه‌شنبه", "—", "مرخصی", "is-off"],
        ].map(([day, t, s, tone]) => (
          <li key={day}>
            <b>{day}</b>
            <span className="num">{t}</span>
            <em className={tone}>{s}</em>
          </li>
        ))}
      </ul>
      <TabBar active={1} />
    </>
  );
}

const SCREENS = [
  { key: "punch" as const, title: "ثبت با یک لمس", text: "کارمند اپ را باز می‌کند و فاصلهٔ خودش تا محل کار را می‌بیند.", node: <PunchScreen />, alt: "نمونهٔ نمایشی صفحهٔ ثبت ورود اپ حضوریار" },
  { key: "outage" as const, title: "حتی وقتی GPS قطع است", text: "اپ خودکار سراغ وای‌فای دفتر می‌رود و ورود را ثبت می‌کند.", node: <OutageScreen />, alt: "نمونهٔ نمایشی ثبت ورود با وای‌فای هنگام قطعی GPS", featured: true },
  { key: "report" as const, title: "کارنامه، همان لحظه", text: "کارکرد، تأخیر و مرخصی هر روز، بدون هیچ حساب‌وکتابی.", node: <ReportScreen />, alt: "نمونهٔ نمایشی کارنامهٔ هفتگی اپ حضوریار" },
];

/// سه آیفون کنار هم؛ وسطی (قطعی GPS) ویژگی شاخص است. صفحه‌ها نمایشی‌اند و با REAL_SCREENS
/// (lib/screens.ts) با اسکرین‌شات واقعی عوض می‌شوند.
export function PhoneShowcase() {
  return (
    <section className="lp-section lp-phones-section" id="app">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">اپ حضوریار</p>
          <h2 className="lp-h2">همان چیزی که کارکنان روی گوشی می‌بینند.</h2>
          <p className="lp-lead">ساده برای کارمند، دقیق برای مدیر. اپ اندروید و نسخهٔ وب برای آیفون.</p>
        </div>

        <div className="lp-phones">
          {SCREENS.map((s) => (
            <figure className={`lp-phone-item${s.featured ? " is-featured" : ""}`} key={s.key}>
              <PhoneFrame image={REAL_SCREENS[s.key]} alt={s.alt}>
                {s.node}
              </PhoneFrame>
              <figcaption>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {!Object.keys(REAL_SCREENS).length && <p className="lp-note lp-phones-note">صفحه‌ها نمایشی‌اند.</p>}
      </div>
    </section>
  );
}
