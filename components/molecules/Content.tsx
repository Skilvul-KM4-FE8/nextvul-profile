import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { icons, UserRoundCheck } from "lucide-react";
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
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center mx-auto my-auto max-w-5xl justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
        <div>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <p className="text-center sm:text-left text-4xl font-bold">Alasan Memilih Nextvul</p>
            <p className="text-center text-2xl  sm:text-left">Konsultan IT Terbaik di Indonesia, Berikan Solusi Terdepan untuk Bisnis Anda</p>
            <p className="text-center sm:text-left">Nextvul tidak hanya menawarkan solusi teknologi terdepan, namun juga kemitraan yang didasarkan pemahaman mendalam mengenai kebutuhan unik industri bisnis Anda.</p>
          </main>{" "}
        </div>
        <div className=" grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <Card className="p-4" key={index}>
              <item.icons size={30} className="my-3" />
              <CardTitle className="mb-3 underline">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
