import type { ComponentType, SVGProps } from "react"
import { Rajdhani, Roboto } from "next/font/google"
import { Card, CardContent } from "@/components/ui/card"
import {
  BeardIcon,
  HaircutIcon,
  ShopIcon,
  StylingIcon,
} from "@/components/icon/service-icons"

// Same fonts as the video section, loaded here so no globals.css setup is needed.
// To try another heading font, only change `Rajdhani`.
const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] })
const body = Roboto({ subsets: ["latin"], weight: ["300"] })

const ORANGE = "#c9772b"

type Service = {
  title: [string, string]
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const services: Service[] = [
  {
    title: ["Beard &", "Mustache"],
    description:
      "Clean shaping, sharp edges and a hot towel finish to keep your beard neat.",
    icon: BeardIcon,
  },
  {
    title: ["Hair", "Styling"],
    description:
      "Modern styles cut and set to match your face shape and hair type.",
    icon: StylingIcon,
  },
  {
    title: ["Normal", "Haircut"],
    description:
      "A classic cut with a wash and blow dry. Simple, tidy and ready for the day.",
    icon: HaircutIcon,
  },
  {
    title: ["Scissor", "Cut"],
    description:
      "Precise cutting done fully with scissors for a soft, natural look.",
    icon: ShopIcon,
  },
]

export function ServiceUiCards() {
  return (
    <section className="mx-auto w-full max-w-325 px-4 py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, description, icon: Icon }) => (
          <Card
            key={title.join(" ")}
            className="gap-0 rounded-xl border border-neutral-200 bg-white py-0 shadow-[0_2px_8px_rgba(0,0,0,0.07)] ring-0 transition-colors duration-200 hover:border-brand"
          >
            <CardContent className="flex min-h-83.75 flex-col items-center px-8 pb-12 pt-11.25 text-center">
              <Icon className="size-19.5" style={{ color: ORANGE }} />

              <h3
                className={`${heading.className} mt-8 text-[26px] font-bold leading-6.25 text-neutral-800`}
              >
                {title[0]}
                <br />
                {title[1]}
              </h3>

              <p
                className={`${body.className} mt-3.5 text-base font-light leading-6 text-neutral-500`}
              >
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}