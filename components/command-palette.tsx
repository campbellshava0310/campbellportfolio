"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { irrigaiqRepos, navigation, profile, rippleLinks } from "@/lib/content"
import { ArrowUpRight, Check, GitHub, Mail, Moon, Search, Sun } from "@/components/icons"
import { cn } from "@/lib/utils"

type Item = {
  id: string
  label: string
  group: "Go to" | "Open" | "Actions"
  hint?: string
  keywords?: string
  run: (ctx: { setTheme: (t: string) => void; isDark: boolean }) => void | Promise<void>
  /** Shown briefly in place of the hint after the item runs. */
  confirm?: string
  external?: boolean
}

const jump = (hash: string) => () => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  else window.location.hash = hash
}

const open = (url: string) => () => {
  // Braces matter: window.open returns a Window, and the Item.run contract is void.
  window.open(url, "_blank", "noopener,noreferrer")
}

const ITEMS: Item[] = [
  ...navigation.map((n) => ({
    id: `nav-${n.href}`,
    label: n.label,
    group: "Go to" as const,
    keywords: "section jump scroll",
    run: jump(n.href),
  })),
  { id: "nav-irrigaiq", label: "IrrigaIQ", group: "Go to", keywords: "irrigation farm platform section", run: jump("#irrigaiq") },
  { id: "nav-projects", label: "Other projects", group: "Go to", keywords: "bmx lunch admin", run: jump("#projects") },
  { id: "nav-education", label: "Education & certifications", group: "Go to", keywords: "degree nust hit azure", run: jump("#education") },

  { id: "open-ripple", label: "Ripple website", group: "Open", hint: "ripplestayconnected.com", external: true, run: open(rippleLinks.site) },
  { id: "open-appstore", label: "Ripple on the App Store", group: "Open", hint: "apps.apple.com", external: true, run: open(rippleLinks.appStore) },
  { id: "open-play", label: "Ripple on Google Play", group: "Open", hint: "play.google.com", external: true, run: open(rippleLinks.play) },
  { id: "open-admin", label: "Ripple admin dashboard", group: "Open", hint: "admindashboard…", external: true, run: open(rippleLinks.admin) },
  { id: "open-iq-backend", label: "IrrigaIQ Backend", group: "Open", hint: "Java · Spring Boot", external: true, run: open(irrigaiqRepos.backend) },
  { id: "open-iq-web", label: "IrrigaIQ Web", group: "Open", hint: "React · Vite", external: true, run: open(irrigaiqRepos.web) },
  { id: "open-iq-mobile", label: "IrrigaIQ Mobile", group: "Open", hint: "Expo · React Native", external: true, run: open(irrigaiqRepos.mobile) },
  { id: "open-iq-ml", label: "IrrigaIQ ML", group: "Open", hint: "Python · scikit-learn", external: true, run: open(irrigaiqRepos.ml) },
  { id: "open-github", label: "GitHub profile", group: "Open", hint: profile.github.handle, external: true, run: open(profile.github.url) },
  { id: "open-linkedin", label: "LinkedIn", group: "Open", hint: profile.linkedin.handle, external: true, run: open(profile.linkedin.url) },

  {
    id: "act-cv",
    label: "Download the CV",
    group: "Actions",
    hint: "PDF, 2 pages",
    keywords: "resume",
    run: () => {
      const a = document.createElement("a")
      a.href = profile.resume
      a.download = ""
      a.click()
    },
  },
  {
    id: "act-email",
    label: "Copy email address",
    group: "Actions",
    hint: profile.email,
    confirm: "Copied",
    run: async () => {
      try {
        await navigator.clipboard.writeText(profile.email)
      } catch {
        window.location.href = `mailto:${profile.email}`
      }
    },
  },
  { id: "act-mail", label: "Send an email", group: "Actions", hint: profile.email, run: () => { window.location.href = `mailto:${profile.email}` } },
  {
    id: "act-theme",
    label: "Toggle theme",
    group: "Actions",
    keywords: "dark light mode",
    run: ({ setTheme, isDark }) => setTheme(isDark ? "light" : "dark"),
  },
]

/**
 * Ranks an item against the query. Returns null when it should not appear.
 *
 * A plain subsequence match is far too generous on a short list — "ecoc"
 * happily matches "Work · section jump scroll" through scattered letters. So a
 * subsequence only counts when it is tight (the matched span stays close to the
 * query length) and starts on a word boundary.
 */
function score(item: Item, query: string): number | null {
  if (!query) return 0
  const q = query.toLowerCase().trim()
  if (!q) return 0

  const label = item.label.toLowerCase()
  const hay = `${item.label} ${item.hint ?? ""} ${item.keywords ?? ""}`.toLowerCase()

  if (label.startsWith(q)) return 1000
  const labelAt = label.indexOf(q)
  if (labelAt >= 0) return 800 - labelAt
  const hayAt = hay.indexOf(q)
  if (hayAt >= 0) return 600 - hayAt

  // Initials: "rw" matches "Ripple website".
  const initials = hay.split(/[^a-z0-9]+/).filter(Boolean).map((w) => w[0]).join("")
  if (initials.includes(q)) return 500

  if (q.length < 3) return null

  let i = -1
  let start = -1
  for (const ch of q) {
    i = hay.indexOf(ch, i + 1)
    if (i === -1) return null
    if (start === -1) start = i
  }
  const span = i - start + 1
  const tight = span <= q.length * 3
  const onBoundary = start === 0 || /[^a-z0-9]/.test(hay[start - 1] ?? "")
  return tight && onBoundary ? 200 - span : null
}

