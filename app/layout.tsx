"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loading from "@/components/loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Loading />}>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <body>
              <SignedIn></SignedIn>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <main>{children}</main>

                <Toaster />
                <Analytics />
              </ThemeProvider>
            </body>
          </html>
        </QueryClientProvider>
      </ClerkProvider>
    </Suspense>
  );
}
