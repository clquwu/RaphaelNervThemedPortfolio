import TitleBlock, { NARROW, WIDE, WIDE_RATIO } from "./title-block"

export default function Hero() {
  return (
    <section id="top">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[104rem] flex-col justify-center px-5 pb-12 pt-12 sm:px-8 lg:px-10 lg:pb-16">
        <p className="label text-nerv-red">Mobile &amp; web developer</p>

        <h1 className="mt-5 lg:mt-6">
          <span className="sr-only">Raphael Boullay--Le Fur</span>
          <TitleBlock lines={NARROW} uid="tn" className="block h-auto w-full max-w-[26rem] sm:hidden" />
          {/* Width is capped by viewport height so the buttons stay above the fold on short screens. */}
          <TitleBlock
            lines={WIDE}
            uid="tw"
            className="hidden h-auto w-full sm:block"
            style={{ maxWidth: `calc((100svh - 26rem) * ${WIDE_RATIO.toFixed(3)})` }}
          />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-nerv-line pt-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[40ch] text-lg leading-relaxed text-nerv-white sm:text-xl lg:col-span-7">
            Computer science student at the University of Bordeaux. I build Android, iOS and web apps, many of them
            about music.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a href="#projects" className="btn btn-primary label">
              See projects
            </a>
            <a href="#contact" className="btn btn-ghost label">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
