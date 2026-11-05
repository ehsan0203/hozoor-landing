/// سربرگ هر صفحهٔ داخلی (غیر از معرفی): برچسب، تیتر h1 و توضیح کوتاه.
export function PageHead({ label, title, lead }: { label: string; title: string; lead: string }) {
  return (
    <header className="lp-pagehead">
      <div className="lp-wrap">
        <p className="lp-label">{label}</p>
        <h1 className="lp-h1">{title}</h1>
        <p className="lp-lead">{lead}</p>
      </div>
    </header>
  );
}
