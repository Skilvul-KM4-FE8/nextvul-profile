"use client";
import { MarqueeDemo } from "@/components/magic-card-provider";
import { DockDemo } from "@/components/dock-provider";
import Footer from "@/components/footer";
import Banner1 from "@/components/molecules/banner";
import Content1 from "@/components/molecules/Content";

export default function Home() {
  // `setLoading` removed as it is unused

  return (
    <>
      <DockDemo />
      <Banner1 />
      <Content1 />
      <MarqueeDemo />
      <Footer />
    </>
  );
}
