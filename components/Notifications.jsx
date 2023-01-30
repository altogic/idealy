import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Avatar from './Avatar';
import { Notification, Settings } from './icons';
import SanitizeHtml from './SanitizeHtml';
import Indicator from './Indicator';

export default function Notifications() {
  const router = useRouter();
  const notifications = useSelector((state) => state.notification.notifications);
  return (
    <Menu as="div" className="relative">
      <Indicator count={notifications?.length} className="absolute -top-1 -right-1" />
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
              <button type="button" onClick={() => router.push('/settings?tab=notifications')}>
                <Settings className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
              </button>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
              {notifications?.length ? (
                notifications?.map((notification) => (
                  <button
                    key={notification._id}
                    type="button"
                    className="flex items-start gap-4 p-4 transition ease-linear duration-150 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700 w-full">
                    <Avatar
                      src={notification.user.profilePicture}
                      size="w-10 h-10"
                      alt={notification.user.name}
                    />
                    <div className="text-left flex-1">
                      <div className="text-sm text-slate-500 dark:text-aa-300 purple:text-pt-300  leading-5 tracking-sm flex gap-x-2 gap-y-1 flex-wrap">
                        <strong className="text-slate-700 dark:text-aa-200 purple:text-pt-200 font-semibold">
                          {notification.user.name}
                        </strong>{' '}
                        <SanitizeHtml html={notification.message} />
                      </div>
                      <span className="text-gray-400 text-xs font-medium tracking-sm">
                        {DateTime.fromISO(notification.createdAt).setLocale('en').toRelative()}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-slate-400 dark:text-aa-400 purple:text-pt-400 text-sm font-medium tracking-sm">
                    No notifications
                  </p>
                </div>
              )}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
