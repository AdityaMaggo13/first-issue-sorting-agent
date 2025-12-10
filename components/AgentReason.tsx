import { cn } from '@/lib/utils'

export interface AgentReasonProps {
  children: React.ReactNode
  className?: string
}

export function AgentReason({ children, className }: AgentReasonProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-bg-subtle px-4 py-3 space-y-1',
        'border-l-4 border-l-primary rounded-l-none', // Left border stripe in primary color
        className
      )}
    >
      <p className="text-label-xs font-medium uppercase tracking-wide text-text-soft">
        Why this is good for you
      </p>
      <p className="text-body-sm text-text-main">
        {children}
      </p>
    </div>
  )
}
