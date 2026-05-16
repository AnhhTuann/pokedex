import React from 'react';
import { cn } from '../../lib/utils';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';
