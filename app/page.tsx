import Nav from "@/components/site/nav"
import Hero from "@/components/site/hero"
import Projects from "@/components/site/projects"
import About from "@/components/site/about"
import Contact from "@/components/site/contact"
import Wordmark from "@/components/site/wordmark"
import Reveal from "@/components/site/reveal"
import Effects from "@/components/site/effects"
import { getRepoStats } from "@/lib/github"
import { LINKS } from "@/lib/content"

export const revalidate = 3600

export default async function Page() {
  const stats = await getRepoStats()
  const year = new Date().getFullYear()

  return (
    <>
      <a
        href="#main"
        className="label sr-only z-50 bg-nerv-red px-4 py-3 text-nerv-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <Reveal />
      <Effects />
      <main id="main">
        <Hero />
        <Projects stats={stats} />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-nerv-line">
        <div className="mx-auto flex max-w-[104rem] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-nerv-white">
            <span className="sr-only">Raphael Boullay--Le Fur</span>
            <Wordmark className="h-[0.8125rem] w-auto" />
          </p>
          <div className="label flex gap-6 text-nerv-mute">
            <span>&copy; {year}</span>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-nerv-white">
              GitHub
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-nerv-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
