"use client"

import { useEffect } from "react"

/**
 * One IntersectionObserver for the whole page.
 *
 * Every `.reveal` and `.reveal-media` element is observed by this single
 * instance and unobserved the moment it lands — each element settles exactly
 * once and then never moves again. Nothing here touches React state, and
 * nothing re-runs on scroll.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-media"))
    if (elements.length === 0) return

    const show = (el: HTMLElement) => {
      el.dataset.visible = "true"
    }

    // No observer, or the visitor asked for less motion: show everything now.
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(show)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
