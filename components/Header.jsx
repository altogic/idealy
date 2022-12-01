import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Transition, Dialog, Menu } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { Search, Feedback, Roadmap, Announcements, Close, Notification } from './icons';
import UserDropdown from './Header/UserDropdown';
import CompanyAvatar from './CompanyAvatar';

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const company = useSelector((state) => state.company.company);
  const companyLoading = useSelector((state) => state.company.getCompanyLoading);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(isAuthenticated);
    }
  }, [isAuthenticated]);
  return (
    <>
      <header className="flex items-center justify-between bg-indigo-900 px-4 py-6 lg:px-12">
        <div className="flex items-center">
          {company?.name ? (
            <Link href="/">
              <a
                className="inline-flex items-center gap-4 flex-shrink-0 mr-6"
                title={company?.name}>
                <CompanyAvatar
                  logoUrl={company?.logoUrl}
                  name={company?.name}
                  className="w-11 h-11 text-xl"
                />
                {company?.showCompanyName && (
                  <span className="text-white font-medium tracking-sm truncate max-w-[100px]">
                    {company?.name}
                  </span>
                )}
              </a>
            </Link>
          ) : null}
          {companyLoading || (
            <ul className="flex items-center gap-2">
              {company?.siteNavigation?.feedback && (
                <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800">
                  <Link href="/">
                    <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                      <Feedback className="w-6 h-6 text-indigo-50 mr-3" />
                      Feedback
                    </a>
                  </Link>
                </li>
              )}
              {company?.siteNavigation?.roadmap && (
                <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800">
                  <Link href="/">
                    <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                      <Roadmap className="w-6 h-6 text-indigo-50 mr-3" />
                      Roadmap
                    </a>
                  </Link>
                </li>
              )}
              {company?.siteNavigation?.announcements && (
                <li className="flex items-center justify-center py-2 px-3 rounded-md transition hover:bg-indigo-800">
                  <Link href="/">
                    <a className="inline-flex items-center justify-center text-white font-medium tracking-sm">
                      <Announcements className="w-6 h-6 text-indigo-50 mr-3" />
                      Announcements
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          )}
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
          {/* Notification */}
          <Menu as="div" className="relative">
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
              <Menu.Items className="origin-top-right absolute top-12 right-0 w-[430px] rounded-[10px] shadow-xl bg-slate-100 focus:outline-none z-50">
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-white rounded-lg">
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
                          <strong className="font-semibold">İsmail Erüstün</strong> liked your{' '}
                          <strong className="font-semibold">Lorem Ipsum Dolor Sit Amet</strong>{' '}
                          forum!
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
                  <div className="p-4 bg-white rounded-lg">
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
                          <strong className="font-semibold">Emillia Gates</strong> liked your{' '}
                          <strong className="font-semibold">Lorem Ipsum Dolor Sit Amet</strong>{' '}
                          forum!
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
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full"
            onClick={() => setOpen(!open)}>
            <Search className="w-5 h-5 text-indigo-50" />
          </button>
          {isLoggedIn ? (
            <>
              {/* <NotificationDropdown /> */}
              <UserDropdown />
            </>
          ) : (
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/login">
                  <a className="inline-flex text-indigo-50 text-sm tracking-sm">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/create-an-account">
                  <a className="inline-flex text-indigo-400 text-sm tracking-sm">Signup</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
      {/* Search Slide Over Panel */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
