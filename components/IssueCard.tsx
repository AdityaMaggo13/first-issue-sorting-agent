import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AgentReason } from '@/components/AgentReason'
import { cn } from '@/lib/utils'

export interface IssueCardProps {
  title: string
  url: string
  reason: string
  repo?: string
  level: string
  interest: string
  className?: string
}

export function IssueCard({ 
  title, 
  url, 
  reason, 
  repo, 
  level, 
  interest, 
  className 
}: IssueCardProps) {
  const repoInitial = repo ? repo.charAt(0).toUpperCase() : 'G'
  const repoColor = `bg-${['blue', 'green', 'purple', 'orange', 'pink', 'indigo'][repoInitial.charCodeAt(0) % 6]}-500`

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer',
        className
      )}
    >
      {/* Top row: repo and badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* Repo avatar circle */}
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium',
            repoColor
          )}>
            {repoInitial}
          </div>
          <span className="text-body-sm text-text-muted">
            {repo || 'GitHub Issue'}
          </span>
        </div>
        
        {/* Badges */}
        <div className="flex space-x-2">
          <span className="inline-flex items-center rounded-full bg-primary-soft text-xs text-primary font-medium px-2.5 py-1">
            {level}
          </span>
          <span className="inline-flex items-center rounded-full bg-bg-subtle text-xs text-text-muted px-2.5 py-1">
            {interest}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="heading-md text-text-main mb-4 leading-tight">
        {title}
      </h3>

      {/* Agent Reason */}
      <AgentReason className="mb-4">
        {reason}
      </AgentReason>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => window.open(url, '_blank')}
        >
          View issue on GitHub →
        </Button>
        <span className="text-body-sm text-text-soft">
          opens in new tab
        </span>
      </div>
    </Card>
  )
}
