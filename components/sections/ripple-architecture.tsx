"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Ripple system architecture — explorable.
 *
 * Inline SVG so it inherits the theme tokens and costs no image request. Nodes
 * are focusable: picking one lights its own edges and dims everything it has
 * nothing to do with, and the panel underneath says what it actually does.
 * Node order and routing are chosen so every run is straight or a single
 * elbow, and no line crosses a box it has no business with.
 */

type NodeId =
  | "admin" | "ios" | "android" | "nginx" | "django" | "api"
  | "mongo" | "redis" | "mapbox" | "firebase" | "ecocash"

type Node = {
  id: NodeId
  x: number
  y: number
  w: number
  h?: number
  title: string
  sub?: string
  emphasis?: boolean
  detail: string
}

const NODES: readonly Node[] = [
  { id: "admin", x: 0, y: 44, w: 192, title: "Admin", sub: "Browser", detail: "Operators reach the Django admin platform through the same edge as the mobile clients." },
  { id: "ios", x: 240, y: 44, w: 176, title: "iOS", sub: "React Native", detail: "One React Native codebase ships to the App Store. Event browsing, ticketing and the social flows." },
  { id: "android", x: 432, y: 44, w: 176, title: "Android", sub: "React Native", detail: "The same codebase on Google Play. Mapbox draws the discovery map; Firebase carries chat." },
  { id: "nginx", x: 0, y: 176, w: 608, h: 58, title: "Nginx", sub: "Reverse proxy · load balancing", detail: "The single entry point. Terminates requests and balances them across the service containers on the VPS." },
  { id: "django", x: 0, y: 286, w: 192, title: "Django", sub: "Admin platform · 2FA", detail: "A separate web application for operations — event monitoring, financial reporting, PDF export, two-factor on admin access." },
  { id: "api", x: 240, y: 286, w: 368, title: "Spring Boot REST API", sub: "Java · connection pooling", emphasis: true, detail: "The service layer both clients talk to. Java connection pooling keeps database connections efficient under concurrent load, and RBAC decides who can do what." },
  { id: "mongo", x: 240, y: 398, w: 192, title: "MongoDB", sub: "Primary store", detail: "The system of record for users, events and tickets. The admin platform reads the same store." },
  { id: "redis", x: 480, y: 398, w: 128, title: "Redis", sub: "Cache", detail: "Sits in front of the read paths so hot requests never reach MongoDB." },
  { id: "mapbox", x: 676, y: 38, w: 232, h: 48, title: "Mapbox", detail: "Geolocation and the map that discovery starts from, called straight from the mobile clients." },
  { id: "firebase", x: 676, y: 100, w: 232, h: 48, title: "Firebase", detail: "Chat and the social layer, so conversation does not run through the REST service." },
  { id: "ecocash", x: 676, y: 293, w: 232, h: 48, title: "EcoCash", detail: "The mobile money rail. Payment runs server-side so the transaction never leaves the app." },
]

type Edge = { from: NodeId; to: NodeId; d: string; hot?: boolean }

const EDGES: readonly Edge[] = [
  { from: "admin", to: "nginx", d: "M96 106 V176" },
  { from: "ios", to: "nginx", d: "M328 106 V176", hot: true },
  { from: "android", to: "nginx", d: "M520 106 V176", hot: true },
  { from: "nginx", to: "django", d: "M96 234 V286" },
  { from: "nginx", to: "api", d: "M424 234 V286", hot: true },
  { from: "api", to: "mongo", d: "M336 348 V398", hot: true },
  { from: "api", to: "redis", d: "M544 348 V398", hot: true },
  { from: "django", to: "mongo", d: "M96 348 V364 Q96 372 104 372 H280 Q288 372 288 380 V398" },
  { from: "android", to: "mapbox", d: "M608 62 H676" },
  { from: "android", to: "firebase", d: "M608 88 H636 Q644 88 644 96 V116 Q644 124 652 124 H676" },
  { from: "api", to: "ecocash", d: "M608 317 H676" },
]

const ROW_LABELS = [
  { x: 0, y: 30, text: "CLIENTS" },
  { x: 0, y: 162, text: "EDGE" },
  { x: 0, y: 272, text: "SERVICES" },
  { x: 240, y: 384, text: "DATA" },
  { x: 676, y: 30, text: "INTEGRATIONS" },
]

