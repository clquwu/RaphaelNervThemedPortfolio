/**
 * Single-line name in Matisse EB, squeezed like the hero title card.
 * textLength fixes the compression (about 0.64) regardless of font loading.
 */
const SIZE = 100
const CAP = Math.round(0.745 * SIZE)
const LENGTH = 990 // natural width is 15.47em; 990 / 1547 = 0.64

export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LENGTH} ${CAP + 2}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ fontFamily: "var(--font-matisse), 'Times New Roman', serif" }}
    >
      <text
        x="0"
        y={CAP + 1}
        fontSize={SIZE}
        textLength={LENGTH}
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
      >
        RAPHAEL BOULLAY--LE FUR
      </text>
    </svg>
  )
}
