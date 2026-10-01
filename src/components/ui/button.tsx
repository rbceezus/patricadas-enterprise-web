import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-[13.5px] font-medium transition-colors outline-none focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "border border-accent-500 bg-transparent text-accent-300 hover:bg-accent-500/12 active:bg-accent-500/22",
        secondary:
          "border border-[var(--color-divider)] bg-transparent text-[var(--color-text)] hover:bg-white/5",
        ghost: "text-accent-300 hover:bg-accent-500/12",
      },
      size: {
        default: "h-9 px-4",
        block: "h-10 w-full px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
