const STEPS = [
  { n: "۰۱", t: "تماس نماینده", p: "پس از ارسال نام و شماره، نمایندهٔ ما با شما تماس می‌گیرد." },
  { n: "۰۲", t: "دیدن سامانه و انتخاب پلن", p: "سامانه را برایتان نشان می‌دهد و پلن مناسب اندازهٔ تیم‌تان را با شما انتخاب می‌کند." },
  { n: "۰۳", t: "تحویل حساب شرکت", p: "حساب شرکت را می‌سازد و نام کاربری و رمز ورود را تحویلتان می‌دهد." },
];

/// پس از ارسال فرم چه می‌شود؛ همان قالب مسیر سه‌گامهٔ راه‌اندازی.
export function ContactSteps() {
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">پس از ارسال فرم</p>
          <h2 className="lp-h2">سه گام تا اولین تردد.</h2>
        </div>
        <ol className="lp-path">
          <span className="lp-path-line" aria-hidden="true">
            <i />
          </span>
          {STEPS.map((s) => (
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
