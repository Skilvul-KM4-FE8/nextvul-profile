import Image from "next/image";
import React from "react";

const QuotesSection = () => {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] bg-[#261D17] mx-auto">
      <div className="w-10/12 md:max-w-5xl py-20 mx-auto gap-10 flex flex-col items-center justify-center ">
        <div className="flex justify-center items-center gap-1 flex-col">
          <h2 className="text-4xl font-medium">Whenever you&apos;re ready:</h2>
          <h2 className="text-4xl font-medium">
            Let&apos;s talk about <span className="text-[#E09144]"> your project</span>
          </h2>
        </div>
        <p className="text-center">
          &quot;You&apos;re gonna save yourself problems and money in the <br /> long term with software done correctly.&quot;
        </p>
        <div className="flex items-center justify-center">
          <Image src="/nextvulWhite.svg" className="rounded-full" height={70} width={70} alt="CEO" />
          <div>
            <h3 className="text-lg">Muhammad Rafai</h3>
            <h5 className="font-thin text-sm">Founder Nextvul</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesSection;
