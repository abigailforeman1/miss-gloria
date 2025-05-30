"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="">
      <div className="h-[80px] flex items-center justify-end w-full px-[30px]">

        <div className="flex text-lg font-[family-name:var(--font-inter)] font-medium gap-[30px] text-pink-100">
          <Link className="" href={"/about"}>
            <p>Email</p>
          </Link>

          <Link className="" href={"/shop"}>
            <p>Instagram</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
