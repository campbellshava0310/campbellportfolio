"use client"

import { useEffect, useRef, useState } from "react"
import { rippleChapters } from "@/lib/content"
import { FactGrid, StackList } from "@/components/primitives"
import { cn } from "@/lib/utils"

/**
 * The Ripple case study.
 *
 * Chapters are plain server-rendered prose — nothing is hidden behind a tab, so
 * the whole thing is readable, linkable and indexable. The only interactive
 * part is the sticky chapter rail, which tracks reading position.
 */
export function RippleCaseStudy() {
  const [active, setActive] = useState(rippleChapters[0].id)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodes = rippleChapters
      .map((c) => document.getElementById(`ripple-${c.id}`))
      .filter((el): el is HTMLElement => el !== null)
    if (nodes.length === 0) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id.replace("ripple-", "")
          if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top)
          else visible.delete(id)
        }
        if (visible.size === 0) return
        setActive([...visible.entries()].sort((a, b) => a[1] - b[1])[0][0])
      },
      { rootMargin: "-15% 0px -70% 0px" },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={root} className="mt-24 border-t border-line pt-12 lg:mt-32">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        {/* Chapter rail */}
        <nav aria-label="Case study chapters" className="min-w-0 lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
          <p className="label">Case study</p>
          {/* Wraps on small screens rather than scrolling sideways: four short
              chapters fit two lines, and nothing needs a hidden scroll gesture. */}
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:flex-nowrap lg:gap-0">
            {rippleChapters.map((chapter) => {
              const isActive = active === chapter.id
              return (
                <li key={chapter.id}>
                  <a
                    href={`#ripple-${chapter.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group flex items-baseline gap-3 whitespace-nowrap py-1.5 text-sm transition-colors duration-[var(--dur)] lg:border-l lg:py-2.5 lg:pl-4",
                      isActive
                        ? "text-fg lg:border-accent"
                        : "text-fg-muted hover:text-fg-secondary lg:border-line",
                    )}
                  >
                    <span className="font-mono text-[0.6875rem] tabular-nums text-fg-muted">{chapter.index}</span>
                    {chapter.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Chapters */}
        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {rippleChapters.map((chapter, i) => (
            <article
              key={chapter.id}
              id={`ripple-${chapter.id}`}
              className={cn("scroll-mt-28", i > 0 && "mt-16 border-t border-line pt-14 lg:mt-20")}
            >
              <div className="flex items-baseline gap-3">
                <span className="label tabular-nums">{chapter.index}</span>
                <span className="label">{chapter.title}</span>
              </div>

              <h3 className="reveal mt-5 max-w-[26ch] text-h3 font-medium text-fg">{chapter.lead}</h3>

              <div className="reveal mt-5 max-w-prose space-y-4 text-body text-fg-secondary">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              {chapter.facts && chapter.facts.length > 0 ? (
                <FactGrid facts={chapter.facts} columns={2} className="reveal mt-10" />
              ) : null}

              {chapter.surfaces ? (
                <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                  {chapter.surfaces.map((surface, j) => (
                    <section
                      key={surface.title}
                      className="reveal bg-bg p-6 sm:p-7"
                      style={{ "--reveal-delay": `${j * 70}ms` } as React.CSSProperties}
                    >
                      <h4 className="text-sm font-medium text-fg">{surface.title}</h4>
                      <StackList items={surface.stack} className="mt-3" />
                      <ul className="mt-5 space-y-3">
                        {surface.points.map((point) => (
                          <li key={point.slice(0, 32)} className="flex gap-3 text-sm text-fg-secondary">
                            <span
                              aria-hidden="true"
                              className="mt-[0.55rem] h-px w-3 shrink-0 bg-line-strong"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
