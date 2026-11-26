import Link from "next/link";
import { ArrowLeft, Scissors } from "lucide-react";
import { Roboto, Teko } from "next/font/google";

import { cn } from "@/lib/utils";
import ServicesBrowser, { type BrowseService } from "./ServicesBrowser";

const heading = Teko({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Shape of a service document coming from the backend (MongoDB).
type ServiceDoc = {
  _id: string | { $oid: string };
  name: string;
  category: string;
  price: number | string;
  duration: string | number;
  shortDescription?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
};

async function getServices(): Promise<BrowseService[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/services`, { cache: "no-store" }
    );
    if (!res.ok) return [];

    const data: ServiceDoc[] = await res.json();

    return data
      .filter((doc) => doc.isActive !== false) // only active services
      .map((doc) => {
        const id = typeof doc._id === "string" ? doc._id : doc._id.$oid;
        return {
          id,
          name: doc.name,
          category: doc.category,
          price: Number(doc.price),
          duration:
            typeof doc.duration === "number" ? `${doc.duration} min` : doc.duration,
          shortDescription: doc.shortDescription ?? "",
          image: doc.image ?? "",
          // Mongo ObjectId's first 4 bytes are a timestamp -> fallback for "newest"
          createdAt: doc.createdAt
            ? new Date(doc.createdAt).getTime()
            : parseInt(id.slice(0, 8), 16) * 1000,
        };
      });
  } catch (error) {
    console.error("Failed to load services:", error);
    return [];
  }
}

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <section
      className={cn(body.className, "min-h-screen bg-white px-6 pb-24 pt-20 text-[#333]")}
    >
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[#888] transition hover:text-[#d98a2b]"
      >
        <ArrowLeft className="size-4" /> Back to Home
      </Link>

      {/* Section heading */}
      <div className="flex flex-col items-center text-center">
        <h1
          className={cn(
            heading.className,
            "text-[56px] font-bold uppercase leading-none tracking-wide text-[#333]",
          )}
        >
          Browse Salon Services
        </h1>

        <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.3em] text-[#d98a2b]">
          {services.length} services available
        </p>

        <div className="mt-2.5 flex w-52 items-center gap-2">
          <span className="h-px flex-1 bg-[#e5e5e5]" />
          <Scissors className="size-4 -rotate-90 text-[#333]" />
          <span className="h-px flex-1 bg-[#e5e5e5]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <ServicesBrowser services={services} headingClassName={heading.className} />
      </div>
    </section>
  );
};

export default ServicesPage;