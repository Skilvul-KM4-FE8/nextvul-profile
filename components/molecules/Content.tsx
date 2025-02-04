import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { icons } from "lucide-react";

export default function Content() {
  const data = [
    {
      title: "Keahlian dan Dedikasi",
      description: "Kami memiliki tim ahli dengan pengalaman bertahun-tahun yang berkomitmen untuk memberikan hasil terbaik bagi klien",
      icons: icons.Zap,
    },
    {
      title: "Konsistensi",
      description: "Nextvul bekerja bahu-membahu dengan Anda untuk memastikan solusi kami tidak hanya relevan tetapi juga praktis untuk diterapkan",
      icons: icons.UserRoundCheck,
    },
    {
      title: "Inovasi Berkelanjutan",
      description: "Kami selalu berada di garis depan inovasi teknologi, sehingga bisnis Anda tetap selangkah lebih maju",
      icons: icons.ChartNoAxesCombined,
    },
    {
      title: "Terbaik di Ranahnya",
      description: "Dengan harga yang terjangkau, pelayanan yang kami berikan tidak kalah bersaing dengan software lainnya",
      icons: icons.HandCoins,
    },
  ];

  return (
    <>
      <div className="dark:bg-slate-950 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center m-auto max-w-6xl justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] pt-10">
          {/* Bagian Teks */}
          <div>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pt-10">
              {/* Judul */}
              <p className="text-center sm:text-left text-xl sm:text-2xl md:text-3xl font-bold">Alasan Memilih Nextvul</p>

              {/* Subjudul */}
              <p className="text-center sm:text-left text-lg sm:text-xl md:text-2xl">Konsultan IT Terbaik di Indonesia, Berikan Solusi Terdepan untuk Bisnis Anda</p>

              {/* Deskripsi */}
              <p className="text-center sm:text-left text-base sm:text-lg md:text-xl">
                Nextvul tidak hanya menawarkan solusi teknologi terdepan, namun juga kemitraan yang didasarkan pemahaman mendalam mengenai kebutuhan unik industri bisnis Anda.
              </p>
            </main>
          </div>

          {/* Bagian Kartu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.map((item, index) => (
              <Card className="dark:bg-slate-950 hover: p-4" key={index}>
                {/* Ikon */}
                <item.icons size={30} className="my-3" />

                {/* Judul Kartu */}
                <CardTitle className="mb-3 underline text-lg sm:text-xl md:text-2xl">{item.title}</CardTitle>

                {/* Deskripsi Kartu */}
                <CardDescription className="text-base sm:text-lg md:text-xl">{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