export function CommandPalette() {
  const [mounted, setMounted] = useState(false)
  const [openState, setOpenState] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [confirmed, setConfirmed] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const results = useMemo(() => {
    const scored = ITEMS.map((item) => ({ item, s: score(item, query) }))
      .filter((r): r is { item: Item; s: number } => r.s !== null)
      .sort((a, b) => b.s - a.s)
    return scored.map((r) => r.item)
  }, [query])

  const grouped = useMemo(() => {
    const out: { group: Item["group"]; items: Item[] }[] = []
    for (const g of ["Go to", "Open", "Actions"] as const) {
      const items = results.filter((i) => i.group === g)
      if (items.length) out.push({ group: g, items })
    }
    return out
  }, [results])

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped])

  const close = useCallback(() => {
    setOpenState(false)
    setQuery("")
    setActive(0)
  }, [])

  const runItem = useCallback(
    async (item: Item) => {
      await item.run({ setTheme, isDark: resolvedTheme === "dark" })
      if (item.confirm) {
        setConfirmed(item.id)
        setTimeout(() => setConfirmed(null), 1400)
        return
      }
      close()
    },
    [close, resolvedTheme, setTheme],
  )

  /* Open with ⌘K / Ctrl+K from anywhere. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpenState((v) => !v)
        return
      }
      // "/" opens too, unless the visitor is typing in a field.
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      if (e.key === "/" && !typing && !openState) {
        e.preventDefault()
        setOpenState(true)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [openState])

  /* Lock the page and focus the field while open. */
  useEffect(() => {
    if (!openState) return
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
    }
  }, [openState])

  useEffect(() => setActive(0), [query])

  // Keep the highlighted row in view as the selection moves.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" })
  }, [active])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = flat[active]
      if (item) void runItem(item)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Trigger in the header */}
      <button
        type="button"
        onClick={() => setOpenState(true)}
        aria-label="Open command palette"
        className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface pr-2 pl-3 text-xs text-fg-muted shadow-xs transition-colors duration-[var(--dur)] hover:border-line-strong hover:text-fg lg:inline-flex"
      >
        <Search className="size-3.5" />
        <span>Search</span>
        <kbd className="ml-1 rounded-xs border border-line bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-muted">
          ⌘K
        </kbd>
      </button>

      {openState ? (
        <div className="fixed inset-0 z-70 flex items-start justify-center px-4 pt-[12vh]">
          <div className="absolute inset-0 bg-fg/25 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-lg border border-line bg-bg shadow-lg"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-fg-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, open a repo, copy my email…"
                aria-label="Search commands"
                aria-expanded="true"
                aria-controls="command-results"
                aria-activedescendant={flat[active] ? `cmd-${flat[active].id}` : undefined}
                role="combobox"
                className="h-14 w-full bg-transparent text-sm text-fg outline-hidden placeholder:text-fg-muted"
              />
              <kbd className="hidden shrink-0 rounded-xs border border-line bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-muted sm:block">
                esc
              </kbd>
            </div>

            <ul ref={listRef} id="command-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-fg-muted">Nothing matches “{query}”.</li>
              ) : (
                grouped.map((g) => (
                  <li key={g.group}>
                    <p className="label px-3 pt-3 pb-2">{g.group}</p>
                    <ul>
                      {g.items.map((item) => {
                        const idx = flat.indexOf(item)
                        const isActive = idx === active
                        return (
                          <li key={item.id}>
                            <button
                              id={`cmd-${item.id}`}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              data-active={isActive}
                              onMouseMove={() => setActive(idx)}
                              onClick={() => void runItem(item)}
                              className={cn(
                                "flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left transition-colors duration-100",
                                isActive ? "bg-accent text-accent-fg" : "text-fg hover:bg-bg-subtle",
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                {item.group === "Open" && item.id.includes("iq-") ? (
                                  <GitHub className={cn("size-3.5 shrink-0", isActive ? "opacity-80" : "text-fg-muted")} />
                                ) : item.id === "act-email" || item.id === "act-mail" ? (
                                  <Mail className={cn("size-3.5 shrink-0", isActive ? "opacity-80" : "text-fg-muted")} />
                                ) : item.id === "act-theme" ? (
                                  resolvedTheme === "dark" ? (
                                    <Sun className={cn("size-3.5 shrink-0", isActive ? "opacity-80" : "text-fg-muted")} />
                                  ) : (
                                    <Moon className={cn("size-3.5 shrink-0", isActive ? "opacity-80" : "text-fg-muted")} />
                                  )
                                ) : null}
                                <span className="truncate text-sm font-medium">{item.label}</span>
                              </span>
                              <span className="flex shrink-0 items-center gap-2">
                                {confirmed === item.id ? (
                                  <span className="flex items-center gap-1.5 font-mono text-[0.6875rem]">
                                    <Check className="size-3" />
                                    {item.confirm}
                                  </span>
                                ) : item.hint ? (
                                  <span
                                    className={cn(
                                      "hidden max-w-[16ch] truncate font-mono text-[0.6875rem] sm:block",
                                      isActive ? "opacity-75" : "text-fg-muted",
                                    )}
                                  >
                                    {item.hint}
                                  </span>
                                ) : null}
                                {item.external ? (
                                  <ArrowUpRight className={cn("size-3.5", isActive ? "opacity-75" : "text-fg-muted")} />
                                ) : null}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5">
              {[
                { k: "↑↓", v: "navigate" },
                { k: "↵", v: "select" },
                { k: "esc", v: "close" },
              ].map((h) => (
                <span key={h.k} className="flex items-center gap-1.5 font-mono text-[0.625rem] text-fg-muted">
                  <kbd className="rounded-xs border border-line bg-bg-subtle px-1.5 py-0.5">{h.k}</kbd>
                  {h.v}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
