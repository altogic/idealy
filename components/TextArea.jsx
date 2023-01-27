import cn from 'classnames';
import { Exclamation } from './icons';

export default function TextArea({ id, label, error, register, rows, inlineSubmit, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'inline-block text-slate-700 mb-1.5 text-sm font-medium',
            error && 'text-red-600'
          )}>
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          className={cn(
            'block w-full text-slate-900 text-base tracking-sm rounded-lg',
            'text-slate-800 dark:text-aa-200 purple:text-pt-200',
            'bg-white dark:bg-aa-800 purple:bg-pt-800 placeholder:text-slate-500 dark:placeholder-aa-200 purple:placeholder-pt-200 ',
            error && 'text-red-900 pr-11 border-red-600 placeholder-red-300 focus:ring-red-600',
            inlineSubmit
              ? 'border-none ring-transparent focus:border-none focus:ring-transparent focus:outline-none'
              : 'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          )}
          rows={rows}
          spellCheck="false"
          {...register}
          {...props}
        />
        {error && (
          <Exclamation
            className={cn(
              'absolute top-1/2 right-0 w-6 h-6 pointer-events-none text-red-600 mr-2',
              inlineSubmit ? 'translate-y-1/2' : '-translate-y-1/2'
            )}
          />
        )}
      </div>
      {error?.message && !inlineSubmit && (
        <span className="inline-block text-sm text-red-600">{error.message}</span>
      )}
    </div>
  );
}
