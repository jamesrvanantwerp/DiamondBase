import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiamondBase – Indoor Baseball Facility Management",
  description: "Smart scheduling, access control, and performance tracking for indoor baseball facilities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-950 text-white min-h-screen antialiased`}>
        <AuthProvider>
          <BookingProvider>
            <Navbar />
            <main>{children}</main>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
