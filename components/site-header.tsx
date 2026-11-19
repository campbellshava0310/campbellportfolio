"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { navigation, profile } from "@/lib/content"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"
import { Close, Download, Menu } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Every section the spy watches — including the two that are not in the nav.
 * Observing them too means the marker clears when the reader is in "Projects"
 * or "Education" rather than leaving a stale item lit.
 */
const SPY_IDS = [...navigation.map((n) => n.href.slice(1)), "irrigaiq", "projects", "education"]

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  /* Condense on scroll. rAF-gated, and state only changes when the threshold is
     actually crossed — the listener runs often, React does not. */
  useEffect(() => {
    let frame = 0
    let last = false
    const read = () => {
      frame = 0
      const next = window.scrollY > 24
      if (next !== last) {
        last = next
        setCondensed(next)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* Scroll spy. The topmost section intersecting the upper band wins, so the
     marker tracks reading position rather than whichever fired last. */
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        }
        if (visible.size === 0) return
        setActive([...visible.entries()].sort((a, b) => a[1] - b[1])[0][0])
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Reading progress. Written to a CSS custom property inside a rAF loop, so
     the bar repaints on the compositor and React never re-renders on scroll. */
  const progressRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      progressRef.current?.style.setProperty("--progress", pct.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    triggerRef.current?.focus()
  }, [])

  /* Drawer: lock the page, close on Escape, keep Tab inside the panel. */
  useEffect(() => {
    if (!menuOpen) return

    const { overflow, paddingRight } = document.body.style
    const gutter = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [menuOpen, closeMenu])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 overflow-hidden transition-[background-color,border-color,backdrop-filter,box-shadow] duration-[var(--dur-slow)]",
          condensed
            ? "border-b border-line bg-bg/85 shadow-xs backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-[var(--dur-slow)]",
            condensed ? "h-14" : "h-20",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
            aria-label={`${profile.shortName} — back to top`}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent transition-transform duration-[var(--dur)] group-hover:scale-125"
            />
            {profile.shortName}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-sm px-3.5 py-2 text-sm font-medium transition-colors duration-[var(--dur)]",
                    isActive ? "text-accent" : "text-fg-secondary hover:text-fg",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-0.5 origin-left rounded-full bg-accent transition-transform duration-[var(--dur-slow)] ease-out",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <a
              href={profile.resume}
              download=""
              className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface px-3.5 text-xs font-medium text-fg-secondary shadow-xs transition-colors duration-[var(--dur)] hover:border-line-strong hover:text-fg sm:inline-flex"
            >
              <Download className="size-3.5" />
              CV
            </a>
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-md border border-line bg-surface text-fg-secondary shadow-xs transition-colors duration-[var(--dur)] hover:text-fg md:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-opacity duration-[var(--dur-slow)]",
            condensed ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: "scaleX(var(--progress, 0))" }}
        />
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-55 md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!menuOpen}>
        <div
          onClick={closeMenu}
          className={cn(
            "absolute inset-0 bg-fg/20 backdrop-blur-sm transition-opacity duration-[var(--dur-slow)]",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Menu"
          className={cn(
            "absolute inset-x-0 top-0 origin-top border-b border-line bg-bg px-5 pt-4 pb-8 shadow-lg",
            "transition-[transform,opacity] duration-[var(--dur-slow)] ease-out",
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <div className="flex h-10 items-center justify-between">
            <span className="label">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-md border border-line text-fg-secondary"
            >
              <Close className="size-4" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-4 flex flex-col">
            {navigation.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-baseline gap-4 border-b border-line py-4 text-h3 font-semibold text-fg"
              >
                <span className="label tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={profile.resume}
              download=""
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              <Download className="size-4" />
              CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-line-strong px-4 text-sm font-medium text-fg"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
