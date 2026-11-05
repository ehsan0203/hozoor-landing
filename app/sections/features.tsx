import { IconWifi, IconCamera, IconGrid, IconInbox, IconReceipt, IconFlag, IconCloudOff, IconUsers } from "@/components/icons";

type Viz = "wifi" | "payroll" | "sync" | "branches";

export const FEATURES: { key: string; icon: React.ReactNode; title: string; text: string; viz?: Viz }[] = [
  {
    key: "wifi",
    icon: <IconWifi />,
    title: "تأیید با وای‌فای",
    text: "مسیر جایگزین وقتی GPS در دسترس نیست — بر پایهٔ شناسهٔ سخت‌افزاری مودم، نه نام شبکه.",
    viz: "wifi",
  },
  {
    key: "selfie",
    icon: <IconCamera />,
    title: "سلفی هنگام ورود",
    text: "برای محل‌های حساس، عکس زندهٔ دوربین جلو را اجباری کنید. عکس‌ها ۴۵ روز نگه‌داری می‌شوند.",
  },
  {
    key: "shift",
    icon: <IconGrid />,
    title: "شیفت و تعطیلات",
    text: "شیفت هفتگی هر کارمند، تعطیلات رسمی و تعطیلات داخلی شرکت.",
  },
  {
    key: "payroll",
    icon: <IconReceipt />,
    title: "حقوق و دستمزد",
    text: "حقوق پایه، نرخ تأخیر و اضافه‌کاری هر کارمند را یک‌بار تعریف کنید؛ فیش ماهانه خودکار از روی تردد واقعی ساخته می‌شود و پیش از نهایی‌شدن قابل ویرایش است.",
    viz: "payroll",
  },
  {
    key: "leave",
    icon: <IconInbox />,
    title: "مرخصی و مأموریت",
    text: "کارمند از موبایل درخواست می‌دهد، مدیر تأیید یا رد می‌کند و روزهای پوشش‌داده‌شده غیبت حساب نمی‌شوند.",
  },
  {
    key: "penalty",
    icon: <IconFlag />,
    title: "جریمهٔ پرسنل",
    text: "یک کاتالوگ جریمه بسازید و رخدادها را برای هر کارمند ثبت کنید؛ در فیش همان ماه خودکار کسر می‌شود.",
  },
  {
    key: "offline",
    icon: <IconCloudOff />,
    title: "ثبت آفلاین",
    text: "قطعی اینترنت مانع ثبت نیست؛ تردد با زمان واقعی خودش بعداً همگام می‌شود.",
    viz: "sync",
  },
  {
    key: "branches",
    icon: <IconUsers />,
    title: "چندشعبه‌ای",
    text: "هر شعبه محدوده، وای‌فای و قواعد خودش را دارد و کارکنان به یکی از آن‌ها تخصیص می‌یابند.",
    viz: "branches",
  },
];

function FeatureViz({ viz }: { viz: Viz }) {
  if (viz === "wifi") {
    return (
      <div className="lp-viz lp-viz-wifi" aria-hidden="true">
        <span className="lp-wifi-orb">
          <span className="lp-viz-ring" />
          <span className="lp-viz-ring" />
          <span className="lp-viz-ring" />
          <span className="lp-viz-core">
            <IconWifi />
          </span>
        </span>
        <code dir="ltr">C4:6E:1F:3A:9B:02</code>
      </div>
    );
  }
  if (viz === "payroll") {
    return (
      <div className="lp-viz lp-viz-slip" aria-hidden="true">
        <div className="lp-slip-head">
          <b>فیش ماهانه</b>
          <span>نمونهٔ نمایشی</span>
        </div>
        <dl>
          <div>
            <dt>حقوق پایه</dt>
            <dd className="num">۱۵٬۰۰۰٬۰۰۰</dd>
          </div>
          <div>
            <dt>اضافه‌کاری</dt>
            <dd className="num is-plus">+۸۴۰٬۰۰۰</dd>
          </div>
          <div>
            <dt>جریمهٔ تأخیر</dt>
            <dd className="num is-minus">−۱۲۰٬۰۰۰</dd>
          </div>
          <div className="is-net">
            <dt>خالص پرداختی</dt>
            <dd className="num" data-count="15720000">
              ۱۵٬۷۲۰٬۰۰۰
            </dd>
          </div>
        </dl>
      </div>
    );
  }
  if (viz === "sync") {
    return (
      <div className="lp-viz lp-viz-sync" aria-hidden="true">
        <div className="lp-sync-dots">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="lp-sync-label">همگام‌سازی تردد‌های ثبت‌شده در قطعی…</span>
      </div>
    );
  }
  return (
    <div className="lp-viz lp-viz-branches" aria-hidden="true">
      {["دفتر مرکزی", "انبار", "شعبهٔ ۲"].map((b) => (
        <span key={b}>
          <i />
          {b}
        </span>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section className="lp-section" id="features">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            امکانات
          </p>
          <h2 className="lp-h2">محدودهٔ مجاز را روی نقشه می‌کشید. بقیه‌اش خودکار است.</h2>
          <p className="lp-lead">
            برای هر محل کار یک نقطه و یک شعاع تعریف می‌کنید. ثبت تردد خارج از آن محدوده پذیرفته نمی‌شود و
            فاصلهٔ دقیق هر تردد در گزارش ثبت می‌ماند.
          </p>
        </div>

        <div className="lp-bento">
          {FEATURES.map((f) => (
            <article className={`lp-feat${f.viz ? " is-wide" : ""}`} data-feat={f.key} key={f.key}>
              <span className="lp-feat-ico" aria-hidden="true">
                {f.icon}
              </span>
              <h3 className="lp-h3">{f.title}</h3>
              <p>{f.text}</p>
              {f.viz && <FeatureViz viz={f.viz} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
