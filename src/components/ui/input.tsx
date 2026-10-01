import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 text-[13.5px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text)]/45 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
