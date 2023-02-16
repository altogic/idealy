import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import cn from 'classnames';
import { CheckIcon } from '@heroicons/react/outline';
import { ChevronDown } from './icons';

export default function BaseListBox({
  value,
  onChange,
  options,
  field,
  icon,
  label,
  multiple,
  valueField,
  hidden,
  size = 'md',
  ...props
}) {
  return (
    <Listbox value={value} onChange={onChange} multiple={multiple} {...props}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            'relative flex items-center justify-between gap-2 w-full bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            size === 'sm' && 'h-11 items-center',
            size === 'md' && 'min-w-[auto] md:min-w-[160px]',
            size === 'lg' && 'min-w-[auto] md:min-w-[195px]',
            size === 'xl' && 'min-w-[auto] md:min-w-[220px]'
          )}>
          <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <div className="text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate flex gap-2">
              <span className={cn(``, hidden === 'mobile' && 'hidden md:inline-block')}>
                {' '}
                {label}
              </span>
              {multiple && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                  {value?.length || 0}
                </span>
              )}
            </div>
          </div>
          <span className="flex items-center">
            <ChevronDown
              className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options
            className={cn(
              'absolute mt-1  overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50',
              size === 'sm' && 'w-[120px]',
              size === 'md' && 'w-[160px]',
              size === 'lg' && 'max-w-[195px] max-h-60  w-full',
              size === 'xl' && 'w-[220px]',
              size === 'full' && 'w-full'
            )}>
            {options?.map((item) => (
              <Listbox.Option
                key={item.id || item._id || item[valueField] || item}
                className={({ active }) =>
                  `relative flex items-center justify-between select-none py-2 px-3.5 transition cursor-pointer hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                    active
                      ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                      : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                  }`
                }
                value={valueField ? item[valueField] : item}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected
                          ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                          : 'font-normal'
                      }`}>
                      {item?.[field] || item}
                    </span>
                    {selected && (
                      <CheckIcon
                        className="w-5 h-5 text-indigo-700 dark:text-aa-200 purple:text-pt-200"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
