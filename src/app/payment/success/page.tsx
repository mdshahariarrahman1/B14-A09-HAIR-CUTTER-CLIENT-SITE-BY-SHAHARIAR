import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fdfbf9] px-6 py-20 font-body text-[#333]">
      <Card className="w-full max-w-lg border-[#eee6df] bg-white text-center">
        <CardContent className="space-y-5 py-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#2f6b4f]/10 text-[#2f6b4f]">
            <CheckCircle2 className="size-9" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d98a2b]">
              Payment confirmed
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide">
              Payment successful
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#6f6266]">
              Your payment has been verified. You can review the transaction and
              your appointment in your dashboard.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard/customer/appointments"
              className={buttonVariants({ className: "bg-[#d98a2b] text-[#1a1208] hover:bg-[#c07a22]" })}
            >
              View my appointments
            </Link>
            <Link
              href="/services"
              className={buttonVariants({ variant: "outline" })}
            >
              Browse services
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
