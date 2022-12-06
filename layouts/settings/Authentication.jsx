import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import SectionTitle from '@/components/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import { AUTHENTICATION_METHOD, IDEAS_PERMISSION_TYPE } from 'constants';

export default function Authentication() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);

  const [authenticationSelected, setAuthenticationSelected] = useState(company.authentication.type);
  const [submitIdeasSelected, setSubmitIdeasSelected] = useState(
    company.authentication.submitIdeas
  );
  const [commentsSelected, setCommentsSelected] = useState(company.authentication.commentIdea);
  const [votingSelected, setVotingSelected] = useState(company.authentication.voteIdea);
  const [announcementsReactionsSelected, setAnnouncementsReactionsSelected] = useState(
    company.authentication.announcementReaction
  );

  const updateCompanyAuthentication = (fieldName, value) => {
    dispatch(
      companyActions.updateCompanyProperties({
        id: company.authentication._id,
        property: 'authentication',
        fieldName,
        value
      })
    );
  };
  const setAuthenticationDescription = (value) => {
    switch (value) {
      case 'Registered Users':
        return (
          <>
            Users must sign up to your app with{' '}
            <strong className="text-slate-700">name, email and password.</strong> Once authenticated
            they will be able to add Ideas, comments and vote.
          </>
        );
      case 'Guest Authentication':
        return (
          <>
            Users can add Ideas, comments and vote, without signing up. Guests must leave a{' '}
            <strong className="text-slate-700">name and email.</strong>
          </>
        );
      case 'Anonymous':
        return (
          <>
            Users can add Ideas, comments and vote, without signing up. Guests are{' '}
            <strong className="text-slate-700">not required to leave any details.</strong>
          </>
        );
      case 'Custom':
        return (
          <>
            Users may sign up to your app with{' '}
            <strong className="text-slate-700">name, email and password.</strong> Change the
            settings below to customize how they can interact with each section of your app.
          </>
        );
      default:
        return 'Users can sign up and sign in using their email address.';
    }
  };
  return (
    <div>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Authentication"
          sectionDescription="Manage authentication for your web app and widget."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="divide-y divide-slate-200">
          <div className="pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <SectionTitle sectionTitle="Authentication method" />
              <Listbox
                value={authenticationSelected}
                onChange={(selected) => {
                  setAuthenticationSelected(selected);
                  updateCompanyAuthentication('type', selected);
                }}>
                <div className="relative">
                  <Listbox.Button className="relative w-full md:w-[220px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block text-gray-500 text-sm tracking-sm truncate">
                      {authenticationSelected}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full md:w-[220px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {AUTHENTICATION_METHOD.map((item) => (
                        <Listbox.Option
                          key={item}
                          className={({ active }) =>
                            `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                              active ? 'bg-slate-100' : 'text-slate-900'
                            }`
                          }
                          value={item}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}>
                                {item}
                              </span>
                              {selected ? (
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
          </div>
          <div className="py-6">
            <div className="bg-slate-100 text-slate-500 py-6 px-8 text-sm tracking-sm rounded-lg">
              {setAuthenticationDescription(authenticationSelected)}
            </div>
          </div>
          {authenticationSelected === 'Custom' ? (
            <div className="py-20 lg:py-24">
              <div className="divide-y divide-slate-200">
                <div className="pb-4">
                  <SectionTitle sectionTitle="Advanced settings" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                  <span className="text-slate-800 text-sm font-medium tracking-sm">
                    Submit Ideas
                  </span>
                  <Listbox
                    value={submitIdeasSelected}
                    onChange={(selected) => {
                      setSubmitIdeasSelected(selected);
                      updateCompanyAuthentication('submitIdeas', selected);
                    }}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full md:w-[220px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block text-gray-500 text-sm tracking-sm truncate">
                          {submitIdeasSelected}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full md:w-[220px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {IDEAS_PERMISSION_TYPE.map((item) => (
                            <Listbox.Option
                              key={item}
                              className={({ active }) =>
                                `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                                  active ? 'bg-slate-100' : 'text-slate-900'
                                }`
                              }
                              value={item}>
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {item}
                                  </span>
                                  {selected ? (
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                  <span className="text-slate-800 text-sm font-medium tracking-sm">Comments</span>
                  <Listbox
                    value={commentsSelected}
                    onChange={(selected) => {
                      setCommentsSelected(selected);
                      updateCompanyAuthentication('commentIdea', selected);
                    }}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full md:w-[220px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block text-gray-500 text-sm tracking-sm truncate">
                          {commentsSelected}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full md:w-[220px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {IDEAS_PERMISSION_TYPE.map((item) => (
                            <Listbox.Option
                              key={item}
                              className={({ active }) =>
                                `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                                  active ? 'bg-slate-100' : 'text-slate-900'
                                }`
                              }
                              value={item}>
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {item}
                                  </span>
                                  {selected ? (
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                  <span className="text-slate-800 text-sm font-medium tracking-sm">Voting</span>
                  <Listbox
                    value={votingSelected}
                    onChange={(selected) => {
                      setVotingSelected(selected);
                      updateCompanyAuthentication('voteIdea', selected);
                    }}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full md:w-[220px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block text-gray-500 text-sm tracking-sm truncate">
                          {votingSelected}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full md:w-[220px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {IDEAS_PERMISSION_TYPE.map((item) => (
                            <Listbox.Option
                              key={item}
                              className={({ active }) =>
                                `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                                  active ? 'bg-slate-100' : 'text-slate-900'
                                }`
                              }
                              value={item}>
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {item}
                                  </span>
                                  {selected ? (
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                  <span className="text-slate-800 text-sm font-medium tracking-sm">
                    Announcements Reactions
                  </span>
                  <Listbox
                    value={announcementsReactionsSelected}
                    onChange={(selected) => {
                      setAnnouncementsReactionsSelected(selected);
                      updateCompanyAuthentication('announcementReaction', selected);
                    }}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full md:w-[220px] inline-flex bg-white py-3.5 px-[14px] border border-slate-300 rounded-lg text-left cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block text-gray-500 text-sm tracking-sm truncate">
                          {announcementsReactionsSelected}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full md:w-[220px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {IDEAS_PERMISSION_TYPE.map((item) => (
                            <Listbox.Option
                              key={item}
                              className={({ active }) =>
                                `relative flex items-center justify-between cursor-default select-none py-2 px-3.5 ${
                                  active ? 'bg-slate-100' : 'text-slate-900'
                                }`
                              }
                              value={item}>
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {item}
                                  </span>
                                  {selected ? (
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
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
