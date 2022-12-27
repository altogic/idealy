import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import { Plus } from '@/components/icons';
import { IDEA_SORT_TYPES } from 'constants';

export default function PublicView() {
  const [page, setPage] = useState(1);
  const [openDetailFeedbackModal, setOpenDetailFeedbackModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState();
  const [openSubmitFeedbackModal, setOpenSubmitFeedbackModal] = useState(false);
  const [sortQuery, setSortQuery] = useState();
  const [isFiltered, setIsFiltered] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const ideas = useSelector((state) => state.idea.ideas);
  const countInfo = useSelector((state) => state.idea.countInfo);
  const ideaVotes = useSelector((state) => state.idea.ideaVotes);

  const getIdeasByCompany = useCallback(() => {
    const req = {
      subdomain: window.location.hostname.split('.')[0],
      limit: 10,
      page
    };
    if (sortQuery) {
      req.sort = sortQuery;
      req.type = 'sort';
    }
    if (!user && !company?.role) {
      req.filter =
        'this.isArchived == false && this.isPrivate == false && this.status.isCompletedStatus == false';
    }
    dispatch(ideaActions.getIdeasByCompany(req));
  }, [page, sortQuery]);

  useEffect(() => {
    if (router) {
      const { sort } = router.query;
      if (sort) {
        const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
        setSortQuery(sortType?.query);
        setIsFiltered(sortType);
      } else {
        setIsFiltered(IDEA_SORT_TYPES[0]);
      }
    }
  }, [router]);

  useEffect(() => {
    getIdeasByCompany();
  }, [page, sortQuery]);

  const isSubmitIdeaVisible = useMemo(() => {
    if (!company) {
      return false;
    }

    if (company.authentication.type === 'Registered Users') {
      return !!user;
    }

    if (company.authentication.type === 'Custom') {
      return (
        (company.authentication.submitIdeas === 'Registered Users' && !!user) ||
        company.authentication.submitIdeas !== 'Registered Users'
      );
    }

    return true;
  }, [company, user]);

  useEffect(() => {
    if (company) {
      if (!company.privacy.isPublic && !company.privacy.isPublic.userApproval) {
        router.push('/404');
      }
    }
  }, [company]);
  useEffect(() => {
    const isModalOpen = openDetailFeedbackModal || openSubmitFeedbackModal;
    if (!isModalOpen) {
      setSelectedIdea();
      dispatch(ideaActions.clearSimilarIdeas());
    }
  }, [openDetailFeedbackModal, openSubmitFeedbackModal]);

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
              <p className="text-slate-600 text-base tracking-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
            {isSubmitIdeaVisible && (
              <>
                <Button
                  type="button"
                  text="Submit Feedback"
                  icon={<Plus className="w-5 h-5" />}
                  variant="indigo"
                  size="sm"
                  onClick={() => setOpenSubmitFeedbackModal(!openSubmitFeedbackModal)}
                />
                <SubmitIdea
                  open={openSubmitFeedbackModal}
                  setOpen={setOpenSubmitFeedbackModal}
                  idea={selectedIdea}
                />
              </>
            )}
          </div>
          <FilterIdea isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
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
                    setSelectedIdea(idea);
                    setOpenDetailFeedbackModal(!openDetailFeedbackModal);
                  }}
                  voted={ideaVotes.some((vote) => vote.ideaId === idea._id)}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <IdeaDetail
          open={openDetailFeedbackModal}
          setOpen={setOpenDetailFeedbackModal}
          idea={selectedIdea}
          company={company}
          setOpenSubmitFeedbackModal={setOpenSubmitFeedbackModal}
        />
      </Layout>
    </>
  );
}
