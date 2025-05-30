"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

export function ThemeUpdater() {
  const { themeColor } = useTheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [themeColor]);

  return null;
}
