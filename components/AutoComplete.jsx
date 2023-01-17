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
  ...rest
}) {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState();
  const onChange = async () => {
    setInput(input);
    onSearch(input);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
    setInput('');
    if (closeModal) {
      closeModal();
    }
  };
  const onClick = (suggestion) => {
    setInput(suggestion.name);
    setSelectedSuggestion(suggestion);
    closeSuggestions();
    onSuggestionClick(suggestion);
  };
  const onKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      setInput(suggestions[activeSuggestionIndex].name);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', () => closeSuggestions());
    return () => document.body.removeEventListener('click', () => closeSuggestions());
  }, []);

  useEffect(() => {
    let timer;
    if (input) {
      timer = setTimeout(() => {
        onChange();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="relative h-[73px]">
      <div className="w-full absolute z-10">
        <div className="flex items-center">
          {selectedSuggestion && (
            <div className="flex items-center absolute left-2 top-8 z-20 border border-slate-300 shadow-sm bg-gray-100 rounded-lg hover:bg-gray-200 p-1">
              <Avatar
                src={selectedSuggestion.profilePicture}
                alt={selectedSuggestion.name}
                size="w-7 h-7"
              />
              <span className="ml-2">{selectedSuggestion.name}</span>
            </div>
          )}
          <Input
            type="text"
            id="user"
            label="User"
            placeholder={!selectedSuggestion ? 'Search for a user...' : ''}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            {...rest}
          />
          {input && (
            <XIcon
              className="w-5 h-5 text-slate-400 absolute right-2 top-10 cursor-pointer"
              onClick={() => setInput('')}
            />
          )}
        </div>
        {showSuggestions && input && !loading && (
          <SuggestionsList
            filteredSuggestions={suggestions}
            activeSuggestionIndex={activeSuggestionIndex}
            onClick={onClick}
            formatResult={formatResult}
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
