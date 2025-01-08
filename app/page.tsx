"use client";
import { MarqueeDemo } from "@/components/magic-card-provider";
import { DockDemo } from "@/components/dock-provider";
import Footer from "@/components/footer";
import Banner1 from "@/components/molecules/banner";
import Content1 from "@/components/molecules/Content";
import TechStack1 from "@/components/molecules/techStack";

export default function Home() {
  // `setLoading` removed as it is unused

  return (
    <>
      <DockDemo />
      <Banner1 />
      <TechStack1 />
      <Content1 />
      <MarqueeDemo />
      <Footer />
    </>
  );
}
