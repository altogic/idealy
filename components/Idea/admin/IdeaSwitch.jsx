import React from 'react';
import { Switch } from '@headlessui/react';

export default function IdeaSwitch({ checked, onChange, text }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
        {text}
      </span>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? 'bg-indigo-600 dark:bg-aa-500 purple:bg-pt-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-aa-500 purple:focus:ring-pt-600 focus:ring-offset-2`}>
        <span className="sr-only">Make Private</span>
        <span
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-aa-50 purple:bg-pt-300 shadow ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
