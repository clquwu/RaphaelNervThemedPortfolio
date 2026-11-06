import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Archivo } from "next/font/google"
import "./globals.css"

// Matisse EB is the Evangelion title-card face. The original file is 6.5 MB of
// Japanese glyphs; this subset keeps Latin plus the few kana the hero uses.
const matisse = localFont({
  src: "./fonts/matisse-eb-subset.woff2",
  variable: "--font-matisse",
  // 13 KB and preloaded: wait for it rather than flash the name in a fallback serif.
  display: "block",
})

// Grotesk with a width axis: normal width for reading, condensed for the
// Helvetica-Condensed style NERV interface labels.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

/**
 * Pick the motion mode before first paint (see "Motion system" in globals.css).
 * Reduced-motion visitors get fades only; `?motion=full` overrides for previewing.
 * If the page's JS never boots, a timer drops `motion` so nothing stays hidden.
 */
const MOTION_BOOT = `try{var d=document.documentElement,q=new URLSearchParams(location.search),r=matchMedia('(prefers-reduced-motion: reduce)').matches,f=q.get('motion')==='full';d.classList.add('motion',r&&!f?'motion-lite':'motion-full');setTimeout(function(){if(!window.__reveal)d.classList.remove('motion')},6000)}catch(e){}`

export const metadata: Metadata = {
  title: "Raphael Boullay--Le Fur | Mobile & web developer",
  description:
    "Portfolio of Raphael Boullay--Le Fur, computer science student at the University of Bordeaux building Android, iOS and web apps.",
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `motion` is added before first paint so scroll reveals never flash their end state.
    <html lang="en" className={`${matisse.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
