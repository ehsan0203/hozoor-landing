import type { Metadata } from "next";
import { PageShell } from "./page-shell";
import { Hero } from "./sections/hero";
import { Ticker } from "./sections/ticker";
import { Scenarios } from "./sections/scenarios";
import { JammedGpsCase } from "./sections/gps";
import { PhoneShowcase } from "./sections/phone-showcase";
import { Features } from "./sections/features";
import { ManagerView } from "./sections/manager-view";
import { ReportSection } from "./sections/report";
import { Compare } from "./sections/compare";
import { Setup } from "./sections/setup";
import { RoiCalculator } from "./sections/roi";
import { Pricing } from "./sections/pricing";
import { Proof } from "./sections/proof";
import { Faq } from "./sections/faq";
import { BlogTeaser } from "./sections/blog-teaser";
import { FinalCta } from "./sections/final-cta";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: SITE_TITLE, description: SITE_DESCRIPTION, url: "/", type: "website" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageShell>
        <Hero />
        <Ticker />
        <Scenarios />
        <JammedGpsCase />
        <PhoneShowcase />
        <Features />
        <ManagerView />
        <ReportSection />
        <Compare />
        <Setup />
        <RoiCalculator />
        <Pricing />
        <Proof />
        <Faq limit={6} moreHref="/faq/" />
        <BlogTeaser />
        <FinalCta />
      </PageShell>
    </>
  );
}
