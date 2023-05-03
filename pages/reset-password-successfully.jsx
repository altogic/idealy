import { Check } from '@/components/icons';
import Head from 'next/head';
import Link from 'next/link';

export default function ResetPasswordSuccessFull() {
  return (
    <div>
      <Head>
        <title>Idealy - Reset Password Successfully</title>
      </Head>
      <div className="relative h-screen">
        <a
          href="https://www.altogic.com/"
          className="flex fixed bottom-3 right-3 sm:bottom-8 sm:right-8 z-50"
          target="_blank"
          rel="noopener noreferrer">
          <img src="./powered-by-altogic.svg" alt="" />
        </a>
        <div className="grid xl:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-6 ring-8 ring-indigo-50">
                  <Check className="w-7 h-7 icon-indigo" />
                </span>
                <h1 className="text-slate-800 mb-3 text-3xl font-semibold">Password Reset</h1>
                <p className="text-slate-500 mb-11 text-base tracking-sm">
                  Your password has been reset successfully.
                </p>
                <Link href="/login">
                  <a className="w-full flex items-center justify-center text-white py-2.5 px-7 text-sm font-medium tracking-sm border border-transparent rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Continue to login
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-l-[40px]"
              src="./forgot-password.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
