import { UpDown } from '@/components/icons';
import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BaseListBox from './BaseListBox';

export default function SortListBox({ size, type = 'default' }) {
  const router = useRouter();
  const [sortSelected, setSortSelected] = useState();
  const handleSortChange = (value) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: value.url
      }
    });
    setSortSelected(value);
  };
  useEffect(() => {
    setSortSelected(IDEA_SORT_TYPES[0]);
  }, []);

  useEffect(() => {
    if (router.query.sort) {
      const sort = IDEA_SORT_TYPES.find((item) => item.url === router.query.sort);
      setSortSelected(sort);
    }
  }, [router.query.sort]);
  return (
    <BaseListBox
      value={sortSelected}
      icon={<UpDown className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
      label={type === 'icon' ? <UpDown className="w-5 h-5" /> : sortSelected?.name}
      type={type}
      onChange={handleSortChange}
      field="name"
      options={IDEA_SORT_TYPES}
      size={size}
      mobileSize="auto"
      hidden="mobile"
    />
  );
}
