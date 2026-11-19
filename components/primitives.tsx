import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "@/components/icons"

/* -------------------------------------------------------------------------- */
/*  Layout                                                                     */
/* -------------------------------------------------------------------------- */

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-page", className)}>{children}</div>
}

/** Derives the id that ties a section to its own heading. */
export const titleIdFor = (sectionId: string) => `${sectionId}-title`

export function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      // Named landmarks: on a page this long, screen reader users should be able
      // to jump between sections by name rather than scroll through them.
      aria-labelledby={titleIdFor(id)}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

/**
 * Section header. A numbered eyebrow, a large title, and an optional intro set
 * to the right. Hierarchy comes from type and space — not from boxes.
 */
export function SectionHeading({
  id,
  index,
  label,
  title,
  intro,
  className,
}: {
  /** The enclosing Section's id; the h2 is named `<id>-title` for it. */
  id: string
  index: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("reveal", className)}>
      <div className="flex items-center gap-3">
        <span className="label tabular-nums text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
        <span className="label">{label}</span>
      </div>

      <div className="mt-7 grid gap-x-16 gap-y-6 lg:grid-cols-12">
        <h2 id={titleIdFor(id)} className="text-h2 font-semibold lg:col-span-7 lg:max-w-[16ch]">
          {title}
        </h2>
        {intro ? (
          <div className="text-lead text-fg-secondary lg:col-span-5 lg:pt-2">{intro}</div>
        ) : null}
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Actions                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Is this href an app route, or just an address?
 *
 * next/link prefetches whatever it wraps, so pointing it at a static file makes
 * the router ask for `/file.pdf/__next._tree.txt` and take a 404. Anything that
 * is not an in-app route gets a plain anchor.
 */
function isRouteHref(href: string) {
  if (/^(mailto:|tel:|https?:|#)/i.test(href)) return false
  return !/\.[a-z0-9]{2,5}($|\?)/i.test(href)
}

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--dur)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

const buttonVariants = {
  primary: "h-11 bg-accent px-5 text-accent-fg shadow-xs hover:bg-accent-hover hover:shadow-sm",
  secondary: "h-11 border border-line-strong bg-surface px-5 text-fg hover:border-fg hover:shadow-xs",
} as const

type ActionProps = {
  href: string
  variant?: keyof typeof buttonVariants
  external?: boolean
  download?: boolean
  className?: string
  children: React.ReactNode
  "aria-label"?: string
}

export function Action({ href, variant = "primary", external, download, className, children, ...rest }: ActionProps) {
  const classes = cn(buttonBase, buttonVariants[variant], className)

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
        {...rest}
      >
        {children}
        {external ? (
          <ArrowUpRight className="size-3.5 shrink-0 opacity-60 transition-transform duration-[var(--dur)] group-hover/btn:translate-x-px group-hover/btn:-translate-y-px" />
        ) : null}
      </a>
    )
  }

  if (!isRouteHref(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

/** Inline text link with a left-to-right underline wipe. */
export function TextLink({
  href,
  external,
  download,
  className,
  children,
}: {
  href: string
  external?: boolean
  download?: boolean
  className?: string
  children: React.ReactNode
}) {
  const classes = cn("link-underline font-medium text-accent transition-colors duration-[var(--dur)] hover:text-accent-hover", className)
  if (external || download || !isRouteHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode
  tone?: "neutral" | "accent"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.06em]",
        tone === "accent" ? "accent-wash-bg text-accent" : "border border-line bg-surface text-fg-secondary",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Technology list — plain text on a hairline rail, not a row of pills. */
export function StackList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-fg-muted", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden="true" className="size-[3px] rounded-full bg-line-strong" /> : null}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Key/value pairs on a hairline grid. */
export function FactGrid({
  facts,
  className,
  columns = 4,
}: {
  facts: readonly { k: string; v: string }[]
  className?: string
  columns?: 2 | 4
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 border-t border-line sm:grid-cols-2",
        columns === 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {facts.map((f) => (
        <div key={f.k} className="border-b border-line py-5 pr-8 sm:border-b-0 sm:pt-6">
          <dt className="label">{f.k}</dt>
          <dd className="mt-2.5 text-sm font-medium text-fg">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}
