import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className}: SectionHeadingProps) {
  return (
    <h2 className={cn("text-4xl md:text-6xl font-bold leading-tight text-cGray-dark", className)}>
      {children}
    </h2>
  )
}