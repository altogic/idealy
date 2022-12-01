import { Fragment, useState } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import Layout from '@/components/Layout';
import PublicViewCard from '@/components/PublicViewCard';
import TopicBadges from '@/components/TopicBadges';
import CommentCard from '@/components/CommentCard';
import Button from '@/components/Button';
import { Plus, UpDown } from '@/components/icons';

const filter = [
  { name: 'Trending' },
  { name: 'Top' },
  { name: 'Newest' },
  { name: 'Status Changed' }
];

const feedbacks = [
  {
    id: 0,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 1,
    user: 'Olivia Rhye',
    date: 'June 29'
  },
  {
    id: 1,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 2,
    user: 'Olivia Rhye',
    date: 'June 29'
  },
  {
    id: 2,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 3,
    user: 'Olivia Rhye',
    date: 'June 29'
  },
  {
    id: 3,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 4,
    user: 'Olivia Rhye',
    date: 'June 29'
  },
  {
    id: 4,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 5,
    user: 'Olivia Rhye',
    date: 'June 29'
  },
  {
    id: 5,
    title: 'Logo bigger',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu scelerisque pellentesque posuere neque integer mauris. Eget sit nulla id sit urna velit. Eu sed elit mauris, semper viverra molestie orci vitae. Senectus sem et nullam...',
    status: 6,
    user: 'Olivia Rhye',
    date: 'June 29'
  }
];

const feedbacksBadges = [
  {
    id: 0,
    name: 'Development'
  },
  {
    id: 1,
    name: 'Bug'
  },
  {
    id: 2,
    name: 'Design'
  },
  {
    id: 3,
    name: 'New Feature'
  },
  {
    id: 4,
    name: 'Misc'
  },
  {
    id: 5,
    name: 'Integrations'
  },
  {
    id: 6,
    name: 'Coding'
  }
];

