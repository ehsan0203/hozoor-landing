const WORDS = [
  "ثبت با مکان",
  "تأیید با وای‌فای",
  "کار در اختلال GPS",
  "شیفت و تعطیلات",
  "مرخصی و مأموریت",
  "فیش حقوقی خودکار",
  "ثبت آفلاین",
  "چندشعبه‌ای",
  "بدون دستگاه اثر انگشت",
  "اپ اندروید و وب",
];

/// نوار کلمات متحرک زیر هیرو؛ لیست دوبار تکرار می‌شود تا حلقهٔ GSAP بدون پرش باشد.
/// نسخهٔ دوم برای فناوری‌های کمکی پنهان است.
export function Ticker() {
  return (
    <div className="lp-ticker" role="presentation">
      <div className="lp-ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {WORDS.map((w) => (
              <li key={w}>
                <i aria-hidden="true" />
                {w}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
