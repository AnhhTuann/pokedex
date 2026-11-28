import React from "react";
import { cn } from "../../lib/utils";
import styles from "../../styles/components/common/InputField.module.scss";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, icon, id, "aria-describedby": describedBy, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const errorId = error ? `${inputId}-error` : undefined;
    const description = [describedBy, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              styles.input,
              icon && styles.inputWithIcon,
              error && styles.inputError,
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={description}
            {...props}
          />
        </div>
        {error && <p id={errorId} className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);
InputField.displayName = "InputField";
