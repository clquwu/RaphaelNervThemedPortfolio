"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Github } from "lucide-react"
import Wordmark from "./wordmark"
import TitleBlock, { WIDE } from "./title-block"
import { LINKS } from "@/lib/content"

const ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export default function Nav() {
  // The name lives in the hero; it cuts into the bar only once the hero title has scrolled away.
  const [showName, setShowName] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const links = useRef<Record<string, HTMLAnchorElement | null>>({})
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const title = document.querySelector("#top h1")
    const nameObserver = new IntersectionObserver(([entry]) => setShowName(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    })
    if (title) nameObserver.observe(title)
    else setShowName(true)

    // A section is current while it crosses the middle of the viewport.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive((cur) => (cur === entry.target.id ? null : cur))
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    for (const { id } of ITEMS) {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    }

    return () => {
      nameObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  // One indicator that slides between links instead of one per link.
  useLayoutEffect(() => {
    const place = () => {
      const el = active ? links.current[active] : null
      if (!bar.current) return
      if (!el) {
        bar.current.style.opacity = "0"
        return
      }
      bar.current.style.opacity = "1"
      bar.current.style.transform = `translateX(${el.offsetLeft}px) scaleX(${el.offsetWidth})`
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [active])

  return (
    <header className="sticky top-0 z-40 border-b border-nerv-line bg-nerv-black/95">
      <div className="mx-auto flex h-16 max-w-[104rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          aria-label="Raphael Boullay--Le Fur, back to top"
          className={`flex h-full items-center text-nerv-white transition-colors duration-100 hover:text-nerv-red ${
            showName ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <TitleBlock lines={WIDE} kana={false} className="h-8 w-auto sm:hidden" />
          <Wordmark className="hidden h-[1.0625rem] w-auto -translate-y-px sm:block" />
        </a>

        <nav aria-label="Sections" className="relative flex h-full items-center gap-5 sm:gap-8">
          {/* Indicator: 1px wide, scaled to the active link's width, sitting on the bar's bottom rule. */}
          <span
            ref={bar}
            aria-hidden="true"
            className="nav-bar absolute -bottom-px left-0 h-0.5 w-px origin-left bg-nerv-red opacity-0"
          />
          {ITEMS.map((item) => {
            const current = active === item.id
            return (
              <a
                key={item.id}
                ref={(el) => {
                  links.current[item.id] = el
                }}
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`label flex h-full items-center transition-colors duration-100 hover:text-nerv-white ${
                  current ? "text-nerv-white" : "text-nerv-mute"
                }`}
              >
                {item.label}
              </a>
            )
          })}
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="-mr-2 hidden p-2 text-nerv-mute transition-colors duration-100 hover:text-nerv-white sm:block"
          >
            <Github className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
        </nav>
      </div>
    </header>
  )
}
