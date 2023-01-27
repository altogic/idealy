import InfoModal from '@/components/InfoModal';
import EmptyState from '@/components/EmptyState';
import { Danger } from '@/components/icons';
import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import useGuestValidation from '@/hooks/useGuestValidation';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { authActions } from '@/redux/auth/authSlice';
import { toggleDeleteFeedBackModal, toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { IDEA_SORT_TYPES } from 'constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@/components/Divider';

export default function PublicView({ userIp }) {
  const [page, setPage] = useState(1);
  const [filterTopics, setFilterTopics] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [routerQuery, setRouterQuery] = useState();
  const [sortType, setSortType] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const ideas = useSelector((state) => state.idea.ideas);
  const countInfo = useSelector((state) => state.idea.countInfo);
  const ideaVotes = useSelector((state) => state.idea.ideaVotes);
  const loading = useSelector((state) => state.idea.getIdeaLoading);
  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  const deleteFeedBackModal = useSelector((state) => state.general.deleteFeedBackModal);
  const guestInfo = useSelector((state) => state.idea.guestInfo);
  const user = useSelector((state) => state.auth.user);
  const voteGuestAuth = useGuestValidation('voteIdea');

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
        statusFilter.push(`this.status._id == '${status}'`);
      });
      return `(${statusFilter.join(' || ')})`;
    }
    return '';
  };
  const handleFilter = (filterTopics, filterStatus) => {
    if (filterTopics?.length || filterStatus?.length) {
      const topicsFilter = getTopicsFilter(filterTopics);
      const statusFilter = getStatusFilter(filterStatus);
      return `${topicsFilter} ${topicsFilter && statusFilter ? '&&' : ''}  ${statusFilter} &&`;
    }
    return '';
  };
  const handleSort = (sort) => {
    if (sort) {
      const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
      setSortType(sortType);
      return sortType?.query;
    }
    setSortType(IDEA_SORT_TYPES[2]);
    return IDEA_SORT_TYPES[2].query;
  };

  const handleClickIdea = (idea) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          feedback: idea._id
        }
      },
      undefined,
      { scroll: false }
    );
    dispatch(ideaActions.setSelectedIdea(idea));
    dispatch(toggleFeedBackDetailModal());
    setRouterQuery(router.query);
  };

  const getIdeasByCompany = useCallback(() => {
    if (router.isReady && company?._id) {
      const req = {
        companyId: company?._id,
        limit: 10,
        filter: `this.isArchived == false && this.isPrivate == false && this.isCompleted == false && ${handleFilter(
          router.query.topics?.split(','),
          router.query.status?.split(',')
        )}`,
        sort: handleSort(router.query.sort),
        page
      };
      if (!user || !company?.role) {
        req.filter += ` this.isApproved == true &&`;
      }
      dispatch(ideaActions.getIdeasByCompany(req));
    }
  }, [page, router.query.sort, router.query.status, router.query.topics, company]);

  function handleCloseIdea() {
    dispatch(toggleFeedBackDetailModal());
    const temp = router.query;
    delete temp?.feedback;
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
    dispatch(ideaActions.setSelectedIdea(null));
  }

  const handleDelete = () => {
    dispatch(toggleDeleteFeedBackModal());
    dispatch(ideaActions.deleteIdea(selectedIdea._id));
    handleCloseIdea();
  };

  const handleVoted = (ideaId) => {
    if (user) {
      return ideaVotes.find((v) => v.ideaId === ideaId && v.userId === user._id);
    }
    if (voteGuestAuth) {
      return ideaVotes.find(
        (v) => v.ideaId === ideaId && guestInfo.guestEmail === v.guestEmail && !v.userId
      );
    }
    return ideaVotes.find((v) => v.ideaId === ideaId && v.ip === userIp && !v.userId);
  };

  const showFeedbackDetail = (feedbackId) => {
    const ideaDetail = ideas.find((i) => i._id === feedbackId);
    if (ideaDetail) {
      dispatch(ideaActions.setSelectedIdea(ideaDetail));
      dispatch(toggleFeedBackDetailModal());
    }
  };
  useEffect(() => {
    if (router) {
      const { topics, status, sort, feedback } = router.query;
      if (sort) setSortType(IDEA_SORT_TYPES.find((s) => s.url === sort));
      else setSortType(IDEA_SORT_TYPES[2]);
      if (topics) setFilterTopics(topics.split(','));
      if (status) setFilterStatus(status.split(','));
      if (feedback && !feedBackDetailModal) showFeedbackDetail(feedback);
    }
  }, [router, ideas]);

  useEffect(() => {
    if (!feedBackDetailModal) {
      getIdeasByCompany();
    }
  }, [page, getIdeasByCompany]);

  const isSubmitIdeaVisible = useRegisteredUserValidation('submitIdeas');

  useEffect(() => {
    if (company) {
      if ((!company.privacy.isPublic || company.privacy.userApproval) && !company.role) {
        router.push('/request-access');
      }

      dispatch(
        ideaActions.getUserVotes({
          ...(voteGuestAuth ? { email: guestInfo.guestEmail } : { ip: userIp }),
          email: guestInfo?.guestEmail,
          companyId: company?._id,
          userId: user?._id
        })
      );
    }
  }, [company]);
  useEffect(() => {
    if (userIp) {
      dispatch(authActions.setUserIp(userIp));
    }
  }, [userIp]);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Public View</title>
        <meta name="description" content="Altogic Canny Alternative Public View" />
      </Head>
      <Layout>
        {company && (
          <>
            <div className="max-w-screen-lg mx-auto lg:my-14">
              <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
                <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                  Feature Ideas
                </h1>

                {isSubmitIdeaVisible && (
                  <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />
                )}
              </div>
              <div className="flex items-start justify-between mb-9">
                <FilterIdea
                  sortType={sortType}
                  setSortType={setSortType}
                  filterTopics={filterTopics}
                  filterStatus={filterStatus}
                  setFilterTopics={setFilterTopics}
                  setFilterStatus={setFilterStatus}
                />
              </div>
              <InfiniteScroll
                items={ideas}
                countInfo={countInfo}
                endOfList={() => setPage((page) => page + 1)}>
                {loading && page === 1 ? (
                  <div
                    role="status"
                    className="w-full space-y-4 divide-y divide-gray-300 animate-pulse">
                    <div className="flex justify-between items-center px-4 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-[62px] h-20 bg-gray-300 rounded-lg" />
                        <div>
                          <div className="w-64 h-2.5 bg-gray-300 rounded-full mb-2.5" />
                          <div className="w-32 h-2 bg-gray-300 rounded-full mb-2.5" />
                          <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-12" />
                    </div>
                    <div className="flex justify-between items-center px-4 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-[62px] h-20 bg-gray-300 rounded-lg" />
                        <div>
                          <div className="w-64 h-2.5 bg-gray-300 rounded-full mb-2.5" />
                          <div className="w-32 h-2 bg-gray-300 rounded-full mb-2.5" />
                          <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-12" />
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : ideas.length > 0 ? (
                  ideas?.map((idea, index) => (
                    <>
                      <PublicViewCard
                        key={idea._id}
                        idea={idea}
                        onClick={() => handleClickIdea(idea)}
                        voted={handleVoted(idea._id)}
                      />
                      {ideas.length - 1 !== index && <Divider className="my-4" />}
                    </>
                  ))
                ) : (
                  <EmptyState
                    title="No feature ideas found"
                    description="Your search did not match any data or this company does not have any feature ideas yet."
                  />
                )}
                {loading && page > 1 && (
                  <div
                    role="status"
                    className="w-full space-y-4 divide-y divide-gray-300 animate-pulse">
                    <div className="flex justify-between items-center px-4 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-[62px] h-20 bg-gray-300 rounded-lg" />
                        <div>
                          <div className="w-64 h-2.5 bg-gray-300 rounded-full mb-2.5" />
                          <div className="w-32 h-2 bg-gray-300 rounded-full mb-2.5" />
                          <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full w-12" />
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </InfiniteScroll>
            </div>
            <IdeaDetail
              idea={selectedIdea}
              company={company}
              query={routerQuery}
              voted={handleVoted(selectedIdea?._id)}
            />
            <InfoModal
              show={deleteFeedBackModal}
              onClose={() => dispatch(toggleDeleteFeedBackModal())}
              cancelOnClick={() => dispatch(toggleDeleteFeedBackModal())}
              onConfirm={handleDelete}
              icon={<Danger className="w-7 h-7 text-red-600" />}
              title="Delete Idea"
              description="Are you sure you want to delete this idea? This action cannot be undone."
              confirmText="Delete Idea"
              confirmColor="red"
              canCancel
            />
          </>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const ip = await fetch(`https://ipv4.icanhazip.com/`).then((res) => res.text());
  return {
    props: {
      userIp: ip.trim()
    }
  };
}
