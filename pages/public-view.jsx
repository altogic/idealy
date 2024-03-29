import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EmptyState from '@/components/EmptyState';
import Errors from '@/components/Errors';
import { Plus, Email, Close } from '@/components/icons';
import DeleteIdeaModal from '@/components/Idea/DeleteIdeaModal';
import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import useFilterIdea from '@/hooks/useFilterIdea';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import useRouteIdea from '@/hooks/useRouteIdea';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { IDEA_SORT_TYPES } from 'constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import InfoModal from '@/components/InfoModal';
import useCheckCompanyPrivacy from '@/hooks/useCheckCompanyPrivacy';

export default function PublicView() {
  const [page, setPage] = useState(1);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [filterTopics, setFilterTopics] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [sortType, setSortType] = useState();
  const [error, setError] = useState();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useCheckCompanyPrivacy();

  const { company, isGuest } = useSelector((state) => state.company);
  const {
    ideas,
    countInfo,
    getIdeaLoading: loading,
    selectedIdea
  } = useSelector((state) => state.idea);

  const { feedBackDetailModal, feedbackSubmitModal } = useSelector((state) => state.general);

  const user = useSelector((state) => state.auth.user);

  const routeIdea = useRouteIdea();

  const handleClickIdea = (idea) => {
    routeIdea(idea._id);
    dispatch(ideaActions.setSelectedIdea(idea));
    dispatch(toggleFeedBackDetailModal());
  };
  const { sort, filter } = useFilterIdea();

  const getIdeasByCompany = useCallback(() => {
    if (router.isReady && company?._id) {
      const req = {
        companyId: company?._id,
        limit: 10,
        filter: [
          'this.isArchived == false && this.isPrivate == false && this.isCompleted == false',
          filter
        ]
          .filter(Boolean)
          .join(' && '),
        sort: sort ?? 'createdAt:desc',
        page
      };
      if (!user || isGuest) {
        req.filter += `&& this.isApproved == true`;
      }
      dispatch(ideaActions.getIdeasByCompany(req));
    }
  }, [page, sort, filter, company?._id]);

  const showFeedbackDetail = (feedbackId) => {
    const ideaDetail = ideas.find((i) => i._id === feedbackId);
    if (ideaDetail) {
      dispatch(ideaActions.setSelectedIdea(ideaDetail));
      dispatch(toggleFeedBackDetailModal());
    } else {
      dispatch(
        ideaActions.getIdeaById({
          filter: [
            `this._id == '${feedbackId}'`,
            isGuest &&
              'this.isApproved == true && this.isArchived == false && this.isCompleted == false && this.isPrivate == false && this.isDeleted == false'
          ]
            .filter(Boolean)
            .join(' && '),
          onSuccess: () => {
            if (!feedBackDetailModal) dispatch(toggleFeedBackDetailModal());
          },
          onError: () => {
            setOpenInfoModal(true);
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, feedback: undefined }
              },
              undefined,
              { scroll: false }
            );
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

  useEffect(() => {
    if (router.isReady) {
      const { topics, status, sort, feedback } = router.query;
      if (sort) setSortType(IDEA_SORT_TYPES.find((s) => s.url === sort));
      else setSortType(IDEA_SORT_TYPES[2]);
      if (topics) setFilterTopics(topics.split(','));
      if (status) setFilterStatus(status.split(','));
      if (feedback && !feedBackDetailModal) showFeedbackDetail(feedback);
    }
  }, [router, ideas]);

  useEffect(() => {
    getIdeasByCompany();
  }, [page, getIdeasByCompany]);

  const isSubmitIdeaVisible = useRegisteredUserValidation('submitIdeas');
  useEffect(() => {
    if (company) {
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
  }, [company?.siteNavigation, company?.role]);

  useEffect(
    () => () => {
      dispatch(ideaActions.setSelectedIdea(null));
    },
    []
  );

  return (
    <>
      <Head>
        <title>Idealy - Public View</title>
      </Head>
      <Layout>
        {company && (
          <>
            <div className="min-h-[calc(100vh-93px)]">
              {error ? (
                <Errors title={error?.title} message={error?.message} />
              ) : (
                <div className="max-w-screen-lg mx-auto pt-14 px-4">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 mb-8 md:mb-16">
                    <h1 className="text-slate-900 dark:text-aa-200 purple:text-pt-200 mb-2 text-3xl font-semibold">
                      Feature Ideas
                    </h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {isSubmitIdeaVisible && (
                        <>
                          <Button
                            type="button"
                            text="Submit Idea"
                            icon={<Plus className="w-5 h-5 icon-slate" />}
                            variant="indigo"
                            size="sm"
                            mobileFullWidth="mobileFullWidth"
                            onClick={() => dispatch(toggleFeedBackSubmitModal())}
                          />
                          <SubmitIdea open={feedbackSubmitModal} idea={selectedIdea} />
                        </>
                      )}
                      <div className="md:hidden w-full">
                        <Button
                          type="button"
                          text="Filters"
                          icon={<Plus className="w-5 h-5 icon-slate" />}
                          variant="indigo"
                          size="sm"
                          mobileFullWidth="mobileFullWidth"
                          onClick={() => setOpenMobileFilter(!openMobileFilter)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Transition.Root show={openMobileFilter} as={Fragment}>
                      <Dialog as="div" className="relative z-[9999]" onClose={setOpenMobileFilter}>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                        <div className="fixed inset-0 overflow-hidden">
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                              <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-aa-900 purple:bg-pt-1000 py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                      <div className="flex items-start justify-between">
                                        <Dialog.Title className="text-base font-semibold leading-6 text-slate-800 dark:text-aa-200 purple:text-pt-200">
                                          Filter
                                        </Dialog.Title>
                                        <div className="ml-3 flex h-7 items-center">
                                          <button
                                            type="button"
                                            className="rounded-md bg-white dark:bg-aa-900 purple:bg-pt-1000 text-slate-800 dark:text-aa-200 purple:text-pt-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => setOpenMobileFilter(false)}>
                                            <span className="sr-only">Close panel</span>
                                            <Close className="h-6 w-6" aria-hidden="true" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                      <FilterIdea
                                        sortType={sortType}
                                        setSortType={setSortType}
                                        filterTopics={filterTopics}
                                        filterStatus={filterStatus}
                                        setFilterTopics={setFilterTopics}
                                        setFilterStatus={setFilterStatus}
                                      />
                                    </div>
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  </div>
                  <div className="hidden md:flex items-start justify-center md:justify-between mb-9">
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
                      endOfList={() =>
                        setPage((page) => {
                          if (ideas.length < countInfo?.count) return page + 1;
                          return page;
                        })
                      }>
                      {ideas?.length > 0 ? (
                        ideas?.map((idea, index) => (
                          <div key={idea._id}>
                            <PublicViewCard idea={idea} onClick={() => handleClickIdea(idea)} />
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
                </div>
              )}
            </div>
            <IdeaDetail idea={selectedIdea} company={company} onClose={() => handleCloseIdea()} />
            <DeleteIdeaModal onClose={() => handleCloseIdea()} />
            <InfoModal
              show={openInfoModal}
              cancelOnClick={() => {
                setOpenInfoModal(false);
              }}
              onClose={() => setOpenInfoModal(false)}
              icon={<Email className="w-6 h-6 icon-indigo" />}
              title="The idea you are trying to access is private or does not exist"
              onConfirm={() => {
                setOpenInfoModal(false);
              }}
              confirmColor="indigo"
              confirmText="OK"
            />
          </>
        )}
      </Layout>
    </>
  );
}
