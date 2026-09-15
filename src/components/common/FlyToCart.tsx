"use client";

import { useEffect, useRef } from "react";

interface FlyToCartProps {
  /** DOM element the animation starts from */
  originEl: HTMLElement | null;
  /** DOM element the animation flies to */
  targetEl: HTMLElement | null;
  /** The product image URL for the flying particle */
  imageSrc?: string;
  /** Called when the animation completes */
  onComplete?: () => void;
  /** Trigger the animation (increments trigger a new run) */
  trigger: number;
}

export default function FlyToCart({
  originEl,
  targetEl,
  imageSrc,
  onComplete,
  trigger,
}: FlyToCartProps) {
  const hasRun = useRef(0);

  useEffect(() => {
    if (trigger === 0 || trigger === hasRun.current) return;
    if (!originEl || !targetEl) return;
    hasRun.current = trigger;

    const fromRect = originEl.getBoundingClientRect();
    const toRect = targetEl.getBoundingClientRect();

    // Create the flying particle
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      pointer-events: none;
      background: #312117;
      border: 2px solid #fcf9f6;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      left: ${fromRect.left + fromRect.width / 2 - 20}px;
      top: ${fromRect.top + fromRect.height / 2 - 20}px;
      transition: none;
      will-change: transform, opacity;
    `;

    if (imageSrc) {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;";
      particle.appendChild(img);
    }

    document.body.appendChild(particle);

    // Force reflow so the initial position is applied before we start animating
    particle.getBoundingClientRect();

    // Calculate the delta to the cart icon
    const dx = toRect.left + toRect.width / 2 - 20 - (fromRect.left + fromRect.width / 2 - 20);
    const dy = toRect.top + toRect.height / 2 - 20 - (fromRect.top + fromRect.height / 2 - 20);

    // A nice bezier arc: we'll animate using requestAnimationFrame
    const duration = 650; // ms
    const startTime = performance.now();

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function frame(now: number) {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easeInOutCubic(rawProgress);

      // Arc: the particle travels in a parabolic curve
      const arcHeight = Math.min(Math.abs(dy), 200) * 0.6;
      const arcY = -arcHeight * 4 * progress * (1 - progress); // quadratic bezier upward arc

      const x = dx * progress;
      const y = dy * progress + arcY;

      // Scale down as it approaches the cart
      const scale = 1 - 0.6 * progress;
      // Fade out near the end
      const opacity = progress > 0.75 ? 1 - (progress - 0.75) * 4 : 1;

      particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      particle.style.opacity = String(opacity);

      if (rawProgress < 1) {
        requestAnimationFrame(frame);
      } else {
        document.body.removeChild(particle);
        onComplete?.();
      }
    }

    requestAnimationFrame(frame);
  }, [trigger, originEl, targetEl, imageSrc, onComplete]);

  return null;
}
