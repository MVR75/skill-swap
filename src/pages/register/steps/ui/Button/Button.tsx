import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
};

export function Button({
  variant = 'primary',
  leftIcon,
  children,
  className,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.outline;

  return (
    <button
      ref={ref}
      type={type}
      className={`${styles.button} ${variantClass} ${className ?? ''}`}
      {...rest}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
