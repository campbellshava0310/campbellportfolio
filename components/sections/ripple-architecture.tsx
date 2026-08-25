/**
 * Ripple system architecture.
 *
 * Drawn as inline SVG so it inherits the theme tokens directly and costs no
 * image request. The accented path is the hot request path — client through
 * the edge to the service layer and its primary store; everything drawn in a
 * dashed hairline is a secondary or outbound dependency.
 */

const BOX_FILL = "var(--surface)"
const BOX_STROKE = "var(--border-strong)"
const LINE = "var(--border-strong)"
const HOT = "var(--accent)"

function Box({
  x,
  y,
  w,
  h = 62,
  title,
  sub,
  emphasis,
}: {
  x: number
  y: number
  w: number
  h?: number
  title: string
  sub?: string
  emphasis?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={BOX_FILL}
        stroke={emphasis ? HOT : BOX_STROKE}
        strokeWidth={emphasis ? 1.4 : 1}
      />
      <text
        x={x + 16}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        className="fill-[var(--fg)] text-[13px] font-medium"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={x + 16}
          y={y + h / 2 + 15}
          className="fill-[var(--fg-muted)] font-mono text-[10px]"
          style={{ letterSpacing: "0.06em" }}
        >
          {sub.toUpperCase()}
        </text>
      ) : null}
    </g>
  )
}

function RowLabel({ x = 0, y, children }: { x?: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-[var(--fg-muted)] font-mono text-[10px]" style={{ letterSpacing: "0.12em" }}>
      {children}
    </text>
  )
}

export function RippleArchitecture() {
  return (
    <figure className="reveal">
      <div className="overflow-x-auto rounded-lg border border-line bg-bg-subtle no-scrollbar">
        <div className="min-w-[880px] p-6 sm:p-10">
          <svg
            viewBox="0 0 980 512"
            className="h-auto w-full"
            role="img"
            aria-labelledby="ripple-arch-title ripple-arch-desc"
          >
            <title id="ripple-arch-title">Ripple system architecture</title>
            <desc id="ripple-arch-desc">
              React Native clients on iOS and Android, plus an admin browser client, reach Nginx on a Linux VPS. Nginx
              routes to a Java Spring Boot REST API and a Django admin platform, both running as Docker containers. The
              API reads and writes MongoDB with a Redis cache in front of it, and calls out to the EcoCash payment
              gateway. The mobile clients use Mapbox for geolocation and Firebase for chat.
            </desc>

            <g transform="translate(32, 0)">
              {/* ---------------- Row labels ---------------- */}
              <RowLabel y={30}>CLIENTS</RowLabel>
              <RowLabel y={162}>EDGE</RowLabel>
              <RowLabel y={272}>SERVICES</RowLabel>
              <RowLabel x={240} y={384}>
                DATA
              </RowLabel>

              {/* ---------------- Deployment boundary ---------------- */}
              <rect
                x="-12"
                y="146"
                width="672"
                height="330"
                rx="10"
                fill="none"
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="2 5"
                opacity="0.85"
              />
              <text
                x="648"
                y="468"
                textAnchor="end"
                className="fill-[var(--fg-muted)] font-mono text-[10px]"
                style={{ letterSpacing: "0.1em" }}
              >
                DOCKER · LINUX VPS
              </text>

              {/* ---------------- Connections ----------------
                  Node order is chosen so every run is straight or a single
                  elbow, and no line crosses a box it has nothing to do with. */}

              {/* Clients into the edge. The two mobile clients are the hot path. */}
              <path d="M96 106 V176" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />
              <path d="M328 106 V176" fill="none" stroke={HOT} strokeWidth="1.4" />
              <path d="M520 106 V176" fill="none" stroke={HOT} strokeWidth="1.4" />

              {/* Edge into the services */}
              <path d="M96 234 V286" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />
              <path d="M424 234 V286" fill="none" stroke={HOT} strokeWidth="1.4" />

              {/* Service layer into its stores */}
              <path d="M336 348 V398" fill="none" stroke={HOT} strokeWidth="1.4" />
              <path d="M544 348 V398" fill="none" stroke={HOT} strokeWidth="1.4" />

              {/* Admin platform reads the same primary store */}
              <path
                d="M96 348 V364 Q96 372 104 372 H280 Q288 372 288 380 V398"
                fill="none"
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="3 4"
              />

              {/* Outbound integrations, all off the right edge */}
              <path d="M608 62 H676" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />
              <path d="M608 88 H636 Q644 88 644 96 V116 Q644 124 652 124 H676" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />
              <path d="M608 317 H676" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />

              {/* ---------------- Nodes ---------------- */}
              <Box x={0} y={44} w={192} title="Admin" sub="Browser" />
              <Box x={240} y={44} w={176} title="iOS" sub="React Native" />
              <Box x={432} y={44} w={176} title="Android" sub="React Native" />

              <Box x={0} y={176} w={608} h={58} title="Nginx" sub="Reverse proxy · load balancing" />

              <Box x={0} y={286} w={192} title="Django" sub="Admin platform · 2FA" />
              <Box x={240} y={286} w={368} title="Spring Boot REST API" sub="Java · connection pooling" emphasis />

              <Box x={240} y={398} w={192} title="MongoDB" sub="Primary store" />
              <Box x={480} y={398} w={128} title="Redis" sub="Cache" />

              {/* Integrations column */}
              <text
                x="676"
                y={30}
                className="fill-[var(--fg-muted)] font-mono text-[10px]"
                style={{ letterSpacing: "0.12em" }}
              >
                INTEGRATIONS
              </text>
              <Box x={676} y={38} w={232} h={48} title="Mapbox" />
              <Box x={676} y={100} w={232} h={48} title="Firebase" />
              <Box x={676} y={293} w={232} h={48} title="EcoCash" />
              <text x={806} y={70} className="fill-[var(--fg-muted)] font-mono text-[10px]" textAnchor="start">
                geolocation
              </text>
              <text x={806} y={132} className="fill-[var(--fg-muted)] font-mono text-[10px]" textAnchor="start">
                chat
              </text>
              <text x={806} y={325} className="fill-[var(--fg-muted)] font-mono text-[10px]" textAnchor="start">
                payments
              </text>
            </g>
          </svg>
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-muted">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Primary request path
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-muted">
          <span
            aria-hidden="true"
            className="h-px w-6"
            style={{ backgroundImage: "repeating-linear-gradient(to right, var(--border-strong) 0 3px, transparent 3px 7px)" }}
          />
          Secondary and outbound
        </span>
      </figcaption>
    </figure>
  )
}
