import Mirror from "@/components/Mirror";
import { services, servicesIntro } from "@/lib/data";

// Visible version: the 3D cover-flow in components/three/ServicesStation.jsx
export default function Services() {
  return (
    <Mirror label="Services">
      <h1>Services</h1>
      <p>{servicesIntro}</p>
      {services.map((s) => (
        <article key={s.num}>
          <h2>
            {s.num} — {s.title}
          </h2>
          <p>{s.description}</p>
          <ul>
            {s.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <a href={s.href}>Get in touch</a>
        </article>
      ))}
    </Mirror>
  );
}
