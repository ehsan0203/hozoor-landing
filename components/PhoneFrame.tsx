/// قاب آیفون (فقط CSS). اگر `image` داده شود عکس واقعی داخل قاب می‌نشیند، وگرنه فرزندان (صفحهٔ نمایشی).
export function PhoneFrame({
  image,
  alt,
  children,
  className = "",
}: {
  image?: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`lp-phone ${className}`}>
      <span className="lp-phone-btn is-silent" aria-hidden="true" />
      <span className="lp-phone-btn is-up" aria-hidden="true" />
      <span className="lp-phone-btn is-down" aria-hidden="true" />
      <span className="lp-phone-btn is-power" aria-hidden="true" />
      <div className="lp-phone-screen">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={alt} loading="lazy" />
        ) : (
          <div role="img" aria-label={alt} className="lp-app">
            {children}
          </div>
        )}
        <span className="lp-phone-island" aria-hidden="true" />
        <span className="lp-phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
