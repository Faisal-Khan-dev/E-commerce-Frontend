"use client";

import { useEffect } from "react";

/**
 * GlobalButtonHover
 *
 * Captures cursor entry point on every button and CTA across the website.
 * Uses the exact Hero section palette (#d4a373 Warm Amber Gold & #312117 Deep Mahogany)
 * with a comfortable 1.5s slow liquid radial circle expansion.
 */
export default function GlobalButtonHover() {
  useEffect(() => {
    // Helper to calculate luminance of an RGB/RGBA string
    const getLuminance = (colorStr: string): number => {
      const rgb = colorStr.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 255;
      const r = parseInt(rgb[0], 10);
      const g = parseInt(rgb[1], 10);
      const b = parseInt(rgb[2], 10);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    // Check if background color string is effectively transparent
    const isTransparent = (colorStr: string): boolean => {
      if (!colorStr || colorStr === "transparent") return true;
      const rgba = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgba && rgba[4] !== undefined && parseFloat(rgba[4]) === 0) return true;
      return false;
    };

    const BUTTON_SELECTOR =
      'button, .btn, a.btn, [role="button"], input[type="submit"], input[type="button"], a[class*="py-"], a[class*="px-"], [data-ripple="true"]';

    const handlePointerEnter = (e: PointerEvent | MouseEvent) => {
      const target = (e.target && "closest" in e.target && typeof (e.target as Element).closest === "function")
        ? (e.target as Element).closest(BUTTON_SELECTOR) as HTMLElement | null
        : null;

      if (!target || target.getAttribute("data-no-ripple") === "true") return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate maximum radius to ensure 100% boundary coverage from entry point (x, y)
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y)
      );
      const rippleSize = Math.ceil(maxDist * 2.8);

      // Inspect computed background and foreground colors of the target button
      const computedStyle = window.getComputedStyle(target);
      const btnBg = computedStyle.backgroundColor;
      const btnFg = computedStyle.color;
      const isBtnTransparent = isTransparent(btnBg);

      const btnBgLum = isBtnTransparent ? 255 : getLuminance(btnBg);
      const btnFgLum = getLuminance(btnFg);

      let hoverBg: string;
      let hoverText: string;

      // 🌟 Standardized 2-Tone Hero Section Palette (User Approved):
      // Tone A (For Dark Buttons): Warm Golden Honey Amber (#d4a373) -> Text: Deep Dark Mahogany (#24150d)
      // Tone B (For Light / Outlined Buttons): Deep Dark Luxury Mahogany (#312117) -> Text: Pure Crisp White (#ffffff)
      if (!isBtnTransparent && (btnBgLum <= 150 || btnFgLum >= 160)) {
        // Dark button before hover -> Expand Warm Amber Gold (#d4a373) with #24150d text
        hoverBg = "#d4a373";
        hoverText = "#24150d";
      } else {
        // Light or Outlined button before hover -> Expand Deep Mahogany (#312117) with #ffffff text
        hoverBg = "#312117";
        hoverText = "#ffffff";
      }

      // Allow explicit overrides via data-hover-bg / data-hover-text if provided
      if (target.dataset.hoverBg) hoverBg = target.dataset.hoverBg;
      if (target.dataset.hoverText) hoverText = target.dataset.hoverText;

      // Apply CSS custom variables to button element instance
      target.style.setProperty("--btn-mouse-x", `${x}px`);
      target.style.setProperty("--btn-mouse-y", `${y}px`);
      target.style.setProperty("--btn-ripple-size", `${rippleSize}px`);
      target.style.setProperty("--btn-hover-bg", hoverBg);
      target.style.setProperty("--btn-hover-text", hoverText);
    };

    document.addEventListener("pointerenter", handlePointerEnter, true);
    document.addEventListener("mouseenter", handlePointerEnter, true);

    return () => {
      document.removeEventListener("pointerenter", handlePointerEnter, true);
      document.removeEventListener("mouseenter", handlePointerEnter, true);
    };
  }, []);

  return null;
}
