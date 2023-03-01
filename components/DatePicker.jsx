import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/outline';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { ChevronDown } from './icons';
// theme css file
export default function DatePicker({ onChange, value }) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 w-full border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-w-[auto] md:min-w-[250px] max-w-[300px] py-3.5 px-[10px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-slate-700 dark:text-aa-400 purple:text-pt-400" />
              <span className="text-slate-700 dark:text-aa-400 purple:text-pt-400 whitespace-nowrap">
                {value[0].startDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {' - '}
                {value[0].endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <ChevronDown className="h-5 w-5 text-slate-700 dark:text-aa-400 purple:text-pt-400" />
          </Popover.Button>
          <div className="absolute z-[100] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-slate-300 dark:border-aa-400 purple:border-pt-400">
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              <Popover.Panel>
                <DateRangePicker
                  onChange={(item) => onChange([item.selection])}
                  showSelectionPreview
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={value}
                  direction="horizontal"
                  editableDateInputs
                />
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
}
