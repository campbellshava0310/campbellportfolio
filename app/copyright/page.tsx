import type { Metadata } from "next"
import { Action, Container } from "@/components/primitives"
import { profile } from "@/lib/content"

export const metadata: Metadata = {
  title: "Restricted resource",
  description: "This project is client-owned and its source is not public.",
  robots: { index: false, follow: false },
}

export default function CopyrightPage() {
  return (
    <main className="flex min-h-screen items-center py-24">
      <Container>
        <div className="max-w-[60ch]">
          <p className="label">Access</p>
          <h1 className="mt-5 text-h1 font-semibold">This one is not mine to publish.</h1>
          <p className="mt-6 text-lead text-fg-secondary">
            I built this system, but the client owns it. The source and the running instance are theirs, so neither is
            public here.
          </p>
          <p className="mt-4 text-body text-fg-secondary">
            If you need to see the work — a walkthrough, an architecture discussion, or a reference — ask me directly
            and I will arrange what I am able to share.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Action href="/">Back to the portfolio</Action>
            <Action href={`mailto:${profile.email}`} variant="secondary">
              Email me
            </Action>
          </div>
        </div>
      </Container>
    </main>
  )
}
