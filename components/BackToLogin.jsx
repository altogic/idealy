import Link from 'next/link';
import React from 'react';
import { generateUrl } from '../utils';

export default function BackToLogin() {
  return (
    <div className="text-center mt-8">
      <Link href={generateUrl('login')}>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-sm text-slate-500">
          <svg
            className="w-5 h-5 text-slate-500"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.3332 10H4.6665M4.6665 10L10.4998 15.8333M4.6665 10L10.4998 4.16667"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to login
        </a>
      </Link>
    </div>
  );
}
