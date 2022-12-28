import { Switch } from '@headlessui/react';
import cn from 'classnames';

export default function Toggle({
  title,
  description,
  descriptionText,
  enabled,
  onChange,
  ...props
}) {
  return (
    <Switch.Group as="div" className="flex items-center justify-between gap-4" {...props}>
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className={cn(
            `text-slate-800 dark:text-aa-100 purple:text-pt-100 text-base tracking-sm`,
            description ? 'mb-1' : null
          )}
          passive>
          {title}
        </Switch.Label>
        {description && (
          <Switch.Description
            as="span"
            className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
            {descriptionText}
          </Switch.Description>
        )}
      </span>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={cn(
          enabled ? 'bg-indigo-600 dark:bg-aa-500 purple:bg-pt-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-aa-500 purple:focus:ring-pt-600 focus:ring-offset-2'
        )}>
        <span
          aria-hidden="true"
          className={cn(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-aa-50 purple:bg-pt-300 shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
