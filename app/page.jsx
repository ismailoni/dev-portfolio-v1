import Mirror from "@/components/Mirror";
import { hero, socials, stats } from "@/lib/data";

// The visible version of this page is the 3D hero (components/three/HomeStation.jsx).
// This is its semantic twin for search engines, screen readers and no-WebGL browsers.
export default function Home() {
  return (
    <Mirror label="Introduction">
      <p>{hero.pill}</p>
      <h1>
        {hero.line1} {hero.line2}
      </h1>
      <p>{hero.blurb}</p>
      <p>
        {hero.focus} — {hero.location}
      </p>
      <p>
        <a href={hero.resumeFile} download>
          Download Resume
        </a>{" "}
        · <a href="/contact">Let’s Work Together</a>
      </p>
      <ul>
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <h2>At a glance</h2>
      <ul>
        {stats.map((s) => (
          <li key={s.text}>
            {s.num}
            {s.plus ? "+" : ""} {s.text}
          </li>
        ))}
      </ul>
    </Mirror>
  );
}
