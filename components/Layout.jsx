import React, { useEffect } from 'react';
import Head from 'next/head';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import Realtime from './Realtime';
import Header from './Header';
import { generateUrl, setCookie } from '../utils';

export default function Layout({ children }) {
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const wildcard = window.location.hostname.split('.')[0];
    if (company?.subdomain !== wildcard && (wildcard !== 'www' || wildcard !== 'app')) {
      dispatch(
        companyActions.getCompanyBySubdomain({
          subdomain: wildcard,
          userId: user?._id,
          onSuccess: (subdomain) => {
            setCookie('subdomain', subdomain, 30);
          },
          onFail: () => {}
        })
      );
    }
    const userFromCookie = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    if (userFromCookie && session) {
      dispatch(authActions.authStateChange({ user: userFromCookie, session }));
      localStorage.setItem('user', JSON.stringify(userFromCookie));
      localStorage.setItem('session', JSON.stringify(session));
    }
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, [user]);
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
    // else {
    //   router.push(generateUrl('public-view', company.subdomain));
    // }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.isNil(companies) && isAuthenticated) {
      router.push(generateUrl('create-new-company'));
    }
  }, [companies]);

  return (
    <div className="bg-white dark:bg-aa-900 purple:bg-pt-1000">
      <Head>
        <link rel="icon" href={company?.favicon} />
      </Head>
      <Header />
      <main className="px-4">
        {children}
        <Realtime />
      </main>
      {/* <Footer /> */}
      {company?.whiteLabel?.isHideBanner && (
        <a href="https://www.altogic.com/" target="_blank" rel="noopener noreferrer">
          <img className="fixed bottom-8 right-8" src="./powered-by-altogic.svg" alt="" />
        </a>
      )}
    </div>
  );
}
