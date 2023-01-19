import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import { deleteCookie, getCookie } from 'cookies-next';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateUrl, setCookie } from '../utils';
import Header from './Header';
import Realtime from './Realtime';

export default function Layout({ children }) {
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const userFromCookie = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    if (userFromCookie && session) {
      dispatch(authActions.authStateChange({ user: userFromCookie, session }));
    }
  }, []);

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
    // if (isAuthenticated) {
    //   dispatch(authActions.setUser());
    // }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.isNil(companies) && isAuthenticated) {
      router.push(generateUrl('create-new-company'));
    }
  }, [companies]);

  useEffect(() => {
    const wildcard = window.location.hostname.split('.')[0];
    if (company?.subdomain !== wildcard) {
      dispatch(
        companyActions.getCompanyBySubdomain({
          subdomain: wildcard,
          userId: user?._id,
          onSuccess: (subdomain) => {
            setCookie('subdomain', subdomain);
          },
          onFail: () => {}
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (user && _.isEmpty(companies)) {
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000">
      <Head>
        <link rel="icon" href={company?.favicon} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="pt-[93px] px-4">
          {children}
          <Realtime />
        </main>
      </div>
      {!company?.whiteLabel?.isHideBanner && (
        <a href="https://www.altogic.com/" target="_blank" rel="noopener noreferrer">
          <img className="fixed bottom-8 right-8" src="./powered-by-altogic.svg" alt="" />
        </a>
      )}
    </div>
  );
}
