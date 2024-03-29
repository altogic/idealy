import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

export default function NavItem({ icon, title, href = '/', active }) {
  const router = useRouter();
  const { company, isGuest } = useSelector((state) => state.company);

  return company?.siteNavigation[title?.toLowerCase()] || !isGuest ? (
    <li
      className={cn(
        `inline-flex items-center justify-center font-medium tracking-sm p-3 rounded-md transition `,
        active
          ? 'bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900'
          : 'hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900',
        router.asPath.includes('/request-access') && 'pointer-events-none cursor-not-allowed'
      )}>
      <Link href={href}>
        <a
          className={cn(
            'inline-flex items-center justify-center gap-3 text-white dark:text-aa-200 purple:text-pt-200 font-medium tracking-sm'
          )}>
          {icon}
          {title}
        </a>
      </Link>
    </li>
  ) : null;
}
