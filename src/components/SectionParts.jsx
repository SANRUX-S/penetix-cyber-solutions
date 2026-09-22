export function SectionHeading({ label, title, children, number, className = '', id }) {
  return <div className={`section-heading ${className}`} data-reveal><div className="section-heading-title"><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div><div className="section-heading-aside">{children}</div>{number && <span className="section-index" aria-hidden="true">{number} <span>/ 08</span></span>}</div>;
}

export function SectionFoot({ left, right }) {
  return <div className="section-foot"><span>{left}</span><span>{right}</span></div>;
}
