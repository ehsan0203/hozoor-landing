import type { Metadata } from "next";
import { PageShell } from "../page-shell";
import { PageHead } from "../page-head";
import { Scenarios } from "../sections/scenarios";
import { JammedGpsCase } from "../sections/gps";
import { Compare } from "../sections/compare";
import { Pipeline } from "../sections/pipeline";
import { Objections } from "../sections/objections";
import { MiniFaq } from "../sections/faq";
import { FinalCta } from "../sections/final-cta";

const description =
  "حضور و غیاب وقتی GPS قطع است: حضوریار با شناسهٔ سخت‌افزاری مودم (BSSID) ورود را تأیید می‌کند، بدون تماس با مدیر و بدون ثبت دستی. مقایسه با دفتر، دستگاه اثر انگشت و اپ فقط‌GPS.";

export const metadata: Metadata = {
  title: "حضور و غیاب در اختلال GPS",
  description,
  alternates: { canonical: "/gps-outage/" },
  openGraph: { title: "حضور و غیاب در اختلال GPS", description, url: "/gps-outage/", type: "article" },
};

export default function Page() {
  return (
    <PageShell>
      <PageHead
        label="اختلال GPS"
        title="حضور و غیاب وقتی GPS قطع است."
        lead="در بسیاری از شهرها اختلال موقعیت‌یابی روزمره است. حضوریار برای همین روز ساخته شده: مسیر دوم دارد و سخت‌گیرتر است، نه سهل‌گیرتر."
      />
      <Scenarios />
      <JammedGpsCase />
      <Pipeline />
      <Objections />
      <Compare />
      <MiniFaq
        label="پرسش‌های مرتبط"
        title="دربارهٔ ثبت در اختلال GPS."
        questions={[
          "اگر GPS گوشی کار نکند چه می‌شود؟",
          "کارمند می‌تواند از خانه ورود بزند؟",
          "اگر مختصات گوشی قدیمی باشد چه می‌شود؟",
          "اگر اینترنت قطع باشد؟",
        ]}
      />
      <FinalCta />
    </PageShell>
  );
}
