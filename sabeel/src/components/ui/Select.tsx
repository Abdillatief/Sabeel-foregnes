import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || props.name;

  return (
    <div className="w-full text-start">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border ${
          error 
            ? 'border-rose-500 focus:ring-rose-500/20' 
            : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
        } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 transition-all ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
