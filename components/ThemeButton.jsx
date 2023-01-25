import React from 'react';
import cn from 'classnames';

export default function ThemeButton({ theme, isSelected, ...props }) {
  return (
    <button type="button" className={cn(`flex flex-col items-start gap-4 w-full`)} {...props}>
      <div
        className={cn(
          `w-full p-4 rounded-lg border-4 text-left`,
          theme.value === 'light' ? 'bg-white' : null,
          theme.value === 'dark' ? 'bg-aa-800' : null,
          theme.value === 'theme-purple' ? 'bg-pt-700' : null,
          isSelected
            ? 'border-indigo-700 dark:border-aa-300 purple:border-pt-300'
            : 'border-transparent'
        )}>
        <h2
          className={cn(
            `mb-4 text-5xl font-semibold`,
            theme.value === 'light' ? 'text-slate-900' : null,
            theme.value === 'dark' ? 'text-gray-50' : null,
            theme.value === 'theme-purple' ? 'text-gray-50' : null
          )}>
          Aa
        </h2>
        <div className="flex flex-col items-start gap-2">
          <span
            className={cn(
              `inline-block w-[112px] h-[10px]`,
              theme.value === 'light' ? 'bg-slate-300' : null,
              theme.value === 'dark' ? 'bg-aa-500' : null,
              theme.value === 'theme-purple' ? 'bg-pt-500' : null
            )}
          />
          <span
            className={cn(
              `inline-block w-[66px] h-[4px]`,
              theme.value === 'light' ? 'bg-slate-300' : null,
              theme.value === 'dark' ? 'bg-aa-500' : null,
              theme.value === 'theme-purple' ? 'bg-pt-500' : null
            )}
          />
        </div>
      </div>
      <span className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
        {theme.name}
      </span>
    </button>
  );
}
