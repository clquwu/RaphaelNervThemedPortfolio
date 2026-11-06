export const LINKS = {
  github: "https://github.com/clquwu",
  linkedin: "https://www.linkedin.com/in/raphael-boullay-le-fur-",
}

export type Featured = {
  slug: string
  title: string
  platform: string
  summary: string
  stack: string[]
  href: string
  repo?: string
  /** App icon, decorative: the card title already names the project. */
  icon?: { src: string }
  /** Three phone screenshots, cropped to 5:8. Decorative inside the card link. */
  screens?: string[]
}

export const FEATURED: Featured[] = [
  {
    slug: "clarity",
    title: "Clarity-OMR",
    platform: "Machine learning",
    summary:
      "Training pipeline for Clarity-OMR, an optical music recognition system that reads full-page scores and writes them out as MusicXML.",
    stack: ["Python", "PyTorch", "YOLOv8", "Transformers"],
    href: "https://github.com/clquwu/Clarity-OMR-Train",
    repo: "clquwu/Clarity-OMR-Train",
  },
  {
    slug: "cosmos",
    title: "Cosmos",
    platform: "iOS",
    summary:
      "Offline music player for iPhone, on the App Store. Plays FLAC and DSD from iCloud Drive or local storage, with CarPlay support.",
    stack: ["Swift", "SwiftUI", "Core Audio", "CarPlay"],
    href: "https://github.com/clquwu/Cosmos-Music-Player",
    repo: "clquwu/Cosmos-Music-Player",
    icon: { src: "/work/cosmos.png" },
    screens: [
      "/work/cosmos-1.webp",
      "/work/cosmos-2.webp",
      "/work/cosmos-3.webp",
    ],
  },
  {
    slug: "kotatsu",
    title: "Kotatsu-Redo",
    platform: "Android",
    summary:
      "Open-source manga reader with built-in online sources, offline CBZ downloads and tracker sync. Runs on Android 6.0 and up.",
    stack: ["Kotlin", "Material You"],
    href: "https://github.com/Kotatsu-Redo/Kotatsu-Redo",
    repo: "Kotatsu-Redo/Kotatsu-Redo",
    icon: { src: "/work/kotatsu.webp" },
    screens: [
      "/work/kotatsu-1.webp",
      "/work/kotatsu-2.webp",
      "/work/kotatsu-3.webp",
    ],
  },
]

/** The four stages of the Clarity-OMR pipeline, in order. */
export const OMR_PIPELINE = [
  { name: "Layout detection", tool: "YOLOv8" },
  { name: "Staff decoding", tool: "Transformer" },
  { name: "Grammar assembly", tool: "Constrained" },
  { name: "Export", tool: "MusicXML" },
]

export type Minor = {
  title: string
  summary: string
  platform: string
  href: string
  hrefLabel: string
}

export const MORE: Minor[] = [
  {
    title: "PianoSync",
    summary: "Android app for learning piano, with MIDI playback, on-screen guidance and synced key lighting.",
    platform: "Android",
    href: "https://github.com/clquwu/PianoSync",
    hrefLabel: "GitHub",
  },
  {
    title: "FutonEV",
    summary: "EV route planner for Europe that picks charging stops by price, charger speed and compatibility with your car.",
    platform: "Android, iOS",
    href: "https://futonev.app/",
    hrefLabel: "futonev.app",
  },
  {
    title: "Kibo Anime",
    summary: "Android streaming app that pulls from several anime sources, with a custom video player.",
    platform: "Android",
    href: "https://www.kiboanime.app/",
    hrefLabel: "kiboanime.app",
  },
]

/** Stack, split across the three MAGI units. */
export const MAGI = [
  {
    unit: "MELCHIOR-1",
    area: "Mobile",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "Swift",
      "SwiftUI",
      "Media3 / ExoPlayer",
      "Material for TV",
      "Navigation Compose",
      "ViewModel, LiveData",
      "WorkManager",
      "Cast Framework",
      "In-app updates",
    ],
  },
  {
    unit: "BALTHASAR-2",
    area: "Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    unit: "CASPER-3",
    area: "Backend, data & ML",
    items: [
      "Firebase",
      "Firestore",
      "Crashlytics",
      "Cloud Messaging",
      "PostgreSQL",
      "Debian servers",
      "Python",
      "PyTorch",
    ],
  },
]

export type MagiVote = { ok: boolean; why: string }

/**
 * Questions put to the MAGI. Votes are in unit order (MELCHIOR-1 mobile,
 * BALTHASAR-2 web, CASPER-3 backend), and each question lands on a
 * different result so the outcome is never the same twice.
 */
export const MAGI_QUERIES: { q: string; short: string; votes: [MagiVote, MagiVote, MagiVote] }[] = [
  {
    q: "Hire Raphael for an internship?",
    short: "Hire Raphael?",
    votes: [
      { ok: true, why: "Ships Android and iOS apps." },
      { ok: true, why: "Builds with React and Next.js." },
      { ok: true, why: "Trains models in PyTorch." },
    ],
  },
  {
    q: "Is Cosmos better than Apple Music?",
    short: "Cosmos vs Apple Music",
    votes: [
      { ok: true, why: "Plays FLAC and DSD files." },
      { ok: false, why: "Smaller catalogue, to be fair." },
      { ok: true, why: "Works fully offline." },
    ],
  },
  {
    q: "Rewrite everything in Rust?",
    short: "Rewrite in Rust?",
    votes: [
      { ok: false, why: "Kotlin is doing fine." },
      { ok: false, why: "Next.js is fast enough." },
      { ok: true, why: "Tempting, honestly." },
    ],
  },
  {
    q: "Deploy on a Friday evening?",
    short: "Friday deploy?",
    votes: [
      { ok: false, why: "Store review takes days anyway." },
      { ok: false, why: "Nobody is around to roll back." },
      { ok: false, why: "The database says no." },
    ],
  },
]
