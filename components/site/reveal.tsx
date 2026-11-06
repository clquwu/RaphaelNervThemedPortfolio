"use client"

import { useEffect } from "react"

/**
 * Stamps [data-inview] on each [data-reveal] container the first time it
 * scrolls into view. The animations themselves live in globals.css.
 */
export default function Reveal() {
  useEffect(() => {
    ;(window as unknown as { __reveal?: boolean }).__reveal = true
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-inview", "")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
