import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { commentActions } from '@/redux/comments/commentsSlice';
import { toggleDeleteFeedBackModal, toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { IDEA_SORT_TYPES } from 'constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import DeleteModal from '@/components/DeleteModal';
import { Danger } from '@/components/icons';

export default function PublicView({ userIp }) {
  const [page, setPage] = useState(1);
  const [filterTopics, setFilterTopics] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [routerQuery, setRouterQuery] = useState();
  const [isFiltered, setIsFiltered] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const ideas = useSelector((state) => state.idea.ideas);
  const countInfo = useSelector((state) => state.idea.countInfo);
  const ideaVotes = useSelector((state) => state.idea.ideaVotes);
  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  const deleteFeedBackModal = useSelector((state) => state.general.deleteFeedBackModal);

  const handleDelete = () => {
    dispatch(ideaActions.deleteIdea(selectedIdea._id));
    dispatch(toggleFeedBackDetailModal());
    dispatch(toggleDeleteFeedBackModal());
  };

  const handleFilter = (filterTopics, filterStatus) => {
    if (filterTopics?.length || filterStatus?.length) {
      const topicsFilter = [];
      const statusFilter = [];
      if (filterTopics?.length) {
        filterTopics.forEach((topic) => {
          topicsFilter.push(`IN(this.topics,'${topic}')`);
        });
      }
      if (filterStatus?.length) {
        filterStatus.forEach((status) => {
          statusFilter.push(`this.status._id == '${status}'`);
        });
      }
      return `${topicsFilter.length ? `(${topicsFilter.join(' || ')})` : ''} ${
        topicsFilter.length && statusFilter.length ? '&&' : ''
      }  ${statusFilter.length ? `(${statusFilter.join(' || ')})` : ''} &&`;
    }
    return '';
  };
  const handleSort = (sort) => {
    if (sort) {
      const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
      setIsFiltered(sortType);
      return sortType?.query;
    }
    setIsFiltered(IDEA_SORT_TYPES[2]);
    return IDEA_SORT_TYPES[2].query;
  };

  const getIdeasByCompany = useCallback(() => {
    if (router.isReady) {
      const req = {
        subdomain: window.location.hostname.split('.')[0],
        limit: 10,
        page,
        filter: handleFilter(router.query.topics?.split(','), router.query.status?.split(',')),
        sort: handleSort(router.query.sort)
      };
      if (!user && !company?.role) {
        req.filter +=
          'this.isArchived == false && this.isPrivate == false && this.isCompleted == false &&';
      }

      dispatch(ideaActions.getIdeasByCompany(req));
    }
  }, [page, router.query.sort, router.query.status, router.query.topics]);

  useEffect(() => {
    if (router) {
      const { topics, status, sort, feedback } = router.query;
      if (sort) {
        const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
        setIsFiltered(sortType);
      } else {
        setIsFiltered(IDEA_SORT_TYPES[2]);
      }
      if (topics) {
        setFilterTopics(topics.split(','));
      }
      if (status) {
        setFilterStatus(status.split(','));
      }
      if (feedback && !feedBackDetailModal) {
        const ideaDetail = ideas.find((i) => i._id === feedback);
        if (ideaDetail) {
          dispatch(ideaActions.setSelectedIdea(ideaDetail));
          dispatch(toggleFeedBackDetailModal());
        }
      }
    }
  }, [router, ideas]);

  useEffect(() => {
    if (!feedBackDetailModal) {
      getIdeasByCompany();
    }
  }, [page, getIdeasByCompany]);

  const isSubmitIdeaVisible = useRegisteredUserValidation('submitIdea');

  useEffect(() => {
    if (company) {
      if (!company.privacy.isPublic && !company.privacy.isPublic.userApproval) {
        router.push('/404');
      }
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
        <div className="max-w-screen-lg mx-auto my-14">
          <div className="flex items-start justify-between mb-16">
            <div>
              <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                Feature Ideas
              </h1>
              <p className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-base tracking-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
            {isSubmitIdeaVisible && <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />}
          </div>
          <div className="flex items-start justify-between">
            <FilterIdea
              isFiltered={isFiltered}
              setIsFiltered={setIsFiltered}
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
            {ideas?.map((idea) => (
              <div
                key={idea._id}
                className="inline-block w-full py-6 border-b border-slate-200 last:border-0 first:pt-0">
                <PublicViewCard
                  idea={idea}
                  onClick={() => {
                    dispatch(commentActions.getComments(idea._id));
                    dispatch(ideaActions.setSelectedIdea(idea));
                    dispatch(toggleFeedBackDetailModal());
                    setRouterQuery(router.query);
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
                  }}
                  voted={ideaVotes.some((vote) => vote.ideaId === idea._id)}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <IdeaDetail idea={selectedIdea} company={company} query={routerQuery} />
        <DeleteModal
          show={deleteFeedBackModal}
          onClose={() => dispatch(toggleDeleteFeedBackModal())}
          cancelOnClick={() => dispatch(toggleDeleteFeedBackModal())}
          deleteOnClick={handleDelete}
          icon={<Danger className="w-6 h-6 text-red-600" />}
          title="Delete Idea"
          description="Are you sure you want to delete this idea? This action cannot be undone."
        />
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const { ip } = await fetch('https://api.ipify.org?format=json').then((res) => res.json());
  return {
    props: {
      userIp: ip
    }
  };
}
