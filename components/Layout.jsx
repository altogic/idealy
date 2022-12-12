import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import Realtime from './Realtime';
import Header from './Header';

export default function Layout({ children }) {
  const router = useRouter();
  const [canFetchCompany, setCanFetchCompany] = useState(true);
  const company = useSelector((state) => state.company.company);
  const companies = useSelector((state) => state.company.companies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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
    } else {
      router.push('/public-view');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.isNil(companies) && isAuthenticated) {
      router.push('/admin/create-new-company');
    }
  }, [companies]);

  useEffect(() => {
    if (user && _.isEmpty(companies) && canFetchCompany) {
      setCanFetchCompany(false);
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, [user, companies]);

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
