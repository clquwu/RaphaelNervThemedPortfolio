import type { SVGProps } from "react"

export default function NervLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 5L95 30V70L50 95L5 70V30L50 5Z" fill="#000000" stroke="#e60012" strokeWidth="2" />
      <path d="M50 20L80 37.5V72.5L50 90L20 72.5V37.5L50 20Z" fill="#000000" stroke="#e60012" strokeWidth="2" />
      <path d="M30 40L50 30L70 40V60L50 70L30 60V40Z" fill="#e60012" stroke="#e60012" strokeWidth="1" />
      <path d="M40 45H60V55H40V45Z" fill="#000000" />
    </svg>
  )
}
