import Image from "next/image"
import { Section, SectionHeading, TextLink } from "@/components/primitives"
import { about, profile } from "@/lib/content"

export function About() {
  return (
    <Section id="about" className="bg-bg-subtle">
      <SectionHeading id="about" index="06" label="About" title="A short version." />

      <div className="mt-14 grid gap-x-16 gap-y-12 lg:mt-16 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-md border border-line bg-bg">
            <Image
              src="/portrait.jpg"
              alt={`${profile.name}, software engineer, Harare`}
              fill
              sizes="(max-width: 1024px) 60vw, 340px"
              loading="lazy"
              className="object-cover"
            />
          </div>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="label">Currently</dt>
              <dd className="mt-2 text-sm text-fg">Software Project Management Trainee, EcoCash</dd>
            </div>
            <div>
              <dt className="label">Studying</dt>
              <dd className="mt-2 text-sm text-fg">MTech Software Engineering, HIT</dd>
            </div>
            <div>
              <dt className="label">Based</dt>
              <dd className="mt-2 text-sm text-fg">{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="reveal space-y-6 text-lead text-fg-secondary">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-prose">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="reveal mt-10 text-body text-fg-secondary">
            The full record is in the{" "}
            <TextLink href={profile.resume}>résumé</TextLink>, and the day-to-day is on{" "}
            <TextLink href={profile.linkedin.url} external>
              LinkedIn
            </TextLink>
            .
          </p>
        </div>
      </div>
    </Section>
  )
}
