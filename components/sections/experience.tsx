"use client"

import { useId, useState } from "react"
import { Section, SectionHeading, StackList } from "@/components/primitives"
import { experience } from "@/lib/content"
import { Plus } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Experience.
 *
 * One set of markup for both layouts. On large screens CSS places the triggers
 * in a left rail and the panels in a shared right column; on small screens the
 * same elements fall back to a disclosure list that opens with
 * grid-template-rows. Nothing is duplicated in the DOM for a breakpoint, and
 * nothing animates unless the reader asks for it.
 */
export function Experience() {
  const [active, setActive] = useState(0)
  const uid = useId()

  return (
    <Section id="experience" className="bg-bg-subtle">
      <SectionHeading
        id="experience"
        index="02"
        label="Experience"
        title="Where the work has happened."
        intro={
          <p>
            A financial services group, a software company, and now the delivery side of a mobile money platform.
          </p>
        }
      />

      <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-x-16">
        {experience.map((role, i) => {
          const isActive = active === i
          const panelId = `${uid}-panel-${role.id}`
          const buttonId = `${uid}-tab-${role.id}`

          return (
            <div key={role.id} className="contents">
              <h3 style={{ gridColumn: 1, gridRow: i + 1 }}>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className={cn(
                    "group flex w-full items-start gap-4 border-t border-line py-5 text-left",
                    "transition-colors duration-[var(--dur)]",
                    "lg:rounded-md lg:border-t-0 lg:border-l-2 lg:py-5 lg:pr-4 lg:pl-5",
                    isActive
                      ? "lg:border-l-accent lg:bg-surface lg:shadow-xs"
                      : "lg:border-l-transparent lg:hover:border-l-line-strong lg:hover:bg-surface/60",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={cn(
                          "text-base font-semibold transition-colors duration-[var(--dur)]",
                          isActive ? "text-fg" : "text-fg-secondary group-hover:text-fg",
                        )}
                      >
                        {role.company}
                      </span>
                      {role.current ? (
                        <span className="accent-wash-bg inline-flex items-center rounded-xs px-2 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-accent uppercase">
                          Current
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-2 block text-sm text-fg-secondary">{role.title}</span>
                    <span className="mt-2.5 block font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">
                      {role.period}
                    </span>
                  </span>
                  <Plus
                    aria-hidden="true"
                    className={cn(
                      "mt-1 size-4 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] lg:hidden",
                      isActive && "rotate-45",
                    )}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                // Collapsed panels hold no focusable content, so hiding them from
                // assistive tech matches what sighted users get.
                aria-hidden={!isActive}
                style={{ gridColumn: 2, gridRow: `1 / span ${experience.length}` }}
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows] duration-[var(--dur-slow)] ease-out",
                  "lg:block lg:overflow-visible",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  !isActive && "lg:hidden",
                )}
              >
                <div className="min-h-0">
                  <div
                    className={cn(
                      "pt-1 pr-1 pb-8 pl-1 transition-opacity duration-[var(--dur-slow)] lg:p-0",
                      isActive ? "opacity-100" : "opacity-0 lg:opacity-100",
                    )}
                  >
                    <p className="hidden text-sm text-fg-muted lg:block">{role.context}</p>
                    <ul className="space-y-4 lg:mt-6">
                      {role.points.map((point) => (
                        <li key={point.slice(0, 32)} className="flex gap-4 text-body text-fg-secondary">
                          <span aria-hidden="true" className="mt-[0.8rem] h-px w-4 shrink-0 bg-accent/50" />
                          <span className="max-w-[64ch]">{point}</span>
                        </li>
                      ))}
                    </ul>
                    {role.stack ? <StackList items={role.stack} className="mt-8" /> : null}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
