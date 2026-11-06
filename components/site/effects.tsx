"use client"

import { useEffect } from "react"

/**
 * Small interactive details; each one cleans up after itself.
 *   - Episode card: the hero buttons cut through a full-screen title card (all devices).
 *   - Card spotlight: a red glow follows the cursor along each project card's edge (mouse only).
 *   - Katakana scramble: hovered labels flicker through half-width katakana and settle (mouse only).
 * Screenshot focus, the katakana brush strokes (CSS :hover) and the form's
 * launch sequence need no setup here.
 */

function episodeCard() {
  const buttons = [...document.querySelectorAll<HTMLAnchorElement>('#top a.btn[href^="#"]')]
  let busy = false
  const onClick = (e: MouseEvent) => {
    const a = e.currentTarget as HTMLAnchorElement
    const hash = a.getAttribute("href")!
    const target = document.querySelector<HTMLElement>(hash)
    if (!target || busy) return
    e.preventDefault()
    busy = true
    const card = document.createElement("div")
    card.className = "episode-card"
    card.setAttribute("aria-hidden", "true")
    card.innerHTML = `<div><small>Next</small><span>${hash.slice(1).toUpperCase()}</span></div>`
    document.body.appendChild(card)
    setTimeout(() => {
      // Jump while the card covers the screen, then hand focus to the section like a normal link would.
      const root = document.documentElement
      root.style.scrollBehavior = "auto"
      target.scrollIntoView({ block: "start" })
      history.pushState(null, "", hash)
      target.setAttribute("tabindex", "-1")
      target.focus({ preventScroll: true })
      root.style.scrollBehavior = ""
      setTimeout(() => {
        card.remove()
        busy = false
      }, 80)
    }, 420)
  }
  buttons.forEach((b) => b.addEventListener("click", onClick))
  return () => buttons.forEach((b) => b.removeEventListener("click", onClick))
}

function cardSpotlight() {
  const offs = [...document.querySelectorAll<HTMLElement>("[data-card]")].map((card) => {
    let raf = 0
    let ev: PointerEvent | null = null
    const onMove = (e: PointerEvent) => {
      ev = e
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (!ev) return
        const r = card.getBoundingClientRect()
        card.style.setProperty("--sx", `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
        card.style.setProperty("--sy", `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
      })
    }
    card.addEventListener("pointermove", onMove)
    return () => {
      card.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  })
  return () => offs.forEach((off) => off())
}

const KATAKANA =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"

function scramble() {
  const targets: { trigger: HTMLElement; label: HTMLElement }[] = []
  document
    .querySelectorAll<HTMLElement>("header nav a.label, a.btn, footer a, #repositories > div a.label")
    .forEach((el) => targets.push({ trigger: el, label: el }))
  // Project cards scramble their platform label when the card is hovered.
  document.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
    const label = card.querySelector<HTMLElement>("p.label")
    if (label) targets.push({ trigger: card, label })
  })

  const offs = targets.map(({ trigger, label }) => {
    const node = [...label.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
    if (!node) return () => {}
    // Read the label when a scramble starts, not once, in case React has changed it since.
    let text = node.textContent ?? ""
    let running = false
    let raf = 0
    const run = () => {
      if (!running) text = node.textContent ?? ""
      running = true
      cancelAnimationFrame(raf)
      // Lock the width so swapping glyphs never shifts the layout.
      label.style.width = `${label.getBoundingClientRect().width}px`
      label.style.whiteSpace = "nowrap"
      label.style.overflow = "hidden"
      const start = performance.now()
      const DURATION = 360
      const tick = (now: number) => {
        const t = (now - start) / DURATION
        const settled = Math.floor(t * text.length)
        node.textContent = [...text]
          .map((ch, i) => (ch === " " || i < settled ? ch : KATAKANA[(Math.random() * KATAKANA.length) | 0]))
          .join("")
        if (t < 1) raf = requestAnimationFrame(tick)
        else {
          node.textContent = text
          running = false
          label.style.width = label.style.whiteSpace = label.style.overflow = ""
        }
      }
      raf = requestAnimationFrame(tick)
    }
    trigger.addEventListener("pointerenter", run)
    return () => {
      trigger.removeEventListener("pointerenter", run)
      cancelAnimationFrame(raf)
      if (running) node.textContent = text
    }
  })
  return () => offs.forEach((off) => off())
}

export default function Effects() {
  useEffect(() => {
    const offs = [episodeCard()]
    if (matchMedia("(pointer: fine)").matches) offs.push(cardSpotlight(), scramble())
    return () => offs.forEach((off) => off?.())
  }, [])
  return null
}
