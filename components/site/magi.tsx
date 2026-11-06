"use client"

import { useEffect, useRef, useState } from "react"
import Chamfer from "./chamfer"
import { MAGI, MAGI_QUERIES, type MagiVote } from "@/lib/content"

const RED = "#f0141e"
const GREY = "#3a3a3a"
const APPROVE = "承認" // 承認
const REJECT = "否決" // 否決

const LAYOUT = [
  { corners: ["bl", "br"] as const, cls: "lg:col-span-8 lg:col-start-3", cols: "grid-cols-2 sm:grid-cols-3" },
  { corners: ["tr"] as const, cls: "lg:col-span-5 lg:col-start-1 lg:row-start-2", cols: "grid-cols-2" },
  { corners: ["tl"] as const, cls: "lg:col-span-5 lg:col-start-8 lg:row-start-2", cols: "grid-cols-2" },
]

function Panel({ index, vote, run }: { index: number; vote: MagiVote | null; run: number }) {
  const { unit, area, items } = MAGI[index]
  return (
    <div className="relative flex h-full flex-col p-6 sm:p-8">
      {vote && (
        <span
          key={run}
          aria-hidden="true"
          className={`magi-stamp absolute right-6 top-6 border px-1.5 pb-[3px] pt-[5px] font-display text-lg leading-none sm:right-8 sm:top-8 ${
            vote.ok ? "border-nerv-red text-nerv-red" : "border-nerv-mute text-nerv-mute"
          }`}
        >
          {vote.ok ? APPROVE : REJECT}
        </span>
      )}
      <p className="label text-nerv-red">{unit}</p>
      <h4 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] leading-none">
        <span className="compress">{area}</span>
      </h4>
      <ul className={`mb-6 mt-6 grid gap-x-6 gap-y-1.5 text-[0.9375rem] text-nerv-mute ${LAYOUT[index].cols}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {vote && (
        <p key={run} className="magi-why mt-auto flex items-baseline gap-3 border-t border-nerv-line pt-4 text-[0.9375rem]">
          <span className={`label shrink-0 ${vote.ok ? "text-nerv-red" : "text-nerv-mute"}`}>
            {vote.ok ? "Approve" : "Reject"}
          </span>
          <span className="text-nerv-white">{vote.why}</span>
        </p>
      )}
    </div>
  )
}

/**
 * The stack, laid out like the MAGI decision display, doubling as a small
 * game: pick a question, the three units vote one by one from their own
 * area, and the majority decides. Runs the first question once on view.
 */
export default function Magi() {
  const [qi, setQi] = useState(0)
  const [run, setRun] = useState(0) // 0 until the first vote
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRun((r) => r || 1)
        io.disconnect()
      },
      { rootMargin: "0px 0px -25% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ask = (i: number) => {
    setQi(i)
    setRun((r) => r + 1)
  }

  const query = MAGI_QUERIES[qi]
  const voted = run > 0
  const yes = query.votes.filter((v) => v.ok).length
  const approved = yes >= 2

  return (
    <div ref={root}>
      {/* Console: the question on the table and the verdict. */}
      <div className="border-t-2 border-nerv-red pt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <p className="label text-nerv-red">Ask the MAGI</p>
            <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-nerv-mute">
              Pick a question. Each unit votes from its own field, and the majority decides.
            </p>
          </div>
          <div role="group" aria-label="Questions" className="flex flex-wrap gap-2">
            {MAGI_QUERIES.map((m, i) => (
              <button
                key={m.q}
                type="button"
                aria-pressed={i === qi && voted}
                onClick={() => ask(i)}
                className={`label h-10 border px-3 transition-colors duration-100 ${
                  i === qi && voted
                    ? "border-nerv-red text-nerv-white"
                    : "border-nerv-edge text-nerv-mute hover:border-nerv-mute hover:text-nerv-white"
                }`}
              >
                {m.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="min-w-0 font-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05]">
            <span className="compress">{query.q}</span>
          </p>
          <p
            key={run}
            aria-live="polite"
            data-voted={voted || undefined}
            className={`magi-result label shrink-0 text-base ${
              !voted ? "text-nerv-dim" : approved ? "text-nerv-red" : "text-nerv-white"
            }`}
          >
            {voted ? `${approved ? "Approved" : "Rejected"}, ${yes} to ${3 - yes}` : "Awaiting vote"}
          </p>
        </div>
      </div>

      {/* The three units. An approving unit keeps a red outline once it has voted. */}
      <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-4">
        {LAYOUT.map((l, i) => {
          const vote = voted ? query.votes[i] : null
          return (
            <Chamfer
              key={`${run}-${i}`}
              corners={[...l.corners]}
              line={vote?.ok ? RED : GREY}
              className={`${voted ? "magi-unit" : ""} ${l.cls}`}
              style={{ ["--i" as string]: i }}
            >
              <Panel index={i} vote={vote} run={run} />
            </Chamfer>
          )
        })}
        <div
          aria-hidden="true"
          className="hidden items-center justify-center font-display text-[clamp(2rem,3.4vw,3rem)] tracking-[0.04em] text-nerv-white lg:col-span-2 lg:col-start-6 lg:row-start-2 lg:flex"
        >
          MAGI
        </div>
      </div>
    </div>
  )
}
