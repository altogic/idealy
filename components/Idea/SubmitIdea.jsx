import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import { Plus } from '../icons';
import TopicBadges from '../TopicBadges';

export default function SubmitIdea() {
  const company = useSelector((state) => state.company.company);
  const [openSubmitFeedbackModal, setOpenSubmitFeedbackModal] = useState(false);
  return (
    <>
      <Button
        type="button"
        text="Submit Feedback"
        icon={<Plus className="w-5 h-5" />}
        variant="indigo"
        size="sm"
        onClick={() => setOpenSubmitFeedbackModal(!openSubmitFeedbackModal)}
      />
      <Transition.Root show={openSubmitFeedbackModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenSubmitFeedbackModal}>
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white p-14 shadow-xl">
                      {/* Close Button Submit Feedback Modal */}
                      <div className="absolute top-8 right-8 flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full h-full text-slate-500 rounded-md transition hover:bg-slate-100"
                          onClick={() => setOpenSubmitFeedbackModal(false)}>
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
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-slate-800 mb-8 text-xl font-semibold">
                            Tell us your Idea!
                          </Dialog.Title>
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <form action="">
                          <div className="mb-8">
                            <input
                              type="text"
                              name="feedback-title"
                              id="feedback-title"
                              placeholder="Feedback Title"
                              className="block w-full min-h-[44px] text-slate-500 text-base tracking-sm border border-gray-300 rounded-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <textarea
                              id="type-a-comment"
                              name="type-a-comment"
                              rows={10}
                              className="block w-full text-slate-500 text-base tracking-sm border border-gray-300 rounded-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Type a comment"
                            />
                          </div>
                          <div className="mt-8">
                            <span className="inline-block text-slate-600 mb-4 text-base tracking-sm">
                              Choose up to 3 Topics for this Idea (optional)
                            </span>
                            <div className="flex flex-wrap items-center gap-4">
                              {/* {feedbacksBadges.map((item) => (
          <label
            key={item.id}
            htmlFor={item.name}
            className={cn(
              feedbackBadges
                ? "bg-red-500"
                : "bg-slate-300"
            )}
          >
            <svg
              className="w-3 h-3 mr-1 text-gray-500 group-hover:text-indigo-500"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2V10M9 3L3 9M10 6H2M9 9L3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="checkbox"
              value={item.name}
              onChange={handleChange}
              id={item.name}
              name="topics"
            />
            Subscribe
          </label>
        ))} */}
                              {company?.topics.map((topic) => (
                                <TopicBadges key={topic._id} badgeName={topic.name} />
                              ))}
                            </div>
                          </div>
                          <hr className="my-8 border-slate-200" />
                          <div>
                            <form action="">
                              <div className="flex items-center gap-4 mb-4">
                                <span className="inline-block text-slate-600 text-base tracking-sm whitespace-nowrap">
                                  Your details
                                </span>
                                <input
                                  type="text"
                                  name="your-name"
                                  id="your-name"
                                  placeholder="Your name"
                                  className="block w-full min-h-[44px] text-slate-500 text-base tracking-sm border border-gray-300 rounded-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                  type="email"
                                  name="your-email"
                                  id="your-email"
                                  placeholder="Your email"
                                  className="block w-full min-h-[44px] text-slate-500 text-base tracking-sm border border-gray-300 rounded-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="privacy-policy"
                                    aria-describedby="privacy-policy"
                                    name="privacy-policy"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-2 text-sm">
                                  <label
                                    htmlFor="privacy-policy"
                                    className="text-slate-500 text-sm tracking-sm">
                                    I consent to my information being stored and used according to
                                    the Privacy Policy.
                                  </label>
                                </div>
                              </div>
                              <hr className="mt-8 mb-20" />
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className="flex items-center justify-center text-white py-3 px-4 text-sm font-medium tracking-sm border border-transparent rounded-lg bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Submit Feedback
                                </button>
                              </div>
                            </form>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
