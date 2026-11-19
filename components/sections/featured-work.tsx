import Image from "next/image"
import { Section, SectionHeading, FactGrid } from "@/components/primitives"
import { Apple, ArrowUpRight, GooglePlay } from "@/components/icons"
import { ripple, rippleLinks, rippleShots } from "@/lib/content"
import { RippleArchitecture } from "@/components/sections/ripple-architecture"
import { RippleCaseStudy } from "@/components/sections/ripple-case-study"

/** A store listing link. Reads as real distribution, not as a text link. */
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
      className="group flex h-14 items-center gap-3.5 rounded-md border border-line-strong bg-surface pr-5 pl-4 shadow-xs transition-[border-color,box-shadow,transform] duration-[var(--dur)] hover:-translate-y-0.5 hover:border-fg hover:shadow-sm"
    >
      <Icon className="size-6 shrink-0 text-fg" />
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[0.625rem] tracking-[0.09em] text-fg-muted uppercase">{eyebrow}</span>
        <span className="mt-1.5 text-sm font-semibold text-fg">{name}</span>
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
      className="group flex h-14 items-center justify-between gap-4 rounded-md border border-line bg-surface px-4 transition-[border-color,box-shadow,transform] duration-[var(--dur)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-xs"
    >
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-sm font-semibold text-fg">{label}</span>
        {/*
          Hostnames have no break opportunities, so `truncate` (white-space:
          nowrap) would report the whole string as this card's intrinsic minimum
          and blow out the grid at 320px. Clamping to one line with
          break-anywhere keeps the ellipsis and drops that contribution.
        */}
        <span className="mt-1.5 line-clamp-1 font-mono text-[0.6875rem] text-fg-muted [overflow-wrap:anywhere]">
          {host}
        </span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent" />
    </a>
  )
}

/** The five marketing screens published on Ripple's own site. */
function AppScreens() {
  return (
    <div className="mt-16">
      <p className="reveal label">The product</p>
      <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible">
        {rippleShots.map((shot, i) => (
          <li
            key={shot.src}
            className="reveal-media w-[58vw] shrink-0 snap-start sm:w-[34vw] lg:w-auto"
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-sm">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 58vw, (max-width: 1024px) 34vw, 220px"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-fg-secondary">{shot.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FeaturedWork() {
  return (
    <Section id="work">
      <SectionHeading
        id="work"
        index="01"
        label="Selected work"
        title="Two products, built end to end."
        intro={
          <p>
            Ripple is the one that shipped — led from architecture through to two app store listings, with payments
            moving through it. IrrigaIQ is the one that shows the architecture: four services, designed and written
            on my own.
          </p>
        }
      />

      <div className="mt-16 lg:mt-20">
        {/* Identity */}
        <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-line pb-8">
          <div className="flex items-center gap-5">
            <Image
              src={ripple.logo}
              alt=""
              width={64}
              height={64}
              className="size-14 shrink-0 rounded-lg shadow-sm sm:size-16"
            />
            <div>
              <p className="label">Flagship product</p>
              <h3 className="mt-3 text-h1 font-semibold">
                {ripple.name}
                <span className="text-fg-muted"> — {ripple.tagline}</span>
              </h3>
            </div>
          </div>
          <p className="font-mono text-xs tracking-[0.1em] text-fg-secondary uppercase">{ripple.category}</p>
        </div>

        <p className="reveal mt-10 max-w-[62ch] text-lead text-fg-secondary">{ripple.intro}</p>

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

        <AppScreens />

        <FactGrid facts={ripple.facts} className="reveal mt-16" />

        <div className="mt-20">
          <p className="reveal label mb-6">System architecture</p>
          <RippleArchitecture />
        </div>

        <RippleCaseStudy />
      </div>
    </Section>
  )
}
