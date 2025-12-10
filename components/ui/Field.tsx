import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  helperText?: string
  required?: boolean
}

const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, helperText, required, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-1', className)}
        {...props}
      >
        <label className="block text-label-xs font-medium uppercase tracking-wide text-text-soft">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
        {children}
        {helperText && (
          <p className="text-body-sm text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Field.displayName = 'Field'

export { Field }
