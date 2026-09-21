import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

// Omit 'icon' from the expected props since we provide Loading03Icon internally
type SpinnerProps = Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">

function Spinner({ className, strokeWidth = 2, ...props }: SpinnerProps) {
  return (
    <HugeiconsIcon
      strokeWidth={strokeWidth}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
      icon={Loading03Icon}
    />
  )
}

export { Spinner }