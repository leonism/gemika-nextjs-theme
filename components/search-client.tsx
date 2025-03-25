// components/search-client.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SearchComponent() {
  const searchParams = useSearchParams();
  // Your search logic here
  return (
    <div className="relative">
      {/* Your search input and UI */}
    </div>
  );
}

export function Search() {
  return (
    <Suspense fallback={<div className="w-5 h-5" />}>
      <SearchComponent />
    </Suspense>
  );
}
