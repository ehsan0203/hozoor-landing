/// پلن انتخاب‌شده در بخش تعرفه به فرم تماس منتقل می‌شود تا کاربر دوباره توضیح ندهد.
export const PLAN_SELECT_EVENT = "hozoor-plan-select";

export function selectPlan(name: string): void {
  window.dispatchEvent(new CustomEvent(PLAN_SELECT_EVENT, { detail: name }));
}
