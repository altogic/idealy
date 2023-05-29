import BaseListBox from '@/components/BaseListBox';
import DashboardIdeaCard from '@/components/DashboardIdeaCard';
import DashboardIdeaCardSkeleton from '@/components/DashboardIdeaCardSkeleton';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import InfiniteScroll from '@/components/InfiniteScroll';
import MiniUserCard from '@/components/MiniUserCard';
import MiniUserCardSkeleton from '@/components/MiniUserCardSkeleton';
import SearchInput from '@/components/SearchInput';
import UserDetail from '@/components/UserDetail';
import { Filter, UpDown } from '@/components/icons';
import { USERS_SORT_OPTIONS } from '@/constants/index';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/hooks/useDebounce';

export default function UserPage({ selectedUser, setSelectedUser, getIdeas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    company,
    getCompanyUsersLoading: isLoading,
    companyUsers: { result: users, countInfo }
  } = useSelector((state) => state.company);
  const { ideas, getIdeaLoading, countInfo: ideaCountInfo } = useSelector((state) => state.idea);
  const [searchText, setSearchText] = useState('');
  const [segmentSelected, setSegmentSelected] = useState();
  const [sortSelected, setSortSelected] = useState(USERS_SORT_OPTIONS?.[0]);

  const handleSortChange = (val) => {
    setSegmentSelected(val);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: val.value }
    });
  };

  function handleSearchChange(value) {
    setSearchText(value);
    if (!value) {
      delete router.query.q;
      router.push({
        pathname: router.pathname,
        query: { ...router.query }
      });
    }
  }
  useDebounce(searchText, () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: searchText }
    });
  });

  useEffect(() => {
    if (router.isReady) {
      const { q, sort, segment } = router.query;
      if (q) {
        setSearchText(q);
      }
      if (sort) {
        const sortOption = USERS_SORT_OPTIONS.find((option) => option.value === sort);
        if (sortOption) {
          setSortSelected(sortOption);
        }
      }
      if (segment) {
        const segmentOption = company?.userSegments.find((option) => option._id === segment);
        setSegmentSelected(segmentOption);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="grid grid-cols-[1fr,2fr,1fr] h-[calc(100vh-88px)] divide-x divide-slate-200 dark:divide-aa-600 purple:divide-pt-800">
      <div>
        <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000 flex items-center gap-2 p-3 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 ">
          <SearchInput
            className="w-full flex-1"
            searchText={searchText}
            onSearch={(val) => handleSearchChange(val)}
            onClear={() => handleSearchChange('')}
          />
          <BaseListBox
            value={sortSelected}
            icon={<UpDown className="w-5 h-5 icon" />}
            type="icon"
            onChange={handleSortChange}
            field="label"
            options={USERS_SORT_OPTIONS}
            size="sm"
            hidden="mobile"
          />
          {!!company?.userSegments.length && (
            <BaseListBox
              value={segmentSelected}
              icon={<Filter className="w-5 h-5 icon" />}
              type="icon"
              onChange={(val) => {
                if (val._id === segmentSelected?._id) {
                  setSegmentSelected(null);
                  delete router.query.segment;
                  router.replace({
                    pathname: router.pathname,
                    query: { ...router.query }
                  });
                } else {
                  setSegmentSelected(val);
                  router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, segment: val._id }
                  });
                }
              }}
              field="name"
              options={company?.userSegments}
              size="sm"
              hidden="mobile"
            />
          )}
        </div>
        <div className="overflow-y-auto h-full">
          {isLoading ? (
            <MiniUserCardSkeleton count={2} />
          ) : (
            <InfiniteScroll
              countInfo={countInfo}
              className="h-full"
              endOfList={() => {
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, page: countInfo.currentPage + 1 }
                });
              }}>
              {users?.length ? (
                users?.map((user) => (
                  <>
                    <MiniUserCard
                      key={user._id}
                      name={user.name}
                      image={user.profilePicture}
                      checked={!!user.userId}
                      onClick={() => {
                        setSelectedUser(user);
                        delete router.query.userId;
                        router.push({
                          pathname: `/users/${user._id}`,
                          query: {
                            ...router.query
                          }
                        });
                      }}
                      active={selectedUser?._id === user._id}
                    />

                    <Divider />
                  </>
                ))
              ) : (
                <div className="flex items-center justify-center h-1/2">
                  <EmptyState
                    title="No users found"
                    description="Your Search did not match any users."
                  />
                </div>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        {getIdeaLoading || isLoading ? (
          <DashboardIdeaCardSkeleton />
        ) : (
          <InfiniteScroll
            className="h-full"
            countInfo={ideaCountInfo}
            endOfList={() => {
              getIdeas(ideaCountInfo.currentPage + 1);
            }}>
            {ideas.length ? (
              ideas.map((i) => (
                <>
                  <DashboardIdeaCard
                    key={i._id}
                    id={i._id}
                    idea={i}
                    onClick={() => dispatch(toggleFeedBackDetailModal())}
                  />
                  <Divider />
                </>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <EmptyState
                  title="No ideas found"
                  description="This user has not submitted any ideas yet."
                />
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
}