export function RippleArchitecture() {
  const [selected, setSelected] = useState<NodeId | null>(null)

  const connected = (id: NodeId) =>
    EDGES.filter((e) => e.from === id || e.to === id).flatMap((e) => [e.from, e.to])

  const lit = selected ? new Set<NodeId>([selected, ...connected(selected)]) : null
  const node = NODES.find((n) => n.id === selected) ?? null

  const edgeLinks = node
    ? EDGES.filter((e) => e.from === node.id || e.to === node.id).map((e) => {
        const otherId = e.from === node.id ? e.to : e.from
        return { other: NODES.find((n) => n.id === otherId)!, direction: e.from === node.id ? "→" : "←" }
      })
    : []

  return (
    <figure className="reveal">
      <div className="overflow-hidden rounded-lg border border-line bg-bg-subtle">
        <div className="no-scrollbar overflow-x-auto">
          <div className="min-w-[880px] p-6 sm:p-10">
            <svg
              viewBox="0 0 980 512"
              className="h-auto w-full"
              role="img"
              aria-labelledby="ripple-arch-title ripple-arch-desc"
            >
              <title id="ripple-arch-title">Ripple system architecture</title>
              <desc id="ripple-arch-desc">
                React Native clients on iOS and Android, plus an admin browser client, reach Nginx on a Linux VPS.
                Nginx routes to a Java Spring Boot REST API and a Django admin platform, both running as Docker
                containers. The API reads and writes MongoDB with a Redis cache in front of it, and calls out to the
                EcoCash payment gateway. The mobile clients use Mapbox for geolocation and Firebase for chat.
              </desc>

              <g transform="translate(32, 0)">
                {ROW_LABELS.map((l) => (
                  <text
                    key={l.text}
                    x={l.x}
                    y={l.y}
                    className="fill-[var(--fg-muted)] font-mono text-[10px]"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {l.text}
                  </text>
                ))}

                {/* Deployment boundary */}
                <rect
                  x="-12" y="146" width="672" height="330" rx="10"
                  fill="none" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="2 5" opacity="0.85"
                />
                <text
                  x="648" y="468" textAnchor="end"
                  className="fill-[var(--fg-muted)] font-mono text-[10px]"
                  style={{ letterSpacing: "0.1em" }}
                >
                  DOCKER · LINUX VPS
                </text>

                {/* Edges */}
                {EDGES.map((e) => {
                  const isLit = !selected || (lit!.has(e.from) && lit!.has(e.to))
                  const touches = selected && (e.from === selected || e.to === selected)
                  return (
                    <path
                      key={`${e.from}-${e.to}`}
                      d={e.d}
                      fill="none"
                      stroke={touches || (!selected && e.hot) ? "var(--accent)" : "var(--line-strong)"}
                      strokeWidth={touches ? 2 : e.hot ? 1.4 : 1}
                      strokeDasharray={e.hot ? undefined : "3 4"}
                      opacity={isLit ? 1 : 0.15}
                      className="transition-[opacity,stroke-width] duration-300"
                    />
                  )
                })}

                {/* Nodes */}
                {NODES.map((n) => {
                  const h = n.h ?? 62
                  const isSelected = selected === n.id
                  const isLit = !selected || lit!.has(n.id)
                  return (
                    <g
                      key={n.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={`${n.title}${n.sub ? `, ${n.sub}` : ""}`}
                      onClick={() => setSelected(isSelected ? null : n.id)}
                      onMouseEnter={() => setSelected(n.id)}
                      onFocus={() => setSelected(n.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setSelected(isSelected ? null : n.id)
                        }
                      }}
                      opacity={isLit ? 1 : 0.28}
                      className="cursor-pointer transition-opacity duration-300 focus:outline-hidden"
                    >
                      <rect
                        x={n.x} y={n.y} width={n.w} height={h} rx="6"
                        fill="var(--surface)"
                        stroke={isSelected || (!selected && n.emphasis) ? "var(--accent)" : "var(--line-strong)"}
                        strokeWidth={isSelected ? 2 : n.emphasis ? 1.4 : 1}
                        className="transition-[stroke,stroke-width] duration-200"
                      />
                      <text
                        x={n.x + 16}
                        y={n.sub ? n.y + h / 2 - 3 : n.y + h / 2 + 4}
                        className="pointer-events-none fill-[var(--fg)] text-[13px] font-medium"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {n.title}
                      </text>
                      {n.sub ? (
                        <text
                          x={n.x + 16}
                          y={n.y + h / 2 + 15}
                          className="pointer-events-none fill-[var(--fg-muted)] font-mono text-[10px]"
                          style={{ letterSpacing: "0.06em" }}
                        >
                          {n.sub.toUpperCase()}
                        </text>
                      ) : null}
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>
        </div>

        {/* Detail panel */}
        <div className="border-t border-line bg-bg px-6 py-5 sm:px-10" aria-live="polite">
          {node ? (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-sm font-semibold text-fg">{node.title}</p>
                {node.sub ? <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted uppercase">{node.sub}</p> : null}
              </div>
              <p className="mt-2 max-w-[70ch] text-sm text-fg-secondary">{node.detail}</p>
              {edgeLinks.length ? (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {edgeLinks.map((l) => (
                    <li key={l.other.id} className="font-mono text-[0.6875rem] text-fg-muted">
                      <span className="text-accent">{l.direction}</span> {l.other.title}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-fg-muted">
              Hover or focus any box to trace what it talks to. The solid accent line is the hot request path.
            </p>
          )}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.1em] text-fg-muted uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Primary request path
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.1em] text-fg-muted uppercase">
          <span
            aria-hidden="true"
            className="h-px w-6"
            style={{ backgroundImage: "repeating-linear-gradient(to right, var(--line-strong) 0 3px, transparent 3px 7px)" }}
          />
          Secondary and outbound
        </span>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={cn(
            "ml-auto font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors duration-[var(--dur)]",
            selected ? "text-accent hover:text-accent-hover" : "pointer-events-none text-transparent",
          )}
        >
          Clear
        </button>
      </figcaption>
    </figure>
  )
}
