import type { Metadata } from "next";
import { Oxanium, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import FooterSection from "@/components/HomePage_components/FooterSection";
import SiteNavbar from "@/components/SiteNavbar";
const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Barber Shop",
  description: "Beard, hair styling and haircut services",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <SiteNavbar />
        <main>{children}</main>
        <Toaster />
        <FooterSection />
      </body>
    </html>
  );
}
