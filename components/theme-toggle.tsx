"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Theme switch.
 *
 * Where the browser supports View Transitions, the new theme is revealed with a
 * circular wipe originating at the button itself, so the change reads as one
 * deliberate gesture rather than a flash. Everywhere else it swaps instantly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark"

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const startViewTransition = (document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> }
    }).startViewTransition

    if (reduced || typeof startViewTransition !== "function" || !ref.current) {
      setTheme(next)
      return
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = startViewTransition.call(document, () => setTheme(next))

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 520,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          // Whichever layer sits on top gets clipped — see globals.css.
          pseudoElement: next === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)",
          direction: next === "dark" ? "normal" : "reverse",
        },
      )
    })
  }, [resolvedTheme, setTheme])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-md border border-line text-fg-secondary",
        "transition-colors duration-[var(--dur)] hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {/* Both icons render; opacity crossfades so there is no layout tick. */}
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-[opacity,transform] duration-[var(--dur)]",
          isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-[opacity,transform] duration-[var(--dur)]",
          isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
        )}
      />
    </button>
  )
}
