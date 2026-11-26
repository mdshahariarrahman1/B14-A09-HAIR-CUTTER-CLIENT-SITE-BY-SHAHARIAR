import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, ShieldCheck } from "lucide-react";

import { services } from "@/components/dashboard/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

const service = services[0];

export default function BookAppointmentPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf9] px-6 pb-24 pt-20 font-body text-[#333]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#8a7d80] transition hover:text-[#d98a2b]"
        >
          <ArrowLeft className="size-4" /> Back to services
        </Link>

        <p className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#d98a2b]">
          Appointment request
        </p>
        <h1 className="mt-3 font-heading text-5xl font-bold uppercase tracking-wide sm:text-6xl">
          Book an appointment
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6f6266]">
          Choose a date and time for your visit. Requests are reviewed by the salon
          before they are confirmed.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <form
            className="space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <Card className="border-[#eee6df] bg-white">
              <CardHeader>
                <CardTitle className="font-heading uppercase tracking-wide">
                  Appointment details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="appointment-date">Appointment date</Label>
                  <Input id="appointment-date" type="date" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Available time slot</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="appointment-message">
                    Additional message (optional)
                  </Label>
                  <Textarea
                    id="appointment-message"
                    rows={4}
                    placeholder="Anything we should know before your visit?"
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 rounded-xl border border-[#eee6df] bg-white p-4 text-sm text-[#6f6266]">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#d98a2b]" />
              <p>
                Only active services can be booked, and duplicate requests for the
                same date and time are not accepted.
              </p>
            </div>

            <Button type="submit" className="h-12 w-full bg-[#d98a2b] text-[#1a1208] hover:bg-[#c07a22]">
              Request appointment
            </Button>
          </form>

          <Card className="h-fit border-[#eee6df] bg-white">
            <CardHeader>
              <CardTitle className="font-heading uppercase tracking-wide">
                Your selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-heading text-lg font-semibold">
                    {service.name}
                  </p>
                  <p className="text-xs text-[#8a7d80]">{service.category}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-[#6f6266]">
                <Clock3 className="size-4 text-[#d98a2b]" />
                {service.durationMinutes} minutes
              </div>
              <div className="flex items-center justify-between border-t border-[#eee6df] pt-4">
                <span className="text-sm text-[#6f6266]">Service price</span>
                <span className="font-heading text-2xl font-semibold text-[#d98a2b]">
                  ${service.price.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
