"use client";

import { useEffect, useRef } from "react";

/**
 * CursorTracker
 *
 * Guaranteed 100% uninterrupted dual-layer cursor tracking.
 * - Always stays mounted at ultra-high z-index (999999999).
 * - Fast inner ball tracks mouse immediately with a glowing shadow aura.
 * - Slower outer trailing circle follows with fluid spring lerp physics.
 * - Frame-by-frame direct DOM updates ensure 120FPS performance without React re-render stutters.
 * - Big circle NEVER disappears, detaches, or stops tracking during hover.
 */
export default function CursorTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ballPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check for pointer device
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        ballPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }

      // Detect hover on any interactive DOM element
      const target = (e.target as HTMLElement)?.closest(
        'button, a, input, select, textarea, [role="button"], .btn'
      );
      const isCurrentlyHovered = !!target;

      if (isHoveredRef.current !== isCurrentlyHovered) {
        isHoveredRef.current = isCurrentlyHovered;
        if (ringRef.current && ballRef.current) {
          if (isCurrentlyHovered) {
            ringRef.current.style.width = "3.5rem"; // 56px (w-14)
            ringRef.current.style.height = "3.5rem";
            ringRef.current.style.borderColor = "rgba(212, 163, 115, 1)";
            ringRef.current.style.backgroundColor = "rgba(212, 163, 115, 0.25)";

            ballRef.current.style.width = "1rem"; // 16px (w-4)
            ballRef.current.style.height = "1rem";
            ballRef.current.style.backgroundColor = "#d4a373";
            ballRef.current.style.boxShadow =
              "0 0 22px 6px rgba(212, 163, 115, 0.9), 0 0 40px 10px rgba(49, 33, 23, 0.5)";
          } else {
            ringRef.current.style.width = "2.5rem"; // 40px (w-10)
            ringRef.current.style.height = "2.5rem";
            ringRef.current.style.borderColor = "rgba(212, 163, 115, 0.7)";
            ringRef.current.style.backgroundColor = "rgba(212, 163, 115, 0.1)";

            ballRef.current.style.width = "0.75rem"; // 12px (w-3)
            ballRef.current.style.height = "0.75rem";
            ballRef.current.style.backgroundColor = "#312117";
            ballRef.current.style.boxShadow =
              "0 0 14px 3px rgba(212, 163, 115, 0.7), 0 0 28px 6px rgba(49, 33, 23, 0.3)";
          }
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Hide only if cursor actually exits the viewport window bounds
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        isVisibleRef.current = false;
        if (containerRef.current) {
          containerRef.current.style.opacity = "0";
        }
      }
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    // 120FPS physics render loop using Linear Interpolation (lerp)
    const render = () => {
      // Fast Inner Ball lerp response (~ 0.5)
      ballPos.current.x += (mousePos.current.x - ballPos.current.x) * 0.5;
      ballPos.current.y += (mousePos.current.y - ballPos.current.y) * 0.5;

      // Slower Trailing Outer Circle lerp response (~ 0.16)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${ballPos.current.x}px, ${ballPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { capture: true, passive: true });
    window.addEventListener("mousemove", handlePointerMove, { capture: true, passive: true });
    window.addEventListener("pointerover", handlePointerMove, { capture: true, passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave, true);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter, true);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove, true);
      window.removeEventListener("mousemove", handlePointerMove, true);
      window.removeEventListener("pointerover", handlePointerMove, true);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave, true);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter, true);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {/* Trailing Outer Circle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#d4a373]/70 bg-[#d4a373]/10 backdrop-blur-[0.5px] w-10 h-10"
        style={{
          position: "fixed",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 999999998,
          willChange: "transform",
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Fast Inner Ball with Glowing Shadow Aura */}
      <div
        ref={ballRef}
        className="fixed top-0 left-0 rounded-full w-3 h-3 bg-[#312117]"
        style={{
          position: "fixed",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 999999999,
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 0 14px 3px rgba(212, 163, 115, 0.7), 0 0 28px 6px rgba(49, 33, 23, 0.3)",
        }}
      />
    </div>
  );
}

