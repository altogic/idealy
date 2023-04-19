import React from 'react';
import Head from 'next/head';
import { Danger, ChevronLeft } from '@/components/icons';
import Router from 'next/router';
import { getCookie, deleteCookie } from 'cookies-next';
import { generateUrl } from '../utils';

export default function CompanyNotFound() {
  const handleBack = () => {
    const subdomain = getCookie('subdomain');
    if (subdomain) {
      deleteCookie('subdomain', {
        domain: process.env.NEXT_PUBLIC_DOMAIN
      });
      Router.push(generateUrl('dashboard', subdomain));
    }
  };
  return (
    <div>
      <Head>
        <title>Altogic Canny Alternative Mail Verification</title>
        <meta name="description" content="Altogic Canny Alternative Mail Verification" />
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
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-6 ring-8 ring-red-50">
                  <Danger className="w-7 h-7 icon-red" />
                </span>
                <h1 className="text-red-500 mb-3 text-2xl font-semibold">Company Not Found</h1>
                <p className="text-slate-500 mb-6 text-base tracking-sm">
                  The company you are trying to access is not found.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center text-slate-500"
                  onClick={handleBack}>
                  <ChevronLeft className="w-6 h-6 icon" />
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-l-[40px]"
              src="./create-an-account.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
