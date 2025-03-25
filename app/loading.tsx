// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}
