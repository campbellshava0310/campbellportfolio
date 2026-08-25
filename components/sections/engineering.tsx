import { Section, SectionHeading } from "@/components/primitives"
import { skillGroups } from "@/lib/content"

/**
 * Technical skills as a taxonomy.
 *
 * No bars, no percentages, no self-assessment. A reader scanning for a
 * technology should find it in one pass, and the grouping should tell them how
 * the work is organised in my head.
 */
export function Engineering() {
  return (
    <Section id="engineering">
      <SectionHeading
        id="engineering"
        index="03"
        label="Engineering"
        title="What I work with."
        intro={
          <p>
            Grouped by what it does rather than how well I claim to know it. The weight sits on the backend, the data
            layer and what it takes to keep a service running.
          </p>
        }
      />

      <dl className="mt-16 border-t border-line lg:mt-20">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="reveal group grid gap-x-12 gap-y-3 border-b border-line py-7 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
          >
            <dt className="label pt-1 transition-colors duration-[var(--dur)] group-hover:text-accent">
              {group.title}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
