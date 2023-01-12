import React, { Fragment, useState } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import { Dialog, Transition } from '@headlessui/react';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DeleteModal from '@/components/DeleteModal';
import { Plus, Email, Danger } from '@/components/icons';

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

export default function PublicViewNormalUserSettings() {
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [openSubmitFeedbackModal, setOpenSubmitFeedbackModal] = useState(false);
  const [badgeSelected, setBadgeSelected] = useState(false);

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Public View</title>
        <meta name="description" content="Altogic Canny Alternative Public View" />
      </Head>
      <Layout>
        <div className="max-w-screen-lg mx-auto my-14">
          <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-200">
            <SectionTitle
              sectionTitle="Profile Settings"
              sectionDescription="Manage your personal account settings."
              big
            />
            <Button
              type="button"
              text="Submit Feedback"
              icon={<Plus className="w-5 h-5" />}
              variant="indigo"
              size="sm"
              onClick={() => setOpenSubmitFeedbackModal(!openSubmitFeedbackModal)}
            />
          </div>
          <div className="grid grid-cols-2 mb-24">
            <div className="pr-8 pt-16 border-r border-slate-200">
              <div className="pb-6 border-b border-slate-200">
                <SectionTitle
                  sectionTitle="Personal Information"
                  sectionDescription="Update your name and email details here."
                />
              </div>
              <form className="mt-6 space-y-6">
                <Input label="Name" type="text" name="name" id="name" placeholder="Ashley Gollos" />
                <Input
                  label="Email address"
                  type="email"
                  name="email"
                  id="email"
                  icon={<Email className="w-5 h-5 text-slate-500" />}
                  placeholder="ashley.gollos@gmail.com"
                />
                <div className="flex items-center justify-end gap-3 pt-8 border-t border-slate-200">
                  <Button type="button" text="Cancel" variant="blank" size="sm" />
                  <Button type="button" text="Update Information" variant="indigo" size="sm" />
                </div>
              </form>
            </div>
            <div className="pl-8 pt-16">
              <div className="pb-6 border-b border-slate-200">
                <SectionTitle
                  sectionTitle="Password"
                  sectionDescription="Please enter your current password to change your password."
                />
              </div>
              <form className="mt-6 space-y-6">
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="New password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder="Confirm new password"
                />
                <div className="flex items-center justify-end gap-3 pt-8 border-t border-slate-200">
                  <Button type="button" text="Cancel" variant="blank" size="sm" />
                  <Button type="button" text="Update Password" variant="indigo" size="sm" />
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 bg-slate-50 p-6 rounded-lg">
            <div>
              <SectionTitle
                sectionTitle="Delete my profile"
                sectionDescription="You can delete all your user profile data."
              />
            </div>
            <Button
              type="button"
              text="Delete profile"
              variant="red"
              onClick={() => setDeleteProfile(!deleteProfile)}
            />
            {/* Submit Feedback */}
            <Transition.Root show={openSubmitFeedbackModal} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={setOpenSubmitFeedbackModal}>
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
                                          I consent to my information being stored and used
                                          according to the Privacy Policy.
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
            {/* Delete Modal */}
            <DeleteModal
              show={deleteProfile}
              onClose={() => setDeleteProfile(!deleteProfile)}
              cancelOnClick={() => setDeleteProfile(!deleteProfile)}
              deleteOnClick={() => setDeleteProfile(!deleteProfile)}
              icon={<Danger className="w-6 h-6 text-red-600" />}
              title="Delete profile"
              description="Are you sure you want to delete this company? This action cannot be undone."
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
