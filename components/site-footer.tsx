import { Container } from "@/components/primitives"
import { profile, rippleLinks } from "@/lib/content"

const LINKS = [
  { label: "LinkedIn", href: profile.linkedin.url, external: true },
  { label: "GitHub", href: profile.github.url, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "Ripple", href: rippleLinks.site, external: true },
  { label: "CV", href: profile.resume, external: false, download: true },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-subtle py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="mt-1.5 text-sm text-fg-secondary">
              {profile.roleLong} · {profile.secondRole}
            </p>
            <p className="mt-1 text-sm text-fg-muted">{profile.location}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...("download" in link && link.download ? { download: "" } : {})}
                    className="link-underline text-sm text-fg-secondary transition-colors duration-[var(--dur)] hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a
            href="#top"
            className="font-mono text-[0.6875rem] tracking-[0.1em] text-fg-muted uppercase transition-colors duration-[var(--dur)] hover:text-fg"
          >
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  )
}
