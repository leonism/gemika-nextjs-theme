// components/search-client.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

// components/search-client.tsx

function SearchComponent() {
  const searchParams = useSearchParams();
  // Your search logic here
  return <div className="relative">{/* Your search input and UI */}</div>;
}

export function Search() {
  return (
    <Suspense fallback={<div className="h-5 w-5" />}>
      <SearchComponent />
    </Suspense>
  );
}
