import { Badge, Section, SectionHeading } from "@/components/primitives"
import { certifications, education } from "@/lib/content"

export function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education" index="05" label="Education & certification" title="Background." />

      <div className="mt-14 grid gap-x-16 gap-y-14 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label">Degrees</p>
          <ul className="mt-6 border-t border-line">
            {education.map((entry) => (
              <li key={entry.qualification} className="reveal border-b border-line py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-base font-medium text-fg">{entry.qualification}</h3>
                  <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">{entry.period}</span>
                </div>
                <p className="mt-2 text-sm text-fg-secondary">{entry.institution}</p>
                <p className="mt-3">
                  <Badge className="uppercase">{entry.status}</Badge>
                </p>
                {entry.note ? <p className="mt-3 text-sm text-fg-muted">{entry.note}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <p className="label">Certifications</p>
          <ul className="mt-6 border-t border-line">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="reveal flex items-baseline justify-between gap-4 border-b border-line py-4"
              >
                <span className="text-sm text-fg">{cert.name}</span>
                {cert.code ? (
                  <span className="shrink-0 font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">
                    {cert.code}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
