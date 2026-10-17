import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'dark';
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  noPadding = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200 border';

  const variantClasses = {
    default: 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700',
    elevated: 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl',
    glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/70 dark:border-slate-800/80 shadow-sm',
    dark: 'bg-slate-950 border-slate-800 text-white shadow-xl'
  };

  const paddingClass = noPadding ? '' : 'p-6 sm:p-8';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
