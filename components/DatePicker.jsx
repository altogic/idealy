import { Popover, Transition } from '@headlessui/react';
import { DateRange, DefinedRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DATE_RANGES } from '../constants';
import { ChevronDown, Calendar } from './icons';

export default function DatePicker({ onChange, value }) {
  const renderStaticRangeLabel = ({ label, isSelected }) => (
    <span className={isSelected() ? ' selected' : ''}>
      <i>{label}</i>
    </span>
  );
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 w-full border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm py-3.5 px-[10px]">
            <div className="grid grid-cols-[1fr,1fr,1fr] gap-2 w-full">
              <Calendar className="h-5 w-5 icon" />
              <span className="text-sm text-slate-500 dark:text-aa-200 purple:text-pt-200 whitespace-nowrap text-center">
                {value[0].startDate && value[0].endDate ? (
                  <>
                    {value[0].startDate.toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    {' - '}
                    {value[0].endDate.toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </>
                ) : (
                  'All Time'
                )}
              </span>
              <ChevronDown className="h-5 w-5 icon" />
            </div>
          </Popover.Button>
          <div className="absolute z-[100] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              <Popover.Panel>
                <DateRange
                  ranges={value}
                  onChange={(item) => onChange([item.selection])}
                  months={2}
                  maxDate={new Date()}
                  showSelectionPreview
                  direction="horizontal"
                  calendarFocus="backwards"
                />
                <DefinedRange
                  ranges={value}
                  onChange={(item) => onChange([item.selection])}
                  renderStaticRangeLabel={renderStaticRangeLabel}
                  staticRanges={DATE_RANGES}
                />
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
}
