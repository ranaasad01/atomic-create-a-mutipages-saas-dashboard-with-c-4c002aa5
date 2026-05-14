import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  gradient?: boolean;
}

export function Card({ className, glass, gradient, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all duration-200",
        glass
          ? "bg-white/5 backdrop-blur-md border-white/10 dark:bg-white/5 dark:border-white/10"
          : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/50",
        gradient && "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
