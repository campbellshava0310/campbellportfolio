import type { Metadata } from "next"
import { Action, Container } from "@/components/primitives"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center py-24">
      <Container>
        <div className="max-w-prose">
          <p className="label tabular-nums">404</p>
          <h1 className="mt-5 text-h1 font-medium">There is nothing at this address.</h1>
          <p className="mt-6 text-lead text-fg-secondary">
            The link is either out of date or was never right. Everything on this site lives on one page.
          </p>
          <div className="mt-10">
            <Action href="/">Back to the portfolio</Action>
          </div>
        </div>
      </Container>
    </main>
  )
}
