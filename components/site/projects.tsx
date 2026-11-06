import { ArrowUpRight, Star } from "lucide-react"
import { FEATURED, MORE, OMR_PIPELINE, LINKS, type Featured } from "@/lib/content"
import type { RepoStats } from "@/lib/github"

function Stars({ stats }: { stats?: RepoStats }) {
  if (!stats || stats.stars < 1) return null
  return (
    <span className="label flex items-center gap-1.5 text-nerv-mute">
      <Star className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {stats.stars.toLocaleString("en-US")} stars
    </span>
  )
}

function CardHead({ project }: { project: Featured }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <p className="label text-nerv-mute">{project.platform}</p>
      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-nerv-dim transition-[color,transform] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nerv-red"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </div>
  )
}

function CardFoot({ project, stats }: { project: Featured; stats?: RepoStats }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-nerv-line pt-5">
      <p className="label text-nerv-dim">{project.stack.join(" / ")}</p>
      <Stars stats={stats} />
    </div>
  )
}

const card =
  "reticle group flex flex-col bg-nerv-black p-6 transition-colors duration-150 hover:bg-nerv-panel sm:p-8 lg:p-10"

function ClarityCard({ project, stats }: { project: Featured; stats?: RepoStats }) {
  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" data-card className={`${card} lg:col-span-12`}>
      <CardHead project={project} />
      <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-5">
          <h3 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] transition-colors duration-150 group-hover:text-nerv-red">
            <span className="compress">{project.title}</span>
          </h3>
          <p className="mt-6 max-w-[46ch] text-nerv-mute">{project.summary}</p>
        </div>

        {/* The real four-stage pipeline, drawn as a signal path. */}
        <ol data-reveal="pipeline" className="relative grid sm:grid-cols-4 lg:col-span-7" aria-label="Pipeline stages">
          {/* One continuous signal line under all four stages. */}
          <span
            aria-hidden="true"
            className="pl-line absolute bottom-0 left-0 top-0 w-0.5 bg-nerv-red sm:bottom-auto sm:right-0 sm:h-0.5 sm:w-auto"
          />
          {OMR_PIPELINE.map((stage, i) => (
            <li
              key={stage.name}
              style={{ ["--i" as string]: i }}
              className="relative grid grid-cols-[2.25rem_1fr] items-baseline pb-7 pl-5 last:pb-1 sm:block sm:pb-0 sm:pl-0 sm:pr-4 sm:pt-6"
            >
              <span
                aria-hidden="true"
                className="pl-node absolute -left-[4px] top-0 h-2.5 w-2.5 bg-nerv-red sm:-top-[4px] sm:left-0"
              />
              <span className="pl-stage font-display text-[2rem] leading-none text-nerv-red sm:block sm:text-[2.5rem]">
                {i + 1}
              </span>
              <span className="pl-stage sm:mt-3 sm:block">
                <span className="block font-semibold leading-snug text-nerv-white">{stage.name}</span>
                <span className="label mt-1 block text-nerv-dim">{stage.tool}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10 lg:mt-12">
        <CardFoot project={project} stats={stats} />
      </div>
    </a>
  )
}

function AppCard({ project, stats }: { project: Featured; stats?: RepoStats }) {
  return (
    <a
      id={project.slug}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-card
      className={`${card} lg:col-span-6`}
    >
      <CardHead project={project} />
      <div className="mt-6 flex items-center gap-5">
        {project.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.icon.src}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-[22%] sm:h-16 sm:w-16"
          />
        )}
        <h3 className="min-w-0 flex-1 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[0.95] transition-colors duration-150 group-hover:text-nerv-red">
          <span className="compress">{project.title}</span>
        </h3>
      </div>
      <p className="mt-5 max-w-[48ch] text-nerv-mute">{project.summary}</p>

      {project.screens && (
        <div data-reveal="screens" className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
          {project.screens.map((src, i) => (
            // The frame is always there; the picture slides up into it.
            <div key={src} className="shot overflow-hidden border border-nerv-line bg-nerv-black" style={{ ["--i" as string]: i }}>
              {/* Loaded eagerly (about 25 KB each) so a picture never reveals before it has arrived. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" width={400} height={640} decoding="async" fetchPriority="low" className="block aspect-[5/8] w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-8">
        <CardFoot project={project} stats={stats} />
      </div>
    </a>
  )
}

export default function Projects({ stats }: { stats: Record<string, RepoStats> }) {
  const [clarity, ...apps] = FEATURED

  return (
    <section id="projects" className="mx-auto max-w-[104rem] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
      <h2 data-reveal="heading" className="font-display text-[clamp(3.25rem,8vw,7rem)] uppercase leading-[0.85]">
        <span className="compress squeeze">Projects</span>
      </h2>

      <div className="mt-12 grid gap-px border border-nerv-line bg-nerv-line lg:mt-16 lg:grid-cols-12">
        <ClarityCard project={clarity} stats={clarity.repo ? stats[clarity.repo] : undefined} />
        {apps.map((p) => (
          <AppCard key={p.slug} project={p} stats={p.repo ? stats[p.repo] : undefined} />
        ))}
      </div>

      <div id="repositories" className="mt-20 lg:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h3 className="min-w-0 basis-full font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none sm:basis-auto sm:flex-1">
            <span className="compress">More projects</span>
          </h3>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label group flex items-center gap-2 py-1 text-nerv-mute transition-colors hover:text-nerv-white"
          >
            All repositories on GitHub
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-8 border-t border-nerv-line">
          {MORE.map((p) => (
            <li key={p.title} className="border-b border-nerv-line">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-6 gap-y-2 py-6 sm:grid-cols-12 sm:items-baseline lg:py-7"
              >
                <span className="font-display text-[2rem] leading-tight transition-colors duration-150 group-hover:text-nerv-red sm:col-span-4 lg:col-span-3 lg:text-[2.5rem]">
                  <span className="compress">{p.title}</span>
                </span>
                <span className="text-nerv-mute sm:col-span-8 lg:col-span-6">{p.summary}</span>
                <span className="label text-nerv-dim sm:col-span-4 lg:col-span-1">{p.platform}</span>
                <span className="label flex items-center gap-2 text-nerv-white sm:col-span-8 lg:col-span-2 lg:justify-end">
                  {p.hrefLabel}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
