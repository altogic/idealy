import CommentCard from '@/components/CommentCard';
import StatusButton from '@/components/StatusButton';
import TopicBadges from '@/components/TopicBadges';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { Dialog, Disclosure, RadioGroup, Switch, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../DeleteModal';
import { Archive, Bug, ChevronUp, CircleCheck, Danger, Eye, Pen, Thumbtack, Trash } from '../icons';

export default function IdeaDetail({ open, setOpen, idea, company, setOpenSubmitFeedbackModal }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState();
  const [isPrivate, setIsPrivate] = useState();
  const [isPinned, setIsPinned] = useState();
  const [isArchived, setIsArchived] = useState();
  const [isBug, setIsBug] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const updateIdea = (req) => {
    dispatch(
      ideaActions.updateIdea({
        _id: idea._id,
        ...req
      })
    );
  };

  useEffect(() => {
    if (idea) {
      setSelectedStatus(idea.status);
      setIsPrivate(idea.isPrivate);
      setIsPinned(idea.isPinned);
      setIsArchived(idea.isArchived);
      setIsBug(idea.isBug);
    }
  }, [idea]);
  const handleDelete = () => {
    dispatch(ideaActions.deleteIdea(idea._id));
    setOpen(false);
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                  <Dialog.Panel className="pointer-events-auto max-w-screen-lg w-screen flex">
                    {user && (company?.role === 'Owner' || company?.role === 'Admin') && (
                      <div className="flex-shrink-0 w-72 bg-gray-50 border-r-2 border-gray-200">
                        <div className="flex flex-col h-full">
                          <div className="flex-shrink-0 px-4 py-6 bg-white border-b-2 border-gray-200">
                            <div className="flex items-center">
                              <h2 className="text-lg font-medium text-slate-900 dark:text-aa-200 purple:text-pt-200">
                                Admin
                              </h2>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col overflow-y-scroll p-4">
                            <Disclosure className="">
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                                    <span>Statuses</span>
                                    <ChevronUp
                                      className={`${
                                        open ? 'rotate-180 transform' : ''
                                      } h-5 w-5 text-slate-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-500">
                                    <div className="flex flex-col gap-4">
                                      <RadioGroup
                                        value={selectedStatus}
                                        onChange={(status) => {
                                          updateIdea({
                                            status: status._id,
                                            statusUpdatedAt: Date.now()
                                          });
                                          setSelectedStatus(status);
                                        }}>
                                        <RadioGroup.Label className="sr-only">
                                          Server size
                                        </RadioGroup.Label>
                                        <div className="space-y-2">
                                          {company?.statuses.map((status) => (
                                            <RadioGroup.Option
                                              key={status._id}
                                              value={status}
                                              className={({ active, checked }) => `${
                                                active || selectedStatus?._id === status._id
                                                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300'
                                                  : ''
                                              }
                                        ${
                                          checked || selectedStatus?._id === status._id
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-white'
                                        } relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none`}>
                                              {({ checked }) => (
                                                <div className="flex w-full items-center justify-between">
                                                  <div className="flex items-center">
                                                    <div className="text-sm">
                                                      <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                          checked ||
                                                          selectedStatus?._id === status._id
                                                            ? 'text-white'
                                                            : 'text-gray-900'
                                                        }`}>
                                                        {status.name}
                                                      </RadioGroup.Label>
                                                    </div>
                                                  </div>
                                                  {(checked ||
                                                    selectedStatus?._id === status._id) && (
                                                    <div className="shrink-0 text-white">
                                                      <CircleCheck className="h-6 w-6" />
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </RadioGroup.Option>
                                          ))}
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button>
                                    <div className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
                                      <span>Visibility</span>
                                      <ChevronUp
                                        className={`${
                                          open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-slate-500`}
                                      />
                                    </div>
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-500">
                                    <div className="flex justify-between gap-4">
                                      <span className="text-xs font-medium text-gray-900">
                                        Make {isPrivate ? 'Public' : 'Private'}
                                      </span>
                                      <Switch
                                        checked={isPrivate}
                                        onChange={() => {
                                          updateIdea({ isPrivate: !isPrivate });
                                          setIsPrivate(!isPrivate);
                                        }}
                                        className={`${
                                          isPrivate ? 'bg-indigo-600' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full`}>
                                        <span className="sr-only">Make Private</span>
                                        <span
                                          className={`${
                                            isPrivate ? 'translate-x-6' : 'translate-x-1'
                                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                        />
                                      </Switch>
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                          <div className="flex p-4 sm:px-8">
                            <div className="flex flex-col space-y-2">
                              <p className="text-0.75 font-semibold text-text-medium">Actions</p>
                              <div className="flex w-full flex-row space-x-2">
                                <div className="inline-flex relative">
                                  <button
                                    type="button"
                                    className="flex p-2 rounded border border-slate-400">
                                    <Thumbtack
                                      className={`w-4 h-4 hover:text-orange-500 ${
                                        isPinned ? 'text-orange-500' : 'text-slate-500'
                                      }`}
                                      onClick={() => {
                                        updateIdea({ isPinned: !isPinned });
                                        setIsPinned(!isPinned);
                                      }}
                                    />
                                  </button>
                                </div>
                                <div className="inline-flex relative">
                                  <button
                                    type="button"
                                    className="flex p-2 rounded border border-slate-400"
                                    onClick={() => {
                                      updateIdea({ isArchived: !isArchived });
                                      setIsArchived(!isArchived);
                                    }}>
                                    <Archive
                                      className={`w-4 h-4 hover:text-yellow-500 ${
                                        isArchived ? 'text-yellow-500' : 'text-slate-500'
                                      }`}
                                    />
                                  </button>
                                </div>
                                <div className="inline-flex relative">
                                  <button
                                    type="button"
                                    className="flex p-2 rounded border border-slate-400"
                                    onClick={() => {
                                      updateIdea({ isBug: !isBug });
                                      setIsBug(!isBug);
                                    }}>
                                    <Bug
                                      className={`w-4 h-4 hover:text-red-500 ${
                                        isBug ? 'text-red-500' : 'text-slate-500'
                                      }`}
                                    />
                                  </button>
                                </div>
                                <div className="inline-flex relative">
                                  <button
                                    type="button"
                                    className="flex p-2 rounded border border-slate-400"
                                    onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
                                    <Trash className="w-4 h-4 hover:text-red-500" />
                                  </button>
                                </div>
                                <div className="inline-flex relative">
                                  <button
                                    type="button"
                                    className="flex p-2 rounded border border-slate-400"
                                    onClick={() => {
                                      setOpen(false);
                                      setOpenSubmitFeedbackModal(true);
                                    }}>
                                    <Pen className="w-4 h-4 hover:text-indigo-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex h-full flex-col overflow-y-scroll bg-white p-8">
                      {/* Close Button Submit Feedback Modal */}
                      <div className="absolute top-8 right-8 flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full h-full text-slate-500 rounded-md transition hover:bg-slate-100"
                          onClick={() => setOpen(false)}>
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
                            <div className="flex items-center gap-2 mb-2">
                              <h2 className="text-slate-800 text-xl font-semibold tracking-md">
                                {idea?.title}
                              </h2>
                              {isPinned && (
                                <span className="inline-flex items-center rounded-full bg-orange-50 py-1 px-2 text-xs font-medium text-orange-700">
                                  <Thumbtack className="w-3 h-3 mr-1 text-orange-500" />
                                  Pinned
                                </span>
                              )}
                              {isArchived && (
                                <span className="inline-flex items-center rounded-full bg-yellow-50 py-1 px-2 text-xs font-medium text-yellow-700">
                                  <Archive className="w-3 h-3 mr-1 text-yellow-500" />
                                  Archived
                                </span>
                              )}
                              {isPrivate && (
                                <span className="inline-flex items-center rounded-full bg-blue-50 py-1 px-2 text-xs font-medium text-blue-700">
                                  <Eye className="w-3 h-3 mr-1 text-blue-500" />
                                  Private
                                </span>
                              )}
                              {isBug && (
                                <span className="inline-flex items-center rounded-full bg-red-50 py-1 px-2 text-xs font-medium text-red-700">
                                  <Bug className="w-3 h-3 mr-1 text-red-500" />
                                  Bug
                                </span>
                              )}
                            </div>
                            <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
                              <p>{idea?.content}</p>
                            </div>
                            <div className="mt-6 mb-16">
                              <div className="flex items-center gap-3 mb-6">
                                {/* User */}
                                <span className="text-slate-700 text-sm font-medium tracking-sm">
                                  {idea?.author
                                    ? idea?.author.name
                                    : idea?.guestName
                                    ? idea?.guestName
                                    : 'Anonymous'}
                                </span>
                                <svg
                                  className="h-1 w-1 text-slate-500"
                                  fill="currentColor"
                                  viewBox="0 0 8 8">
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                                {/* Date */}
                                <span className="text-slate-500 text-sm tracking-sm">
                                  {DateTime.fromISO(idea?.createdAt)
                                    .setLocale('en')
                                    .toLocaleString({
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                </span>
                                <svg
                                  className="h-1 w-1 text-slate-500"
                                  fill="currentColor"
                                  viewBox="0 0 8 8">
                                  <circle cx={4} cy={4} r={3} />
                                </svg>
                                <div className="flex items-center gap-2">
                                  <div className="isolate flex -space-x-1 overflow-hidden">
                                    <img
                                      className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    <img
                                      className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    <img
                                      className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    <img
                                      className="relative z-0 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <span className="text-slate-500 text-sm tracking-sm">+45</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                {/* Feedback Detail Topic Badges */}
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500 text-sm tracking-sm">Topics</span>
                                  <svg
                                    className="h-1 w-1 text-slate-500"
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
                                <StatusButton
                                  name={selectedStatus?.name}
                                  color={selectedStatus?.color}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Card Detail Bottom */}
                        <div>
                          {/* Comment Card */}
                          <CommentCard
                            nameFirstLetter="O"
                            userName="Olivia Rhye"
                            timeAgo="3 days ago"
                          />
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
      <DeleteModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        cancelOnClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        deleteOnClick={handleDelete}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Idea"
        description="Are you sure you want to delete this idea? This action cannot be undone."
      />
    </>
  );
}
