import { UpDown } from '@/components/icons';
import { Listbox, Transition } from '@headlessui/react';
import Router from 'next/router';
import { Fragment, useEffect } from 'react';
import { IDEA_SORT_TYPES } from 'constants';

export default function FilterIdea({ isFiltered, setIsFiltered }) {
  useEffect(() => {
    setIsFiltered(IDEA_SORT_TYPES[0]);
  }, []);
  return (
    <div className="mb-9 flex justify-between">
      <Listbox
        value={isFiltered}
        onChange={(value) => {
          setIsFiltered(value);
          Router.push(`/public-view?sort=${value.url}`);
        }}>
        <div className="relative mt-1 flex-1">
          <Listbox.Button className="relative w-full inline-flex max-w-[195px] bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <UpDown className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
            <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
              {isFiltered?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 max-w-[195px] w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {IDEA_SORT_TYPES?.map((item) => (
                <Listbox.Option
                  key={item.name}
                  className={({ active }) =>
                    `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                      active
                        ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                        : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                    }`
                  }
                  value={item}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                            : 'font-normal'
                        }`}>
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="flex items-center pl-3 text-indigo-700 dark:text-aa-200 purple:text-pt-200">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M16.6673 5L7.50065 14.1667L3.33398 10"
                              stroke="currentColor"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
