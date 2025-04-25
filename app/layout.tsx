"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <body>
            <SignedIn></SignedIn>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <main>{children}</main> <Toaster />
              <Analytics />
            </ThemeProvider>
          </body>
        </QueryClientProvider>
      </ClerkProvider>
    </html>
  );
}
