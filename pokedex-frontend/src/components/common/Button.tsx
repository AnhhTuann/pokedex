import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          styles.btn,
          styles[variant],
          styles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className={styles.spinner} size={16} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
