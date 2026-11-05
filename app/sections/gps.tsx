import { IconCross, IconTick } from "@/components/icons";

export function JammedGpsCase() {
  return (
    <section className="lp-section" id="gps">
      <div className="lp-wrap lp-grid">
        <div className="lp-case-type lp-reveal">
          <p className="lp-label">
            مسئلهٔ واقعی
          </p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            در ایران، GPS همیشه در دسترس نیست.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            اختلال موقعیت‌یابی ماهواره‌ای در بسیاری از شهرها روزمره است. سامانه‌ای که فقط به GPS تکیه کند،
            آن روز از کار می‌افتد و کارمند باید به مدیر زنگ بزند تا ترددش دستی ثبت شود.
          </p>

          <dl className="lp-case-facts">
            <div>
              <dt>حداکثر عمر مختصات</dt>
              <dd>
                <b className="num" data-count="45">
                  ۴۵
                </b>
                <span>ثانیه</span>
              </dd>
            </div>
            <div>
              <dt>تماس با مدیر برای ثبت دستی</dt>
              <dd>
                <b className="num" data-count="0">
                  ۰
                </b>
                <span>بار</span>
              </dd>
            </div>
          </dl>

          <p className="lp-case-callout">حضوریار مسیر دوم دارد — و مسیر دوم سخت‌گیرتر است، نه سهل‌گیرتر.</p>
        </div>

        <div className="lp-case-art lp-reveal">
          <div className="lp-flow">
            <div className="lp-node is-fail">
              <span className="lp-seg is-a" aria-hidden="true">
                <i />
              </span>
              <span className="lp-node-key" aria-hidden="true">
                <IconCross />
              </span>
              <div>
                <p className="lp-node-title">
                  موقعیت مکانی
                  <span className="lp-node-verdict">در دسترس نیست</span>
                </p>
                <p>
                  GPS پاسخ نمی‌دهد. مختصات کهنه‌تر از ۴۵ ثانیه هم پذیرفته نمی‌شود تا موقعیتِ ذخیره‌شدهٔ
                  دیروز جای امروز را نگیرد.
                </p>
              </div>
            </div>

            <div className="lp-node is-mid">
              <span className="lp-seg is-b" aria-hidden="true">
                <i />
              </span>
              <span className="lp-node-key num" aria-hidden="true">
                ۲
              </span>
              <div>
                <p className="lp-node-title">شناسهٔ مودم محل کار</p>
                <p>
                  به‌جای نام شبکه، شناسهٔ سخت‌افزاری اکسس‌پوینت (BSSID) بررسی می‌شود. نام شبکه را می‌شود
                  روی هر مودمی گذاشت؛ شناسهٔ سخت‌افزاری را نه.
                </p>
                <p className="lp-bssid-row">
                  <span>نمونهٔ شناسه</span>
                  <code className="lp-bssid" dir="ltr" data-final="C4:6E:1F:3A:9B:02">
                    C4:6E:1F:3A:9B:02
                  </code>
                </p>
              </div>
            </div>

            <div className="lp-node is-pass">
              <span className="lp-node-key" aria-hidden="true">
                <IconTick />
              </span>
              <div>
                <p className="lp-node-title">
                  ورود ثبت شد
                  <span className="lp-node-verdict">۰۸:۰۲</span>
                </p>
                <p>
                  بدون تماس با مدیر و بدون ثبت دستی. در گزارش هم مشخص است که این تردد با وای‌فای تأیید شده،
                  نه با مکان.
                </p>
              </div>
            </div>
          </div>

          <p className="lp-note">
            نکتهٔ مهم: اگر مکان معتبر باشد و کارمند بیرون از محدوده، وای‌فای نمی‌تواند آن را بپوشاند. تردد رد
            می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}
