import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CompanyButton from '@/components/CompanyButton';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';

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
        <title>Altogic Canny Select your Company</title>
        <meta name="description" content="Altogic Canny Select your Company" />
      </Head>
      {companies.length > 0 && (
        <div className="w-full h-screen">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-slate-900 mb-20 text-3xl font-semibold tracking-md">
              Select your Company
            </h1>
            <div className="w-1/2">
              <div className="flex justify-center items-center flex-wrap gap-36">
                {companies.map((company) => (
                  <CompanyButton key={company._id} company={company} />
                ))}
                {user?.canCreateCompany && <CompanyButton label="Create company" isCreateCompany />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
