"use client";
import { MarqueeDemo } from "../../components/magic-card-provider";
import { DockDemo } from "@/components/dock-provider";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import { CircleLoader, PuffLoader, RingLoader } from "react-spinners";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <DockDemo />
      <div>
        {/* main 0 */}
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center mx-auto max-w-5xl max-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <p className="text-center sm:text-left text-3xl font-bold"> Nextvul, Indonesia's leading software development agency </p>

            <p className="text-center sm:text-left">
              Founded in Jakarta, Nextvul is the We design, build and maintain software and their backends for most of the leading companies in various industries, like financial services, logistics and transportation, e-commerce,
              entertainment, loyalty and many more.
            </p>
            <div className="flex justify-center text-center">
              <PuffLoader color={"#047CB6"} loading={loading} />
            </div>
          </main>
        </div>
        {/* main 1 */}
        <div className="grid grid-rows-[20px_1fr_20px] items-center mx-auto max-w-5xl justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <p className="text-center sm:text-left text-xl font-bold"> Alasan Memilih Nextvul </p>

            <p className="text-center sm:text-left">Konsultan IT Terbaik di Indonesia, Berikan Solusi Terdepan untuk Bisnis Anda</p>
            <p className="text-center sm:text-left">Nextvul tidak hanya menawarkan solusi teknologi terdepan, namun juga kemitraan yang didasarkan pemahaman mendalam mengenai kebutuhan unik industri bisnis Anda.</p>
            <div className="space-y-4 ">
              <Card>
                <CardHeader>
                  <CardTitle>Tim Ahli Berpengalaman</CardTitle>
                  <CardDescription>Tim ahli IT yang berpengalaman yang siap membantu menemukan solusi IT yang tepat.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Teknologi Terdepan</CardTitle>
                  <CardDescription>Memberikan akses ke teknologi terbaru dan inovatif untuk membantu Anda jadi terdepan.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Komitmen Terhadap Kualitas</CardTitle>
                  <CardDescription>Pengalaman bertahun-tahun memberikan layanan terbaik dengan standar kualitas tinggi.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fokus pada Pelanggan</CardTitle>
                  <CardDescription>Memprioritaskan kebutuhan Anda untuk berikan solusi yang sesuai dengan bisnis Anda.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </main>
        </div>

        <MarqueeDemo />
        <Footer />
      </div>
    </>
  );
}
