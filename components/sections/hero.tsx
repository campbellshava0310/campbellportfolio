import Image from "next/image"
import { Action, Container } from "@/components/primitives"
import { heroMeta, profile } from "@/lib/content"

/**
 * Hero.
 *
 * A server component — there is no interactive behaviour here at all. Nothing
 * tracks the cursor and nothing loops; the composition settles once on load and
 * then holds still. The only motion is the entrance, handled by the shared
 * reveal observer.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Type */}
          <div className="lg:col-span-7">
            <p className="reveal label flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {profile.location}
              <span aria-hidden="true" className="text-line-strong">/</span>
              {profile.timezone}
            </p>

            <h1 className="reveal mt-6 text-display font-semibold" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
              <span className="block">Chiurai Campbell</span>
              <span className="block text-fg-secondary">Shava Mgonie</span>
            </h1>

            {/*
              Two roles, each kept whole. Left as one string they break mid-title
              on a phone ("… / JAVA ⏎ ENGINEER ·"), so they wrap as units and the
              separator only appears when both sit on one line.
            */}
            <p
              className="reveal mt-7 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.14em] text-fg-secondary uppercase sm:text-[0.8125rem]"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <span className="whitespace-nowrap">{profile.roleLong}</span>
              <span aria-hidden="true" className="hidden text-line-strong sm:inline">
                ·
              </span>
              <span className="whitespace-nowrap">{profile.secondRole}</span>
            </p>

            <p
              className="reveal mt-8 max-w-[52ch] text-lead text-fg-secondary"
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              {profile.positioning}
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-3"
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <Action href="#work">Selected work</Action>
              <Action href={profile.resume} variant="secondary" download>
                Download CV
              </Action>
            </div>
          </div>

          {/* Portrait. An offset accent panel gives it depth without a gradient. */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[22rem] lg:ml-auto lg:mr-0">
              <div
                aria-hidden="true"
                className="reveal absolute -right-4 -bottom-4 h-[88%] w-[88%] rounded-lg border border-accent/20 bg-accent/10 sm:-right-5 sm:-bottom-5"
              />
              <div className="reveal-media relative aspect-4/5 overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-md">
                <Image
                  src="/portrait.jpg"
                  alt={`${profile.name}, software engineer, Harare`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 352px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata strip */}
        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-10 lg:mt-20 lg:grid-cols-4">
          {heroMeta.map((item, i) => (
            <div key={item.label} className="reveal" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <dt className="label">{item.label}</dt>
              <dd className="mt-3 text-sm font-medium text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
