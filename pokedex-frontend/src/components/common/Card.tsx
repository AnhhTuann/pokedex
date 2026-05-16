import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, padding = 'md', children, ...props }, ref) => {
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-300',
          glass 
            ? 'bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-900/60 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
            : 'bg-white border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800',
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
