"use client";

import Marquee from "@/components/ui/marquee";
import StackIcon from "tech-stack-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const techStacks = ["kotlin", "reactjs", "nextjs2", "nuxtjs", "vuejs", "angular", "vitejs", "astro", "svelte", "remix", "bunjs", "docker", "mongodb", "postgresql", "prisma", "typescript"];

const firstRow = techStacks.slice(0, techStacks.length / 2);

const TechStackIcon = ({ name }: { name: string }) => {
  return (
    <div className="mx-4 transform scale-75 dark:grayscale hover:dark:grayscale-0 transition-all duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <StackIcon name={name} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize font-bold font-[family-name:var(--font-geist-mono)]">{name.replace(/[0-9]/g, "")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default function TechStackMarquee() {
  return (
    <div className="mb-10 flex h-[200px] w-full flex-col items-center justify-center overflow-hidden bg-slate-700 dark:bg-slate-900">
      <div className="text-white text-center font-bold text-2xl p-3 font-[family-name:var(--font-geist-mono)] uppercase">
        <p>Integrates seamlessly with</p>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((tech) => (
          <TechStackIcon key={tech} name={tech} />
        ))}
      </Marquee>
    </div>
  );
}
