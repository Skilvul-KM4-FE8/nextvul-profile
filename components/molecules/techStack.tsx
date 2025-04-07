"use client";

import Marquee from "@/components/ui/marquee";
import StackIcon from "tech-stack-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const techStacks = ["kotlin", "reactjs", "nextjs2", "nuxtjs", "vuejs", "angular", "vitejs", "astro", "remix", "bunjs", "docker", "mongodb", "postgresql", "prisma", "typescript", "nestjs", "angular17", "deno", "go", "laravel", "netlify2"];

const firstRow = techStacks.slice(0, techStacks.length / 2);

const TechStackIcon = ({ name }: { name: string }) => {
  return (
    <div className=" transform scale-50 dark:grayscale hover:dark:grayscale-0 transition-all duration-300 ease-in-out hover:scale-75 cursor-pointer">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <StackIcon name={name} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize  font-[family-name:var(--font-geist-sans)]">{name.replace(/[0-9]/g, "")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default function TechStackMarquee() {
  return (
    <div className="flex h-[135px] w-full flex-col items-center justify-center overflow-hidden bg-slate-700 dark:bg-slate-900">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((tech) => (
          <TechStackIcon key={tech} name={tech} />
        ))}
      </Marquee>
    </div>
  );
}
