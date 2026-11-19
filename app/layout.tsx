import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { RevealObserver } from "@/components/reveal-observer"
import { profile, rippleLinks } from "@/lib/content"
import "./globals.css"

/** One typeface, loaded as a variable font and self-hosted by next/font. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const SITE_URL = "https://campbellportfolio.netlify.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.roleLong}`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.summary,
  keywords: [
    "Software Engineer",
    "Java Engineer",
    "Backend Engineer",
    "Software Project Manager",
    "Spring Boot",
    "Django",
    "React Native",
    "Distributed Systems",
    "Fintech",
    "Harare",
    "Zimbabwe",
    "Chiurai Campbell Shava Mgonie",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: `${profile.shortName} — ${profile.roleLong}`,
    title: `${profile.name} — ${profile.roleLong}`,
    description: profile.summary,
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.roleLong}`,
    description: profile.summary,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.ico" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
  colorScheme: "light dark",
}

/** Person schema — the same facts as the page, in a form crawlers can read. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: [profile.roleLong, profile.secondRole],
  description: profile.summary,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "ZW" },
  sameAs: [profile.linkedin.url, profile.github.url],
  knowsAbout: [
    "Backend development",
    "Distributed systems",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "React Native",
    "Docker",
    "Payment systems",
    "Software project management",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "National University of Science and Technology" },
    { "@type": "CollegeOrUniversity", name: "Harare Institute of Technology" },
  ],
  worksFor: { "@type": "Organization", name: "EcoCash" },
  subjectOf: { "@type": "SoftwareApplication", name: "Ripple — Stay Connected", url: rippleLinks.site },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Without JS the observer never runs, so revealed content must not stay hidden. */}
        <noscript>
          <style>{`.reveal,.reveal-media{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        {/* White is the base. Dark is a deliberate companion, not the default. */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <RevealObserver />
        </ThemeProvider>

        <script
          type="application/ld+json"
          // Static object defined above — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  )
}
