import { cn } from "@/lib/utils"
import type React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm shadow-xs transition-all",
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200", // Light mode
        "dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700", // Dark mode
        "border border-zinc-200 dark:border-zinc-700", 
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

