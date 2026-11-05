import type { Metadata } from "next";
import { BlogList } from "./blog-list";

const description =
  "یادداشت‌هایی دربارهٔ ثبت تردد، دورکاری، شیفت و محاسبهٔ کارکرد در ایران — از تجربهٔ ساختن سامانهٔ حضوریار.";

export const metadata: Metadata = {
  title: "بلاگ حضور و غیاب",
  description,
  alternates: { canonical: "/blog/" },
  openGraph: { title: "بلاگ حضوریار", description, url: "/blog/", type: "website" },
};

export default function Page() {
  return <BlogList />;
}
