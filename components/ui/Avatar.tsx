import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeStyles = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-11 h-11 text-base",
};

const colors = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-teal-500",
];

function getColor(initials: string) {
  const idx = initials.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ initials, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0",
        sizeStyles[size],
        getColor(initials),
        className
      )}
    >
      {initials}
    </div>
  );
}
