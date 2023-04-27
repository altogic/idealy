import React from 'react';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import Avatar from '@/components/Avatar';
import SanitizeHtml from '@/components/SanitizeHtml';

export default function NotificationItem({ notification, dropdown = false }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(notification.url)}
      className="flex items-center gap-4 p-4 transition ease-linear duration-150 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700 w-full">
      <Avatar
        src={notification?.user?.profilePicture || notification?.guest?.avatar}
        alt={notification?.user?.name || notification?.guest?.name || notification?.name}
        size="w-10 h-10"
      />

      <div className="text-left flex-1">
        <div className="text-sm text-slate-500 dark:text-aa-300 purple:text-pt-300  leading-5 tracking-sm flex gap-x-2 gap-y-1 flex-wrap">
          <SanitizeHtml html={notification.message} />
        </div>
        {dropdown && (
          <span className="text-gray-400 text-xs font-medium tracking-sm">
            {DateTime.fromISO(notification.createdAt).setLocale('en').toRelative()}
          </span>
        )}
      </div>

      {!dropdown && (
        <span className="text-gray-400 text-xs font-medium tracking-sm">
          {DateTime.fromISO(notification.createdAt).setLocale('en').toRelative()}
        </span>
      )}
      {!notification?.isRead && <div className="bg-blue-700 rounded-full p-1" />}
    </button>
  );
}
