import type { Metadata } from "next";
import { PageShell } from "../page-shell";
import { PageHead } from "../page-head";
import { Pricing } from "../sections/pricing";
import { RoiCalculator } from "../sections/roi";
import { PlanPicker } from "../sections/plan-picker";
import { PerSeat } from "../sections/per-seat";
import { Setup } from "../sections/setup";
import { MiniFaq } from "../sections/faq";
import { FinalCta } from "../sections/final-cta";
import { PLANS } from "@/lib/plans";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const description =
  "تعرفهٔ سالانهٔ حضوریار بر اساس تعداد کاربر: چهار پلن از ۲ تا ۱۰ کاربر، بدون قرارداد بلندمدت. معادل ماهانه و مقایسهٔ کامل پلن‌ها.";

export const metadata: Metadata = {
  title: "تعرفهٔ سامانهٔ حضور و غیاب",
  description,
  alternates: { canonical: "/pricing/" },
  openGraph: { title: "تعرفهٔ حضوریار", description, url: "/pricing/", type: "website" },
};

/// قیمت‌ها در داده‌های ساختاری به ریال می‌آیند (ده برابر تومان).
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android, Web",
  inLanguage: "fa-IR",
  description: SITE_DESCRIPTION,
  offers: PLANS.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price * 10,
    priceCurrency: "IRR",
    description: `تا ${p.seats} کاربر، سالانه`,
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageShell>
        <PageHead
          label="تعرفه"
          title="تعرفهٔ سالانه، بر اساس تعداد کاربر."
          lead="چهار پلن؛ با رشد تیم فقط پلن را ارتقا می‌دهید. قرارداد بلندمدتی لازم نیست."
        />
        <PlanPicker />
        <Pricing />
        <PerSeat />
        <RoiCalculator />
        <Setup />
        <MiniFaq
          label="پیش از خرید"
          title="پرسش‌هایی که دربارهٔ پلن‌ها می‌پرسند."
          questions={[
            "اگر تیم‌مان بزرگ‌تر شد یا پلن کم آمد؟",
            "قرارداد بلندمدت لازم است؟",
            "اگر چند شعبه داریم؟",
            "پشتیبانی چطور است؟",
          ]}
        />
        <FinalCta />
      </PageShell>
    </>
  );
}
