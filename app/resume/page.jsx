import Mirror from "@/components/Mirror";
import { about, education, experience, projects, skills } from "@/lib/data";

// Visible version: the 3D cards + skills sphere in components/three/ResumeStation.jsx
export default function Resume() {
  return (
    <Mirror label="Resume">
      <h1>Resume</h1>
      <p>A quick overview of my experience, technical skills, and the value I bring to every project.</p>

      <h2>{about.title}</h2>
      <p>{about.description}</p>
      <ul>
        {about.info.map((i) => (
          <li key={i.fieldName}>
            {i.fieldName}: {i.fieldValue}
          </li>
        ))}
      </ul>

      <h2>{education.title}</h2>
      <p>{education.description}</p>
      <ul>
        {education.items.map((it) => (
          <li key={it.degree}>
            {it.degree}, {it.institution} ({it.duration})
          </li>
        ))}
      </ul>

      <h2>{experience.title}</h2>
      <p>{experience.description}</p>
      <ul>
        {experience.items.map((it) => (
          <li key={it.position + it.company}>
            {it.position}, {it.company} ({it.duration})
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.num}>
            {project.title} — {project.role}
          </li>
        ))}
      </ul>

      <h2>{skills.title}</h2>
      <p>{skills.description}</p>
      <ul>
        {skills.list.map((s) => (
          <li key={s.short}>{s.name}</li>
        ))}
      </ul>
    </Mirror>
  );
}
