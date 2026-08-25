"use client"

import { useEffect, useRef } from "react"
import { Action, Container } from "@/components/primitives"
import { ArrowDown } from "@/components/icons"
import { heroMeta, profile } from "@/lib/content"

/**
 * Hero.
 *
 * One interaction: a fine engineering grid that is only visible where the
 * pointer is, plus a few pixels of counter-parallax between the headline and
 * the metadata. The pointer position is written straight to CSS custom
 * properties inside a rAF loop and eased towards the target, so the whole
 * effect costs one composited repaint per frame and zero React renders.
 *
 * It is disabled outright for coarse pointers and for reduced-motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Target (from the pointer) and current (eased) positions, in 0..1.
    let tx = 0.5
    let ty = 0.4
    let cx = tx
    let cy = ty
    let frame = 0
    let idle = true

    const tick = () => {
      cx += (tx - cx) * 0.085
      cy += (ty - cy) * 0.085

      el.style.setProperty("--px", `${(cx * 100).toFixed(2)}%`)
      el.style.setProperty("--py", `${(cy * 100).toFixed(2)}%`)
      el.style.setProperty("--mx", (cx - 0.5).toFixed(4))
      el.style.setProperty("--my", (cy - 0.5).toFixed(4))

      // Park the loop once it has settled; the next pointer move restarts it.
      if (Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005) {
        frame = 0
        idle = true
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!idle) return
      idle = false
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      tx = (e.clientX - rect.left) / rect.width
      ty = (e.clientY - rect.top) / rect.height
      wake()
    }

    const onLeave = () => {
      tx = 0.5
      ty = 0.4
      wake()
    }

    el.dataset.interactive = "true"
    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave, { passive: true })

    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={root}
      id="top"
      className="group/hero relative isolate flex min-h-[92svh] items-center overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32"
    >
      {/* Pointer-reactive field */}
      <div
        aria-hidden="true"
        className="pointer-field absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-data-[interactive=true]/hero:opacity-100"
      />
      {/* A single hairline anchoring the composition to the grid */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-px bg-line" />

      <Container>
        <div
          className="animate-fade-up will-change-transform"
          style={{ transform: "translate3d(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 5px), 0)" }}
        >
          <p className="label flex items-center gap-2.5">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-accent" />
            </span>
            {profile.location}
            <span className="text-line-strong">/</span>
            {profile.timezone}
          </p>

          <h1 className="mt-7 text-display font-medium">
            <span className="block">Chiurai Campbell</span>
            <span className="block text-fg-secondary">Shava Mgonie</span>
          </h1>

          <p className="mt-7 font-mono text-xs uppercase tracking-[0.14em] text-fg-secondary sm:text-[0.8125rem]">
            {profile.role}
            <span aria-hidden="true" className="mx-2.5 text-line-strong">
              ·
            </span>
            {profile.secondRole}
          </p>

          <p className="mt-8 max-w-prose text-lead text-fg-secondary">{profile.positioning}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Action href="#work">Selected work</Action>
            <Action href={profile.resume} variant="secondary" download>
              Résumé
            </Action>
          </div>
        </div>

        {/* Metadata strip — counter-parallax, half the distance of the headline */}
        <dl
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-8 sm:mt-16 lg:grid-cols-4"
          style={{ transform: "translate3d(calc(var(--mx, 0) * -3px), calc(var(--my, 0) * -2px), 0)" }}
        >
          {heroMeta.map((item, i) => (
            <div key={item.label} className="reveal" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <dt className="label">{item.label}</dt>
              <dd className="mt-2.5 text-sm text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-6 right-5 hidden h-10 w-10 place-items-center rounded-full border border-line text-fg-muted transition-colors duration-[var(--dur)] hover:border-line-strong hover:text-fg sm:right-8 lg:grid lg:right-14"
      >
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  )
}
