import type { Metadata } from "next";
import { PageShell } from "../page-shell";
import { PageHead } from "../page-head";
import { ContactChannels } from "../sections/contact-channels";
import { ContactChecklist } from "../sections/contact-checklist";
import { MiniFaq } from "../sections/faq";
import { ContactSteps } from "../sections/contact-steps";
import { FinalCta } from "../sections/final-cta";

const description = "درخواست مشاوره و دیدن سامانهٔ حضوریار: نام و شمارهٔ موبایل‌تان را بگذارید تا نمایندهٔ ما تماس بگیرد.";

export const metadata: Metadata = {
  title: "تماس و درخواست مشاوره",
  description,
  alternates: { canonical: "/contact/" },
  openGraph: { title: "تماس با حضوریار", description, url: "/contact/", type: "website" },
};

export default function Page() {
  return (
    <PageShell>
      <PageHead
        label="تماس"
        title="درخواست مشاوره و دیدن سامانه."
        lead="نام و شمارهٔ موبایل‌تان را بگذارید؛ نمایندهٔ ما تماس می‌گیرد. مشاوره بدون هیچ تعهدی است."
      />
      <ContactChannels />
      <FinalCta />
      <ContactSteps />
      <ContactChecklist />
      <MiniFaq
        label="پیش از تماس"
        title="پرسش‌هایی که معمولاً در تماس اول می‌پرسند."
        questions={[
          "به دستگاه اثر انگشت یا کارت‌خوان نیاز دارم؟",
          "کارکنان چطور اپ را نصب می‌کنند؟",
          "روی آیفون هم کار می‌کند؟",
          "قرارداد بلندمدت لازم است؟",
        ]}
      />
    </PageShell>
  );
}
