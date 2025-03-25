"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-indigo-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-50 transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: position.x === 0 && position.y === 0 ? 0 : 1
      }}
      id="cursor-follower"
    />
  );
}
