interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${className}`}>
      {children}
    </h2>
  )
}