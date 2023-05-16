import Button from '@/components/Button';
import { Filter, Pen, Search, Close as X } from '@/components/icons';
import Input from '@/components/Input';
import { toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SortListBox from '../SortListBox';

export default function IdeaFilter({ isFilterSlide, setIsFilterSlide }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let timer;
    if (searchText) {
      timer = setTimeout(() => {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, search: searchText }
        });
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000 flex items-center gap-2 p-6 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
      <div className="2xl:hidden">
        <Button
          variant="indigo"
          icon={<Filter className="w-5 h-5 icon-slate" />}
          type="button"
          size="sm"
          onClick={() => setIsFilterSlide(!isFilterSlide)}
        />
      </div>
      <div className="flex-1 relative">
        <Input
          type="text"
          name="search"
          id="search"
          icon={<Search className="w-5 h-5 icon" />}
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {searchText && (
          <Button
            variant="icon"
            icon={<X className="w-5 h-5 icon" />}
            type="button"
            size="xs"
            className="absolute right-2 top-3"
            onClick={() => {
              setSearchText('');
              router.push({
                pathname: router.pathname,
                query: { ...router.query, search: '' }
              });
            }}
          />
        )}
      </div>
      <SortListBox type="icon" size="xs" />
      <Button
        variant="indigo"
        icon={<Pen className="w-5 h-5 icon-slate" />}
        type="button"
        size="sm"
        onClick={() => dispatch(toggleFeedBackSubmitModal())}
      />
    </div>
  );
}
