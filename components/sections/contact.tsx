"use client"

import { useState } from "react"
import { Section, SectionHeading } from "@/components/primitives"
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons"
import { profile, rippleLinks } from "@/lib/content"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent" | "error"

const CHANNELS = [
  { label: "LinkedIn", value: profile.linkedin.handle, href: profile.linkedin.url, icon: LinkedIn, external: true },
  { label: "GitHub", value: profile.github.handle, href: profile.github.url, icon: GitHub, external: true },
  { label: "Ripple", value: "ripplestayconnected.com", href: rippleLinks.site, icon: ArrowUpRight, external: true },
  { label: "CV", value: "PDF, 2 pages", href: profile.resume, icon: Download, external: false },
] as const

const fieldClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-3 text-sm text-fg shadow-xs placeholder:text-fg-muted/80 " +
  "transition-[border-color,box-shadow] duration-[var(--dur)] focus:border-accent focus:outline-hidden focus:ring-2 focus:ring-accent/20"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "3b6b2513-edbe-425b-835b-37fa17089a91",
          from_name: "Portfolio enquiry",
          subject: `Portfolio enquiry from ${data.get("name")}`,
          replyto: data.get("email"),
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: data.get("botcheck"),
        }),
      })
      const result = await response.json()
      if (!result.success) throw new Error(result.message ?? "Request failed")
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        index="07"
        label="Contact"
        title="Get in touch."
        intro={
          <p>
            Open to backend, platform and delivery work. Email is the fastest way to reach me — I read everything that
            arrives there.
          </p>
        }
      />

      <div className="mt-12 grid gap-x-16 gap-y-14 lg:mt-20 lg:grid-cols-12">
        {/* Primary channel */}
        <div className="lg:col-span-6">
          <a
            href={`mailto:${profile.email}`}
            className="reveal group inline-flex max-w-full items-start gap-3 text-h2 font-semibold text-fg transition-colors duration-[var(--dur)] hover:text-accent"
          >
            <span className="break-all">{profile.email}</span>
            <Mail
              aria-hidden="true"
              className="mt-2 hidden size-5 shrink-0 text-fg-muted transition-colors duration-[var(--dur)] group-hover:text-accent sm:block"
            />
          </a>

          <ul className="reveal mt-10 overflow-hidden rounded-lg border border-line">
            {CHANNELS.map(({ label, value, href, icon: Icon, external }, i) => (
              <li key={label} className={cn(i > 0 && "border-t border-line")}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: "" })}
                  className="group flex items-center justify-between gap-6 bg-surface px-5 py-4 transition-colors duration-[var(--dur)] hover:bg-bg-subtle"
                >
                  <span className="flex shrink-0 items-center gap-3.5">
                    <Icon aria-hidden="true" className="size-4 shrink-0 text-fg-muted transition-colors duration-[var(--dur)] group-hover:text-accent" />
                    <span className="text-sm font-medium text-fg">{label}</span>
                  </span>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="line-clamp-1 font-mono text-[0.6875rem] text-fg-muted [overflow-wrap:anywhere]">
                      {value}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-fg-muted transition-transform duration-[var(--dur)] group-hover:translate-x-px group-hover:-translate-y-px"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <address className="reveal mt-10 not-italic">
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="mt-1.5 text-sm text-fg-secondary">
              {profile.roleLong} · {profile.secondRole}
            </p>
            <p className="mt-1 text-sm text-fg-muted">{profile.location}</p>
          </address>
        </div>

        {/* Message form */}
        <div className="reveal lg:col-span-5 lg:col-start-8">
          <div className="rounded-lg border border-line bg-surface p-6 shadow-xs sm:p-8">
            <p className="label">Or send a message</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              {/* Honeypot — hidden from people, tempting to bots. */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div>
                <label htmlFor="contact-name" className="label">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={cn(fieldClass, "mt-2.5")}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={cn(fieldClass, "mt-2.5")}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What are you working on?"
                  className={cn(fieldClass, "mt-2.5 resize-y")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg shadow-xs transition-[background-color,transform,box-shadow] duration-[var(--dur)] hover:bg-accent-hover hover:shadow-sm active:translate-y-px disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "text-sm transition-opacity duration-[var(--dur)]",
                    status === "error" ? "text-fg" : "text-fg-secondary",
                    status === "sent" || status === "error" ? "opacity-100" : "opacity-0",
                  )}
                >
                  {status === "sent" ? "Sent — I'll come back to you." : null}
                  {status === "error" ? `Did not send. Email me at ${profile.email}.` : null}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}
