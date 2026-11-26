import Image from "next/image";

import type { Appointment } from "./mock-data";
import StatusBadge from "./StatusBadge";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export default function AppointmentDetailPanel({
  appointment,
  showCustomer = false,
}: {
  appointment: Appointment;
  showCustomer?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src={appointment.image}
          alt={appointment.service}
          width={48}
          height={48}
          className="size-12 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-heading font-semibold">{appointment.service}</p>
          <p className="text-xs text-muted-foreground">{appointment.category}</p>
        </div>
      </div>

      <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
        {showCustomer && (
          <>
            <Detail label="Customer" value={appointment.customer} />
            <Detail label="Email" value={appointment.customerEmail} />
          </>
        )}
        <Detail label="Reference" value={appointment.id} />
        <Detail label="Date" value={appointment.date} />
        <Detail label="Time" value={appointment.time} />
        <Detail label="Duration" value={appointment.duration} />
        <Detail label="Service price" value={`$${appointment.price.toFixed(2)}`} />
        <Detail label="Requested" value={appointment.requestedAt} />
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Appointment status
          </dt>
          <dd className="mt-1">
            <StatusBadge status={appointment.status} />
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Payment status
          </dt>
          <dd className="mt-1">
            <StatusBadge status={appointment.paymentStatus} />
          </dd>
        </div>
        {appointment.message && (
          <div className="sm:col-span-2">
            <Detail label="Customer message" value={appointment.message} />
          </div>
        )}
      </dl>
    </div>
  );
}
