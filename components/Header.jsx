import { notificationActions } from '@/redux/notification/notificationSlice';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyAvatar from './CompanyAvatar';
import UserDropdown from './Header/UserDropdown';
import { Announcements, Feedback, People, Roadmap, Search } from './icons';
import ThemeChanger from './ThemeChanger';
import Notifications from './Notifications';
import { generateUrl } from '../utils';

export default function Header() {
  const router = useRouter();
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
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (companies.length > 0 && selectedCompany) {
      if (!selectedCompany?.role) {
        setUserCompanies(companies);
      } else {
        setUserCompanies([
          selectedCompany,
          ...companies.filter((company) => company._id !== selectedCompany._id)
        ]);
      }
      if (_.isEmpty(notifications)) {
        dispatch(notificationActions.getNotifications(selectedCompany._id));
      }
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
            {(selectedCompany?.siteNavigation?.feedback ||
              (selectedCompany?.role && selectedCompany?.role !== 'Guest')) && (
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
            {(selectedCompany?.siteNavigation?.roadmap ||
              (selectedCompany?.role && selectedCompany?.role !== 'Guest')) && (
              <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                <Link href="/">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <Roadmap className="w-6 h-6 text-indigo-50 mr-3" />
                    Roadmap
                  </a>
                </Link>
              </li>
            )}
            {(selectedCompany?.siteNavigation?.announcements ||
              (selectedCompany?.role && selectedCompany?.role !== 'Guest')) && (
              <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                <Link href="/">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <Announcements className="w-6 h-6 text-indigo-50 mr-3" />
                    Announcements
                  </a>
                </Link>
              </li>
            )}
            {selectedCompany?.role && selectedCompany?.role !== 'Guest' && (
              <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                <Link href="/">
                  <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                    <People className="w-6 h-6 text-indigo-50 mr-3" />
                    Users
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
          {process.env.NODE_ENV === 'development' && <ThemeChanger />}
          {/* Notification */}
          {isLoggedIn && <Notifications />}
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
                  <Link href={generateUrl('login')}>
                    <a className="inline-flex text-indigo-50 text-sm tracking-sm">Login</a>
                  </Link>
                </li>
                <li>
                  <Link href={generateUrl('register')}>
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
