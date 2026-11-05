const ITEMS = [
  { t: "تعداد کارکنان", d: "تا پلن مناسب را دقیق‌تر پیشنهاد بدهیم (۲ تا ۱۰ نفر در پلن‌های استاندارد)." },
  { t: "تعداد محل‌های کار", d: "یک دفتر است یا چند شعبه؟ چندشعبه‌ای در پلن چهار است." },
  { t: "ساعت شیفت‌ها", d: "شیفت ثابت اداری، یا هر کارمند ساعت متفاوتی دارد؟" },
  { t: "امکانات مورد نیاز", d: "مرخصی و مأموریت، فیش حقوقی، جریمه، یا فقط ثبت تردد؟" },
  { t: "وضعیت GPS و اینترنت محل کار", d: "اگر GPS یا اینترنت آن‌جا ضعیف است بگویید تا مسیر وای‌فای را هم در نظر بگیریم." },
];

/// چه چیزی پیش از تماس آماده کنم؟ همه اختیاری است؛ فقط تماس را کوتاه‌تر می‌کند.
export function ContactChecklist() {
  return (
    <section className="lp-section">
      <div className="lp-wrap lp-grid">
        <div className="lp-roi-type lp-reveal">
          <p className="lp-label">اختیاری</p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            اگر خواستید، این‌ها را آماده کنید.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            هیچ‌کدام الزامی نیست. فقط تماس را کوتاه‌تر و پیشنهادِ پلن را دقیق‌تر می‌کند.
          </p>
        </div>
        <ul className="lp-check lp-reveal">
          {ITEMS.map((i) => (
            <li key={i.t}>
              <span aria-hidden="true" />
              <div>
                <b>{i.t}</b>
                <small>{i.d}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
