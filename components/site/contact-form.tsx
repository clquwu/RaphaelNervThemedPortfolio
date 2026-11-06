"use client"

import { useState, type FormEvent } from "react"

type Status = "idle" | "sending" | "sent" | "error"

const field =
  "block w-full border border-nerv-edge bg-nerv-panel px-4 text-base text-nerv-white transition-colors duration-100 hover:border-nerv-mute focus:border-nerv-red focus:shadow-[inset_0_0_0_1px_#f0141e] focus:outline-none focus-visible:outline-none"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  // Eva launch sequence on the button while the message goes out.
  const [phase, setPhase] = useState<"" | "standby" | "launch" | "launched">("")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const launch = true
    setStatus("sending")
    if (launch) {
      setPhase("standby")
      setTimeout(() => setPhase((p) => (p === "standby" ? "launch" : p)), 380)
    }
    try {
      const request = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      })
      // Let the sequence finish even when the server answers instantly.
      const [res] = await Promise.all([request, launch ? wait(1250) : null])
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus("sent")
      if (launch) {
        setPhase("launched")
        setTimeout(() => setPhase(""), 2600)
      }
    } catch {
      setStatus("error")
      setPhase("")
    }
  }

  const label =
    phase === "standby"
      ? "Standby"
      : phase === "launch"
        ? "Launch"
        : phase === "launched"
          ? "Sent"
          : status === "sending"
            ? "Sending"
            : "Send message"

  return (
    <form onSubmit={onSubmit} className="grid gap-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="label text-nerv-mute">
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className={`${field} h-12`} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="label text-nerv-mute">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={`${field} h-12`} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="label text-nerv-mute">
          Message
        </label>
        <textarea id="message" name="message" rows={6} required className={`${field} resize-y py-3 leading-relaxed`} />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending"}
          data-phase={phase || undefined}
          className={`btn btn-primary label min-w-[11rem] justify-center ${phase ? "" : "disabled:opacity-60"}`}
        >
          {label}
        </button>
        <p role="status" aria-live="polite" className="text-[0.9375rem]">
          {status === "sent" && <span className="text-nerv-white">Message sent. I&rsquo;ll reply within two days.</span>}
          {status === "error" && (
            <span className="text-nerv-red">
              The message didn&rsquo;t go through. Try again, or reach me on LinkedIn.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
