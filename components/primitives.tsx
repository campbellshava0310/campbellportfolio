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
      // Named landmarks: on a page this long, screen reader users should be
      // able to jump between sections by name rather than scroll through them.
      aria-labelledby={titleIdFor(id)}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

/**
 * Section header. An index and label on one line, the title beneath.
 * Hierarchy comes from type and a hairline — never from a card.
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
      <div className="hairline" />
      <div className="flex items-baseline gap-3 pt-4">
        <span className="label tabular-nums">{index}</span>
        <span className="label">{label}</span>
      </div>
      <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-12">
        <h2 id={titleIdFor(id)} className="text-h2 font-medium lg:col-span-6 lg:max-w-[14ch]">
          {title}
        </h2>
        {intro ? (
          <div className="text-body text-fg-secondary lg:col-span-5 lg:col-start-8 lg:pt-1">{intro}</div>
        ) : null}
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Actions                                                                    */
/* -------------------------------------------------------------------------- */

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "transition-[background-color,border-color,color,transform] duration-[var(--dur)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

const buttonVariants = {
  primary: "bg-fg text-bg hover:bg-fg/90 px-[1.125rem] h-11",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-fg/[0.03] px-[1.125rem] h-11",
} as const

type ButtonVariant = keyof typeof buttonVariants

type ActionProps = {
  href: string
  variant?: ButtonVariant
  external?: boolean
  download?: boolean
  className?: string
  children: React.ReactNode
  "aria-label"?: string
}

export function Action({
  href,
  variant = "primary",
  external,
  download,
  className,
  children,
  ...rest
}: ActionProps) {
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
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-55 transition-transform duration-[var(--dur)] group-hover/btn:translate-x-px group-hover/btn:-translate-y-px" />
        ) : null}
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
  className,
  children,
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  const classes = cn(
    "link-underline text-accent transition-colors duration-[var(--dur)] hover:text-accent-hover",
    className,
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-line px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.06em] text-fg-secondary",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Technology list. Plain text separated by hairline dots — not pills. */
export function StackList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-fg-muted", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-line-strong" /> : null}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Key/value pairs on a hairline grid. Used for project and case-study facts. */
export function FactGrid({
  facts,
  className,
  columns = 4,
}: {
  facts: readonly { k: string; v: string }[]
  className?: string
  columns?: 2 | 3 | 4
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns]
  return (
    <dl className={cn("grid grid-cols-1 gap-px overflow-hidden border-t border-line", cols, className)}>
      {facts.map((f) => (
        <div key={f.k} className="border-b border-line py-4 pr-6 sm:border-b-0 sm:pt-5">
          <dt className="label">{f.k}</dt>
          <dd className="mt-2 text-sm text-fg">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}
