import cn from 'classnames';
import { Exclamation } from './icons';

export default function TextArea({ id, label, error, register, rows, ...props }) {
  return (
    <div className="relative w-full">
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
        <div className="flex">
          <textarea
            id={id}
            className={cn(
              'block w-full text-slate-500 text-base tracking-sm border border-gray-300 rounded-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500',
              error && 'text-red-900 pr-11 border-red-600 placeholder-red-300 focus:ring-red-600'
            )}
            rows={rows}
            {...register}
            {...props}
          />
        </div>
        {error && (
          <Exclamation className="absolute top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none text-red-600 mr-2" />
        )}
      </div>
      {error?.message && <span className="inline-block text-sm text-red-600">{error.message}</span>}
    </div>
  );
}