export default function PublicView() {
  const [isFiltered, setIsFiltered] = useState(filter[0]);
  const [openSubmitFeedbackModal, setOpenSubmitFeedbackModal] = useState(false);
  const [openDetailFeedbackModal, setOpenDetailFeedbackModal] = useState(false);
  const [badgeSelected, setBadgeSelected] = useState(false);
  // const handleChange = (event) => {
  //   if (event.target.checked) {
  //     setFeedbackBadges(true);
  //   } else {
  //     setFeedbackBadges(false);
  //   }
  //   // setFeedbackBadges((current) => !current);
  // };

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
              <h1 className="text-slate-800 mb-2 text-3xl font-semibold">Feature Ideas</h1>
              <p className="text-slate-600 text-base tracking-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
            <Button
              type="button"
              text="Submit Feedback"
              icon={<Plus className="w-5 h-5" />}
              variant="indigo"
              size="sm"
              onClick={() => setOpenSubmitFeedbackModal(!openSubmitFeedbackModal)}
            />
          </div>
          <div>
            <div className="mb-9">
              <Listbox value={isFiltered} onChange={setIsFiltered}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full inline-flex max-w-[195px] bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <UpDown className="w-5 h-5 text-slate-500 mr-2" />
                    <span className="block text-slate-800 truncate">{isFiltered.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-slate-500"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 max-w-[195px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filter.map((item) => (
                        <Listbox.Option
                          key={item.name}
                          className={({ active }) =>
                            `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                              active ? 'bg-slate-100' : 'text-slate-900'
                            }`
                          }
                          value={item}>
                          {({ isFiltered }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  isFiltered ? 'font-medium' : 'font-normal'
                                }`}>
                                {item.name}
                              </span>
                              {isFiltered ? (
                                <span className="flex items-center pl-3 text-indigo-700">
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
            <div>
              {feedbacks.map((feedback) => (
                <a
                  href="#"
                  key={feedback.id}
                  onClick={() => setOpenDetailFeedbackModal(!openDetailFeedbackModal)}
                  className="inline-block w-full py-6 border-b border-slate-200 last:border-0 first:pt-0">
                  <PublicViewCard
                    description={feedback.description}
                    title={feedback.title}
                    user={feedback.user}
                    date={feedback.date}
                    status={feedback.status}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Card Detail */}
        <Transition.Root show={openDetailFeedbackModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpenDetailFeedbackModal}>
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
                            onClick={() => setOpenDetailFeedbackModal(false)}>
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
                                  Logo bigger
                                </h2>
                              </div>
                              <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
                                <p>
                                  Id fringilla lacus cras fringilla blandit. Justo, a tincidunt quis
                                  nec. Quis luctus pellentesque vel, nec sed risus nunc ultricies.
                                  Dignissim aenean in mauris integer posuere at odio interdum. Eget
                                  egestas condimentum justo, adipiscing congue arcu. Pellentesque
                                  tellus ultrices quam quis ultricies. Nam dignissim quisque vivamus
                                  tellus in elit mollis dolor sit. Habitant morbi volutpat
                                  consectetur sit dignissim ipsum pretium quis felis. Maecenas
                                  suspendisse ullamcorper sed a ipsum aenean amet. At lectus amet,
                                  aliquam volutpat nisl.
                                </p>
                                <p>
                                  Feugiat donec aliquam suspendisse dictum fringilla semper.
                                  Venenatis feugiat aenean risus nunc tortor auctor sed. Dolor, eget
                                  varius elit sit sed donec pharetra, blandit. At imperdiet sed urna
                                  tellus molestie pharetra lectus. Faucibus pharetra commodo,
                                  malesuada quis venenatis, dui. A, eget eget magna et lacinia.
                                  Euismod id ipsum in tellus. Auctor eu pulvinar aliquam pharetra.
                                  Donec arcu tortor vitae vitae fusce blandit. Nullam integer netus
                                  quam consectetur nec urna non maecenas tempor.
                                </p>
                                <p>
                                  Diam ultrices mauris vitae ut nunc, sodales. Magnis ut amet odio
                                  at porttitor. At gravida pretium pharetra fames commodo tristique
                                  tortor non, a. Elit at sapien egestas odio etiam. Venenatis
                                  egestas cursus elit sollicitudin mattis et ipsum. Vivamus
                                  tincidunt ut pellentesque pharetra ut. Nullam enim in lectus
                                  tincidunt mauris orci leo. Vestibulum ornare ut hendrerit
                                  adipiscing curabitur id mauris. Viverra egestas tincidunt fusce
                                  pulvinar vestibulum. Consequat.
                                </p>
                              </div>
                              <div className="mt-6 mb-16">
                                <div className="flex items-center gap-3 mb-6">
                                  {/* User */}
                                  <span className="text-slate-700 text-sm font-medium tracking-sm">
                                    Olivia Rhye
                                  </span>
                                  <svg
                                    className="h-1 w-1 text-slate-500"
                                    fill="currentColor"
                                    viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={3} />
                                  </svg>
                                  {/* Date */}
                                  <span className="text-slate-500 text-sm tracking-sm">
                                    June 29
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
                                    <span className="text-slate-500 text-sm tracking-sm">
                                      Topics
                                    </span>
                                    <svg
                                      className="h-1 w-1 text-slate-500"
                                      fill="currentColor"
                                      viewBox="0 0 8 8">
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    <div className="flex items-center gap-2">
                                      <TopicBadges badgeName="Bug" />
                                      <TopicBadges badgeName="Development" />
                                      <TopicBadges badgeName="Design" />
                                    </div>
                                  </div>
                                  {/* Feedback Detail Status Badge */}
                                  <button
                                    type="button"
                                    className="inline-flex items-center bg-red-100 text-red-800 rounded-full px-3 py-0.5 text-xs font-medium">
                                    <svg
                                      className="-ml-1 mr-1.5 h-2 w-2 text-red-800"
                                      fill="currentColor"
                                      viewBox="0 0 8 8">
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    Under Consideration
                                  </button>
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
        {/* Submit Feedback */}
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
                                {feedbacksBadges.map((feedbacksBadge, index) => (
                                  <button
                                    key={feedbacksBadge.id}
                                    type="button"
                                    className={cn(
                                      `group inline-flex items-center rounded-full bg-gray-100 py-0.5 px-2 text-xs font-medium transition cursor-pointer`,
                                      badgeSelected === index
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                                    )}>
                                    <svg
                                      className={cn(
                                        `w-3 h-3 mr-1`,
                                        badgeSelected === index
                                          ? 'text-indigo-100'
                                          : 'text-gray-500 group-hover:text-indigo-500'
                                      )}
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M6 2V10M9 3L3 9M10 6H2M9 9L3 3"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    {feedbacksBadge.name}
                                    {badgeSelected && (
                                      <svg
                                        onClick={() => setBadgeSelected(false)}
                                        className="w-3 h-3 text-indigo-300 ml-1"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          d="M9 3L3 9M3 3L9 9"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}
                                  </button>
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
      </Layout>
    </>
  );
}
