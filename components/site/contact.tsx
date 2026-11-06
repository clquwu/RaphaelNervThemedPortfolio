import { ArrowUpRight } from "lucide-react"
import ContactForm from "./contact-form"
import { LINKS } from "@/lib/content"

const CHANNELS = [
  { name: "GitHub", handle: "clquwu", href: LINKS.github },
  { name: "LinkedIn", handle: "raphael-boullay-le-fur", href: LINKS.linkedin },
]

function Tape() {
  const text = "Available for internships"
  const run = Array.from({ length: 8 })
  return (
    <div className="overflow-hidden bg-nerv-red text-nerv-black">
      <p className="sr-only">{text}</p>
      <div className="tape-track" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {run.map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="label whitespace-nowrap px-6 py-3 text-[0.9375rem] font-bold tracking-[0.14em]">
                  {text}
                </span>
                <span
                  className="h-3.5 w-12"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, #050505 0 5px, transparent 5px 10px)",
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <Tape />
      <div className="mx-auto grid max-w-[104rem] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="contact-title" data-reveal="heading" className="font-display text-[clamp(3.25rem,8vw,7rem)] uppercase leading-[0.85]">
            <span className="compress squeeze">Contact</span>
          </h2>
          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-nerv-white lg:text-xl lg:leading-relaxed">
            Looking for an intern or a collaborator? Send a message and I&rsquo;ll reply within two days.
          </p>
          <ul className="mt-10 border-t border-nerv-line">
            {CHANNELS.map((c) => (
              <li key={c.name} className="border-b border-nerv-line">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span className="min-w-0 flex-1 font-display text-[2rem] leading-none transition-colors duration-150 group-hover:text-nerv-red">
                    <span className="compress">{c.name}</span>
                  </span>
                  <span className="flex min-w-0 items-center gap-2 text-[0.9375rem] text-nerv-mute">
                    <span className="truncate">{c.handle}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
