import Magi from "./magi"

const FILE = [
  { k: "Studies", v: "Licence in computer science, University of Bordeaux" },
  { k: "Since", v: "September 2024" },
  { k: "Based in", v: "Bordeaux, France" },
  { k: "Coursework", v: "Algorithms, object-oriented programming, data structures, databases, web development, project management" },
  { k: "Status", v: "Open to internships and collaborations" },
]

export default function About() {
  return (
    <section id="about" className="border-t border-nerv-line">
      <div className="mx-auto max-w-[104rem] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
        <h2 data-reveal="heading" className="font-display text-[clamp(3.25rem,8vw,7rem)] uppercase leading-[0.85]">
          <span className="compress squeeze">About</span>
        </h2>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-[58ch] space-y-6 text-lg leading-relaxed text-nerv-white lg:col-span-7 lg:text-xl lg:leading-relaxed">
            <p>
              I&rsquo;m a computer science student at the University of Bordeaux. Most of what I know about building
              software comes from shipping my own apps: Android apps in Kotlin and Jetpack Compose, an iOS music player
              in SwiftUI, and web platforms in React and Next.js.
            </p>
            <p className="text-nerv-mute">
              Along the way I&rsquo;ve worked on TV casting, background notifications, Firebase backends and real-time
              data. At university I put the theory to work in team projects run like a real development team.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label border-t-2 border-nerv-red pt-4 text-nerv-red">Personnel file</p>
            <dl data-reveal="file" className="relative mt-6 grid gap-5">
              {/* Full-height carrier: translateY(100%) moves its top-edge line to the bottom of the list. */}
              <span aria-hidden="true" className="pf-scan pointer-events-none absolute inset-0">
                <span className="block h-0.5 bg-nerv-red" />
              </span>
              {FILE.map((row, i) => (
                <div key={row.k} className="pf-row grid grid-cols-[7.5rem_1fr] gap-4" style={{ ["--i" as string]: i }}>
                  <dt className="label pt-[3px] text-nerv-dim">{row.k}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-nerv-white">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Stack, laid out like the MAGI decision display: one unit above, two below. */}
        <div id="stack" className="mt-24 lg:mt-36">
          <h3 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none">
            <span className="compress">Stack</span>
          </h3>
          <div className="mt-10">
            <Magi />
          </div>
        </div>
      </div>
    </section>
  )
}
