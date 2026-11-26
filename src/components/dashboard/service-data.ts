import type { Service } from "./mock-data";

export type ServiceDoc = {
  _id?: string | { $oid?: string };
  name?: string;
  category?: string;
  price?: number | string;
  duration?: string | number;
  durationMinutes?: number | string;
  description?: string;
  shortDescription?: string;
  image?: string;
  status?: string;
  isActive?: boolean;
};

export type DashboardService = Service & { _id: string };

const FALLBACK_IMAGE = "/images/img-34.webp";

const docId = (doc: ServiceDoc) =>
  typeof doc._id === "string" ? doc._id : (doc._id?.$oid ?? "");

export function toDashboardService(doc: ServiceDoc): DashboardService {
  const id = docId(doc);

  const durationMinutes =
    doc.durationMinutes != null && !Number.isNaN(Number(doc.durationMinutes))
      ? Number(doc.durationMinutes)
      : Number.parseInt(String(doc.duration ?? ""), 10) || 60;

  return {
    id,
    _id: id,
    name: doc.name ?? "Untitled service",
    category: doc.category ?? "",
    description: doc.description ?? doc.shortDescription ?? "",
    price: Number(doc.price) || 0,
    durationMinutes,
    image: doc.image || FALLBACK_IMAGE,
    status:
      doc.status === "Inactive" || doc.isActive === false ? "Inactive" : "Active",
  };
}
