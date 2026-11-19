"use client"

import { useMemo, useState } from "react"
import { Section, SectionHeading } from "@/components/primitives"
import { skillGroups, skillUsage } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Technical skills as an explorable taxonomy.
 *
 * No bars, no percentages, no self-assessment. Picking a technology shows where
 * it was actually used and dims everything that has nothing to do with it, so
 * the list answers "where has this person really done this?" rather than
 * "what can they list?".
 */
export function Engineering() {
  const [active, setActive] = useState<string | null>(null)

  // Everything used alongside the selection, so the rest can recede.
  const related = useMemo(() => {
    if (!active) return null
    const projects = new Set(skillUsage[active] ?? [])
    const set = new Set<string>([active])
    for (const [skill, used] of Object.entries(skillUsage)) {
      if (used.some((p) => projects.has(p))) set.add(skill)
    }
    return set
  }, [active])

  const usedIn = active ? (skillUsage[active] ?? []) : []

  return (
    <Section id="engineering">
      <SectionHeading
        id="engineering"
        index="03"
        label="Engineering"
        title="What I work with."
        intro={
          <p>
            Grouped by what it does rather than how well I claim to know it. Pick any one to see where it was
            actually used — and what it was used alongside.
          </p>
        }
      />

      {/* Selection readout */}
      <div className="reveal mt-10 flex min-h-14 flex-wrap items-center gap-x-4 gap-y-3 rounded-md border border-line bg-bg-subtle px-5 py-4">
        {active ? (
          <>
            <span className="text-sm font-semibold text-fg">{active}</span>
            {usedIn.length ? (
              <>
                <span className="label">used in</span>
                <span className="flex flex-wrap gap-2">
                  {usedIn.map((p) => (
                    <span
                      key={p}
                      className="accent-wash-bg rounded-xs px-2 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-accent"
                    >
                      {p}
                    </span>
                  ))}
                </span>
              </>
            ) : (
              <span className="text-sm text-fg-muted">No project on this site uses it directly.</span>
            )}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="ml-auto font-mono text-[0.6875rem] tracking-[0.1em] text-accent uppercase transition-colors duration-[var(--dur)] hover:text-accent-hover"
            >
              Clear
            </button>
          </>
        ) : (
          <span className="text-sm text-fg-muted">
            Select a technology to trace it through the work.
          </span>
        )}
      </div>

      <dl className="reveal mt-6 grid gap-x-10 gap-y-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 sm:gap-x-px">
        {skillGroups.map((group) => (
          <div key={group.title} className="bg-bg p-7">
            <dt className="label">{group.title}</dt>
            <dd>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const isActive = active === item
                  const isRelated = related?.has(item) ?? true
                  const hasUsage = Boolean(skillUsage[item]?.length)
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => setActive(isActive ? null : item)}
                        aria-pressed={isActive}
                        className={cn(
                          "rounded-md border px-2.5 py-1.5 text-sm font-medium transition-[background-color,border-color,color,opacity] duration-200",
                          isActive
                            ? "border-accent bg-accent text-accent-fg"
                            : hasUsage
                              ? "border-line bg-surface text-fg hover:border-accent/50 hover:text-accent"
                              : "border-transparent text-fg-secondary hover:text-fg",
                          !isActive && !isRelated && "opacity-35",
                        )}
                      >
                        {item}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
