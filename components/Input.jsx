import cn from 'classnames';
import { Exclamation } from './icons';

export default function Input({
  id,
  label,
  error,
  register,
  icon,
  postfix,
  type,
  disabled,
  labelBackground,
  ...props
}) {
  return (
    <div className="relative w-full max-h-[200px] md:max-h-[100px]">
      {label && type !== 'checkbox' && (
        <label
          htmlFor={id}
          className={cn(
            'inline-block text-slate-700 dark:text-aa-200 purple:text-pt-200 mb-1.5 text-sm font-medium',
            error && 'text-red-600'
          )}>
          {label}
        </label>
      )}
      <div className={cn(`relative`)}>
        {icon && <div className="absolute top-1/2 left-3.5 -translate-y-1/2">{icon}</div>}
        <div className={`flex ${type === 'checkbox' ? 'items-center' : ''} `}>
          <input
            id={id}
            className={cn(
              'block w-full h-11 bg-white dark:bg-aa-800 purple:bg-pt-800 text-slate-800 dark:text-aa-200 purple:text-pt-200 py-2.5 text-base tracking-sm border border-gray-300 dark:border-aa-600 purple:border-pt-800 rounded-md placeholder:text-slate-500 dark:placeholder-aa-200 purple:placeholder-pt-200 focus:outline-none focus:border-gray-400 dark:focus:ring-aa-400 dark:focus:border-aa-400 purple:focus:ring-pt-400 purple:focus:border-pt-400',
              error && 'text-red-900 pr-11 border-red-600 placeholder-red-300 focus:ring-red-600',
              icon ? 'pl-[42px] pr-3.5' : 'px-3.5',
              postfix && 'rounded-r-none',
              disabled
                ? 'bg-gray-100 dark:bg-aa-300 purple:bg-pt-300 bg-opacity-90 dark:bg-opacity-20 purple:bg-opacity-20 dark:text-aa-200 purple:text-aa-200 cursor-not-allowed'
                : '',
              error && postfix ? 'border-r-gray-300' : ''
            )}
            type={type}
            spellCheck="false"
            autoComplete="off"
            {...register}
            {...props}
          />
          {postfix && (
            <span
              className={cn(
                'inline-flex items-center bg-slate-100 text-slate-500 px-3 text-base border border-l-0 border-slate-200 rounded-r-md',
                error && 'text-red-900 border-red-600 focus:ring-red-600'
              )}>
              {postfix}
            </span>
          )}
          {label && type === 'checkbox' && (
            <label
              htmlFor={id}
              className={cn(
                'inline-block text-slate-700 ml-1.5 text-sm font-medium  dark:text-aa-200 purple:text-pt-200',
                error && 'text-red-600',
                labelBackground && 'bg-gray-200 dark:bg-aa-600 purple:bg-pt-600 rounded-full px-3'
              )}>
              {label}
            </label>
          )}
        </div>
        {error && type !== 'checkbox' && (
          <Exclamation
            className={cn(
              'absolute top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none text-red-600 dark:text-red-500 purple:text-red-500 mr-2',
              postfix ? 'right-28' : 'right-3.5'
            )}
          />
        )}
      </div>
      {error?.message && (
        <span className="inline-block text-sm text-red-600 dark:text-red-500 purple:text-red-500 mt-2">
          {error.message}
        </span>
      )}
    </div>
  );
}
