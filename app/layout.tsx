import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./base.css";
import ThemeInit from "@/components/ThemeInit";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const metadata: Metadata = {
  title: "حضوریار — سامانهٔ حضور و غیاب",
  description: "سامانهٔ حضور و غیاب مبتنی بر موقعیت مکانی و وای‌فای",
  icons: { icon: "/icons/icon-192.png" },
};

export const viewport: Viewport = {
  // رنگ نهایی را lib/theme.ts متناسب با تم انتخابی تنظیم می‌کند.
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

/// سایت عمومی (معرفی محصول و بلاگ): برخلاف پنل‌ها اپ نیست، پس نوار برنامه، منوی پایین،
/// تأیید خروج و Service Worker ندارد و ناوبری خودش را در chrome.tsx دارد.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        {/* قبل از اولین رندر تم ذخیره‌شده را اعمال می‌کند تا فلش سفید دیده نشود. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeInit />
        <Script src="/config.js" strategy="beforeInteractive" />
        <main>{children}</main>
      </body>
    </html>
  );
}
