import type { ReactNode } from "react"

interface SkillBadgeProps {
  icon: ReactNode
  label: string
}

export function SkillBadge({ icon, label }: SkillBadgeProps) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  )
}

