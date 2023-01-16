import { UpDown, FilterHamburger } from '@/components/icons';
import { Listbox, Transition } from '@headlessui/react';
import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FilterIdea({
  sortType,
  setSortType,
  filterStatus,
  setFilterStatus,
  filterTopics,
  setFilterTopics
}) {
  const router = useRouter();
  useEffect(() => {
    setSortType(IDEA_SORT_TYPES[0]);
  }, []);
  const company = useSelector((state) => state.company.company);
  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <Listbox
        value={sortType}
        onChange={(value) => {
          setSortType(value);
          router.query.sort = value.url;
          router.push(router);
        }}>
        <div className="relative flex-1">
          <Listbox.Button className="relative w-full inline-flex max-w-[195px] bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <UpDown className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
            <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
              {sortType?.name}
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
      <div className="flex items-center gap-4">
        <Listbox
          value={filterTopics}
          onChange={(value) => {
            if (value.length) {
              router.query.topics = value.join(',');
              router.push(router);
              setFilterTopics(value);
            } else {
              delete router.query.topics;
              router.push(router);
              setFilterTopics(value);
            }
          }}
          multiple>
          <div className="relative">
            <Listbox.Button className="relative w-full min-w-[160px] inline-flex bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
              <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
                Topics{' '}
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                  {filterTopics?.length || 0}
                </span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {company?.topics?.map((item) => (
                  <Listbox.Option
                    key={item.name}
                    className={({ active }) =>
                      `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                        active
                          ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                          : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                      }`
                    }
                    value={item.name}>
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
        <Listbox
          value={filterStatus}
          onChange={(value) => {
            if (value.length) {
              router.query.status = value.join(',');
              router.push(router);
              setFilterStatus(value);
            } else {
              delete router.query.status;
              router.push(router);
              setFilterStatus(value);
            }
          }}
          multiple>
          <div className="relative">
            <Listbox.Button className="relative w-full min-w-[160px] inline-flex bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
              <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate mr-2">
                Status{' '}
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                  {filterStatus?.length || 0}
                </span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {company?.statuses.map((item) => (
                  <Listbox.Option
                    key={item.name}
                    className={({ active }) =>
                      `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                        active
                          ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                          : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                      }`
                    }
                    value={item._id}>
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
    </div>
  );
}
