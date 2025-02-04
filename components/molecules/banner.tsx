import { useState } from "react";
import { PuffLoader } from "react-spinners";

export default function Banner() {
  const [loading] = useState(true);
  return (
    <>
      <div>
        <div className="dark:bg-slate-950 bg-[#ffff]">
          {/* main 0 */}
          <div className="grid grid-rows-[100px_1fr_100px] mx-auto max-w-6xl max-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2  sm:items-start">
              {/* Judul */}
              <p className="sm:text-left text-center mt-12 text-3xl sm:text-4xl md:text-5xl font-bold">Nextvul, Indonesia&apos;s leading software development agency</p>

              {/* Deskripsi */}
              <p className="text-center sm:text-left text-lg sm:text-xl md:text-2xl">
                Nextvul is the We design, build and maintain software and their like financial services, logistics and transportation, e-commerce, entertainment, loyalty and many more.
              </p>

              {/* Loader */}
              <div className="flex justify-center text-center">
                <PuffLoader color={"#047CB6"} loading={loading} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
