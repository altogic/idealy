import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import Avatar from './Avatar';
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
  labelIcon,
  size = 'md',
  type = 'default',
  align,
  onReset,
  ...props
}) {
  const [_value, setValue] = useState();
  const [_options, setOptions] = useState([]);
  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    if (options?.[0]?.order) {
      const temp = [...options];
      setOptions(temp.sort((a, b) => a.order - b.order));
    } else {
      setOptions(options);
    }
  }, [options]);

  return (
    <Listbox value={_value} onChange={onChange} multiple={multiple} {...props}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            'relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 w-full border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            size === 'xs' && '',
            size === 'sm' && 'h-11 items-center',
            size === 'md' && 'min-w-[auto] md:min-w-[160px]',
            size === 'lg' && 'min-w-[auto] md:min-w-[195px]',
            size === 'xl' && 'min-w-[auto] md:min-w-[250px]',
            size === 'xxl' && 'min-w-[auto] md:min-w-[300px]',
            (type === 'default' || type === 'status' || type === 'user') &&
              ' dark:bg-aa-800 purple:bg-pt-800  py-3.5 px-2 md:px-[14px]',
            type === 'icon' && 'text-slate-700 p-3  '
          )}>
          {type !== 'icon' && (
            <>
              {label || labelIcon ? (
                <div className="flex items-center gap-2">
                  {icon && icon}
                  {labelIcon && labelIcon}
                  {type === 'status' && !multiple && (
                    <svg className="h-2.5 w-2.5" fill={_value?.color} viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                  )}
                  {type === 'user' && !multiple && (
                    <Avatar
                      src={_value?.profilePicture}
                      alt={_value?.name}
                      size="w-6 h-6"
                      fontSize="text-sm"
                    />
                  )}
                  <div className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate flex gap-2">
                    <span className={cn(``, hidden === 'mobile' && 'hidden md:inline-block')}>
                      {' '}
                      {label}
                    </span>
                    {multiple && !!_value?.length && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                        {_value?.length}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-gray-500 dark:text-aa-200 purple:text-pt-200 truncate">
                  Please select
                </span>
              )}

              <span className="flex items-center gap-2">
                {multiple && !!value?.length && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReset();
                    }}>
                    <XIcon className="w-5 h-5 text-gray-400 dark:text-aa-200 purple:text-pt-200" />
                  </button>
                )}
                <ChevronDown
                  className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
                  aria-hidden="true"
                />
              </span>
            </>
          )}
          {type === 'icon' && icon}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options
            className={cn(
              'absolute mt-1 max-h-64 overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800',
              size === 'sm' && 'w-[120px]',
              size === 'md' && 'w-[160px]',
              size === 'lg' && 'max-w-[195px] max-h-60',
              size === 'xl' && 'w-[250px]',
              size === 'xxl' && 'w-[300px]',
              size === 'full' && 'w-full',
              type === 'icon' && 'w-[195px]',
              align === 'right' && 'right-0',
              align === 'left' && 'left-0'
            )}>
            {_options?.map((item) => (
              <Listbox.Option
                key={item.id || item._id || item[valueField] || item[field] || item}
                className={({ active }) =>
                  `relative flex items-center justify-between select-none py-2 px-3.5 transition cursor-pointer hover:text-slate-900 dark:hover:text-aa-200 purple:hover:text-pt-200 ${
                    active
                      ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                      : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                  }`
                }
                value={valueField ? item[valueField] : item}>
                {({ selected }) => (
                  <>
                    <div className="flex items-center gap-2">
                      {type === 'status' && (
                        <svg className="h-2.5 w-2.5" fill={item.color} viewBox="0 0 8 8">
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                      )}
                      {type === 'user' && (
                        <Avatar
                          src={item.profilePicture}
                          alt={item.name}
                          size="w-6 h-6"
                          fontSize="text-sm"
                        />
                      )}
                      <span
                        className={`block truncate ${
                          selected
                            ? 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                            : 'font-normal'
                        }`}>
                        {item?.[field] || item}
                      </span>
                    </div>
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
