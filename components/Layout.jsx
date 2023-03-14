import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { deleteCookie, getCookie } from 'cookies-next';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import useGuestValidation from '@/hooks/useGuestValidation';
import { generateUrl, setCookie } from '../utils';
import Header from './Header';
import Realtime from './Realtime';
import Spinner from './Spinner';

export default function Layout({ children }) {
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.company.getCompanyLoading);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const voteGuestAuth = useGuestValidation('voteIdea');
  const userIp = useSelector((state) => state.auth.userIp);
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
    if (userFromCookie && session) {
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
    if (company && user) {
      dispatch(
        ideaActions.getUserVotes({
          ...(voteGuestAuth ? { email: guestInfo.email } : { ip: userIp }),
          email: guestInfo?.email,
          companyId: company?._id,
          userId: user?._id
        })
      );
    }
  }, [company, user]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000">
      {loading ? (
        <div className="flex flex-col gap-y-4 justify-center items-center h-screen">
          <Spinner size={24} />
          <div className="text-base text-gray-500 dark:text-aa-400 purple:text-pt-400">
            Company Loading...
          </div>
        </div>
      ) : (
        <>
          <Head>
            <link rel="icon" href={company?.favicon} />
          </Head>
          <div className="min-h-screen relative">
            <Header />
            <main className="pt-[93px] px-4">
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
