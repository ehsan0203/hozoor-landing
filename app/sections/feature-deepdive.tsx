import { IconTick, IconCross, IconWifi } from "@/components/icons";

/// پنج بلوکِ توضیحِ عمیق، هر کدام با یک ویژوال کوچک. فقط ادعاهایی که در خودِ محصول هست.
/// `plan` نشان می‌دهد امکان از کدام پلن شروع می‌شود.

function VerifyVisual() {
  const rows = [
    { ico: <IconTick />, t: "موقعیت مکانی", s: "۲۴ متر تا دفتر", st: "pass" },
    { ico: <IconCross />, t: "مختصات قدیمی‌تر از ۴۵ ثانیه", s: "پذیرفته نمی‌شود", st: "fail" },
    { ico: <IconWifi />, t: "شناسهٔ مودم (اگر GPS نبود)", s: "C4:6E:1F:3A:9B:02", st: "mid" },
    { ico: <IconTick />, t: "سلفی (اگر اجباری باشد)", s: "۴۵ روز نگه‌داری", st: "pass" },
  ];
  return (
    <div className="lp-dd-card">
      <p className="lp-dd-cap">لایه‌های راستی‌آزمایی یک تردد</p>
      <ul className="lp-dd-rows">
        {rows.map((r) => (
          <li key={r.t} className={`is-${r.st}`}>
            <span className="lp-dd-ico">{r.ico}</span>
            <span>
              <b>{r.t}</b>
              <small dir={r.st === "mid" ? "ltr" : undefined}>{r.s}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShiftVisual() {
  const days = [
    { d: "ش", s: "۰۸–۱۷" },
    { d: "ی", s: "۰۸–۱۷" },
    { d: "د", s: "۰۸–۱۷" },
    { d: "س", s: "۰۸–۱۷" },
    { d: "چ", s: "۰۸–۱۷" },
    { d: "پ", s: "۰۸–۱۳" },
    { d: "ج", s: "تعطیل", off: true },
  ];
  return (
    <div className="lp-dd-card">
      <p className="lp-dd-cap">شیفت هفتگیِ یک کارمند (نمونه)</p>
      <div className="lp-dd-week">
        {days.map((x) => (
          <div key={x.d} className={x.off ? "is-off" : undefined}>
            <small>{x.d}</small>
            <i />
            <b className="num">{x.s}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestVisual() {
  const steps = [
    { t: "درخواست از موبایل", s: "مرخصی ۱ روزه · سه‌شنبه", st: "done" },
    { t: "تأیید مدیر", s: "تأیید شد", st: "done" },
    { t: "در کارنامه", s: "غیبت حساب نمی‌شود", st: "pass" },
  ];
  return (
    <div className="lp-dd-card">
      <p className="lp-dd-cap">مسیر یک درخواست مرخصی</p>
      <ol className="lp-dd-steps">
        {steps.map((x, i) => (
          <li key={x.t} className={`is-${x.st}`}>
            <span className="lp-dd-n num">{(i + 1).toLocaleString("fa-IR")}</span>
            <span>
              <b>{x.t}</b>
              <small>{x.s}</small>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PayVisual() {
  const parts = [
    { l: "حقوق پایه", v: "۱۵٬۰۰۰٬۰۰۰", op: "" },
    { l: "اضافه‌کاری", v: "۸۴۰٬۰۰۰", op: "+" },
    { l: "تأخیر", v: "۱۲۰٬۰۰۰", op: "−" },
    { l: "جریمه", v: "۲۰۰٬۰۰۰", op: "−" },
  ];
  return (
    <div className="lp-dd-card">
      <p className="lp-dd-cap">ساختِ فیش ماهانه (نمونهٔ نمایشی)</p>
      <div className="lp-dd-formula">
        {parts.map((p) => (
          <div key={p.l}>
            <small>{p.l}</small>
            <b className="num">
              {p.op} {p.v}
            </b>
          </div>
        ))}
        <div className="is-net">
          <small>خالص پرداختی</small>
          <b className="num">۱۵٬۵۲۰٬۰۰۰</b>
        </div>
      </div>
    </div>
  );
}

function BranchVisual() {
  const branches = [
    { n: "دفتر مرکزی", w: "شبکهٔ دفتر", u: "۶ نفر" },
    { n: "انبار", w: "شبکهٔ انبار", u: "۳ نفر" },
    { n: "شعبهٔ ۲", w: "شبکهٔ شعبه", u: "۱ نفر" },
  ];
  return (
    <div className="lp-dd-card">
      <p className="lp-dd-cap">شعبه‌ها، هرکدام با قواعد خودش (نمونه)</p>
      <div className="lp-dd-branches">
        {branches.map((b) => (
          <div key={b.n}>
            <b>{b.n}</b>
            <small>محدودهٔ جدا · {b.w}</small>
            <em>{b.u}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

const BLOCKS = [
  {
    id: "dd-verify",
    plan: "از پایه یک",
    title: "ثبت تردد با راستی‌آزمایی چندلایه",
    lead: "ثبت تردد فقط یک دکمه نیست؛ هر ورود از چند فیلتر رد می‌شود و نتیجه‌اش در گزارش می‌ماند.",
    points: [
      "محدودهٔ مجاز هر محل کار را با یک نقطه و یک شعاع روی نقشه می‌کشید.",
      "مختصات کهنه‌تر از ۴۵ ثانیه پذیرفته نمی‌شود.",
      "وقتی GPS نبود، شناسهٔ سخت‌افزاری مودم (BSSID) بررسی می‌شود؛ نه نام شبکه.",
      "برای محل‌های حساس، سلفی زنده را اجباری می‌کنید (۴۵ روز نگه‌داری).",
      "قطعی اینترنت مانع ثبت نیست؛ تردد با زمان واقعی خودش بعداً همگام می‌شود.",
    ],
    visual: <VerifyVisual />,
  },
  {
    id: "dd-shift",
    plan: "از پایه یک",
    title: "شیفت و تعطیلات، برای هر کارمند جدا",
    lead: "تأخیر و اضافه‌کاری وقتی معنا دارد که معلوم باشد «سرِ ساعت» برای هر نفر چه ساعتی است.",
    points: [
      "شیفت هفتگیِ هر کارمند را جداگانه تعریف می‌کنید.",
      "تعطیلات رسمی و تعطیلات داخلی شرکت لحاظ می‌شود.",
      "تأخیر، تعجیل در خروج و اضافه‌کاری روزبه‌روز بر پایهٔ شیفتِ همان کارمند حساب می‌شود.",
      "در گزارش تفصیلی هر کارمند، روش تأیید هر تردد (مکان یا وای‌فای) هم دیده می‌شود.",
    ],
    visual: <ShiftVisual />,
  },
  {
    id: "dd-leave",
    plan: "از پایه دو",
    title: "مرخصی و مأموریت با گردش تأیید",
    lead: "دیگر نیازی به پیام‌های پراکنده نیست؛ درخواست، تأیید و اثرش در کارنامه یک‌جاست.",
    points: [
      "کارمند از موبایل درخواست مرخصی یا مأموریت می‌دهد.",
      "مدیر تأیید یا رد می‌کند.",
      "روزهای پوشش‌داده‌شدهٔ تأییدشده غیبت حساب نمی‌شوند.",
    ],
    visual: <RequestVisual />,
  },
  {
    id: "dd-pay",
    plan: "از پایه سه",
    title: "حقوق و جریمه، از روی تردد واقعی",
    lead: "آخر ماه به‌جای جمع‌زدن دستی، فیش را از روی همان ترددی می‌گیرید که ثبت شده است.",
    points: [
      "حقوق پایه، نرخ تأخیر و اضافه‌کاری هر کارمند را یک‌بار تعریف می‌کنید.",
      "فیش ماهانه خودکار ساخته می‌شود و پیش از نهایی‌شدن قابل ویرایش است.",
      "با کاتالوگ جریمه، رخدادها را برای هر کارمند ثبت می‌کنید و در فیش همان ماه کسر می‌شود (پلن چهار).",
    ],
    visual: <PayVisual />,
  },
  {
    id: "dd-branch",
    plan: "پایه چهار",
    title: "چند شعبه، یک حساب",
    lead: "هر شعبه قواعد خودش را دارد، ولی مدیریت همه از یک‌جاست.",
    points: [
      "هر شعبه محدوده و وای‌فای خودش را دارد.",
      "کارکنان به یکی از شعبه‌ها تخصیص می‌یابند.",
      "در پلن چهار می‌شود شعبهٔ اضافه هم خرید.",
    ],
    visual: <BranchVisual />,
  },
];

export function FeatureDeepDive() {
  return (
    <section className="lp-section lp-dd-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">در عمل</p>
          <h2 className="lp-h2">هر امکان، دقیقاً چه کاری می‌کند.</h2>
          <p className="lp-lead">پنج حوزهٔ اصلی سامانه، با جزئیاتی که پیش از خرید می‌خواهید بدانید.</p>
        </div>

        <div className="lp-dd-list">
          {BLOCKS.map((b, i) => (
            <article className={`lp-dd${i % 2 ? " is-flip" : ""}`} id={b.id} key={b.id}>
              <div className="lp-dd-text lp-reveal">
                <span className="lp-dd-plan">{b.plan}</span>
                <h3 className="lp-h2">{b.title}</h3>
                <p className="lp-lead">{b.lead}</p>
                <ul className="lp-dd-points">
                  {b.points.map((p) => (
                    <li key={p}>
                      <IconTick />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lp-dd-visual lp-reveal">{b.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
