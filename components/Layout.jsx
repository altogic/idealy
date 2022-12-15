import React, { useEffect } from 'react';
import Head from 'next/head';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import Realtime from './Realtime';
import Header from './Header';
import { generateUrl } from '../utils';

export default function Layout({ children }) {
  const router = useRouter();
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && _.isEmpty(companies)) {
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, []);
  useEffect(() => {
    const wildcard = window.location.hostname.split('.')[0];
    if (isAuthenticated && company?.subdomain !== wildcard) {
      dispatch(
        companyActions.getCompanyBySubdomain({
          subdomain: wildcard,
          onSuccess: (subdomain) => {
            setCookie('subdomain', subdomain, {
              domain: process.env.NEXT_PUBLIC_DOMAIN,
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: 60 * 12
            });
          },
          onFail: () => router.push(generateUrl('company-not-found'))
        })
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const invitation = JSON.parse(getCookie('invitation-token') || null);
    if (invitation) {
      dispatch(
        companyActions.invalidateInvitationToken({
          companyId: invitation.companyId,
          email: user.email
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
    <div>
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
