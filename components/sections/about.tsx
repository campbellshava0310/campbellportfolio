import { Section, SectionHeading, TextLink } from "@/components/primitives"
import { about, profile } from "@/lib/content"

/**
 * About.
 *
 * The portrait carries the hero, so this section is deliberately type-led —
 * running it again here would just be the same photograph twice.
 */
export function About() {
  return (
    <Section id="about" className="bg-bg-subtle">
      <SectionHeading id="about" index="06" label="About" title="A short version." />

      <div className="mt-12 grid gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="reveal space-y-6 text-lead text-fg-secondary">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-[60ch]">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="reveal mt-10 text-body text-fg-secondary">
            The full record is in the <TextLink href={profile.resume} download>CV</TextLink>, and the day-to-day is on{" "}
            <TextLink href={profile.linkedin.url} external>
              LinkedIn
            </TextLink>
            .
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <dl className="reveal space-y-px overflow-hidden rounded-lg border border-line bg-line">
            {[
              { k: "Currently", v: "Software Project Manager, EcoCash" },
              { k: "Studying", v: "MTech Software Engineering, HIT" },
              { k: "Based", v: profile.location },
              { k: "Working in", v: "Backend, mobile, infrastructure" },
            ].map((item) => (
              <div key={item.k} className="bg-bg p-5">
                <dt className="label">{item.k}</dt>
                <dd className="mt-2.5 text-sm font-medium text-fg">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
