import React from 'react';
import { DateTime } from 'luxon';
import Avatar from './Avatar';
import SanitizeHtml from './SanitizeHtml';

export default function NotificationItem({ notification }) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 p-4 transition ease-linear duration-150 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700 w-full">
      <Avatar
        src={notification?.user?.profilePicture || notification.guestAvatar}
        alt={notification?.user?.name || notification.guestName}
        size="w-10 h-10"
      />
      <div className="text-left flex-1">
        <div className="text-sm text-slate-500 dark:text-aa-300 purple:text-pt-300  leading-5 tracking-sm flex gap-x-2 gap-y-1 flex-wrap">
          <strong className="text-slate-700 dark:text-aa-200 purple:text-pt-200 font-semibold">
            {notification?.user?.name || notification.guestName}
          </strong>{' '}
          <SanitizeHtml html={notification.message} />
        </div>
      </div>
      <span className="text-gray-400 text-xs font-medium tracking-sm">
        {DateTime.fromISO(notification.createdAt).setLocale('en').toRelative()}
      </span>
    </button>
  );
}
