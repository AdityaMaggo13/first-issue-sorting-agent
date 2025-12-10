import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded-xl border border-border-soft bg-bg-card px-3.5 py-2.5 text-sm text-text-main',
          'placeholder:text-text-soft',
          'focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-150',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

TextInput.displayName = 'TextInput'

export { TextInput }
