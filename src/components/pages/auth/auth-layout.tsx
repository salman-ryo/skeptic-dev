import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center light:bg-white">
      <div className="w-full max-w-md rounded-lg light:bg-white p-8 shadow-lg dark:bg-slate-950 border dark:border-cyan-950">{children}</div>
    </div>
  )
}

