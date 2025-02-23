import { cn } from "@/lib/utils";
import type { ReactNode } from "react"

interface SkillBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function SkillBadge({ icon, label,className }: SkillBadgeProps) {
  return (
    <div className={cn("flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2",className)}>
      {icon}
      <span className="font-medium max-md:text-xs">{label}</span>
    </div>
  )
}

