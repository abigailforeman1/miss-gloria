"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
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

      <div className="flex text-lg font-[family-name:var(--font-inter)] font-medium gap-[30px] text-pink-100">
        <Link className="cursor-pointer" href={"/about"}>
          <p>About</p>
        </Link>

        <Link className="cursor-pointer" href={"/shop"}>
          <p>Shop</p>
        </Link>
      </div>
    </nav>
  );
}
