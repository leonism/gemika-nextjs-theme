import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "custom";
  customAspectRatio?: string;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectRatio = "auto",
  customAspectRatio,
  ...props
}: ResponsiveImageProps) {
  // Default to a placeholder if src is empty
  const imageSrc =
    src ||
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

  // Set aspect ratio class
  const aspectRatioClass = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    custom: "",
  }[aspectRatio];

  // Custom style for custom aspect ratio
  const customStyle =
    aspectRatio === "custom" && customAspectRatio
      ? { aspectRatio: customAspectRatio }
      : {};

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        aspectRatioClass,
        className,
      )}
      style={customStyle}
    >
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        {...props}
      />
    </div>
  );
}
