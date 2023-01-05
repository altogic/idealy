import CommentCard from '@/components/CommentCard';
import ImageList from '@/components/ImageList';
import StatusButton from '@/components/StatusButton';
import TopicBadges from '@/components/TopicBadges';
import { commentActions } from '@/redux/comments/commentsSlice';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { Dialog, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../CommentForm';
import { Archive, Bug, Eye, Thumbtack } from '../icons';
import IdeaDetailAdmin from './IdeaDetailAdmin';

export default function IdeaDetail({ idea, company }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.comments.comments);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const [routerQuery, setRouterQuery] = useState();

  useEffect(() => {
    if (router.isReady && feedBackDetailModal) {
      setRouterQuery(router.query);
      dispatch(commentActions.getComments(router.query.feedback));
    }
  }, [router.isReady]);

  function handleClose() {
    delete routerQuery?.feedback;
    router.push({
      pathname: router.pathname,
      query: routerQuery
    });

    dispatch(toggleFeedBackDetailModal());
    setSelectedStatus(null);
  }
  return (
    <Transition.Root show={feedBackDetailModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto max-w-screen-lg w-screen flex bg-white">
                  {user && (company?.role === 'Owner' || company?.role === 'Admin') && (
                    <IdeaDetailAdmin idea={idea} setSelectedStatus={setSelectedStatus} />
                  )}
                  <div className="flex w-full h-full flex-col bg-white dark:bg-aa-900 purple:bg-pt-1000 p-8 overflow-y-auto">
                    {/* Close Button Submit Feedback Modal */}
                    <div className="absolute top-8 right-8 flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-full h-full text-slate-500 rounded-md transition hover:bg-slate-100"
                        onClick={handleClose}>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true">
                          <path
                            d="M17 1L1 17M1 1L17 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      {/* Card Detail Top */}
                      <div className="flex gap-6 p-6">
                        <div>
                          <div className="flex flex-col gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {idea?.isPinned && (
                                <span className="inline-flex items-center rounded-full bg-orange-50 py-1 px-2 text-xs font-medium text-orange-700">
                                  <Thumbtack className="w-3 h-3 mr-1 text-orange-500" />
                                  Pinned
                                </span>
                              )}
                              {idea?.isArchived && (
                                <span className="inline-flex items-center rounded-full bg-yellow-50 py-1 px-2 text-xs font-medium text-yellow-700">
                                  <Archive className="w-3 h-3 mr-1 text-yellow-500" />
                                  Archived
                                </span>
                              )}
                              {idea?.isPrivate && (
                                <span className="inline-flex items-center rounded-full bg-blue-50 py-1 px-2 text-xs font-medium text-blue-700">
                                  <Eye className="w-3 h-3 mr-1 text-blue-500" />
                                  Private
                                </span>
                              )}
                              {idea?.isBug && (
                                <span className="inline-flex items-center rounded-full bg-red-50 py-1 px-2 text-xs font-medium text-red-700">
                                  <Bug className="w-3 h-3 mr-1 text-red-500" />
                                  Bug
                                </span>
                              )}
                            </div>
                            <h2 className="text-slate-800 dark:text-aa-300 purple:text-pt-300 text-xl font-semibold tracking-md">
                              {idea?.title}
                            </h2>
                          </div>
                          <div className="prose prose-p:text-slate-500 dark:prose-p:text-aa-400 purple:prose-p:text-pt-400 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
                            <p dangerouslySetInnerHTML={{ __html: idea?.content }} />
                          </div>
                          <div className="mt-6 mb-16">
                            <div className="flex items-center gap-3 mb-6">
                              {/* User */}
                              <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
                                {idea?.author
                                  ? idea?.author.name
                                  : idea?.guestName
                                  ? idea?.guestName
                                  : 'Anonymous'}
                              </span>
                              <svg
                                className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                                fill="currentColor"
                                viewBox="0 0 8 8">
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              {/* Date */}
                              <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
                                {DateTime.fromISO(idea?.createdAt).setLocale('en').toLocaleString({
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <svg
                                className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                                fill="currentColor"
                                viewBox="0 0 8 8">
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              {/* <div className="flex items-center gap-2">
                              // Todo: Add Recent Users
                                <div className="isolate flex -space-x-1 overflow-hidden">
                                  {idea?.recentUsers?.map((user) => (
                                    <Avatar
                                      key={user}
                                      src={user?.profilePicture}
                                      alt={user?.name}
                                      size="w-7 h-7"
                                      fontSize="text-xs"
                                    />
                                  ))}
                                </div>
                                <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
                                  +45
                                </span>
                              </div> */}
                              {/* <svg
                                className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                                fill="currentColor"
                                viewBox="0 0 8 8">
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              <button
                                type="button"
                                className="text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
                                Add a voter
                              </button> */}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              {/* Feedback Detail Topic Badges */}
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                                  Topics
                                </span>
                                <svg
                                  className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                                  fill="currentColor"
                                  viewBox="0 0 8 8">
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                                <div className="flex items-center gap-2">
                                  {idea?.topics.map((topic) => (
                                    <TopicBadges key={topic} badgeName={topic} />
                                  ))}
                                </div>
                              </div>
                              {/* Feedback Detail Status Badge */}
                              {selectedStatus && (
                                <StatusButton
                                  name={selectedStatus?.name}
                                  color={selectedStatus?.color}
                                />
                              )}
                            </div>
                          </div>
                          <ImageList images={idea?.images} isPreview />
                        </div>
                      </div>
                      {/* Card Detail Bottom */}
                      <div>
                        {/* Comment Card */}
                        <CommentForm ideaId={idea?._id} company={company} />
                        {comments?.length > 0 &&
                          comments?.map((comment) => (
                            <CommentCard key={comment._id} comment={comment} />
                          ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
