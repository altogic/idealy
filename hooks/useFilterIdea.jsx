import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useFilterIdea() {
  const [sortType, setSortType] = useState();
  const [topicsFilter, setTopicsFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState();
  const [segmentFilter, setSegmentFilter] = useState();
  const router = useRouter();

  const getTopicsFilter = (filterTopics) => {
    if (filterTopics?.length) {
      const topicsFilter = [];
      filterTopics.forEach((topic) => {
        topicsFilter.push(`IN(this.topics,'${topic}')`);
      });
      return `(${topicsFilter.join(' || ')})`;
    }

    return '';
  };
  const getStatusFilter = (filterStatus) => {
    if (filterStatus?.length) {
      const statusFilter = [];
      filterStatus.forEach((status) => {
        statusFilter.push(`this.status.name == '${status}'`);
      });
      return `(${statusFilter.join(' || ')})`;
    }
    return '';
  };
  const getCategoryFilter = (filterCategory) => {
    if (filterCategory?.length) {
      const categoryFilter = [];
      filterCategory.forEach((category) => {
        categoryFilter.push(`this.category.name == '${category}'`);
      });
      return `(${categoryFilter.join(' || ')})`;
    }
    return '';
  };
  useEffect(() => {
    const { sort, topics, status, category, startDate, endDate, dataRange, segment } = router.query;
    if (sort) {
      const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
      setSortType(sortType?.query);
    }
    if (topics) {
      setTopicsFilter(getTopicsFilter(topics.split(',')));
    } else {
      setTopicsFilter('');
    }
    if (status) {
      setStatusFilter(getStatusFilter(status.split(',')));
    } else {
      setStatusFilter('');
    }

    if (category) {
      setCategoryFilter(getCategoryFilter(category.split(',')));
    } else {
      setCategoryFilter('');
    }
    if (startDate && endDate && dataRange) {
      setDateFilter(
        `${
          dataRange === 'Posts' ? 'this.createdAt' : 'this.lastVotedAt'
        } >= DATEVALUE('${startDate}') && ${
          dataRange === 'Posts' ? 'this.createdAt' : 'this.lastVotedAt'
        } <= DATEVALUE('${endDate}')`
      );
    } else {
      setDateFilter('');
    }
    if (segment) {
      setSegmentFilter(`this.userSegment.name == '${segment}'`);
    } else {
      setSegmentFilter('');
    }
  }, [router.query]);

  return { sort: sortType, topicsFilter, statusFilter, categoryFilter, dateFilter, segmentFilter };
}