import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Scissors } from "lucide-react";
import { Roboto, Teko } from "next/font/google";

import { cn } from "@/lib/utils";
import BookingForm from "./BookingForm";

const heading = Teko({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

type ServiceDoc = {
  _id: string | { $oid: string };
  name: string;
  category: string;
  price: number | string;
  duration: string | number;
  shortDescription?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
};

const isValidId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const docId = (doc: ServiceDoc) =>
  typeof doc._id === "string" ? doc._id : doc._id?.$oid;

// Tries GET /services/:id first. If that route doesn't exist (or fails),
// falls back to the /services list and picks the matching service.
async function getService(id: string): Promise<ServiceDoc | null> {
  const base = process.env.BACKEND_URL;

  try {
    const res = await fetch(`${base}/services/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && !Array.isArray(data) && data.name) return data as ServiceDoc;
    }
  } catch {
    // fall through to the list lookup
  }

  try {
    const res = await fetch(`${base}/services`, { cache: "no-store" });
    if (res.ok) {
      const list: ServiceDoc[] = await res.json();
      return list.find((doc) => docId(doc) === id) ?? null;
    }
  } catch (error) {
    console.error("Failed to load service:", error);
  }

  return null;
}

function Notice({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-[#e5e5e5] bg-white p-10 text-center">
      <h2
        className={cn(
          heading.className,
          "text-4xl font-bold uppercase tracking-wide text-[#333]",
        )}
      >
        {title}
      </h2>
      <p className="mt-3 text-sm text-[#888]">{text}</p>
      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#d98a2b]"
      >
        <ArrowLeft className="size-4" /> Back to services
      </Link>
    </div>
  );
}

async function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // NOTE: login protection will be handled by the proxy (proxy.ts), not here.

  let content: React.ReactNode;

  if (!isValidId(id)) {
    content = (
      <Notice
        title="Invalid service"
        text="The service ID in this link isn't valid."
      />
    );
  } else {
    const service = await getService(id);

    if (!service) {
      content = (
        <Notice
          title="Service not found"
          text="We couldn't find this service. It may have been removed."
        />
      );
    } else {
      const active = service.isActive !== false;
      // TODO: set this from the logged-in user's role once auth is ready
      const isAdmin = false;

      content = (
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-[#f3f3f3]">
            {service.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={service.image}
                alt={service.name}
                className="h-full min-h-72 w-full object-cover"
              />
            )}
          </div>

          <div>
            <span className="rounded-full bg-[#d98a2b]/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d98a2b]">
              {service.category}
            </span>

            <h1
              className={cn(
                heading.className,
                "mt-5 text-6xl font-bold uppercase leading-none tracking-wide text-[#333]",
              )}
            >
              {service.name}
            </h1>

            <div className="mt-5 flex items-center gap-6">
              <span
                className={cn(
                  heading.className,
                  "text-4xl font-semibold text-[#d98a2b]",
                )}
              >
                ${Number(service.price).toFixed(2)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#888]">
                <Clock className="size-4 text-[#d98a2b]" />
                {typeof service.duration === "number"
                  ? `${service.duration} min`
                  : service.duration}
              </span>
            </div>

            <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-[#666]">
              {service.description ?? service.shortDescription}
            </p>

            <div className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6">
              <h2
                className={cn(
                  heading.className,
                  "text-3xl font-semibold uppercase tracking-wide text-[#333]",
                )}
              >
                Book an appointment
              </h2>

              {!active ? (
                <p className="mt-3 text-sm text-[#888]">
                  This service is currently unavailable for booking.
                </p>
              ) : isAdmin ? (
                <p className="mt-3 text-sm text-[#888]">
                  Admin accounts can&apos;t submit customer appointment
                  requests.
                </p>
              ) : (
                <BookingForm
                  serviceId={id}
                  serviceName={service.name}
                  price={Number(service.price)}
                  duration={service.duration}
                  headingClassName={heading.className}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return content;
}

const ServiceDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <section
      className={cn(
        body.className,
        "min-h-screen bg-white px-6 pb-24 pt-14 text-[#333]",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#333]"
        >
          <ArrowLeft className="size-4" /> All services
        </Link>

        <div className="mb-10 mt-6 flex flex-col items-center text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#d98a2b]">
            Service details
          </p>
          <div className="mt-2.5 flex w-52 items-center gap-2">
            <span className="h-px flex-1 bg-[#e5e5e5]" />
            <Scissors className="size-4 -rotate-90 text-[#333]" />
            <span className="h-px flex-1 bg-[#e5e5e5]" />
          </div>
        </div>

        <Suspense
          fallback={
            <p className="mt-10 text-center text-sm text-[#666]">
              Loading service details…
            </p>
          }
        >
          <ServiceDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;
