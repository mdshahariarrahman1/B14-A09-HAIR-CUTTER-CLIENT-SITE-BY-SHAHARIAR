import { Scissors } from "lucide-react";
import { Roboto, Teko } from "next/font/google";

import { cn } from "@/lib/utils";
import ServiceCard, { Service } from "./ServiceCard";

const heading = Teko({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

// Shape of a service document coming from the backend (MongoDB).
type ServiceDoc = {
  _id: string | { $oid: string };
  name: string;
  category: string;
  price: number | string;
  duration: string;
  shortDescription?: string;
  image?: string;
  isActive?: boolean;
};

async function getServicesSix(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/services_six`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data: ServiceDoc[] = await res.json();

    return data
      .filter((doc) => doc.isActive !== false) // only active services
      .map((doc) => ({
        id: typeof doc._id === "string" ? doc._id : doc._id.$oid,
        name: doc.name,
        category: doc.category,
        price: Number(doc.price),
        duration: doc.duration,
        shortDescription: doc.shortDescription ?? "",
        image: doc.image ?? "",
      }));
  } catch (error) {
    console.error("Failed to load services:", error);
    return [];
  }
}

const ServicesSixPage = async () => {
  const services = await getServicesSix();

  return (
    <section
      className={cn(body.className, "bg-white px-6 pb-24 pt-20 text-[#333]")}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center text-center">
        <h2
          className={cn(
            heading.className,
            "text-[56px] font-bold uppercase leading-none tracking-wide text-[#333]",
          )}
        >
          Featured Salon Services
        </h2>

        <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.3em] text-[#d98a2b]">
          Our most loved services
        </p>

        <div className="mt-2.5 flex w-52.5 items-center gap-2">
          <span className="h-px flex-1 bg-[#e5e5e5]" />
          <Scissors className="size-4 -rotate-90 text-[#333]" />
          <span className="h-px flex-1 bg-[#e5e5e5]" />
        </div>
      </div>

      {/* Cards */}
      {services.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-280 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-[#888]">
          No services available right now.
        </p>
      )}
    </section>
  );
};

export default ServicesSixPage;