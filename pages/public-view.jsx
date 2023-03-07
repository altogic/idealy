import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import Errors from '@/components/Errors';
import { Plus } from '@/components/icons';
import DeleteIdeaModal from '@/components/Idea/DeleteIdeaModal';
import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import useFilterIdea from '@/hooks/useFilterIdea';
import useGuestValidation from '@/hooks/useGuestValidation';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import useRouteIdea from '@/hooks/useRouteIdea';
import { authActions } from '@/redux/auth/authSlice';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { IDEA_SORT_TYPES } from 'constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PublicView({ userIp }) {
  const [page, setPage] = useState(1);
  const [filterTopics, setFilterTopics] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [sortType, setSortType] = useState();
  const [error, setError] = useState();

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

  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const user = useSelector((state) => state.auth.user);
  const voteGuestAuth = useGuestValidation('voteIdea');
  const routeIdea = useRouteIdea();

  const handleClickIdea = (idea) => {
    routeIdea(idea._id);
    dispatch(ideaActions.setSelectedIdea(idea));
    dispatch(toggleFeedBackDetailModal());
  };
  const { sort, topicsFilter, statusFilter } = useFilterIdea();

  const getIdeasByCompany = useCallback(() => {
    if (router.isReady && company?._id) {
      const req = {
        companyId: company?._id,
        limit: 10,
        filter: [
          topicsFilter,
          statusFilter,
          'this.isArchived == false && this.isPrivate == false && this.isCompleted == false',
          `this.isMerged == false && this.company == '${company._id}'`
        ]
          .filter(Boolean)
          .join(' && '),
        sort,
        page
      };
      if (!user || !company?.role || company?.role === 'Guest') {
        req.filter += `&& this.isApproved == true`;
      }
      dispatch(ideaActions.getIdeasByCompany(req));
    }
  }, [page, sort, topicsFilter, statusFilter, company]);

  const showFeedbackDetail = (feedbackId) => {
    const ideaDetail = ideas.find((i) => i._id === feedbackId);
    if (ideaDetail) {
      dispatch(ideaActions.setSelectedIdea(ideaDetail));
      dispatch(toggleFeedBackDetailModal());
    } else {
      dispatch(
        ideaActions.getIdeaById({
          id: feedbackId,
          onSuccess: () => {
            if (!feedBackDetailModal) dispatch(toggleFeedBackDetailModal());
          }
        })
      );
    }
  };

  function handleCloseIdea() {
    const mergedIdeaId = localStorage.getItem('mergedIdea')?.slice(1, -1);
    let check = false;
    if (selectedIdea._id === mergedIdeaId) {
      localStorage.removeItem('mergedIdea');
      check = true;
    }
    const temp = router.query;
    if (mergedIdeaId && !check) {
      temp.feedback = mergedIdeaId;
      showFeedbackDetail(mergedIdeaId);
    } else {
      delete temp?.feedback;
      dispatch(ideaActions.setSelectedIdea(null));
      dispatch(toggleFeedBackDetailModal());
    }
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
  }

  const handleVoted = (ideaId) => {
    if (user) {
      return ideaVotes.find((v) => v.ideaId === ideaId && v.userId === user._id);
    }
    if (voteGuestAuth) {
      return ideaVotes.find(
        (v) => v.ideaId === ideaId && guestInfo.email === v.guestEmail && !v.userId
      );
    }
    return ideaVotes.find((v) => v.ideaId === ideaId && v.ip === userIp && !v.userId);
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
          ...(voteGuestAuth ? { email: guestInfo.email } : { ip: userIp }),
          email: guestInfo?.email,
          companyId: company?._id,
          userId: user?._id
        })
      );
      if (!company?.siteNavigation?.feedback && !(company?.role && company?.role !== 'Guest')) {
        setError({
          title: 'Feedback is disabled',
          message:
            'Feedback is disabled for this company. Please contact company administrator for detail information.'
        });
      } else {
        setError(null);
      }
    }
  }, [company]);

  useEffect(() => {
    if (userIp) {
      dispatch(authActions.setUserIp(userIp));
    }
  }, [userIp]);

  useEffect(
    () => () => {
      dispatch(ideaActions.setSelectedIdea(null));
    },
    []
  );

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
              {error ? (
                <Errors title={error?.title} message={error?.message} />
              ) : (
                <>
                  <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
                    <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                      Feature Ideas
                    </h1>

                    {isSubmitIdeaVisible && (
                      <>
                        <Button
                          type="button"
                          text="Submit Idea"
                          icon={<Plus className="w-5 h-5" />}
                          variant="indigo"
                          size="sm"
                          mobileFullWidth="mobileFullWidth"
                          onClick={() => dispatch(toggleFeedBackSubmitModal())}
                        />
                        <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />
                      </>
                    )}
                  </div>
                  <div className="flex items-start justify-center md:justify-between mb-9">
                    <FilterIdea
                      sortType={sortType}
                      setSortType={setSortType}
                      filterTopics={filterTopics}
                      filterStatus={filterStatus}
                      setFilterTopics={setFilterTopics}
                      setFilterStatus={setFilterStatus}
                    />
                  </div>
                  {loading && page === 1 ? (
                    <div
                      role="status"
                      className="w-full space-y-4 divide-y divide-gray-300 dark:divide-aa-600 purple:divide-pt-800 animate-pulse">
                      <div className="flex justify-between items-center px-4 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-[62px] h-20 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-lg" />
                          <div>
                            <div className="w-64 h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
                            <div className="w-32 h-2 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
                            <div className="h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full w-24" />
                          </div>
                        </div>
                        <div className="h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full w-12" />
                      </div>
                      <div className="flex justify-between items-center px-4 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-[62px] h-20 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-lg" />
                          <div>
                            <div className="w-64 h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
                            <div className="w-32 h-2 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
                            <div className="h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full w-24" />
                          </div>
                        </div>
                        <div className="h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full w-12" />
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <InfiniteScroll
                      items={ideas}
                      countInfo={countInfo}
                      endOfList={() => setPage((page) => page + 1)}>
                      {ideas.length > 0 ? (
                        ideas?.map((idea, index) => (
                          <div key={idea._id}>
                            <PublicViewCard
                              idea={idea}
                              onClick={() => handleClickIdea(idea)}
                              voted={handleVoted(idea._id)}
                            />
                            {ideas.length - 1 !== index && <Divider className="my-4" />}
                          </div>
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
                  )}
                </>
              )}
            </div>
            <IdeaDetail
              idea={selectedIdea}
              company={company}
              voted={handleVoted(selectedIdea?._id)}
              onClose={() => handleCloseIdea()}
            />
            <DeleteIdeaModal onClose={() => handleCloseIdea()} />
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
