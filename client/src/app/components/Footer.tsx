"use client";

import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
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
    <footer className="">
      <div className="h-[80px] flex items-center justify-end w-full px-[30px]">
        <div className="flex text-lg font-[family-name:var(--font-inter)] font-medium gap-[30px] text-pink-100">
          <a
            style={{
              color: textColor,
            }}
            className="cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href="mailto:missgloriadesign@gmail.com"
          >
            <p>Email</p>
          </a>

          <a
            style={{
              color: textColor,
            }}
            className="cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/missgloriadesign/"
          >
            <p>Instagram</p>
          </a>
        </div>
      </div>
    </footer>
  );
}
