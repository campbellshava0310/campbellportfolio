import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { FeaturedWork } from "@/components/sections/featured-work"
import { IrrigaIQ } from "@/components/sections/irrigaiq"
import { Experience } from "@/components/sections/experience"
import { Engineering } from "@/components/sections/engineering"
import { Projects } from "@/components/sections/projects"
import { Education } from "@/components/sections/education"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <FeaturedWork />
        <IrrigaIQ />
        <Experience />
        <Engineering />
        <Projects />
        <Education />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
