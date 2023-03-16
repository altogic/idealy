import { IDEA_SORT_TYPES } from 'constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFilterIdea() {
  const company = useSelector((state) => state.company.company);
  const [sortType, setSortType] = useState();
  const [topicsFilter, setTopicsFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState();
  const [segmentFilter, setSegmentFilter] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const [propertyFilter, setPropertyFilter] = useState();
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
    const { sort, topics, status, category, startDate, endDate, dataRange, segment, search } =
      router.query;
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
    if (search) {
      setSearchFilter(`INCLUDES(this.title, '${search}')`);
    } else {
      setSearchFilter('');
    }
    if (
      router.query.archive ||
      router.query.private ||
      router.query.bug ||
      router.query.noStatus ||
      router.query.approved
    ) {
      const propertyFilter = [];
      if (router.query.archive) {
        propertyFilter.push('this.isArchived == true');
      }
      if (router.query.private) {
        propertyFilter.push('this.isPrivate == true');
      }
      if (router.query.bug) {
        propertyFilter.push('this.isBug == true');
      }
      if (router.query.noStatus) {
        propertyFilter.push('!EXISTS(this.status)');
      }
      if (router.query.approved) {
        propertyFilter.push('this.isApproved == true');
      }
      setPropertyFilter(`(${propertyFilter.join(' || ')})`);
    } else {
      setPropertyFilter('');
    }
  }, [router]);

  return {
    sort: sortType,
    filter: [
      topicsFilter,
      statusFilter,
      categoryFilter,
      dateFilter,
      segmentFilter,
      searchFilter,
      propertyFilter,
      `this.isMerged== false && this.company == '${company?._id}'`
    ]
      .filter(Boolean)
      .join(' && ')
  };
}
