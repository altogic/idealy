import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Transition, Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { Search, Feedback, Roadmap, Announcements } from './icons';
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
      <header className="flex items-center justify-between bg-indigo-900 py-6 px-12">
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
