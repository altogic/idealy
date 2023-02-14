import { Logout, People } from '@/components/icons';
import { generateUrl } from '@/utils/index';
import { Menu, Transition } from '@headlessui/react';
import Router from 'next/router';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import GuestFormModal from '../GuestFormModal';

export default function GuestDropdown() {
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const [openGuestForm, setOpenGuestForm] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    Router.push(generateUrl('login'));
  };
  const handleGuestFormSubmit = () => {
    setOpenGuestForm(false);
  };
  return (
    <>
      <Menu as="div" className="relative inline-block w-11 h-11 text-left">
        <Menu.Button className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Avatar src={guestInfo?.avatar} alt={guestInfo?.name} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="flex flex-col absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-aa-700 purple:bg-pt-900 shadow-lg overflow-hidden focus:outline-none z-50">
            <Menu.Item>
              <div className="flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 dark:border-aa-600 purple:border-pt-800">
                <span className="inline-block">
                  <Avatar
                    src={guestInfo?.avatar}
                    alt={guestInfo?.name}
                    size="w-9 h-9"
                    fontSize="text-md"
                  />
                </span>
                <div className="inline-flex flex-col items-start">
                  <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm whitespace-nowrap">
                    {guestInfo?.name}
                  </span>
                  <span className="text-slate-400 dark:text-aa-400 purple:text-pt-400 text-xs tracking-sm">
                    {guestInfo?.email}
                  </span>
                </div>
              </div>
            </Menu.Item>
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-aa-600 purple:divide-pt-800">
              <Menu.Button onClick={() => setOpenGuestForm(true)}>
                <span className="inline-flex items-start gap-3  dark:text-aa-200 purple:text-pt-200 p-4 text-sm w-full hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700">
                  <People className="w-4 h-4 text-slate-700 dark:text-aa-300 purple:text-pt-300" />
                  Profile
                </span>
              </Menu.Button>

              <Menu.Button
                onClick={handleLogout}
                className="inline-flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700">
                <Logout className="w-4 h-4 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
                <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm ">
                  Log out
                </span>
              </Menu.Button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <GuestFormModal
        title="Update Your Information"
        open={openGuestForm}
        onClose={() => setOpenGuestForm(false)}
        onSubmit={handleGuestFormSubmit}
        showLoginLink
        saveLocal
      />
    </>
  );
}
