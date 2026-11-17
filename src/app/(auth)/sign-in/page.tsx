
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bebas_Neue } from "next/font/google";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Navbar from "@/components/HomePage_components/Navbar";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inputClasses =
  "h-12 rounded-lg border-white/25 bg-black/30 pl-12 text-base text-white placeholder:text-white/60 focus-visible:border-[#d98a2b] focus-visible:ring-[#d98a2b]/30";

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-5"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.4 0 20.1 0 24s1 7.6 2.6 10.8l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0805] text-white">
      <main className="relative flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Background Image */}
        <Image
          src="/images/img-71.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-2 lg:px-10 lg:pt-50">

          {/* Left Section */}
          <section className="hidden lg:block">

            <p
              className={cn(
                bebas.className,
                "text-2xl tracking-[0.25em] text-[#d98a2b]"
              )}
            >
              Welcome Back
            </p>

            <div className="mt-2 h-1 w-14 bg-[#d98a2b]" />

            <h1
              className={cn(
                bebas.className,
                "mt-6 text-7xl leading-[0.95] tracking-wide xl:text-[88px]"
              )}
            >
              YOUR STYLE,
              <br />
              YOUR <span className="text-[#d98a2b]">WAY</span>
            </h1>

            <p className="mt-8 max-w-md text-xl leading-8 text-white/90">
              Welcome back to HairCutter. Sign in to book
              appointments, explore exclusive offers and
              enjoy a premium grooming experience.
            </p>

            <ul className="mt-10 space-y-4">

              {[
                "Book Your Appointments",
                "Explore Exclusive Offers",
                "Manage Your Bookings",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-lg"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#d98a2b] text-[#1a1208]">
                    <LogIn className="size-5" />
                  </span>

                  {item}
                </li>
              ))}

            </ul>
          </section>

          {/* Right Section - Sign In Card */}
          <section className="mx-auto w-full max-w-xl rounded-2xl border border-white/30 bg-black/60 p-6 backdrop-blur-md sm:p-10">

            {/* Logo & Heading */}
            <div className="flex flex-col items-center text-center">

              <Image
                src="/images/logo-1.webp"
                alt="Barber Shop Logo"
                width={110}
                height={96}
                className="h-auto w-22.5"
              />

              <h2
                className={cn(
                  bebas.className,
                  "mt-3 text-4xl tracking-wide text-white"
                )}
              >
                Sign In
              </h2>

              <p className="mt-1 text-white/90">
                Welcome back! Continue your grooming journey
              </p>

            </div>

            <div className="mt-8 space-y-5">

              {/* Email Field */}
              <div className="relative">

                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/80" />

                <Input
                  type="email"
                  placeholder="Email Address"
                  className={inputClasses}
                />

              </div>

              {/* Password Field */}
              <div className="relative">

                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/80" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={cn(inputClasses, "pr-12")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 transition hover:text-[#d98a2b]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeOff className="size-5" />
                  )}
                </button>

              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 text-sm text-white/80">

                <input
                  type="checkbox"
                  id="remember"
                  className="size-4 accent-[#d98a2b]"
                />

                <label htmlFor="remember" className="cursor-pointer">
                  Remember me
                </label>

              </div>

              {/* Success Message UI */}
              {/* Add success message here when login succeeds */}

              {/* Error Message UI */}
              {/* Add error message here when login fails */}

              {/* Sign In Button */}
              <Button
                type="button"
                className="h-12 w-full rounded-lg bg-[#d98a2b] text-base font-semibold text-[#1a1208] hover:bg-[#c07a22]"
              >
                <LogIn className="size-5" />
                Sign In
                <ArrowRight className="size-5" />
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 text-sm text-white/80">

                <span className="h-px flex-1 bg-white/20" />

                or continue with

                <span className="h-px flex-1 bg-white/20" />

              </div>

              {/* Google Login UI */}
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full gap-3 rounded-lg border-white/25 bg-black/30 text-white hover:bg-white/10 hover:text-white"
              >
                <GoogleIcon />
                Google
              </Button>

              {/* Sign Up Link */}
              <p className="pt-2 text-center text-sm">

                Don&apos;t have an account?{" "}

                <Link
                  href="/sign-up"
                  className="text-[#d98a2b] hover:underline"
                >
                  Sign Up
                </Link>

              </p>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
