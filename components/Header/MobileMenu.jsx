import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useNavbarItems from '@/hooks/useNavbarItems';
import { Close, HamburgerMenu, Settings } from '@/components/icons';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import CompanyAvatar from '../CompanyAvatar';

export default function MobileMenu() {
  const router = useRouter();
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);
  const selectedCompany = useSelector((state) => state.company.company);
  const navbar = useNavbarItems();
  return (
    <>
      <button
        type="button"
        className="inline-flex lg:hidden items-center justify-center w-10 h-10"
        onClick={() => setOpenHamburgerMenu(!openHamburgerMenu)}>
        <HamburgerMenu className="w-6 h-6 icon-slate" />
      </button>
      <Transition.Root show={openHamburgerMenu} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={setOpenHamburgerMenu}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen">
                    <div className="flex h-full flex-col overflow-y-scroll bg-indigo-900 dark:bg-aa-900 purple:bg-pt-1000 py-6 shadow-xl">
                      <div className="px-4 sm:px-6 flex justify-between">
                        <div
                          className="inline-flex items-center gap-4 flex-shrink-0 mr-6"
                          title={selectedCompany?.name}>
                          <CompanyAvatar
                            logoUrl={selectedCompany?.logoUrl}
                            name={selectedCompany?.name}
                            className="w-11 h-11 text-xl"
                          />

                          <span className="text-white dark:text-aa-200 purple:text-pt-200 font-medium tracking-sm truncate max-w-[100px]">
                            {selectedCompany?.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="rounded-md text-white dark:text-aa-200 purple:text-pt-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpenHamburgerMenu(!openHamburgerMenu)}>
                          <span className="sr-only">Close panel</span>
                          <Close className="h-7 w-7 icon-slate" aria-hidden="true" />
                        </button>
                      </div>
                      <nav className="relative mt-6 flex-1 px-4 sm:px-6">
                        <ul className="flex flex-col justify-center px-2 items-start h-1/2  space-y-4">
                          {navbar.map((item) => (
                            <NavItem
                              key={item.title}
                              icon={item.icon}
                              title={item.title}
                              href={item.href}
                              active={item.active}
                            />
                          ))}
                          {selectedCompany?.role &&
                            selectedCompany?.role !== 'Guest' &&
                            (router.asPath.includes('dashboard') ||
                              router.asPath.includes('public-view')) && (
                              <div>
                                {router.asPath.includes('dashboard') ? (
                                  <div className="flex items-center justify-center rounded-md transition bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900 hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                                    <Link href="/public-view">
                                      <a className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm">
                                        Public View
                                      </a>
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center rounded-md transition bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900 hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900">
                                    <Link href="/dashboard">
                                      <a className="inline-flex items-center justify-center text-white px-3 py-2.5 text-sm tracking-sm">
                                        Admin View
                                      </a>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                        </ul>
                      </nav>
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
