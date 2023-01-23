import { notificationActions } from '@/redux/notification/notificationSlice';
import { Dialog, Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAvatar from './CompanyAvatar';
import UserDropdown from './Header/UserDropdown';
import { Announcements, Feedback, Notification, Roadmap, Search, Settings } from './icons';

export default function Header() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const selectedCompany = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const notifications = useSelector((state) => state.notification.notifications);
  const loading = useSelector((state) => state.auth.isLoading);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCompanies, setUserCompanies] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(isAuthenticated);
      if (_.isEmpty(notifications)) {
        dispatch(notificationActions.getNotifications(user._id));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (companies.length > 0 && selectedCompany) {
      setUserCompanies([
        selectedCompany,
        ...companies.filter((company) => company._id !== selectedCompany._id)
      ]);
    }
  }, [companies, selectedCompany]);

  return (
    <>
      <header
        className={cn(
          `fixed top-0 left-0 flex items-center justify-between w-full bg-indigo-900 dark:bg-aa-900 purple:bg-pt-1000 border-b dark:border-aa-600 purple:border-pt-800 p-4 lg:py-6 lg:px-12 z-50`,
          router.asPath.includes('settings') ? 'pl-16' : null
        )}>
        <div className="flex items-center">
          {selectedCompany?.name && (
            <Link href="/">
              <a
                className="inline-flex items-center gap-4 flex-shrink-0 mr-6"
                title={selectedCompany?.name}>
                <CompanyAvatar
                  logoUrl={selectedCompany?.logoUrl}
                  name={selectedCompany?.name}
                  className="w-11 h-11 text-xl"
                />
                {selectedCompany?.showCompanyName && (
                  <span className="hidden md:block text-white font-medium tracking-sm truncate max-w-[100px]">
                    {selectedCompany?.name}
                  </span>
                )}
              </a>
            </Link>
          )}

          <ul className="hidden lg:flex items-center gap-2">
            {selectedCompany?.siteNavigation?.feedback && (
              <li
                className={cn(
                  `flex items-center justify-center py-2 px-3 rounded-md transition`,
                  router.pathname === '/public-view'
                    ? 'bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900'
                    : 'hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900'
                )}>
                <Link href="/public-view">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <Feedback className="w-6 h-6 text-indigo-50 mr-3" />
                    Feedback
                  </a>
                </Link>
              </li>
            )}
            {selectedCompany?.siteNavigation?.roadmap && (
              <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                <Link href="/">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <Roadmap className="w-6 h-6 text-indigo-50 mr-3" />
                    Roadmap
                  </a>
                </Link>
              </li>
            )}
            {selectedCompany?.siteNavigation?.announcements && (
              <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                <Link href="/">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <Announcements className="w-6 h-6 text-indigo-50 mr-3" />
                    Announcements
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm"
          >
            Admin View
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm"
          >
            Public View
          </button> */}
          {/* {process.env.NODE_ENV === 'development' && <ThemeChanger />} */}
          {/* Notification */}
          {isLoggedIn && (
            <Menu as="div" className="relative">
              <span className="absolute top-[10px] right-[8px] inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {notifications.length}
              </span>
              <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none">
                <Notification className="w-5 h-5 text-white" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="origin-top-right absolute top-12 right-0 w-[430px] rounded-lg shadow-xl bg-white dark:bg-aa-700 purple:bg-pt-900 focus:outline-none z-50">
                  <div>
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
                      <h6 className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-base font-semibold tracking-md">
                        Notification
                      </h6>
                      <button
                        type="button"
                        onClick={() => router.push('/settings?tab=notifications')}>
                        <Settings className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
                      </button>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
                      <button
                        type="button"
                        className="flex items-start gap-4 p-4 transition ease-linear duration-150 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                        <div className="text-left">
                          <p className=" text-sm text-slate-400 dark:text-aa-400 purple:text-pt-400  leading-5 tracking-sm">
                            <strong className="text-slate-700 dark:text-aa-200 purple:text-pt-200 font-semibold">
                              umit.cakmak@gmail.com
                            </strong>{' '}
                            Updated client key{' '}
                            <strong className="text-slate-700 dark:text-aa-200 purple:text-pt-200 font-semibold">
                              client key
                            </strong>
                          </p>
                          <span className="text-gray-400 text-xs font-medium tracking-sm">
                            12 hours ago
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                  {/* <div className="p-6 space-y-4">
                    {notifications.length ? (
                      notifications.map((notification) => (
                        <div className="p-4 bg-white rounded-lg" key={notification._id}>
                          <div className="flex items-start w-full">
                            <div className="flex items-center flex-1">
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-6 h-6 text-indigo-500"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                                <p dangerouslySetInnerHTML={{ __html: notification.message }} />
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                              <button
                                type="button"
                                className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Close</span>
                                <Close className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-white rounded-lg">
                        <div className="flex items-start w-full">
                          <div className="flex items-center flex-1">
                            <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                              <p>No notifications</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div> */}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full"
            onClick={() => setOpen(!open)}>
            <Search className="w-5 h-5 text-indigo-50" />
          </button>
          {isLoggedIn ? (
            <>
              {/* <NotificationDropdown /> */}
              <UserDropdown companies={userCompanies} />
            </>
          ) : (
            !loading && (
              <ul className="flex items-center gap-4">
                <li>
                  <Link href="/login">
                    <a className="inline-flex text-indigo-50 text-sm tracking-sm">Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a className="inline-flex text-indigo-400 text-sm tracking-sm">Signup</a>
                  </Link>
                </li>
              </ul>
            )
          )}
        </div>
      </header>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0" />

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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="absolute top-8 right-8 w-8 h-8 z-50">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full h-full rounded-md transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(!open)}>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="w-4 h-4 text-slate-500"
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
                      <div className="relative flex-1 p-14">
                        <h2 className="text-slate-800 mb-8 text-xl font-semibold tracking-md  ">
                          Search
                        </h2>
                        <div className="bg-slate-100 p-8">
                          <h2 className="text-slate-800 mb-6 text-base font-semibold tracking-sm">
                            Search Result
                          </h2>
                          <div>sad</div>
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
    </>
  );
}
