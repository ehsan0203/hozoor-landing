/// تعرفهٔ سالانه و امکانات هر پلن؛ منبع واحد برای بخش تعرفه، ماشین‌حساب و داده‌های ساختاری.
export interface Plan {
  id: string;
  name: string;
  seats: number;
  price: number;
  featured: boolean;
  /// فقط امکانات جدیدِ همین پلن (بقیه از پلن‌های قبلی ارث می‌رسند).
  adds: string[];
}

export const PLANS: Plan[] = [
  {
    id: "base1",
    name: "پایه یک",
    seats: 2,
    price: 3_370_000,
    featured: false,
    adds: [
      "ثبت ورود و خروج با مکان و وای‌فای",
      "شیفت هفتگی و تعطیلات",
      "گزارش کارکرد، تأخیر و اضافه‌کاری",
      "اپ اندروید و نسخهٔ وب",
    ],
  },
  {
    id: "base2",
    name: "پایه دو",
    seats: 5,
    price: 4_770_000,
    featured: true,
    adds: ["درخواست مرخصی و مأموریت با گردش تأیید"],
  },
  {
    id: "base3",
    name: "پایه سه",
    seats: 8,
    price: 6_670_000,
    featured: false,
    adds: ["حقوق و دستمزد و فیش ماهانهٔ خودکار"],
  },
  {
    id: "base4",
    name: "پایه چهار",
    seats: 10,
    price: 9_980_000,
    featured: false,
    adds: ["چند شعبه‌ای", "جریمهٔ پرسنل"],
  },
];

/// ردیف‌های مقایسهٔ پلن‌ها: کمترین پلنی که امکان را دارد.
export const PLAN_MATRIX: { label: string; from: number }[] = [
  { label: "ثبت ورود و خروج با مکان و وای‌فای", from: 0 },
  { label: "شیفت هفتگی و تعطیلات", from: 0 },
  { label: "گزارش کارکرد، تأخیر و اضافه‌کاری", from: 0 },
  { label: "اپ اندروید و نسخهٔ وب", from: 0 },
  { label: "مرخصی و مأموریت با گردش تأیید", from: 1 },
  { label: "حقوق و فیش ماهانهٔ خودکار", from: 2 },
  { label: "چند شعبه‌ای", from: 3 },
  { label: "جریمهٔ پرسنل", from: 3 },
];

/// کمترین پلنی که ظرفیت این تعداد کارمند را دارد؛ بیش از ظرفیت پلن چهار یعنی null.
export function planForTeam(size: number): Plan | null {
  return PLANS.find((p) => size <= p.seats) ?? null;
}

/// همهٔ امکانات یک پلن، شامل ارثی‌ها.
export function inheritedFeatures(index: number): string[] {
  return PLANS.slice(0, index + 1).flatMap((p) => p.adds);
}
