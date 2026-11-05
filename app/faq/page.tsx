import type { Metadata } from "next";
import { PageShell } from "../page-shell";
import { PageHead } from "../page-head";
import { FaqExplorer } from "../sections/faq-explorer";
import { FinalCta } from "../sections/final-cta";
import { FAQ } from "@/lib/faq";

const description = "پاسخ پرسش‌های متداول دربارهٔ حضوریار: ثبت از خانه، قطعی GPS و اینترنت، آیفون، نگه‌داری داده‌ها، پلن‌ها و قرارداد.";

export const metadata: Metadata = {
  title: "پرسش‌های متداول",
  description,
  alternates: { canonical: "/faq/" },
  openGraph: { title: "پرسش‌های متداول حضوریار", description, url: "/faq/", type: "website" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageShell>
        <PageHead
          label="پرسش‌ها"
          title="پرسش‌های متداول دربارهٔ حضوریار."
          lead="پاسخ کوتاه به آنچه پیش از خرید می‌پرسند؛ بر اساس موضوع فیلتر کنید یا جستجو کنید."
        />
        <FaqExplorer />
        <FinalCta />
      </PageShell>
    </>
  );
}
