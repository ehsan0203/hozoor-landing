/// اثبات اجتماعی — فقط داده‌های واقعی و با اجازهٔ صاحبشان را اینجا بگذارید.
/// تا وقتی آرایه‌ها خالی‌اند، بخش مربوط اصلاً در صفحه رندر نمی‌شود (هیچ نمونهٔ ساختگی‌ای نیست).
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const TESTIMONIALS: Testimonial[] = [];
export const CLIENTS: string[] = [];
export const STATS: Stat[] = [];
