import CommentCard from '@/components/CommentCard';
import StatusButton from '@/components/StatusButton';
import TopicBadges from '@/components/TopicBadges';
import { Dialog, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';

export default function IdeaDetail({ open, setOpen, idea }) {
  return (
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
                <Dialog.Panel className="pointer-events-auto max-w-screen-lg w-screen">
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
                        <div>Counter</div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-full bg-orange-50 py-1 px-2 text-xs font-medium text-orange-700">
                              <svg
                                className="w-3 h-3 mr-1 text-orange-500"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1380_17979)">
                                  <path
                                    d="M4.1878 7.80821L1.35938 10.6366M5.84665 3.32097L5.0662 4.10141C5.00254 4.16507 4.97071 4.1969 4.93444 4.2222C4.90225 4.24465 4.86753 4.26323 4.831 4.27756C4.78983 4.29371 4.74569 4.30253 4.65741 4.32019L2.82518 4.68664C2.34903 4.78187 2.11095 4.82948 1.99957 4.95501C1.90254 5.06436 1.85823 5.21071 1.8783 5.35552C1.90135 5.52175 2.07303 5.69343 2.41639 6.03679L5.95925 9.57966C6.30261 9.92301 6.47429 10.0947 6.64052 10.1177C6.78533 10.1378 6.93168 10.0935 7.04103 9.99647C7.16656 9.88509 7.21417 9.64701 7.3094 9.17086L7.67585 7.33863C7.69351 7.25035 7.70234 7.20621 7.71848 7.16504C7.73281 7.12851 7.75139 7.09379 7.77384 7.0616C7.79914 7.02533 7.83097 6.9935 7.89463 6.92984L8.67507 6.1494C8.71578 6.10869 8.73613 6.08834 8.7585 6.07057C8.77837 6.05479 8.79942 6.04054 8.82145 6.02795C8.84626 6.01378 8.87271 6.00244 8.92562 5.97976L10.1728 5.44526C10.5367 5.28932 10.7186 5.21136 10.8012 5.08536C10.8735 4.97519 10.8993 4.84094 10.8732 4.7118C10.8432 4.56413 10.7033 4.42417 10.4234 4.14426L7.85178 1.57269C7.57187 1.29278 7.43191 1.15282 7.28424 1.12288C7.1551 1.09671 7.02086 1.12256 6.91068 1.19483C6.78469 1.27746 6.70672 1.45939 6.55078 1.82324L6.01628 3.07042C5.9936 3.12333 5.98226 3.14978 5.96809 3.17459C5.9555 3.19662 5.94125 3.21767 5.92547 3.23754C5.9077 3.25991 5.88735 3.28027 5.84665 3.32097Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1380_17979">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              Pinned
                            </span>
                            <h2 className="text-slate-800 text-xl font-semibold tracking-md">
                              {idea?.title}
                            </h2>
                          </div>
                          <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
                            <p>{idea?.content}</p>
                          </div>
                          <div className="mt-6 mb-16">
                            <div className="flex items-center gap-3 mb-6">
                              {/* User */}
                              <span className="text-slate-700 text-sm font-medium tracking-sm">
                                {idea?.author.name}
                              </span>
                              <svg
                                className="h-1 w-1 text-slate-500"
                                fill="currentColor"
                                viewBox="0 0 8 8">
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              {/* Date */}
                              <span className="text-slate-500 text-sm tracking-sm">
                                {DateTime.fromISO(idea?.createdAt).setLocale('en').toLocaleString({
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
                              <StatusButton name={idea?.status.name} color={idea?.status.color} />
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
  );
}
