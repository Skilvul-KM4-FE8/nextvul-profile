import { Card, CardDescription, CardTitle } from "@/components/ui/card";
export default function Content() {
  const data = [
    {
      title: "Tim Ahli Berpengalaman",
      description: "Tim ahli IT yang berpengalaman yang siap membantu menemukan solusi IT yang tepat.",
    },
    {
      title: "Teknologi Terdepan",
      description: "Memberikan akses ke teknologi terbaru dan inovatif untuk membantu Anda jadi terdepan.",
    },
    {
      title: "Komitmen Terhadap Kualitas",
      description: "Pengalaman bertahun-tahun memberikan layanan terbaik dengan standar kualitas tinggi.",
    },
    {
      title: "Fokus pada Pelanggan",
      description: "Memprioritaskan kebutuhan Anda untuk berikan solusi yang sesuai dengan bisnis Anda.",
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
            <p className="text-center sm:text-left">Nextvul tidak hanya menawarkan solusi teknologi terdepan, namun juga kemitraan yang didasarkan pemahaman mendalam mengenai kebutuhan unik industri bisnis Anda.</p>{" "}
          </main>{" "}
        </div>
        <div className=" grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <Card className="p-4" key={index}>
              <CardTitle className="mb-3 underline">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
