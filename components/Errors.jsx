import React from 'react';
import Link from 'next/link';
import { Exclamation } from './icons';

export default function Errors() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-11">
      <div className="max-w-lg lg:max-w-full mx-auto lg:mx-0 text-center lg:text-left">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-aa-200 purple:bg-pt-200 mb-4 rounded-full">
          <Exclamation className="w-7 h-7 text-red-600" />
        </span>
        <h2 className="text-red-600 dark:text-aa-200 purple:text-pt-200 text-3xl md:text-5xl font-semibold tracking-md">
          Invalid Invitation
        </h2>
        <p className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mt-4 mb-8 md:mb-12 text-base md:text-xl font-medium tracking-sm">
          Unfortunately, this invitation has become unavailable or its expiration date has passed.
          Please try again with a valid invitation or contact our support team.
        </p>
        <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-4 text-sm">
          Don’t have an account?
          <Link href="/login">
            <a className="inline-block ml-0.5 text-sm font-medium tracking-sm text-indigo-700">
              Click to login
            </a>
          </Link>
        </p>
        <Link href="/login">
          <a className="inline-block text-sm font-medium tracking-sm text-indigo-700">
            Create an account
          </a>
        </Link>
      </div>
      <img src="./error.png" alt="" srcSet="./error.png 2x" />
    </div>
  );
}
