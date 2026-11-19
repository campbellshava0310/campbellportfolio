"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { Section, SectionHeading, StackList } from "@/components/primitives"
import { ArrowUpRight, Plus } from "@/components/icons"
import { projects, type Project } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Other projects.
 *
 * Rows rather than a grid of matching tiles, so nothing here competes with
 * Ripple. Each row carries what a reader needs to judge it — role, stack,
 * outcome — with the engineering detail one click away rather than behind a
 * hover state a keyboard or a touchscreen cannot reach.
 */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const uid = useId()
  const panelId = `${uid}-detail`
  const hasImage = Boolean(project.image)

  return (
    <article className="reveal group border-b border-line py-10 sm:py-14">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <div className={cn("lg:col-span-6", !hasImage && "lg:col-span-7")}>
          <div className="flex items-center gap-3">
            <span className="label tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-6 bg-accent/40" />
            <span className="label">{project.category}</span>
          </div>

          <h3 className="mt-5 text-h3 font-semibold text-fg">{project.title}</h3>

          <p className="mt-4 max-w-[58ch] text-body text-fg-secondary">{project.summary}</p>

          {/* Fixed label column so values line up down the page. */}
          <dl className="mt-6 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm">
            <dt className="label pt-1">Role</dt>
            <dd className="text-fg-secondary">{project.role}</dd>
            {project.outcome ? (
              <>
                <dt className="label pt-1">Outcome</dt>
                <dd className="font-medium text-fg">{project.outcome}</dd>
              </>
            ) : null}
          </dl>

          {/* Expandable engineering detail */}
          <div
            id={panelId}
            role="region"
            aria-hidden={!open}
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows,opacity] duration-[var(--dur-slow)] ease-out",
              open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0">
              <p className="max-w-[58ch] border-l-2 border-accent/50 pl-5 text-sm text-fg-secondary">
                {project.detail}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary transition-colors duration-[var(--dur)] hover:text-fg"
            >
              <Plus
                aria-hidden="true"
                className={cn("size-3.5 transition-transform duration-[var(--dur)]", open && "rotate-45")}
              />
              {open ? "Less" : "How it was built"}
            </button>

            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-[var(--dur)] hover:text-accent-hover"
              >
                <span className="link-underline">{link.label}</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-[var(--dur)] group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
              </a>
            ))}
          </div>

          {hasImage ? <StackList items={project.stack} className="mt-8" /> : null}
        </div>

        {project.image ? (
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="reveal-media relative aspect-16/10 overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-sm">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 460px"
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ) : (
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label">Built with</p>
            <StackList items={project.stack} className="mt-4" />
          </div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section id="projects" className="bg-bg-subtle">
      <SectionHeading
        id="projects"
        index="04"
        label="Other projects"
        title="Systems built around the flagship."
        intro={
          <p>
            An operations platform, a hardware-timed real-time system, and an internal automation — different problems,
            the same concern with what happens after the demo.
          </p>
        }
      />

      <div className="mt-12 border-t border-line lg:mt-16">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
