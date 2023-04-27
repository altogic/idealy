import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import cn from 'classnames';

export default function NavItem({ icon, title, href = '/', active }) {
  const { selectedCompany, isGuest } = useSelector((state) => state.company);

  return selectedCompany?.siteNavigation[title?.toLowerCase()] || !isGuest ? (
    <li
      className={cn(
        `inline-flex items-center justify-center font-medium tracking-sm p-3 rounded-md transition `,
        active
          ? 'bg-indigo-700 dark:bg-aa-600 purple:bg-pt-900'
          : 'hover:bg-indigo-800 dark:hover:bg-aa-700 purple:hover:bg-pt-900'
      )}>
      <Link href={href}>
        <a className="inline-flex items-center justify-center gap-3 text-white dark:text-aa-200 purple:text-pt-200 font-medium tracking-sm">
          {icon}
          {title}
        </a>
      </Link>
    </li>
  ) : null;
}
