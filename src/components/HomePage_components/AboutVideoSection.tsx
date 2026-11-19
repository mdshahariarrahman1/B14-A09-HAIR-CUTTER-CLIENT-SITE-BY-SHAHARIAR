import Image from "next/image"
import Link from "next/link"
import { Rajdhani, Roboto } from "next/font/google"

// Fonts are loaded here, so this section does not depend on globals.css.
// To try another heading font, only change `Rajdhani` below.
const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] })
const body = Roboto({ subsets: ["latin"], weight: ["400"] })

const VIDEO_ID = "T0hzIJqFrew"
const ORANGE = "#d98a2c"

const videoSrc =
  `https://www.youtube.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}` +
  `&playsinline=1&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`

export function AboutVideoSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-16 xl:py-30">
      {/* YouTube video background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 @container-size"
      >
        <iframe
          src={videoSrc}
          title="Barbershop background video"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          className="absolute left-1/2 top-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>

      {/* light overlay + dark only at the top and bottom edges */}
      <div className="absolute inset-0 -z-10 bg-black/35" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,transparent_22%,transparent_78%,rgba(0,0,0,0.7)_100%)]" />

      <div className="flex flex-col items-center gap-12 xl:flex-row xl:gap-0">
        {/* images (flush to the left edge on desktop) */}
        <div className="flex shrink-0 gap-5 px-4 xl:px-0">
          <div className="relative aspect-449/621 w-[44vw] max-w-112.25 xl:w-[28vw]">
            <Image
              src="/images/img-34.webp"
              alt="Barber styling a customer's hair"
              fill
              sizes="(min-width: 1280px) 28vw, 44vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-449/621 w-[44vw] max-w-112.25 xl:w-[28vw]">
            <Image
              src="/images/img-34-2.webp"
              alt="Barber trimming a customer's hair with scissors"
              fill
              sizes="(min-width: 1280px) 28vw, 44vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* text */}
        <div className="min-w-0 flex-1 px-6 text-white xl:pl-15.5 xl:pr-6">
          <div className="max-w-165">
            <p
              className={`${heading.className} text-sm font-bold tracking-[0.2em]`}
              style={{ color: ORANGE }}
            >
              Established 1989
            </p>

            <h2
              className={`${heading.className} mt-2 max-w-160 text-4xl font-bold leading-[1.3] sm:text-[42px]`}
            >
              Gentleman&apos;s Barbershop Is The #1 Barber Shop
            </h2>

            <p
              className={`${body.className} mt-6 text-base leading-7.5 text-white`}
            >
              Since 1989 we have trimmed, shaped and styled for the whole
              neighbourhood. Every visit starts with a chat about what you
              want, and ends with a hot towel and a clean finish. Walk in for
              a quick cut or book ahead for the full treatment.
            </p>

            <Link
              href="/about"
              style={{ backgroundColor: ORANGE }}
              className={`${heading.className} mt-12 inline-flex h-13.5 items-center justify-center px-12.5 text-sm font-bold rounded-lg uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90`}
            >
              More about us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}