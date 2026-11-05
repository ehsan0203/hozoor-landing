import type { Metadata } from "next";
import { PageShell } from "../page-shell";
import { PageHead } from "../page-head";
import { PhoneShowcase } from "../sections/phone-showcase";
import { Features } from "../sections/features";
import { ManagerView } from "../sections/manager-view";
import { ReportSection } from "../sections/report";
import { FeatureDeepDive } from "../sections/feature-deepdive";
import { Roles } from "../sections/roles";
import { FinalCta } from "../sections/final-cta";

const description =
  "امکانات حضوریار: تأیید با مکان و وای‌فای، سلفی هنگام ورود، شیفت و تعطیلات، مرخصی و مأموریت، فیش حقوقی خودکار، ثبت آفلاین و چندشعبه‌ای.";

export const metadata: Metadata = {
  title: "امکانات سامانهٔ حضور و غیاب",
  description,
  alternates: { canonical: "/features/" },
  openGraph: { title: "امکانات حضوریار", description, url: "/features/", type: "website" },
};

export default function Page() {
  return (
    <PageShell>
      <PageHead
        label="امکانات"
        title="هر چیزی که برای ثبت دقیق تردد لازم است."
        lead="از تأیید مکان و وای‌فای تا فیش حقوقی خودکار؛ همه در یک سامانه و بدون هیچ سخت‌افزاری."
      />
      <PhoneShowcase />
      <Features />
      <FeatureDeepDive />
      <Roles />
      <ManagerView />
      <ReportSection />
      <FinalCta />
    </PageShell>
  );
}
