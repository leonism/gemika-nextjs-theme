// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
    </div>
  );
}
