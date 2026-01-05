"use client";
// NextJS Components
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
// Asset Imports
import Logo from "@/app/assets/Logo.png";
// React-Icons Imports
import { LuAlignJustify } from "react-icons/lu";
import { LuX } from "react-icons/lu";

export default function HeaderNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/blog", text: "Blog" },
    { href: "/tables", text: "Book table" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background border-accent relative grid grid-cols-(--grid-col-desktop) border-y-2 border-solid px-6 py-8 max-md:grid-cols-(--grid-col-mobile)">
        <div
          className="bg-accent absolute top-0 left-0 aspect-square w-11 [clip-path:polygon(0_0,100%_0,0_100%)]"
          aria-hidden="true"
        />
        <div className="col-start-2 flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} alt="Company logo" className="object-cover" />
          </Link>
          <nav
            className={`group popoverClosed ${isMenuOpen ? "popoverOpen max-lg:bg-background-alpha" : ""}`}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-0 right-0 hidden pt-4 pr-4 max-lg:block max-lg:cursor-pointer"
            >
              <LuX className="h-8 w-8 stroke-4" />
            </button>
            <ul className="flex gap-6 popoverOpen">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.href}
                    className={`${isActive ? "relative" : ""}`}
                  >
                    <Link
                      href={link.href}
                      className={`font-sans text-2xl font-medium tracking-[2%] uppercase ${
                        isActive ? "text-accent" : ""
                      }`}
                    >
                      {link.text}
                    </Link>
                    {isActive && (
                      <span
                        className="bottomLine-s absolute -bottom-3 left-1/2 -translate-x-1/2"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="hidden h-8 w-8 max-lg:block max-lg:cursor-pointer"
          >
            <LuAlignJustify className="h-8 w-8" />
          </button>
        </div>
        <div
          className="bg-accent absolute right-0 bottom-0 aspect-square w-11 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
