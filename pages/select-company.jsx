import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CompanyButton from '@/components/CompanyButton';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import Realtime from '@/components/Realtime';

export default function Home() {
  const companies = useSelector((state) => state.company.companies);
  const sessionUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  useEffect(() => {
    if (companies.length === 0 && user) {
      dispatch(companyActions.getUserCompanies(user?._id));
    }
  }, [companies, user]);

  return (
    <div>
      <Head>
        <title>Idealy - Select your Company</title>
      </Head>
      {companies.length > 0 && (
        <div className="my-10 md:my-0">
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-20 md:h-screen">
            <h1 className="text-slate-900 text-xl md:text-3xl font-semibold tracking-md">
              Select your Company
            </h1>
            <div className="max-w-sm sm:max-w-lg lg:max-w-xl">
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 md:gap-16 lg:gap-24">
                {companies.map((company) => (
                  <CompanyButton
                    key={company._id}
                    company={company}
                    isGuest={company.role === 'Guest' || !company.role}
                  />
                ))}
                {user?.canCreateCompany && <CompanyButton label="Create company" isCreateCompany />}
              </div>
            </div>
          </div>
        </div>
      )}
      <Realtime />
    </div>
  );
}
