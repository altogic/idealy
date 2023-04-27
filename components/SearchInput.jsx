import cn from 'classnames';
import Button from './Button';
import Input from './Input';
import { Search, Close as X } from './icons';

export default function SearchInput({ searchText, onSearch, onClear, className }) {
  return (
    <div className={cn('relative w-full sm:w-auto', className)}>
      <Input
        type="text"
        name="search"
        id="search"
        icon={<Search className="w-5 h-5 icon" />}
        placeholder="Search"
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchText && (
        <Button
          variant="icon"
          icon={<X className="w-5 h-5 icon" />}
          type="button"
          size="xs"
          className="absolute right-2 top-3"
          onClick={() => onClear()}
        />
      )}
    </div>
  );
}
