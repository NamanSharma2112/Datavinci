"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type ThemePref = Theme | "system";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function readPref(): ThemePref {
  try {
    const t = localStorage.getItem("theme");
    if (t === "light" || t === "dark" || t === "system") return t;
  } catch {
    /* storage unavailable */
  }
  return "system";
}

export function applyPref(pref: ThemePref) {
  const el = document.documentElement;
  const resolved: Theme = pref === "system" ? (media().matches ? "dark" : "light") : pref;
  el.dataset.theme = resolved;
  el.dataset.themePref = pref;
  try {
    localStorage.setItem("theme", pref);
  } catch {
    /* theme still applies for this visit */
  }
}

/**
 * The resolved theme (what's on screen), a setter for the preference, and the
 * preference itself. Every subscriber stays in sync through <html data-*>.
 */
export function useTheme(): [Theme, (p: ThemePref) => void, ThemePref] {
  const [theme, setTheme] = useState<Theme>("light");
  const [pref, setPrefState] = useState<ThemePref>("system");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => {
      setTheme(el.dataset.theme === "dark" ? "dark" : "light");
      setPrefState((el.dataset.themePref as ThemePref) || readPref());
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme", "data-theme-pref"] });
    return () => mo.disconnect();
  }, []);

  return [theme, applyPref, pref];
}

/** Keeps "system" in step with the OS while the page is open. */
export function useSystemThemeSync() {
  useEffect(() => {
    const mq = media();
    const on = () => {
      if (readPref() === "system") applyPref("system");
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
}
