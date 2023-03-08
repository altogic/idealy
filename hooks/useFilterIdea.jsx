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
  const [archiveFilter, setArchiveFilter] = useState();
  const [privateFilter, setPrivateFilter] = useState();
  const [bugFilter, setBugFilter] = useState();
  const [noStatusFilter, setNoStatusFilter] = useState();
  const [approvedFilter, setApprovedFilter] = useState();
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
    if (router.query.archive) {
      setArchiveFilter(`this.isArchived == true`);
    } else {
      setArchiveFilter('');
    }
    if (router.query.private) {
      setPrivateFilter(`this.isPrivate == true`);
    } else {
      setPrivateFilter('');
    }
    if (router.query.bug) {
      setBugFilter(`this.isBug == true`);
    } else {
      setBugFilter('');
    }
    if (router.query.noStatus) {
      setNoStatusFilter(`!EXISTS(this.status)`);
    } else {
      setNoStatusFilter('');
    }
    if (router.query.approved) {
      setApprovedFilter(`this.isApproved == false`);
    } else {
      setApprovedFilter('');
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
      archiveFilter,
      privateFilter,
      bugFilter,
      noStatusFilter,
      approvedFilter,
      `this.isMerged== false && this.company == '${company?._id}'`
    ]
      .filter(Boolean)
      .join(' && ')
  };
}
