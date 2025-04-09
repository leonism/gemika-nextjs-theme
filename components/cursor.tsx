'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-indigo-500 mix-blend-difference transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: position.x === 0 && position.y === 0 ? 0 : 1,
      }}
      id="cursor-follower"
    />
  );
}
