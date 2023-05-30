import { Listbox, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment, useEffect, useState, useRef } from 'react';
import Avatar from './Avatar';
import { ChevronDown, Close, Check } from './icons';

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
  children,
  className,
  disabled,
  ...props
}) {
  const [_options, setOptions] = useState([]);
  const [showAbove, setShowAbove] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    if (options?.[0]?.order) {
      const temp = [...options];
      setOptions(temp.sort((a, b) => a.order - b.order));
    } else {
      setOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setShowAbove(bottom > windowHeight - 200);
    }
  }, [buttonRef.current]);

  return (
    <Listbox value={value} onChange={onChange} multiple={multiple} disabled={disabled} {...props}>
      <div className={cn('relative', className)}>
        <Listbox.Button
          ref={buttonRef}
          className={cn(
            'relative flex items-center gap-2 w-full rounded-lg text-left cursor-pointer focus:outline-none  sm:text-sm',
            size === 'xs' && '',
            size === 'sm' && type === 'default' && 'h-11 items-center',
            size === 'md' && type === 'default' && 'min-w-[auto] md:min-w-[160px] max-w-[255px]',
            size === 'lg' && type === 'default' && 'min-w-[auto] md:min-w-[195px] max-w-[270px]',
            size === 'xl' && type === 'default' && 'min-w-[auto] md:min-w-[250px] max-w-[325px]',
            size === 'xxl' && type === 'default' && 'min-w-[auto] md:min-w-[275px] max-w-full',
            (type === 'default' || type === 'status' || type === 'user') &&
              ' dark:bg-aa-800 purple:bg-pt-800  py-3.5 px-2 md:px-[14px] ',
            type === 'icon' && 'text-slate-700 p-3',
            type !== 'create' &&
              'justify-between border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 bg-white dark:bg-aa-700 purple:bg-pt-700 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300',
            disabled && 'opacity-50 cursor-not-allowed'
          )}>
          {type !== 'icon' && (
            <>
              {label || labelIcon ? (
                <div className="flex items-center gap-2 w-11/12">
                  {icon && icon}
                  {labelIcon && labelIcon}
                  {type === 'status' && !multiple && (
                    <svg className="h-2.5 w-2.5" fill={value?.color} viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                  )}
                  {type === 'user' && !multiple && (
                    <Avatar
                      src={value?.profilePicture}
                      alt={value?.name}
                      size="w-6 h-6"
                      fontSize="text-sm"
                    />
                  )}
                  <div
                    className={cn(
                      'dark:text-aa-200 purple:text-pt-200 flex gap-2 w-full',
                      type === 'create'
                        ? 'text-slate-800 text-xl lg:text-3xl font-semibold'
                        : 'text-slate-500 text-sm tracking-sm'
                    )}>
                    <div className={cn(size !== 'full' && 'truncate max-w-[17ch]')}>{label}</div>
                    {multiple && !!value?.length && (type === 'default' || type === 'status') && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                        {value?.length}
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
                {((multiple && !!value?.length) || (!multiple && label)) && onReset && (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReset();
                    }}>
                    <Close className="w-5 h-5 icon" />
                  </div>
                )}
                {(type !== 'create' || !multiple) && (
                  <ChevronDown className="w-5 h-5 icon" aria-hidden="true" />
                )}
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
              'absolute max-h-60 overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800',
              showAbove ? 'mb-1 bottom-full' : 'mt-1 top-full',
              `${showAbove}`,
              size === 'xs' && 'w-[195px]',
              size === 'sm' && 'min-w-[120px] max-w-[180px]',
              size === 'md' && 'min-w-[160px] max-w-[255px]',
              size === 'lg' && 'min-w-[200px] max-w-[270px]',
              size === 'xl' && 'min-w-[250px] max-w-[270px]',
              size === 'xxl' && 'min-w-[300px] max-w-full',
              size === 'full' && 'w-full',
              align === 'right' && 'right-0',
              align === 'left' && 'left-0',
              type === 'create' ? ' p-4 gap-2' : 'py-1',
              type === 'create' && options?.length === 0 && 'p-2'
            )}>
            {!!options?.length && (
              <div
                className={cn(
                  type === 'create' &&
                    'max-h-[180px] mb-2 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg overflow-auto'
                )}>
                {_options?.map((item) => (
                  <Listbox.Option
                    key={item?._id || item?.[valueField] || item?.[field] || item}
                    className={({ active }) =>
                      `relative flex items-center justify-between select-none  py-2 px-3.5 transition cursor-pointer hover:text-slate-900 dark:hover:text-aa-200 purple:hover:text-pt-200 overflow-hidden ${
                        active
                          ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                          : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                      }`
                    }
                    value={valueField ? item[valueField] : item}>
                    {({ selected }) => (
                      <>
                        <div className="flex items-center gap-2 w-[calc(100%-0.875rem)]">
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
                            className={`block whitespace-nowrap  truncate ${
                              selected
                                ? 'text-slate-900 dark:text-aa-200 purple:text-pt-200 w-4/5 '
                                : 'font-normal w-[90%]'
                            }`}>
                            {item?.[field] || item}
                          </span>
                        </div>
                        {selected && (
                          <Check className="w-5 h-5 shrink-0 icon-indigo" aria-hidden="true" />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            )}
            {children}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
