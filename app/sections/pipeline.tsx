import { IconTick, IconCross } from "@/components/icons";

type Out = { tone: "pass" | "fail" | "next"; text: string };

const STEPS: { n: string; title: string; text: string; outs: Out[] }[] = [
  {
    n: "۰۱",
    title: "کارمند دکمهٔ ثبت را می‌زند",
    text: "اپ همان لحظه مختصات تازه از GPS می‌گیرد.",
    outs: [],
  },
  {
    n: "۰۲",
    title: "مختصات تازه است؟",
    text: "مختصاتِ ذخیره‌شده از قبل هرگز جای موقعیت فعلی را نمی‌گیرد.",
    outs: [
      { tone: "fail", text: "کهنه‌تر از ۴۵ ثانیه: پذیرفته نمی‌شود" },
      { tone: "next", text: "تازه: به مرحلهٔ بعد" },
    ],
  },
  {
    n: "۰۳",
    title: "مکان در دسترس و در محدوده است؟",
    text: "فاصلهٔ کارمند تا محدودهٔ مجازِ همان محل کار اندازه گرفته می‌شود.",
    outs: [
      { tone: "pass", text: "در محدوده: ثبت با مکان" },
      { tone: "fail", text: "بیرون از محدوده: رد می‌شود و وای‌فای نمی‌تواند آن را بپوشاند" },
      { tone: "next", text: "مکان در دسترس نیست (GPS قطع): مرحلهٔ مودم" },
    ],
  },
  {
    n: "۰۴",
    title: "شناسهٔ مودم محل کار",
    text: "شناسهٔ سخت‌افزاری اکسس‌پوینت (BSSID) با مودمِ ثبت‌شدهٔ همان محل مقایسه می‌شود، نه نام شبکه.",
    outs: [
      { tone: "pass", text: "یکی است: ثبت با وای‌فای" },
      { tone: "fail", text: "یکی نیست: رد می‌شود" },
    ],
  },
  {
    n: "۰۵",
    title: "ثبت و برچسب‌گذاری",
    text: "تردد با زمان واقعی خودش ذخیره می‌شود؛ اگر اینترنت نبود، بعداً همگام می‌شود.",
    outs: [{ tone: "pass", text: "در گزارش می‌ماند: روش تأیید (مکان یا وای‌فای) و فاصلهٔ دقیق" }],
  },
];

export function Pipeline() {
  return (
    <section className="lp-section" id="pipeline">
      <div className="lp-wrap lp-grid">
        <div className="lp-pipe-type lp-reveal">
          <p className="lp-label">از لمس تا ثبت</p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            پشت صحنهٔ یک ورود، پنج مرحله است.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            مسیر دوم (وای‌فای) فقط وقتی باز می‌شود که مکانی در دست نباشد. به همین دلیل از مسیر اول سخت‌گیرتر
            است، نه سهل‌گیرتر.
          </p>
        </div>

        <ol className="lp-pipe">
          <span className="lp-pipe-line" aria-hidden="true">
            <i />
          </span>
          {STEPS.map((s) => (
            <li className="lp-pipe-step" key={s.n}>
              <span className="lp-pipe-n num" aria-hidden="true">
                {s.n}
              </span>
              <div className="lp-pipe-body">
                <h3 className="lp-h3">{s.title}</h3>
                <p>{s.text}</p>
                {s.outs.length > 0 && (
                  <ul className="lp-pipe-outs">
                    {s.outs.map((o) => (
                      <li key={o.text} className={`is-${o.tone}`}>
                        {o.tone === "pass" ? <IconTick /> : o.tone === "fail" ? <IconCross /> : <i aria-hidden="true" />}
                        {o.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
