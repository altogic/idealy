import DashboardIdeaCard from '@/components/DashboardIdeaCard';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import Layout from '@/components/Layout';
import MiniUserCard from '@/components/MiniUserCard';
import SearchInput from '@/components/SearchInput';
import UserDetail from '@/components/UserDetail';
import useDebounce from '@/hooks/useDebounce';
import { companyActions } from '@/redux/company/companySlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseListBox from '@/components/BaseListBox';
import { USERS_SORT_OPTIONS } from '@/constants/index';
import { Filter, UpDown } from '@/components/icons';
import InfiniteScroll from '@/components/InfiniteScroll';
import MiniUserCardSkeleton from '@/components/MiniUserCardSkeleton';
import DashboardIdeaCardSkeleton from '@/components/DashboardIdeaCardSkeleton';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';

export default function Users() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    company,
    isLoading,
    companyUsers: { result: users, countInfo }
  } = useSelector((state) => state.company);
  const {
    ideas,
    selectedIdea,
    getIdeaLoading,
    countInfo: ideaCountInfo
  } = useSelector((state) => state.idea);
  const [selectedUser, setSelectedUser] = useState();
  const [searchText, setSearchText] = useState('');
  const [sortSelected, setSortSelected] = useState(USERS_SORT_OPTIONS?.[0]);
  const [segmentSelected, setSegmentSelected] = useState();

  const getCompanyUsers = useCallback(
    ({ filter, page } = {}) => {
      dispatch(
        companyActions.getCompanyUsers({
          page,
          limit: 10,
          filter: [
            `this.companyId == '${company?._id}'`,
            segmentSelected?.name && `this.segment._id == '${segmentSelected._id}'`,
            filter
          ]
            .filter(Boolean)
            .join(' && '),
          sort: sortSelected.value ?? 'createdAt:desc'
        })
      );
    },
    [company, sortSelected, segmentSelected]
  );

  function handleSearchChange(value) {
    setSearchText(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: value }
    });
    if (!value) {
      getCompanyUsers();
    }
  }
  function handleCloseIdea() {
    const temp = router.query;
    delete temp?.feedback;
    dispatch(ideaActions.setSelectedIdea(null));
    dispatch(toggleFeedBackDetailModal());
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
  }
  useDebounce(searchText, () => {
    getCompanyUsers({
      filter: `(INCLUDES(this.user.name, '${searchText}') || INCLUDES(this.name, '${searchText}'))`
    });
  });

  useEffect(() => {
    if (company && router.isReady && _.isNil(router.query.q)) {
      getCompanyUsers();
    }
  }, [company, getCompanyUsers]);

  const getIdeas = useCallback(
    (page) => {
      if (router.isReady && company?._id && selectedUser) {
        const req = {
          companyId: company?._id,
          limit: 10,
          filter: [
            `this.isMerged == false && this.company == '${company._id}'`,
            selectedUser?.userId
              ? `this.author._id == '${selectedUser.userId}'`
              : `this.guestEmail == '${selectedUser.email}'`
          ]
            .filter(Boolean)
            .join(' && '),
          sort: 'createdAt:desc',
          page
        };
        dispatch(ideaActions.getIdeasByCompany(req));
      }
    },
    [company, selectedUser, router.isReady]
  );

  useEffect(() => {
    if (_.isNil(selectedUser) && users?.length) {
      setSelectedUser(users?.[0]);
    }
  }, [users]);

  useEffect(() => {
    getIdeas();
  }, [getIdeas]);

  useEffect(() => {
    if (router.isReady && router.query.userId) {
      const user = users?.find((user) => user._id === router.query.userId);
      if (user && user?._id !== selectedUser?._id) {
        setSelectedUser(user);
      }
    }
  }, [router.isReady, router.query.userId, users]);

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
        segmentSelected(segmentOption);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (selectedUser && users) {
      const user = users?.find((user) => user._id === selectedUser._id);
      setSelectedUser(user);
    }
  }, [users]);

  return (
    <Layout>
      <div className="grid grid-cols-[1fr,3fr,1fr] h-[calc(100vh-88px)] divide-x divide-slate-200 dark:divide-aa-600 purple:divide-pt-800">
        <div>
          <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000 flex items-center gap-2 p-3 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800 ">
            <SearchInput
              className="w-full flex-1"
              searchText={searchText}
              onSearch={(val) => handleSearchChange(val)}
              onClear={() => handleSearchChange('')}
            />
            <BaseListBox
              value={sortSelected.label}
              icon={<UpDown className="w-5 h-5 icon" />}
              type="icon"
              onChange={(val) => {
                setSortSelected(val);
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, sort: val.value }
                });
              }}
              field="label"
              options={USERS_SORT_OPTIONS}
              size="sm"
              hidden="mobile"
            />
            <BaseListBox
              value={segmentSelected?.name}
              icon={<Filter className="w-5 h-5 icon" />}
              type="icon"
              onChange={(val) => {
                setSegmentSelected(val);
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, segment: val._id }
                });
              }}
              field="name"
              options={company?.userSegments}
              size="sm"
              hidden="mobile"
            />
          </div>
          <div className="overflow-y-auto h-full">
            {isLoading ? (
              <MiniUserCardSkeleton count={2} />
            ) : (
              <InfiniteScroll
                countInfo={countInfo}
                className="h-full"
                endOfList={() => {
                  getCompanyUsers({
                    page: countInfo.currentPage + 1
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
        <UserDetail user={selectedUser} />
      </div>
      <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
    </Layout>
  );
}
