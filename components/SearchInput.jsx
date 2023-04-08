import React, { useDeferredValue } from 'react';
import Input from './Input';
import { Search, Close as X } from './icons';
import Button from './Button';

export default function SearchInput({ searchText, onSearch, onClear }) {
  const deferredSearch = useDeferredValue(searchText);

  return (
    <div className="relative">
      <Input
        type="text"
        name="search"
        id="search"
        icon={<Search className="w-5 h-5 icon" />}
        placeholder="Search"
        value={searchText}
        onChange={(e) => onSearch(e, deferredSearch)}
      />
      {searchText && (
        <Button
          variant="icon"
          icon={<X className="w-5 h-5 fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />}
          type="button"
          size="xs"
          className="absolute right-2 top-3"
          onClick={() => onClear()}
        />
      )}
    </div>
  );
}
