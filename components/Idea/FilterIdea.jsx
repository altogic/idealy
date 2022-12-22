import { UpDown } from '@/components/icons';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const filter = [
  { name: 'Trending' },
  { name: 'Top' },
  { name: 'Newest' },
  { name: 'Status Changed' }
];
export default function FilterIdea({ isFiltered, setIsFiltered }) {
  return (
    <div className="mb-9">
      <Listbox value={isFiltered} onChange={setIsFiltered}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full inline-flex max-w-[195px] bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <UpDown className="w-5 h-5 text-slate-500 mr-2" />
            <span className="block text-slate-800 truncate">{isFiltered.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
              <svg
                className="w-5 h-5 text-slate-500"
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
            <Listbox.Options className="absolute mt-1 max-h-60 max-w-[195px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filter.map((item) => (
                <Listbox.Option
                  key={item.name}
                  className={({ active }) =>
                    `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                      active ? 'bg-slate-100' : 'text-slate-900'
                    }`
                  }
                  value={item}>
                  {({ isFiltered }) => (
                    <>
                      <span
                        className={`block truncate ${isFiltered ? 'font-medium' : 'font-normal'}`}>
                        {item.name}
                      </span>
                      {isFiltered ? (
                        <span className="flex items-center pl-3 text-indigo-700">
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