import type React from "react"

type Corner = "tl" | "tr" | "br" | "bl"

/** Polygon for a box with the given corners cut at 45 degrees. */
function polygon(corners: Corner[], cut: string) {
  const has = (c: Corner) => corners.includes(c)
  const pts: string[] = []
  pts.push(...(has("tl") ? [`0 ${cut}`, `${cut} 0`] : ["0 0"]))
  pts.push(...(has("tr") ? [`calc(100% - ${cut}) 0`, `100% ${cut}`] : ["100% 0"]))
  pts.push(...(has("br") ? [`100% calc(100% - ${cut})`, `calc(100% - ${cut}) 100%`] : ["100% 100%"]))
  pts.push(...(has("bl") ? [`${cut} 100%`, `0 calc(100% - ${cut})`] : ["0 100%"]))
  return `polygon(${pts.join(", ")})`
}

/**
 * A panel with chamfered corners and a 1px outline that follows the cut.
 * The outline is the outer layer showing through a 1px inset; the inner cut is
 * reduced by (2 - sqrt 2)px so the diagonal reads as 1px too.
 */
export default function Chamfer({
  corners,
  size = 28,
  line = "#3a3a3a",
  fill = "#050505",
  className = "",
  style,
  children,
}: {
  corners: Corner[]
  size?: number
  line?: string
  fill?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <div className={`relative isolate ${className}`} style={{ clipPath: polygon(corners, `${size}px`), backgroundColor: line, ...style }}>
      <div
        aria-hidden="true"
        className="absolute inset-px -z-10"
        style={{ clipPath: polygon(corners, `${size - 0.59}px`), background: fill }}
      />
      {children}
    </div>
  )
}
