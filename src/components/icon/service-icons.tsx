import type { SVGProps } from "react"

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 80 80",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
}

export function BeardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      {/* head + hair */}
      <circle cx="27" cy="25" r="13" />
      <path d="M14 23C14 8 40 8 40 23" />
      <path d="M20 17C24 15 30 15 34 17" />
      <circle cx="22.5" cy="26" r="1" />
      <circle cx="31.5" cy="26" r="1" />
      <path d="M23 32Q27 35 31 32" />
      {/* shoulders */}
      <path d="M4 78V68Q4 57 17 53" />
      <path d="M37 53Q50 57 50 68V78" />
      <path d="M17 53L27 68L37 53" />
      <path d="M22 62L32 78" />
      {/* tube */}
      <rect x="58" y="24" width="18" height="6" rx="1" />
      <path d="M59 30V70Q59 74 63 74H71Q75 74 75 70V30" />
      <path d="M63 40H71M63 46H71M63 52H71" />
      <path d="M62 62H72" />
    </svg>
  )
}

export function StylingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      {/* pin */}
      <path d="M12 30C12 15 24 5 38 5C46 5 53 8 57 13" />
      <path d="M62 30C62 44 48 56 38 76C28 56 12 44 12 30" />
      <circle cx="38" cy="30" r="11" />
      <path d="M33 52H33.5M38 52H38.5M43 52H43.5" />
      {/* scissors */}
      <circle cx="69" cy="14" r="5.5" />
      <circle cx="69" cy="34" r="5.5" />
      <path d="M64 17L6 26" />
      <path d="M64 31L6 26" />
      <circle cx="50" cy="26" r="2.5" />
    </svg>
  )
}

export function HaircutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      {/* pomade jar */}
      <rect x="6" y="48" width="30" height="26" rx="4" />
      <path d="M6 54H36" />
      <rect x="10" y="59" width="22" height="9" rx="2" />
      <path d="M10 48C9 40 14 38 17 33C17 27 22 24 24 20C26 26 30 28 32 33C35 36 34 42 33 48" />
      <path d="M16 40H18M24 36H26" />
      {/* tube */}
      <rect x="49" y="6" width="24" height="12" rx="1" />
      <path d="M53 8V16M57 8V16M61 8V16M65 8V16M69 8V16" />
      <path d="M50 18V70Q50 74 54 74H68Q72 74 72 70V18" />
      <rect x="55" y="28" width="12" height="36" rx="6" />
    </svg>
  )
}

export function ShopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      {/* scissors sign */}
      <path d="M40 24L33 6M40 24L47 6" />
      <circle cx="37" cy="30" r="2" />
      <circle cx="43" cy="30" r="2" />
      {/* roof + awning */}
      <rect x="6" y="24" width="68" height="7" />
      <path d="M10 31H70V42H10Z" />
      <rect x="28" y="35" width="12" height="4" />
      {/* building */}
      <path d="M12 42V74M68 42V74" />
      <rect x="26" y="50" width="22" height="24" />
      <path d="M37 50V74" />
      <path d="M31 58H32M42 58H43" />
      <rect x="56" y="52" width="6" height="14" rx="3" />
      <path d="M59 56V60" />
      {/* ground */}
      <path d="M2 76H5M9 76H13M17 76H21M59 76H63M67 76H71M75 76H78" />
    </svg>
  )
}