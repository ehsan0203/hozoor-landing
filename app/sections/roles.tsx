const ROLES = [
  {
    who: "کارمند",
    what: "ثبت بی‌دردسر",
    items: [
      "ثبت ورود و خروج با موبایل شخصی خودش",
      "دیدن فاصلهٔ خودش تا محدودهٔ مجاز",
      "درخواست مرخصی و مأموریت از موبایل",
      "ورود به اپ با اثر انگشت گوشی",
    ],
  },
  {
    who: "مدیر",
    what: "کنترل بدون زنگ‌زدن",
    items: [
      "وضعیت لحظه‌ای کارکنان: حاضر، تأخیر، مرخصی",
      "تأیید یا رد درخواست‌های مرخصی و مأموریت",
      "روش تأیید هر تردد (مکان یا وای‌فای)",
      "گزارش کارکرد، تأخیر و اضافه‌کاری",
    ],
  },
  {
    who: "کارفرما",
    what: "تنظیم یک‌بار، اجرای خودکار",
    items: [
      "ساخت شرکت، محل‌ها و محدودهٔ مجاز",
      "تعریف شیفت و تعطیلات رسمی و داخلی",
      "حقوق، نرخ‌ها، فیش ماهانه و جریمه",
      "انتخاب و ارتقای پلن متناسب با تیم",
    ],
  },
];

export function Roles() {
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">سه نقش</p>
          <h2 className="lp-h2">هر نفر فقط چیزی را می‌بیند که لازم دارد.</h2>
        </div>
        <div className="lp-roles">
          {ROLES.map((r) => (
            <article className="lp-role" key={r.who}>
              <p className="lp-role-who">{r.who}</p>
              <h3 className="lp-h3">{r.what}</h3>
              <ul>
                {r.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
