import { IconTick, IconCross } from "@/components/icons";

type State = "pass" | "fail" | "idle";

interface Scenario {
  when: string;
  title: string;
  flag?: string;
  gps: { state: State; text: string };
  wifi: { state: State; text: string };
  result: { state: "pass" | "fail"; text: string };
}

/// قاعدهٔ اصلی محصول در یک نگاه: هر ورود یکی از این سه حالت است. به‌جای روایتِ اسکرولی،
/// سه کارت کنار هم؛ مشتری بدون اسکرول قفل‌شده و روی موبایل هم کل منطق را می‌بیند.
const SCENARIOS: Scenario[] = [
  {
    when: "در دفتر · GPS سالم",
    title: "ورود با مکان",
    gps: { state: "pass", text: "۲۴ متر تا دفتر" },
    wifi: { state: "idle", text: "لازم نشد" },
    result: { state: "pass", text: "ثبت شد" },
  },
  {
    when: "در دفتر · GPS قطع",
    title: "ورود با وای‌فای",
    flag: "جایی که بقیهٔ سامانه‌ها متوقف می‌شوند",
    gps: { state: "fail", text: "سیگنال در دسترس نیست" },
    wifi: { state: "pass", text: "مودم دفتر تأیید شد" },
    result: { state: "pass", text: "ثبت شد · با وای‌فای" },
  },
  {
    when: "بیرون از دفتر · مثلاً خانه",
    title: "ورود رد می‌شود",
    gps: { state: "fail", text: "۴٫۲ کیلومتر بیرون از محدوده" },
    wifi: { state: "idle", text: "بررسی نمی‌شود" },
    result: { state: "fail", text: "رد شد" },
  },
];

function Mark({ state }: { state: State }) {
  return (
    <span className={`lp-scn-mark is-${state}`} aria-hidden="true">
      {state === "pass" ? <IconTick /> : state === "fail" ? <IconCross /> : <i />}
    </span>
  );
}

export function Scenarios() {
  return (
    <section className="lp-section lp-scn-section" id="rule">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">قاعدهٔ ثبت تردد</p>
          <h2 className="lp-h2">هر ورود یکی از این سه حالت است.</h2>
          <p className="lp-lead">
            اول مکان سنجیده می‌شود. اگر GPS نبود، شناسهٔ مودم دفتر. و کارمندِ بیرون از دفتر را هیچ‌کدام راه
            نمی‌دهند.
          </p>
        </div>

        <div className="lp-scn-grid">
          {SCENARIOS.map((s) => (
            <article className={`lp-scn is-${s.result.state}${s.flag ? " has-flag" : ""}`} key={s.title}>
              {s.flag && <p className="lp-scn-flag">{s.flag}</p>}
              <p className="lp-scn-when">{s.when}</p>
              <h3 className="lp-h3">{s.title}</h3>

              <ul className="lp-scn-rows">
                <li>
                  <Mark state={s.gps.state} />
                  <span>
                    <b>موقعیت مکانی (GPS)</b>
                    <small className={`is-${s.gps.state}`}>{s.gps.text}</small>
                  </span>
                </li>
                <li>
                  <Mark state={s.wifi.state} />
                  <span>
                    <b>وای‌فای دفتر</b>
                    <small className={`is-${s.wifi.state}`}>{s.wifi.text}</small>
                  </span>
                </li>
              </ul>

              <p className={`lp-scn-result is-${s.result.state}`}>
                <Mark state={s.result.state} />
                {s.result.text}
              </p>
            </article>
          ))}
        </div>

        <p className="lp-note lp-reveal" style={{ marginTop: 20 }}>
          در گزارش هم می‌ماند که هر تردد با مکان تأیید شده یا با وای‌فای. بدون تماس با مدیر، بدون ثبت دستی.
        </p>
      </div>
    </section>
  );
}
