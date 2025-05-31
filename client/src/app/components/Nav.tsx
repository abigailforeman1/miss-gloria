"use client";
import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [textColor, updateTextColor] = useState("#FEF6FB");

  useEffect(() => {
    switch (pathname) {
      case "/":
        updateTextColor("#FEF6FB");
        break;
      case "/about":
        updateTextColor("#5C20FF");
        break;
      case "/product":
        updateTextColor("#5C20FF");
        break;
      default:
        break;
    }

    return () => {};
  }, [pathname]);
  return (
    <nav className="h-[80px] flex items-center justify-between w-full px-[30px]">
      <Link className="cursor-pointer" href={"/"}>
        <Image
          src={"/logo-homepage.png"}
          className=""
          alt="miss gloria logo"
          width={200}
          height={0}
          // priority
        />
      </Link>

      <div className="flex text-lg font-[family-name:var(--font-inter)] font-medium gap-[30px]">
        <Link
          className="cursor-pointer"
          href={"/about"}
          style={{
            color: textColor,
          }}
        >
          <p>About</p>
        </Link>

        <a
          style={{
            color: textColor,
          }}
          className="cursor-pointer"
          target="_blank"
          rel="noreferrer"
          href="mailto:hello.studio.sunne@gmail.com"
        >
          <p>Shop</p>
        </a>
      </div>
    </nav>
  );
}
