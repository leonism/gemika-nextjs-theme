import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "line" | "circle" | "rectangle";
  count?: number;
  gap?: "sm" | "md" | "lg";
}

export function SkeletonLoader({
  className,
  variant = "line",
  count = 1,
  gap = "md",
}: SkeletonProps) {
  const variantClasses = {
    line: "h-4 w-full rounded",
    circle: "h-12 w-12 rounded-full",
    rectangle: "h-24 w-full rounded",
  };

  const gapClasses = {
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
  };

  return (
    <div className={cn(gapClasses[gap], className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-pulse bg-gray-200 dark:bg-gray-700",
            variantClasses[variant],
          )}
        />
      ))}
    </div>
  );
}
