import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 hover:shadow-md transition-shadow group">
      <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-zinc-200 transition-colors">
        <div className="text-zinc-700">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </div>
  )
}
