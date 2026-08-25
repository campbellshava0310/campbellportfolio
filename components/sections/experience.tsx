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
 * same elements fall back to a disclosure list that animates open with
 * grid-template-rows. Nothing is duplicated in the DOM for a breakpoint.
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
            Two years across a financial services group, a software company, and now the delivery side of a mobile
            money platform.
          </p>
        }
      />

      <div className="mt-16 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-x-16">
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
                    "group flex w-full items-start gap-4 border-t border-line py-5 text-left transition-colors duration-[var(--dur)]",
                    "lg:border-l lg:border-t-0 lg:py-5 lg:pl-5 lg:pr-4",
                    isActive ? "lg:border-l-accent" : "lg:hover:border-l-line-strong",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-[var(--dur)]",
                      isActive ? "bg-accent" : "bg-line-strong group-hover:bg-fg-muted",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-base font-medium transition-colors duration-[var(--dur)]",
                        isActive ? "text-fg" : "text-fg-secondary group-hover:text-fg",
                      )}
                    >
                      {role.company}
                    </span>
                    <span className="mt-1.5 block text-sm text-fg-muted">{role.title}</span>
                    <span className="mt-2.5 flex items-center gap-2.5">
                      <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">{role.period}</span>
                      {role.current ? (
                        <span className="accent-soft inline-flex items-center rounded-xs px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-accent">
                          Current
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <Plus
                    aria-hidden="true"
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] lg:hidden",
                      isActive && "rotate-45",
                    )}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                // Collapsed panels hold no focusable content, so hiding them
                // from assistive tech matches what sighted users get.
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
                      "pb-8 pl-6 pr-1 pt-1 lg:animate-fade-up lg:p-0",
                      isActive ? "opacity-100" : "opacity-0 lg:opacity-100",
                      "transition-opacity duration-[var(--dur-slow)]",
                    )}
                  >
                    <p className="hidden text-sm text-fg-muted lg:block">{role.context}</p>
                    <ul className="space-y-4 lg:mt-6">
                      {role.points.map((point) => (
                        <li key={point.slice(0, 32)} className="flex gap-4 text-body text-fg-secondary">
                          <span aria-hidden="true" className="mt-[0.75rem] h-px w-4 shrink-0 bg-line-strong" />
                          <span className="max-w-prose">{point}</span>
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
