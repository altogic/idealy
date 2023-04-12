import { FilterHamburger, UpDown } from '@/components/icons';
import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from '../BaseListBox';

export default function FilterIdea({
  sortType,
  setSortType,
  filterStatus,
  setFilterStatus,
  filterTopics,
  setFilterTopics
}) {
  const router = useRouter();
  useEffect(() => {
    setSortType(IDEA_SORT_TYPES[0]);
  }, []);
  const company = useSelector((state) => state.company.company);
  const handleSortChange = (value) => {
    setSortType(value);
    router.query.sort = value.url;
    router.push({
      pathname: router.pathname,
      query: router.query
    });
  };
  const handleFilterStatusChange = (value) => {
    if (value.length) {
      router.query.status = value.join(',');
      router.push({
        pathname: router.pathname,
        query: router.query
      });
      setFilterStatus(value);
    } else {
      router.push({
        pathname: router.pathname,
        query: router.query
      });
      setFilterStatus(value);
    }
  };
  const handleFilterTopicsChange = (value) => {
    if (value.length) {
      router.query.topics = value.join(',');
      router.push({
        pathname: router.pathname,
        query: router.query
      });
      setFilterTopics(value);
    } else {
      delete router.query.topics;
      router.push({
        pathname: router.pathname,
        query: router.query
      });
      setFilterTopics(value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between md:w-full">
      <BaseListBox
        value={sortType}
        icon={<UpDown className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
        label={sortType?.name}
        onChange={handleSortChange}
        field="name"
        options={IDEA_SORT_TYPES.filter((s) => !s.isAdmin)}
        size="md"
        hidden="mobile"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <BaseListBox
          value={filterTopics}
          onChange={handleFilterTopicsChange}
          field="name"
          options={company?.topics}
          icon={
            <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
          }
          label="Topics"
          valueField="name"
          multiple
          size="md"
          align="right"
          hidden="mobile"
          onReset={() => {
            setFilterTopics([]);
            delete router.query.topics;
            router.push({
              pathname: router.pathname,
              query: router.query
            });
          }}
        />
        <BaseListBox
          value={filterStatus}
          onChange={handleFilterStatusChange}
          field="name"
          options={company?.statuses}
          icon={
            <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
          }
          label="Status"
          valueField="name"
          multiple
          size="md"
          align="right"
          hidden="mobile"
          type="status"
          onReset={() => {
            setFilterStatus([]);
            delete router.query.status;
            router.push({
              pathname: router.pathname,
              query: router.query
            });
          }}
        />
      </div>
    </div>
  );
}
