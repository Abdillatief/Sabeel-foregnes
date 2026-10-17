import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  hint,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || props.name;

  return (
    <div className="w-full text-start">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border ${
          error 
            ? 'border-rose-500 focus:ring-rose-500/20' 
            : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
        } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all resize-y ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
