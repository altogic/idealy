import FilterSave from '@/components/dashboard/FilterSave';
import IdeaFilter from '@/components/dashboard/IdeaFilter';
import DashboardIdeaCard from '@/components/DashboardIdeaCard';
import Divider from '@/components/Divider';
import Drawer from '@/components/Drawer';
import EmptyState from '@/components/EmptyState';
import DeleteIdeaModal from '@/components/Idea/DeleteIdeaModal';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import Tooltip from '@/components/Tooltip';
import useFilterIdea from '@/hooks/useFilterIdea';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { commentActions } from '@/redux/comments/commentsSlice';
import { companyActions } from '@/redux/company/companySlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardIdeaDetail = dynamic(() => import('@/components/dashboard/DashboardIdeaDetail'), {
  ssr: false
});
export default function AdminDashboard() {
  // List Box States
  const router = useRouter();
  const dispatch = useDispatch();
  const ideas = useSelector((state) => state.idea.ideas);
  const company = useSelector((state) => state.company.company);
  const countInfo = useSelector((state) => state.idea.countInfo);
  const sessionUser = useSelector((state) => state.auth.user);
  const [isFilterSlide, setIsFilterSlide] = useState(false);

  const idea = useSelector((state) => state.idea.selectedIdea);
  const editedIdea = useSelector((state) => state.idea.editedIdea);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);

  const [user, setUser] = useState();
  const { sort, filter } = useFilterIdea();

  function handleCloseIdea() {
    const ideaId = router.query.feedback;
    const ideaIndex = ideas.findIndex((item) => item._id === ideaId);
    const newSelectedIdea = ideas[ideaIndex + 1] || ideas[ideaIndex - 1];
    router.query.feedback = newSelectedIdea._id;
    router.push(router, undefined, { shallow: true });
    dispatch(ideaActions.setSelectedIdea(newSelectedIdea));
  }

  const getIdeasByCompany = useCallback(
    (page, limit) => {
      if (company) {
        dispatch(
          ideaActions.getIdeasByCompany({
            limit,
            page,
            company: company?._id,
            sort,
            filter
          })
        );
      }
    },
    [company, sort, filter]
  );

  const handlePageChange = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: parseInt(router.query.page, 10) + 1 }
    });
  };

  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  useUpdateEffect(() => {
    const limit = _.isEmpty(ideas) && router.query.page ? 10 * router.query.page : 10;
    const { page } = router.query;
    if (page > 1) getIdeasByCompany(page, limit);
  }, [router.query.page]);

  useUpdateEffect(() => {
    const page = _.isEmpty(ideas) ? 1 : router.query.page;
    getIdeasByCompany(1, 10 * page);
  }, [sort, filter]);

  useEffect(() => {
    const ideaId = router.query.feedback;
    if (router.isReady && ideaId && _.isEmpty(idea)) {
      const scrollIdea = document.getElementById(ideaId);
      if (scrollIdea) {
        scrollIdea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        dispatch(ideaActions.setSelectedIdea(ideas.find((idea) => idea._id === ideaId)));
        if (idea?.commentCount) dispatch(commentActions.getComments({ ideaId, page: 1 }));
      }
    }
  }, [router.query.feedback, ideas]);

  useEffect(() => {
    if (company) {
      dispatch(companyActions.getCompanyUsers(company._id));
    }
  }, [company]);

  useEffect(() => {
    if (router.isReady && !router.query.page && !router.query.feedback && !_.isEmpty(ideas)) {
      router.push({
        pathname: router.pathname,
        query: { page: 1, feedback: ideas[0]._id, ...router.query }
      });
    }
  }, [router, ideas]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      dispatch(ideaActions.setSelectedIdea(null));
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Admin Dashboard</title>
        <meta name="description" content="Altogic Canny Alternative Admin Dashboard" />
      </Head>
      <Layout>
        <div className="grid grid-cols-[500px,1fr] 2xl:grid-cols-[300px,499px,1fr] h-[calc(100vh-88px)] -mx-4">
          <FilterSave
            className="hidden 2xl:block h-[calc(100vh-88px)] bg-slate-50 dark:bg-aa-900 purple:bg-pt-1000 px-6 py-8 space-y-8 border-r border-slate-200 dark:border-aa-600 purple:border-pt-800 overflow-y-auto shadow-lg"
            filters={user?.savedFilters}
          />
          <div className="border-r border-slate-200 dark:border-aa-600 purple:border-pt-800">
            <IdeaFilter isFilterSlide={isFilterSlide} setIsFilterSlide={setIsFilterSlide} />
            <div className="overflow-y-auto h-[calc(100vh-188px)]">
              <InfiniteScroll items={ideas} countInfo={countInfo} endOfList={handlePageChange}>
                {ideas.length ? (
                  ideas.map((i, index) => (
                    <>
                      <DashboardIdeaCard
                        key={i._id}
                        id={i._id}
                        idea={i}
                        selected={i._id === idea?._id}
                      />
                      {ideas.length - 1 !== index && <Divider />}
                    </>
                  ))
                ) : (
                  <div className="m-auto my-8">
                    <EmptyState
                      title="No Ideas Found"
                      description="No ideas found for this company"
                    />
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>

          <div>
            <div className="p-[33px] border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
              <div className="relative group">
                <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md truncate w-[65ch] cursor-default ">
                  {idea?.title}
                </h2>
                <Tooltip content={idea?.title} />
              </div>
            </div>
            <DashboardIdeaDetail />
          </div>
        </div>
      </Layout>
      {/* Mobile Slide Over Filter */}
      <Drawer
        open={isFilterSlide}
        onClose={() => setIsFilterSlide(false)}
        position="left"
        className="z-50"
        title="Filter Ideas"
        size="md">
        <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold break-all">
          Filter Ideas
        </h2>
        <FilterSave className="relative mt-6 flex-1 space-y-8" filters={user?.savedFilters} />
      </Drawer>
      <DeleteIdeaModal onClose={() => handleCloseIdea()} />
      <SubmitIdea open={feedbackSubmitModal} idea={editedIdea} />
    </>
  );
}
