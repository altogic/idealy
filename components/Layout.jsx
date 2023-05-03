import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { deleteCookie, getCookie } from 'cookies-next';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl, setCookie } from '../utils';
import Header from './Header';
import Realtime from './Realtime';
import Spinner from './Spinner';

export default function Layout({ children }) {
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { getCompanyLoading: loading } = useSelector((state) => state.company);
  const load = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const invitation = JSON.parse(getCookie('invitation-token') || null);
    if (invitation) {
      dispatch(
        companyActions.invalidateInvitationToken({
          companyId: invitation.companyId,
          email: invitation.email
        })
      );
      deleteCookie('invitation-token');
    }
    if (isAuthenticated) {
      dispatch(authActions.setUser());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.isNil(companies) && isAuthenticated) {
      router.push(generateUrl('create-new-company'));
    }
  }, [companies]);

  useEffect(() => {
    const userFromCookie = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    dispatch(authActions.getUserIp());

    if (userFromCookie && session && _.isEmpty(companies)) {
      dispatch(companyActions.getUserCompanies(userFromCookie?._id));
    }

    const wildcard = window.location.hostname.split('.')[0];
    if (company?.subdomain !== wildcard) {
      dispatch(
        companyActions.getCompanyBySubdomain({
          subdomain: wildcard,
          userId: userFromCookie?._id,
          onSuccess: (subdomain) => {
            setCookie('subdomain', subdomain);
          },
          onFail: () => {}
        })
      );
    }
  }, []);
  useEffect(() => {
    if (load.current && !loading) {
      load.current = false;
    }
  }, [loading]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000">
      {loading || load.current ? (
        <div className="flex flex-col gap-y-4 justify-center items-center h-screen">
          <Spinner size={24} />
          <div className="text-base text-gray-500 dark:text-aa-400 purple:text-pt-400">
            Company Loading...
          </div>
        </div>
      ) : (
        <>
          <Head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            <meta
              name="description"
              content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
            />
            <meta
              name="keywords"
              content="customer feedback, feedback management, product roadmap, feature prioritization, announcements tool, product updates, Idealy"
            />

            <link rel="icon" href={company?.favicon ?? '/favicon.ico'} />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="msapplication-config" content="browserconfig.xml" />
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

            <meta name="theme-color" content="#ffffff" />
            <link rel="canonical" href="http://idealy.io" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://idealy.io" />
            <meta property="og:title" content={company.name} />
            <meta property="og:image" content="https://www.idealy.io/og-idealy.png" />
            <meta
              property="og:description"
              content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
            />
            <meta property="og:site_name" content="Idealy" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@altogic" />
            <meta name="twitter:creator" content="@enesmozer" />
            <meta name="twitter:url" content="https://twitter.com/Altogic" />
            <meta name="twitter:title" content={company.name} />
            <meta
              name="twitter:description"
              content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
            />
            <meta name="twitter:image" content="https://www.idealy.io/og-idealy.png" />
          </Head>
          <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="grow pt-[77px] lg:pt-[93px]">
              {children}
              <Realtime />
            </main>
          </div>
          {!company?.whiteLabel?.isHideBanner && (
            <Link href="https://www.idealy.io/">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-0 left-2 p-4 text-base">
                <div className="inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border bg-indigo-100 text-indigo-500 dark:bg-aa-600 purple:bg-pt-800 dark:text-aa-400 purple:text-pt-400 border-transparent">
                  Powered by Idealy
                </div>
              </a>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
