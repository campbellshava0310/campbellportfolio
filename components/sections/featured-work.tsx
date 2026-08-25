import { Section, SectionHeading, FactGrid } from "@/components/primitives"
import { Apple, ArrowUpRight, GooglePlay } from "@/components/icons"
import { ripple, rippleLinks } from "@/lib/content"
import { RippleArchitecture } from "@/components/sections/ripple-architecture"
import { RippleCaseStudy } from "@/components/sections/ripple-case-study"
import { RippleShots } from "@/components/sections/ripple-shots"
import { cn } from "@/lib/utils"

/** A distribution link. Reads as a store listing, not as a text link. */
function StoreBadge({
  href,
  icon: Icon,
  eyebrow,
  name,
}: {
  href: string
  icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  eyebrow: string
  name: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-[3.25rem] items-center gap-3 rounded-md border border-line-strong bg-surface pl-4 pr-5",
        "transition-[border-color,transform,box-shadow] duration-[var(--dur)] hover:-translate-y-px hover:border-fg hover:shadow-sm",
      )}
    >
      <Icon className="h-[1.375rem] w-[1.375rem] shrink-0 text-fg" />
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.09em] text-fg-muted">{eyebrow}</span>
        <span className="mt-1 text-sm font-medium text-fg">{name}</span>
      </span>
    </a>
  )
}

/** A first-party product link — the website and the admin platform. */
function ProductLink({ href, label, host }: { href: string; label: string; host: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-[3.25rem] items-center justify-between gap-4 rounded-md border border-line px-4 transition-[border-color,background-color] duration-[var(--dur)] hover:border-line-strong hover:bg-surface"
    >
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-sm font-medium text-fg">{label}</span>
        {/*
          A hostname has no break opportunities, so `truncate` (white-space:
          nowrap) would still report the full string as this card's intrinsic
          minimum and blow out the grid track at 320px. Clamping to one line
          with break-anywhere keeps the single-line ellipsis and drops the
          intrinsic contribution to a character.
        */}
        <span className="mt-1.5 line-clamp-1 font-mono text-[0.6875rem] text-fg-muted [overflow-wrap:anywhere]">
          {host}
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-fg" />
    </a>
  )
}

export function FeaturedWork() {
  return (
    <Section id="work">
      <SectionHeading
        id="work"
        index="01"
        label="Selected work"
        title="One product, taken all the way to production."
        intro={
          <p>
            Ripple is the work I would want to be judged on: a system I led from architecture through to two app store
            listings, with payments moving through it and an operations platform behind it.
          </p>
        }
      />

      {/* ---------------- Ripple, front and centre ---------------- */}
      <div className="mt-16 sm:mt-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-line pb-8">
          <div>
            <p className="label">Flagship product</p>
            <h3 className="mt-4 text-h1 font-medium">
              {ripple.name}
              <span className="text-fg-muted"> — {ripple.tagline}</span>
            </h3>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-fg-secondary">{ripple.category}</p>
        </div>

        <p className="reveal mt-10 max-w-prose text-lead text-fg-secondary">{ripple.intro}</p>

        {/* Distribution */}
        <div className="reveal mt-10">
          <p className="label">Available on</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <StoreBadge href={rippleLinks.appStore} icon={Apple} eyebrow="Download on the" name="App Store" />
            <StoreBadge href={rippleLinks.play} icon={GooglePlay} eyebrow="Get it on" name="Google Play" />
            <ProductLink href={rippleLinks.site} label="Visit Ripple" host="ripplestayconnected.com" />
            <ProductLink href={rippleLinks.admin} label="Admin dashboard" host="admindashboard.ripplestayconnected.com" />
          </div>
        </div>

        <FactGrid facts={ripple.facts} className="reveal mt-14" />

        <RippleShots />

        <div className="mt-16">
          <p className="reveal label mb-6">System architecture</p>
          <RippleArchitecture />
        </div>

        <RippleCaseStudy />
      </div>
    </Section>
  )
}
