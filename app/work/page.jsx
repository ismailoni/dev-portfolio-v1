import Mirror from "@/components/Mirror";
import WorkDetails from "@/components/WorkDetails";
import { projects, workIntro } from "@/lib/data";

// Visible version: the 3D project cards in components/three/WorkStation.jsx.
// "Details" in the 3D scene opens <WorkDetails /> (responsibilities + screenshot gallery).
export default function Work() {
  return (
    <>
      <Mirror label="Featured work">
        <h1>Featured Work</h1>
        <p>{workIntro}</p>
        {projects.map((p) => (
          <article key={p.num}>
            <h2>
              {p.num} — {p.title}
            </h2>
            <p>
              {p.category} · {p.role}
            </p>
            <p>{p.description}</p>
            <ul>
              {p.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p>Stack: {p.stack.join(", ")}</p>
            <p>
              <a href={p.live} target="_blank" rel="noopener noreferrer">
                Live project
              </a>
              {p.github && (
                <>
                  {" "}
                  ·{" "}
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub repository
                  </a>
                </>
              )}
            </p>
          </article>
        ))}
      </Mirror>
      <WorkDetails />
    </>
  );
}
