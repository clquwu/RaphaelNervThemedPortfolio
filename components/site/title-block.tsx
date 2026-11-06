import type React from "react"
import { KANA_PATHS } from "./kana-paths"

/**
 * The name, set like an Evangelion episode title card: lines of Matisse EB
 * squeezed and justified to one measure, with the name in katakana running
 * down the right edge.
 *
 * Geometry is in font units (Matisse: 1000 upm, cap height 745). Each line is
 * forced to the block width with textLength, so the compression is exact at
 * every screen size and does not depend on font loading.
 */

export const W = 1000 // measure of the Latin block
const CAP = 0.745
const GAP = 24
const K_GAP = 34
const KANA = ["ラ", "フ", "ァ", "エ", "ル"] // ラファエル

export type Line = { text: string; size: number }

/** Two lines for wide screens. Sizes give about 0.63 horizontal compression. */
export const WIDE: Line[] = [
  { text: "RAPHAEL", size: 316 },
  { text: "BOULLAY--LE FUR", size: 156 },
]

/** Three lines for phones, each sized to fill the measure on its own (about 0.65). */
export const NARROW: Line[] = [
  { text: "RAPHAEL", size: 300 },
  { text: "BOULLAY--", size: 256 },
  { text: "LE FUR", size: 384 },
]

export function layout(lines: Line[], kana = true) {
  let y = 0
  const placed = lines.map((line, i) => {
    y += (i ? GAP : 0) + Math.round(line.size * CAP)
    return { ...line, y }
  })
  const h = y + 2
  const kSize = Math.floor(h / KANA.length)
  const viewW = kana ? W + K_GAP + kSize : W
  return { placed, h, kSize, viewW, ratio: viewW / h }
}

export const WIDE_RATIO = layout(WIDE).ratio

export const SVG_FONT: React.CSSProperties = { fontFamily: "var(--font-matisse), 'Times New Roman', serif" }

/**
 * ラファエル stacked one glyph per em down the right edge, drawn from the
 * font's outlines, so hovering the column can redraw each character
 * stroke by stroke (see "Brush strokes" in globals.css).
 */
export function KanaColumn({ h, kSize, uid }: { h: number; kSize: number; uid: string }) {
  const x0 = W + K_GAP
  const kx = x0 + kSize / 2
  const cells = KANA.map((ch, i) => {
    // Small kana (ァ) sits smaller, in the upper right of its cell, as in vertical setting.
    const small = ch === "ァ"
    const fs = small ? kSize * 0.8 : kSize
    const cx = kx + (small ? kSize * 0.16 : 0)
    const top = i * kSize
    const baseline = top + kSize * (small ? 0.66 : 0.85)
    const s = fs / 1000
    return { i, top, transform: `translate(${(cx - fs / 2).toFixed(2)} ${baseline.toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})` }
  })
  return (
    <g className="kana-col" fill="#f0141e" data-h={h} style={{ ["--k" as string]: `${kSize}px` }}>
      <defs>
        {cells.map((c) => (
          <path key={c.i} id={`${uid}-k${c.i}`} d={KANA_PATHS[c.i]} transform={c.transform} pathLength={1} />
        ))}
        {cells.map((c) => (
          <clipPath key={c.i} id={`${uid}-c${c.i}`}>
            <rect x={x0 - 4} y={c.top} width={kSize + 8} height={kSize} />
          </clipPath>
        ))}
      </defs>
      {/* Hover target covering the whole column. */}
      <rect className="kana-hit" x={x0} y={0} width={kSize} height={h} fill="transparent" />
      {cells.map((c) => (
        <g key={c.i} className="kana-cell" data-i={c.i} clipPath={`url(#${uid}-c${c.i})`} style={{ ["--i" as string]: c.i }}>
          <g className="kc-glyph">
            <use href={`#${uid}-k${c.i}`} />
          </g>
        </g>
      ))}
    </g>
  )
}

export default function TitleBlock({
  lines,
  kana = true,
  uid = "tb",
  className,
  style,
}: {
  lines: Line[]
  /** Show the katakana column. */
  kana?: boolean
  /** Unique prefix for SVG ids when the block appears more than once on a page. */
  uid?: string
  className?: string
  style?: React.CSSProperties
}) {
  const { placed, h, kSize, viewW } = layout(lines, kana)

  return (
    <svg
      viewBox={`0 0 ${viewW} ${h}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ ...SVG_FONT, overflow: "visible", ...style }}
    >
      <g className="title-lines">
        {placed.map((line) => (
          <text
            key={line.text}
            x="0"
            y={line.y}
            fontSize={line.size}
            textLength={W}
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
          >
            {line.text}
          </text>
        ))}
      </g>
      {kana && <KanaColumn h={h} kSize={kSize} uid={uid} />}
    </svg>
  )
}
