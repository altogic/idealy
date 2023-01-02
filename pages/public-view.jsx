import FilterIdea from '@/components/Idea/FilterIdea';
import IdeaDetail from '@/components/Idea/IdeaDetail';
import SubmitIdea from '@/components/Idea/SubmitIdea';
import InfiniteScroll from '@/components/InfiniteScroll';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { Listbox, Transition } from '@headlessui/react';
import { IDEA_SORT_TYPES } from 'constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const topics = [
  { name: 'Development' },
  { name: 'Bug' },
  { name: 'Design' },
  { name: 'Misc' },
  { name: 'Integrations' },
  { name: 'Coding' }
];

const statuss = [
  { name: 'Under Consideration' },
  { name: 'Planned' },
  { name: 'In Development' },
  { name: 'Shipped' },
  { name: 'Complete' },
  { name: 'Closed' }
];

export default function PublicView() {
  const [page, setPage] = useState(1);
  const [isTopics, setIsTopics] = useState([topics[0], topics[1]]);
  const [isStatuss, setIsStatuss] = useState([statuss[0], statuss[1]]);
  const [selectedIdea, setSelectedIdea] = useState();
  const [sortQuery, setSortQuery] = useState();
  const [isFiltered, setIsFiltered] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const ideas = useSelector((state) => state.idea.ideas);
  const countInfo = useSelector((state) => state.idea.countInfo);
  const ideaVotes = useSelector((state) => state.idea.ideaVotes);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const feedbackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);

  const getIdeasByCompany = useCallback(() => {
    const { sort } = router.query;
    const req = {
      subdomain: window.location.hostname.split('.')[0],
      limit: 10,
      page
    };
    if (sort) {
      req.sort = sortQuery;
      req.type = 'sort';
    }
    if (!user && !company?.role) {
      req.filter =
        'this.isArchived == false && this.isPrivate == false && this.isCompleted == false &&';
    }
    if (!ideas.length) {
      dispatch(ideaActions.getIdeasByCompany(req));
    }
  }, [page, sortQuery]);
  useEffect(() => {
    if (!ideas || !selectedIdea) {
      return;
    }
    const idea = ideas.find((i) => i.id === selectedIdea.id);
    if (!idea) {
      return;
    }
    setSelectedIdea(idea);
  }, [ideas]);
  useEffect(() => {
    if (router) {
      const { sort } = router.query;
      const { idea } = router.query;

      if (sort) {
        const sortType = IDEA_SORT_TYPES.find((s) => s.url === sort);
        setSortQuery(sortType?.query);
        setIsFiltered(sortType);
      } else {
        setIsFiltered(IDEA_SORT_TYPES[2]);
        setSortQuery(IDEA_SORT_TYPES[2].query);
      }

      if (idea) {
        const ideaDetail = ideas.find((i) => i._id === idea);
        if (ideaDetail) {
          setSelectedIdea(ideaDetail);
          dispatch(toggleFeedBackDetailModal());
        }
      }
    }
  }, [router, ideas]);

  useEffect(() => {
    if (sortQuery) {
      getIdeasByCompany();
    }
  }, [page, sortQuery]);

  const isSubmitIdeaVisible = useRegisteredUserValidation('submitIdea');

  useEffect(() => {
    if (company) {
      if (!company.privacy.isPublic && !company.privacy.isPublic.userApproval) {
        router.push('/404');
      }
    }
  }, [company]);
  useEffect(() => {
    const isModalOpen = feedBackDetailModal || feedbackSubmitModal;
    if (!isModalOpen) {
      setSelectedIdea();
      dispatch(ideaActions.clearSimilarIdeas());
    }
  }, [feedBackDetailModal, feedbackSubmitModal]);

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
            <div className="flex-shrink-0 w-[195px]">
              <FilterIdea isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
            </div>
            <div className="flex items-center gap-4">
              <Listbox value={isTopics} onChange={setIsTopics} multiple>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-w-[160px] inline-flex bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
                    <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
                      Topics{' '}
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                        5
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {company?.topics.map((item) => (
                        <Listbox.Option
                          key={item.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                              active
                                ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                                : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                            }`
                          }
                          value={item}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                                    : 'font-normal'
                                }`}>
                                {item.name}
                              </span>
                              {selected ? (
                                <span className="flex items-center pl-3 text-indigo-700 dark:text-aa-200 purple:text-pt-200">
                                  <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                      stroke="currentColor"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Listbox value={isStatuss} onChange={setIsStatuss} multiple>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-w-[160px] inline-flex bg-white dark:bg-aa-800 purple:bg-pt-800 py-3.5 px-[14px] border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <FilterHamburger className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 mr-2" />
                    <span className="block text-gray-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm truncate">
                      Status{' '}
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-700 dark:bg-aa-600 purple:bg-pt-600 text-white dark:text-aa-200 rounded-full">
                        5
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-aa-200 purple:text-pt-200"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-aa-800 purple:bg-pt-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {company?.statuses.map((item) => (
                        <Listbox.Option
                          key={item.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 transition hover:text-slate-900 dark:hover:text-aa-100 purple:hover:text-pt-100 ${
                              active
                                ? 'bg-slate-100 dark:bg-aa-700 purple:bg-pt-700'
                                : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                            }`
                          }
                          value={item}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                                    : 'font-normal'
                                }`}>
                                {item.name}
                              </span>
                              {selected ? (
                                <span className="flex items-center pl-3 text-indigo-700 dark:text-aa-200 purple:text-pt-200">
                                  <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M16.6673 5L7.50065 14.1667L3.33398 10"
                                      stroke="currentColor"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
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
                    setSelectedIdea(idea);
                    dispatch(toggleFeedBackDetailModal());
                    router.push('/public-view', {
                      query: { idea: idea._id, sort: isFiltered?.url }
                    });
                  }}
                  voted={ideaVotes.some((vote) => vote.ideaId === idea._id)}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <IdeaDetail idea={selectedIdea} company={company} />
      </Layout>
    </>
  );
}
