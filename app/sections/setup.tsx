export function Setup() {
  return (
    <section className="lp-section" id="setup">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            راه‌اندازی
          </p>
          <h2 className="lp-h2">سه گام، یک بعدازظهر.</h2>
        </div>

        <ol className="lp-path">
          <span className="lp-path-line" aria-hidden="true">
            <i />
          </span>
          {SETUP.map((s) => (
            <li className="lp-path-step" key={s.n}>
              <span className="lp-path-n num" aria-hidden="true">
                {s.n}
              </span>
              <div>
                <h3 className="lp-h3">{s.t}</h3>
                <p>{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const SETUP = [
  {
    n: "۰۱",
    t: "شرکت را ثبت کنید",
    p: "با شمارهٔ موبایل خودتان حساب کارفرما می‌سازید و پلن مناسب تیم‌تان را انتخاب می‌کنید. هیچ قرارداد بلندمدتی لازم نیست.",
  },
  {
    n: "۰۲",
    t: "محل کار و کارکنان",
    p: "محدودهٔ مجاز را روی نقشه مشخص می‌کنید، شیفت‌ها را می‌سازید و کارکنان را با شمارهٔ موبایل اضافه می‌کنید.",
  },
  {
    n: "۰۳",
    t: "اپ را به تیم بدهید",
    p: "کارکنان با همان شماره وارد می‌شوند و از روز اول ثبت می‌کنند. گزارش از همان روز پر می‌شود.",
  },
];
