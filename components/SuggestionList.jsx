import { Popover } from '@headlessui/react';
import Divider from './Divider';

function SuggestionsList({ filteredSuggestions, onClick, formatResult }) {
  return (
    <Popover>
      <Divider className="m-auto w-11/12" />
      <ul className="suggestions bg-white border border-gray-300 border-t-0 list-none mt-0 overflow-y-auto pl-0 w-full">
        {filteredSuggestions.length ? (
          filteredSuggestions.map((suggestion) => (
            <Popover.Button
              key={suggestion._id}
              onClick={() => onClick(suggestion)}
              className="w-full">
              <li className="hover:cursor-pointer hover:text-slate-300 hover:bg-gray-100">
                {formatResult ? formatResult(suggestion) : suggestion.name}
              </li>
              <Divider className="m-auto w-11/12" />
            </Popover.Button>
          ))
        ) : (
          <li className="hover:cursor-pointer p-2">No results found</li>
        )}
      </ul>
    </Popover>
  );
}
export default SuggestionsList;
