import { IconTick, IconCross } from "@/components/icons";

type Cell = "yes" | "no" | "part";

/// ستون اول «حضوریار» است تا چشم کنار برچسب‌ها همان را ببیند. ترتیب هر ردیف: [حضوریار، دفتر و اکسل،
/// دستگاه اثر انگشت، اپ فقط‌GPS].
const COLUMNS = ["حضوریار", "دفتر و اکسل", "دستگاه اثر انگشت", "اپ فقط‌GPS"];

const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  { label: "بدون خرید سخت‌افزار", cells: ["yes", "yes", "no", "yes"] },
  { label: "ثبت از چند محل بدون دستگاهِ جدا", cells: ["yes", "no", "no", "yes"] },
  { label: "کار در اختلال GPS", cells: ["yes", "yes", "yes", "no"] },
  { label: "ثبت را نمی‌شود با تغییر نام وای‌فای جعل کرد", cells: ["yes", "no", "yes", "part"] },
  { label: "محاسبهٔ خودکار تأخیر و اضافه‌کاری", cells: ["yes", "no", "no", "part"] },
  { label: "فیش حقوقی از روی تردد واقعی", cells: ["yes", "no", "no", "no"] },
];

const MARK: Record<Cell, { node: React.ReactNode; label: string }> = {
  yes: { node: <IconTick />, label: "دارد" },
  no: { node: <IconCross />, label: "ندارد" },
  part: { node: <span aria-hidden="true">~</span>, label: "بسته به محصول" },
};

const SCORES = COLUMNS.map((_, i) => ROWS.filter((r) => r.cells[i] === "yes").length);

/// مقایسهٔ دسته‌ای با راه‌حل‌هایی که خریدار الان دارد. نام رقیبِ مشخص نمی‌آید؛ ردیف‌ها
/// فقط ادعاهایی‌اند که دربارهٔ خودِ دسته درست است. «بسته به محصول» یعنی در این دسته متغیر است.
export function Compare() {
  return (
    <section className="lp-section" id="compare">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">مقایسه</p>
          <h2 className="lp-h2">با روش فعلی‌تان چه فرقی دارد؟</h2>
          <p className="lp-lead">
            بیشترِ تیم‌ها یا با دفتر و اکسل شروع می‌کنند یا با دستگاه اثر انگشت. جدول نشان می‌دهد هر راه
            کجا می‌ایستد.
          </p>
        </div>

        <div className="lp-table-scroll lp-compare lp-reveal">
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">ویژگی</span>
                </th>
                {COLUMNS.map((c, i) => (
                  <th scope="col" key={c} className={i === 0 ? "is-us" : undefined}>
                    {i === 0 ? <b className="lp-us-name">{c}</b> : c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((c, i) => (
                    <td key={i} className={i === 0 ? "is-us" : undefined}>
                      <span className={`lp-mark-${c}`} role="img" aria-label={MARK[c].label}>
                        {MARK[c].node}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">موارد کامل پوشش‌داده‌شده</th>
                {SCORES.map((n, i) => (
                  <td key={i} className={i === 0 ? "is-us" : undefined}>
                    <b className="num lp-score" data-count={n}>
                      {n.toLocaleString("fa-IR")}
                    </b>
                    <small> از {ROWS.length.toLocaleString("fa-IR")}</small>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="lp-note" style={{ marginTop: 16 }}>
          «~» یعنی در این دسته بسته به محصول فرق می‌کند و در شمارش کامل نیامده است.
        </p>
      </div>
    </section>
  );
}
