"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { type Service } from "./mock-data";
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

const field =
  "h-10 border-border bg-background focus-visible:border-primary focus-visible:ring-primary/40";

export default function ServiceForm({
  initialService,
  idPrefix = "service",
}: {
  initialService?: Service;
  idPrefix?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(initialService?.category ?? "");
  const [status, setStatus] = useState(initialService?.status ?? "Active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setImageError] = useState("");
  const [, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const clearImage = () => {
    setImageError("");
    setProfileImage(null);
    setProfileImagePreview("");
    setUploadedImageUrl("");
  };

  // Handle image selection (uploads to imgbb)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];

    if (!file) return;

    const rejectImage = (message: string) => {
      clearImage();
      setImageError(message);
      toast.error(message);
      input.value = "";
    };

    if (!file.type.startsWith("image/")) {
      return rejectImage("Please select a valid image.");
    }

    if (file.size > 5 * 1024 * 1024) {
      return rejectImage("Image size must be less than 5MB.");
    }

    setImageError("");
    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
    setUploadedImageUrl("");
    setUploading(true);
    const toastId = toast.loading("Uploading image...");

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
      toast.success("Image uploaded", { id: toastId });
    } catch (error) {
      console.error("Image upload error:", error);
      toast.dismiss(toastId);
      rejectImage("Could not upload the image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const price = Number(formData.get("price"));
    const durationMinutes = Number(formData.get("durationMinutes"));
    // Validation
    if (!name) return toast.error("Service name is required");
    if (!description) return toast.error("Description is required");
    if (!category) return toast.error("Please choose a category");
    if (!(price > 0)) return toast.error("Price must be a positive number");
    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      return toast.error("Duration must be a positive whole number");
    }
    if (uploading) return toast.error("Please wait, the image is still uploading");
    if (!initialService && !uploadedImageUrl) {
      return toast.error("Please choose a service image");
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) return toast.error("Backend URL is not configured");

    // MongoDB documents use _id
    const serviceId = (initialService as (Service & { _id?: string }) | undefined)?._id;
    if (initialService && !serviceId) {
      return toast.error("This service has no database ID, so it cannot be updated");
    }

    setIsSubmitting(true);
    const toastId = toast.loading(initialService ? "Saving changes..." : "Creating service...");

    try {
      const res = await fetch(
        initialService ? `${backendUrl}/services/${serviceId}` : `${backendUrl}/services`,
        {
          method: initialService ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            category,
            status,
            price,
            durationMinutes,
            // Keep the public list/detail pages in sync with the booking form
            duration: `${durationMinutes} min`,
            // The old image is kept if no new one is chosen
            ...(uploadedImageUrl && { image: uploadedImageUrl }),
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.acknowledged) {
        throw new Error(data?.message ?? "Something went wrong");
      }

      toast.success(
        initialService ? "Service updated successfully" : "Service created successfully",
        { id: toastId }
      );

      if (!initialService) {
        // The Toaster lives in the root layout, so the success toast survives
        // this client-side navigation.
        router.push("/services");
        router.refresh();
        return;
      }
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Cannot connect to the server"
          : error instanceof Error
            ? error.message
            : "Something went wrong";
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.form?.reset();
    clearImage();
    setCategory(initialService?.category ?? "");
    setStatus(initialService?.status ?? "Active");
    toast.info("Form has been reset");
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Service details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-name`}>Service name</Label>
              <Input
                id={`${idPrefix}-name`}
                name="name"
                className={field}
                placeholder="e.g. Classic Haircut"
                defaultValue={initialService?.name}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-description`}>Description</Label>
              <Textarea
                id={`${idPrefix}-description`}
                name="description"
                className="min-h-24 border-border bg-background focus-visible:border-primary focus-visible:ring-primary/40"
                placeholder="Describe this service…"
                defaultValue={initialService?.description}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
                <SelectTrigger className={field}>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="dashboard-scope">
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Care">Care</SelectItem>
                  <SelectItem value="Hair">Hair</SelectItem>
                  <SelectItem value="Haircut">Haircut</SelectItem>
                  <SelectItem value="Makeup">Makeup</SelectItem>
                  <SelectItem value="Nails">Nails</SelectItem>
                  <SelectItem value="Shave">Shave</SelectItem>
                  <SelectItem value="Skin">Skin</SelectItem>
                  <SelectItem value="Spa">Spa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value ?? "Active")}>
                <SelectTrigger className={field}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dashboard-scope">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-price`}>Price ($)</Label>
              <Input
                id={`${idPrefix}-price`}
                name="price"
                type="number"
                min="1"
                step="0.01"
                className={field}
                placeholder="45"
                defaultValue={initialService?.price}
              />
              <p className="text-xs text-muted-foreground">Must be a positive number.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-duration`}>Estimated duration (minutes)</Label>
              <Input
                id={`${idPrefix}-duration`}
                name="durationMinutes"
                type="number"
                min="1"
                className={field}
                placeholder="45"
                defaultValue={initialService?.durationMinutes}
              />
              <p className="text-xs text-muted-foreground">Must be a positive number.</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-image`}>Service image</Label>
              {!initialService && profileImagePreview && (
                <Image
                  src={profileImagePreview}
                  alt="Selected service"
                  width={64}
                  height={64}
                  unoptimized
                  className="size-16 rounded-lg object-cover"
                />
              )}
              {initialService && (
                <Image
                  src={initialService.image}
                  alt={initialService.name}
                  width={64}
                  height={64}
                  className="size-16 rounded-lg object-cover"
                />
              )}
              <label
                htmlFor={`${idPrefix}-image`}
                className="flex h-11 cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 text-sm text-muted-foreground transition hover:border-primary"
              >
                Choose an image to upload (JPG, PNG or WEBP)
              </label>
              <Input
                id={`${idPrefix}-image`}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                Upload a file rather than pasting an image URL.
              </p>
            </div>
          </div>

          <Separator />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting || uploading}>
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting || uploading}>
              {initialService ? "Save changes" : "Create service"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}