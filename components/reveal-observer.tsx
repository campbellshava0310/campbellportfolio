"use client"

import { useEffect } from "react"

/**
 * One IntersectionObserver for the whole page.
 *
 * Every `.reveal` element on the document is observed by this single instance
 * and unobserved the moment it lands, rather than each section mounting its own
 * observer or — worse — re-rendering on scroll. Nothing here touches React state.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
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
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
