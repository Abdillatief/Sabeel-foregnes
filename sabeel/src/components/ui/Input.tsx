import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || props.name;

  return (
    <div className="w-full text-start">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border ${
          error 
            ? 'border-rose-500 focus:ring-rose-500/20' 
            : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
        } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
