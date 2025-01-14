import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const FooterCopyright = () => {
  const footerLinks = [
    { name: "Services", link: "/" },
    { name: "Portofolio", link: "/" },
    { name: "About Us", link: "/" },
    { name: "Blog", link: "/" },
    { name: "Career", link: "/" },
    { name: "Alumni", link: "/" },
    { name: "Contact Us", link: "/" },
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-10/12 md:max-w-5xl border-t border-t-slate-500 mx-auto py-3">
      <div className="flex gap-5 flex-col md:flex-row items-center justify-between mx-auto py-5">
        <Image src={"nextvulWhite.svg"} width={80} height={80} alt="Nextvul" />
        <div className="flex gap-7">
          <Link href="/">
            <FaInstagram className="text-2xl md:text-3xl text-slate-300 cursor-pointer" />
          </Link>
          <Link href="/">
            <FaLinkedin className="text-2xl md:text-3xl text-slate-300 cursor-pointer" />
          </Link>
          <Link href="/">
            <FaYoutube className="text-2xl md:text-3xl text-slate-300 cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center md:justify-end flex-wrap gap-5 mt-2 md:mt-0 mx-auto">
        {footerLinks.map((item, index) => (
          <>
            <Link key={index} href={item.link} className="text-base">
              {item.name}
            </Link>
            {index !== footerLinks.length - 1 && <div className="md:border-t border-t-slate-400 md:w-5"></div>}
          </>
        ))}
      </div>

      <div className="flex items-center justify-center md:justify-end mt-5">
        <p className="text-sm font-thin text-slate-300">© 2025 Nextvul. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterCopyright;
