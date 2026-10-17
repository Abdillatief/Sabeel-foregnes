import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'end',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 h-9',
    md: 'text-sm px-5 py-2.5 gap-2 h-11',
    lg: 'text-base px-7 py-3.5 gap-2.5 h-13 font-semibold'
  };

  const variantClasses = {
    primary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm hover:shadow active:scale-[0.99] font-semibold',
    secondary: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm hover:shadow active:scale-[0.99]',
    outline: 'border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900',
    ghost: 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800'
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'start' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};
