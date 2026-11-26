"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Rajdhani, Roboto } from "next/font/google";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

const benefits = [
  "Book Appointments Easily",
  "Get Exclusive Offers",
  "Manage Your Bookings",
];

const passwordRules = [
  "Minimum 6 characters",
  "One uppercase letter",
  "One lowercase letter",
];

const inputClasses =
  "h-12 rounded-lg border-white/25 bg-black/30 pl-12 text-base text-white placeholder:text-white/60 focus-visible:border-[#d98a2b] focus-visible:ring-[#d98a2b]/30";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
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

export default function SignUpPage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);

  // Handle image selection (uploads to imgbb)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image.");
      setProfileImage(null);
      setProfileImagePreview("");
      setUploadedImageUrl("");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB.");
      setProfileImage(null);
      setProfileImagePreview("");
      setUploadedImageUrl("");
      e.target.value = "";
      return;
    }

    setImageError("");
    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
    setUploadedImageUrl("");
    setUploading(true);

    try {
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", file);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

      const res = await fetch(imageAPI, {
        method: "POST",
        body: imgbbFormData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result?.error?.message ?? "Upload failed");
      }

      setUploadedImageUrl(result.data.url);
      console.log("Image uploaded to imgbb:", result.data.url);
    } catch (error) {
      console.error("Image upload error:", error);
      setImageError("Could not upload the image. Please try again.");
      setProfileImage(null);
      setProfileImagePreview("");
      setUploadedImageUrl("");
      e.target.value = "";
    } finally {
      setUploading(false);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
    setUploadedImageUrl("");
    setImageError("");

    const input = document.getElementById("profile-image") as HTMLInputElement;

    if (input) {
      input.value = "";
    }
  };

  // BetterAuth Sign Up Functionality

  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Wait until the imgbb upload finishes so the image URL isn't lost.
    if (uploading) {
      toast.info("Image is still uploading. Please wait a moment.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    // Image is already uploaded to imgbb in handleImageChange.
    const image = uploadedImageUrl || undefined;

    try {
      // `role` is not sent here: it's `input: false` in src/lib/auth.ts and
      // defaults to "customer" server-side on user creation.
      const response = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (response.error) {
        console.error("Sign-up error:", response.error.message);
        toast.error(response.error.message);
        return;
      }

      console.log("Sign-up successful:", response.data);

      toast.success("Account created successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div
      className={cn(
        body.className,
        "flex min-h-screen flex-col bg-[#0b0805] text-white",
      )}
    >
      <main className="relative flex-1">
        {/* Background image + overlay */}
        <Image
          src="/images/img-71.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-2 lg:px-10 lg:pt-36">
          {/* Left: intro */}
          <section className="hidden lg:block">
            <p
              className={cn(
                heading.className,
                "text-2xl font-bold uppercase tracking-[0.25em] text-[#d98a2b]",
              )}
            >
              Join our community
            </p>

            <div className="mt-2 h-1 w-14 bg-[#d98a2b]" />

            <h1
              className={cn(
                heading.className,
                "mt-6 text-7xl font-bold leading-[0.95] tracking-wide xl:text-[88px]",
              )}
            >
              Sign up to
              <br />
              Haircut <span className="text-[#d98a2b]">&</span> Shaves
            </h1>

            <p className="mt-8 max-w-md text-xl leading-8 text-white/90">
              Create your account and enjoy exclusive benefits, special offers
              and a premium grooming experience.
            </p>

            <ul className="mt-10 space-y-4">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#d98a2b] text-[#1a1208]">
                    <Check className="size-5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Right: signup form */}
          <section className="mx-auto w-full max-w-xl rounded-2xl border border-white/30 bg-black/60 p-6 backdrop-blur-md sm:p-10">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/logo-1.webp"
                alt="Barber Shop - Shaves and Cuts, est. 1996"
                width={110}
                height={96}
                className="h-auto w-22.5"
              />

              <h2
                className={cn(
                  heading.className,
                  "mt-3 text-4xl font-bold tracking-wide text-white",
                )}
              >
                Create Account
              </h2>

              <p className="mt-1 text-white/90">
                Join HairCutter and start your grooming journey
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSignUp}>
              {/* Full name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/80" />

                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/80" />

                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={inputClasses}
                />
              </div>

              {/* Password with working eye button */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/80" />

                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={cn(inputClasses, "pr-12")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 transition hover:text-[#d98a2b]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeOff className="size-5" />
                  )}
                </button>
              </div>

              {/* Profile Image Upload */}
              <div className="space-y-3">
                <label
                  htmlFor="profile-image"
                  className="flex h-14 cursor-pointer items-center gap-4 rounded-lg border border-white/25 bg-black/30 pl-4 pr-1.5 transition hover:border-[#d98a2b]"
                >
                  <ImageIcon className="size-5 shrink-0 text-white/80" />

                  <span className="flex-1 truncate text-sm text-white/60">
                    {profileImage ? profileImage.name : "Upload Profile Image"}
                  </span>

                  <span className="flex h-11 shrink-0 items-center rounded-md bg-[#d98a2b] px-5 font-semibold text-[#1a1208] transition hover:bg-[#c07a22]">
                    Choose File
                  </span>

                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imageError && (
                  <p className="text-sm text-red-400">{imageError}</p>
                )}

                {/* Image preview */}
                {profileImagePreview && (
                  <div className="flex items-center gap-4 rounded-lg border border-[#d98a2b]/40 bg-black/40 p-3">
                    <Image
                      src={profileImagePreview}
                      alt="Profile Preview"
                      width={64}
                      height={64}
                      unoptimized
                      className="size-16 rounded-full border-2 border-[#d98a2b] object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Image Selected
                      </p>

                      <p className="truncate text-xs text-white/60">
                        {profileImage?.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-sm text-red-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Password rules */}
              <div className="flex gap-3 rounded-lg border border-[#d98a2b]/40 bg-[#d98a2b]/10 p-4">
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#d98a2b] text-sm font-bold text-[#1a1208]"
                  aria-hidden="true"
                >
                  !
                </span>

                <div>
                  <p className="text-sm font-semibold">Password must have:</p>

                  <ul className="mt-1 space-y-0.5 text-sm text-white/75">
                    {passwordRules.map((rule) => (
                      <li key={rule} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#d98a2b]" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                aria-busy={uploading}
                className="h-12 w-full rounded-lg bg-[#d98a2b] text-base font-semibold text-[#1a1208] hover:bg-[#c07a22]"
              >
                <UserPlus className="size-5" />
                Sign Up
                <ArrowRight className="size-5" />
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="h-px flex-1 bg-white/20" />
                or continue with
                <span className="h-px flex-1 bg-white/20" />
              </div>

              {/* Google only */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full gap-3 rounded-lg border-white/25 bg-black/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <GoogleIcon />
                  Google
                </Button>
              </div>

              <p className="pt-1 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-[#d98a2b] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};