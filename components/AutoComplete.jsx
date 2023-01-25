/* eslint-disable react/forbid-prop-types */
import { XIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import Input from './Input';
import SuggestionsList from './SuggestionList';

function AutoComplete({
  suggestions,
  onSearch,
  formatResult,
  onSuggestionClick,
  loading,
  closeModal,
  activeSuggestion,
  setOpenGuestForm,
  openGuestForm,
  ...rest
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState();

  const onChange = async () => {
    setSelectedSuggestion();
    setInput(input);
    onSearch(input);
    setShowSuggestions(true);
  };
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setInput('');
    if (closeModal) {
      closeModal();
      setSelectedSuggestion();
    }
  };
  const onClick = (suggestion) => {
    setInput(suggestion.name);
    setSelectedSuggestion(suggestion);
    closeSuggestions();
    onSuggestionClick(suggestion);
  };
  // const onKeyDown = (key) => {
  //   if (key.keyCode === 13 || key.keyCode === 9) {
  //     setInput(selectedSuggestion.name);
  //   }
  // };

  useEffect(() => {
    document.body.addEventListener('click', () => closeSuggestions());
    return () => document.body.removeEventListener('click', () => closeSuggestions());
  }, []);

  useEffect(() => {
    let timer;
    if (input && !selectedSuggestion) {
      timer = setTimeout(() => {
        onChange();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [input, selectedSuggestion]);

  useEffect(() => {
    if (activeSuggestion) {
      setSelectedSuggestion(activeSuggestion);
      setInput(activeSuggestion.name);
    }
  }, [activeSuggestion]);
  useEffect(() => {
    if (openGuestForm) {
      closeSuggestions();
    }
  }, [openGuestForm]);

  return (
    <div className="relative h-[73px]">
      <div className="w-full absolute z-10">
        <div className="flex items-center">
          {selectedSuggestion && (
            <div className="flex items-center gap-2 absolute left-2 top-1/2 z-20 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded purple:bg-pt-900  dark:bg-aa-900 ">
              <Avatar
                src={selectedSuggestion.profilePicture}
                alt={selectedSuggestion.name}
                size="w-6 h-6"
                fontSize="text-sm"
              />
              <span className="text-sm text-indigo-800 dark:text-aa-300 purple:text-pt-300">
                {selectedSuggestion.name}
              </span>
            </div>
          )}
          <Input
            type="text"
            id="user"
            label="User"
            placeholder={!selectedSuggestion ? 'Search for a user...' : ''}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={onKeyDown}
            {...rest}
          />
          {(input || selectedSuggestion) && (
            <XIcon
              className="w-5 h-5 text-slate-400 absolute right-2 top-10 cursor-pointer"
              onClick={() => {
                setInput('');
                setSelectedSuggestion();
              }}
            />
          )}
        </div>
        {showSuggestions && input && !loading && (
          <SuggestionsList
            filteredSuggestions={suggestions}
            onClick={onClick}
            formatResult={formatResult}
            setOpenGuestForm={setOpenGuestForm}
          />
        )}
      </div>
    </div>
  );
}
AutoComplete.propTypes = {
  suggestions: PropTypes.array,
  onSearch: PropTypes.func,
  formatResult: PropTypes.func
};
AutoComplete.defaultProps = {
  suggestions: [],
  onSearch: () => {},
  formatResult: () => {}
};
export default AutoComplete;
