import Button from '@/components/Button';
import { Filter, Pen, Search } from '@/components/icons';
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
    const timer = setTimeout(() => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: searchText }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000 flex items-center gap-2 p-6 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
      <div className="2xl:hidden">
        <Button
          variant="indigo"
          icon={<Filter className="w-5 h-5 text-slate-100 dark:text-aa-200 purple:text-pt-200" />}
          type="button"
          size="xs"
          onClick={() => setIsFilterSlide(!isFilterSlide)}
        />
      </div>
      <div className="flex-1">
        <Input
          type="text"
          name="search"
          id="search"
          icon={<Search className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
          placeholder="Search"
          onKeyUp={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <SortListBox type="icon" size="xs" />
      <Button
        variant="indigo"
        icon={<Pen className="w-5 h-5 text-slate-100 dark:text-aa-200 purple:text-pt-200" />}
        type="button"
        size="xs"
        onClick={() => dispatch(toggleFeedBackSubmitModal())}
      />
    </div>
  );
}
