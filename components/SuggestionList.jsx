import { Popover } from '@headlessui/react';
import { Plus } from './icons';

function SuggestionsList({ filteredSuggestions, onClick, formatResult, setOpenGuestForm }) {
  return (
    <Popover>
      <ul className="suggestions pt-2 bg-white dark:bg-aa-900 purple:bg-pt-900 border border-gray-300 dark:border-aa-300 purple:border-pt-300 border-t-0 list-none mt-0 overflow-y-auto pl-0 w-full">
        {!!filteredSuggestions.length &&
          filteredSuggestions.map((suggestion) => (
            <Popover.Button
              key={suggestion._id}
              onClick={() => onClick(suggestion)}
              className="w-full">
              <li className="hover:cursor-pointer hover:text-slate-300 hover:bg-gray-100 hover:dark:bg-aa-600 hover:purple:bg-pt-600 text-slate-700 dark:text-aa-200 purple:text-pt-200 px-3 py-2">
                {formatResult ? formatResult(suggestion) : suggestion.name}
              </li>
            </Popover.Button>
          ))}
        <button
          type="button"
          className="w-full flex items-center  hover:bg-gray-100 hover:dark:bg-aa-600 hover:purple:bg-pt-600 rounded border-t border-gray-300 dark:border-aa-300 purple:border-pt-300 px-3 py-2"
          onClick={() => setOpenGuestForm(true)}>
          <Plus className="w-5 h-5 mr-2 icon" />
          <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
            Create new user
          </span>
        </button>
      </ul>
    </Popover>
  );
}
export default SuggestionsList;
