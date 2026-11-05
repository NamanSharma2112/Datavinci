"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Reads the theme from <html data-theme> and keeps every subscriber in sync. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setThemeState(el.dataset.theme === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const setTheme = (t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };

  return [theme, setTheme];
}
