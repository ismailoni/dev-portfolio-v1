// A real, semantic HTML copy of each 3D page. It is visually hidden while the WebGL scene is
// running (so search engines & screen readers still get headings, text and links) and becomes
// the visible page automatically if WebGL isn't available.
export default function Mirror({ children, label }) {
  return (
    <section className="a11y-mirror pointer-events-auto" aria-label={label}>
      {children}
    </section>
  )
}
