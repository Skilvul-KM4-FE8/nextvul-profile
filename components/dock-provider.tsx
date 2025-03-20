"use client";

import React from "react";
import Link from "next/link";
import { CalendarIcon, Contact2Icon, HomeIcon, LayoutDashboard, MailIcon, Newspaper, PencilIcon, PresentationIcon, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMotionValue } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ModeToggle from "@/components/mode-toggle";
import { Dock, DockIcon } from "@/components/ui/dock";
import { UserButton } from "@clerk/nextjs";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,

  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
};

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/marketplace", icon: Store, label: "Marketplace" },
    { href: "#", icon: Newspaper, label: "Blog" },
    { href: "#", icon: PresentationIcon, label: "Project" },
    { href: "#", icon: PencilIcon, label: "About" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  ],
  contact: {
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: Icons.linkedin,
      },
      Email: {
        name: "Send Email",
        url: "https://mail.google.com/mail/?view=cm&fs=1&to=nextvulservice@gmail.com&su=COLLABORATION PROJECT&body=Dear Nextvul,",
        icon: Icons.email,
      },
      Whatsapp: {
        name: "Whatsapp",
        url: "https://wa.me/081927453030",
        icon: Contact2Icon,
      },
    },
  },
};

export function DockDemo() {
  const mouseX = useMotionValue(0); // Define a single motion value for all DockIcon components

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label} mouseX={mouseX}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} aria-label={item.label} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}>
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name} mouseX={mouseX}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={social.url} aria-label={social.name} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}>
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon mouseX={mouseX}>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon mouseX={mouseX}>
            <Tooltip>
              <TooltipTrigger asChild>
                <UserButton />
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
