import Image from "next/image"
import { Container, StackList } from "@/components/primitives"
import { ArrowUpRight, GitHub } from "@/components/icons"
import { irrigaiq, irrigaiqRepos } from "@/lib/content"
import { IrrigaIQDemo } from "@/components/sections/irrigaiq-demo"
import { cn } from "@/lib/utils"

const REPOS = [
  { label: "Backend", sub: "Java · Spring Boot", href: irrigaiqRepos.backend },
  { label: "Web", sub: "React · Vite", href: irrigaiqRepos.web },
  { label: "Mobile", sub: "Expo · React Native", href: irrigaiqRepos.mobile },
  { label: "ML", sub: "Python · scikit-learn", href: irrigaiqRepos.ml },
] as const

function RepoLink({ label, sub, href }: { label: string; sub: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-14 items-center justify-between gap-4 rounded-md border border-line bg-surface px-4 transition-[border-color,box-shadow,transform] duration-[var(--dur)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-xs"
    >
      <span className="flex min-w-0 items-center gap-3">
        <GitHub aria-hidden="true" className="size-4 shrink-0 text-fg-muted transition-colors duration-[var(--dur)] group-hover:text-accent" />
        <span className="flex min-w-0 flex-col leading-none">
          <span className="text-sm font-semibold text-fg">{label}</span>
          <span className="mt-1.5 line-clamp-1 font-mono text-[0.6875rem] text-fg-muted">{sub}</span>
        </span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent" />
    </a>
  )
}

/**
 * IrrigaIQ.
 *
 * The second major piece of work. Ripple is the product that shipped; this is
 * the one that shows the architecture. It gets its own full-bleed opening image
 * so the two flagships do not read as the same kind of thing.
 */
export function IrrigaIQ() {
  return (
    <section id="irrigaiq" aria-labelledby="irrigaiq-title" className="scroll-mt-24 border-t border-line py-20 sm:py-24 lg:py-28">
      <Container>
        {/* Identity */}
        <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="flex items-center gap-5">
            <Image
              src={irrigaiq.logo}
              alt=""
              width={64}
              height={64}
              className="size-14 shrink-0 rounded-lg shadow-sm sm:size-16"
            />
            <div>
              <p className="label">Platform</p>
              <h3 id="irrigaiq-title" className="mt-3 text-h1 font-semibold">
                {irrigaiq.name}
                <span className="text-fg-muted"> — {irrigaiq.tagline}</span>
              </h3>
            </div>
          </div>
          <p className="font-mono text-xs tracking-[0.1em] text-fg-secondary uppercase">{irrigaiq.category}</p>
        </div>

        <p className="reveal mt-10 max-w-[62ch] text-lead text-fg-secondary">{irrigaiq.intro}</p>
      </Container>

      {/* Opening image, wider than the text column */}
      <Container className="mt-12">
        <figure className="reveal-media relative aspect-16/9 overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-sm sm:aspect-21/9">
          <Image
            src={irrigaiq.image.src}
            alt={irrigaiq.image.alt}
            fill
            sizes="(max-width: 1240px) 94vw, 1144px"
            loading="lazy"
            className="object-cover"
          />
        </figure>
      </Container>

      <Container>
        {/* Source */}
        <div className="reveal mt-12">
          <p className="label">Source — four repositories, MIT</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REPOS.map((r) => (
              <RepoLink key={r.href} {...r} />
            ))}
          </div>
        </div>

        {/* What shaped it */}
        <div className="mt-20">
          <p className="reveal label">What shaped it</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
            {irrigaiq.context.map((item) => (
              <div key={item.title} className="bg-bg p-6 sm:p-7">
                <h4 className="text-sm font-semibold text-fg">{item.title}</h4>
                <p className="mt-3 text-sm text-fg-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The ground it is built for */}
        <figure className="mt-16">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            {irrigaiq.gallery.map((img, i) => (
              <div
                key={img.src}
                className={cn(
                  // One row height across all four on large screens: a shared
                  // aspect ratio would make the two-column images half again as
                  // tall as their neighbours.
                  "reveal-media relative aspect-4/3 overflow-hidden rounded-lg bg-bg-subtle lg:aspect-auto lg:h-64",
                  // The first two carry the scene; the last two are detail.
                  i < 2 ? "lg:col-span-2" : "lg:col-span-1",
                )}
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 46vw, 23vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <figcaption className="reveal mt-4 text-xs text-fg-muted">
            Imagery from the IrrigaIQ web app — the farms, crops and equipment the platform plans around.
          </figcaption>
        </figure>

        {/* How it is built */}
        <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* Sticky: the service grid beside it is several screens tall. */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="reveal label">How it is built</p>
            <p className="reveal mt-5 max-w-[42ch] text-body text-fg-secondary">
              The water balance owns the decisions. The models give a second opinion with their
              drivers, and the assistant explains — it never replaces either.
            </p>
            <div className="reveal-media relative mt-8 hidden aspect-4/3 overflow-hidden rounded-lg border border-line bg-bg-subtle lg:block">
              <Image
                src={irrigaiq.secondImage.src}
                alt={irrigaiq.secondImage.alt}
                fill
                sizes="340px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="reveal grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {irrigaiq.services.map((service) => (
                <section key={service.title} className="bg-bg p-6 sm:p-7">
                  <h4 className="text-sm font-semibold text-fg">{service.title}</h4>
                  <StackList items={service.stack} className="mt-3" />
                  <ul className="mt-5 space-y-3">
                    {service.points.map((point) => (
                      <li key={point.slice(0, 32)} className="flex gap-3 text-sm text-fg-secondary">
                        <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>

        <IrrigaIQDemo />

        {/* Facts */}
        <dl className="reveal mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {irrigaiq.facts.map((f) => (
            <div key={f.k} className="border-b border-line py-5 pr-8 sm:border-b-0 sm:pt-6">
              <dt className="label">{f.k}</dt>
              <dd className="mt-2.5 text-sm font-medium text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>

        <p className="reveal mt-8 max-w-[70ch] text-xs text-fg-muted">
          Model figures are from the service&rsquo;s own model cards: held-out evaluation for
          irrigation need and pump failure risk, and simulated meters for water anomaly. They
          describe the models, not a production deployment.
        </p>
      </Container>
    </section>
  )
}
