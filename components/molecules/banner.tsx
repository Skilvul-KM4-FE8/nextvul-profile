import { useState } from "react";
import { PuffLoader } from "react-spinners";

export default function Banner() {
  const [loading] = useState(true);
  return (
    <>
      <div>
        <div className="dark:bg-slate-950 bg-[#9EBDFC]  ">
          {/* main 0 */}
          <div className="grid grid-rows-[100px_1fr_100px] items-center justify-items-center mx-auto max-w-5xl max-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <p className="text-center mt-12 text-2xl sm:text-left  font-bold">Nextvul, Indonesia&apos;s leading software development agency</p>

              <p className="text-center justify-content-center sm:text-left text-l">
                Nextvul is the We design, build and maintain software and their like financial services, logistics and transportation, e-commerce, entertainment, loyalty and many more.
              </p>
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
