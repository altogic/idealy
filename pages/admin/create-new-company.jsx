import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Wizard from '@/components/Wizard';
import CompanyCreate from '@/layouts/admin/create-company/CompanyCreate';
import IdeaCreate from '@/layouts/admin/create-company/IdeaCreate';
import IdeaTopics from '@/layouts/admin/create-company/IdeaTopics';
import IdeaStatus from '@/layouts/admin/create-company/IdeaStatus';
import Link from 'next/link';
import AuthService from '@/services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { topicActions } from '@/redux/topics/topicSlice';

export default function CreateNewCompany() {
  const dispatch = useDispatch();
  const [activePageIndex, setActivePageIndex] = useState(0);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(topicActions.getTopics());
    dispatch(topicActions.getStatuses());
  }, []);

  useEffect(() => {
    if (user) {
      if (!user?.canCreateCompany) {
        // Todo
        AuthService.updateUserCanCreateCompany(user._id, true);
      }
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Altogic Canny Create New Company</title>
        <meta name="description" content="Altogic Canny Create New Company" />
      </Head>
      <div className="w-full h-screen">
        <div className="h-[92px] bg-slate-50 px-4 py-8">
          <div className="flex items-center justify-between max-w-screen-lg mx-auto">
            <Link href="/">
              <a className="flex items-center">
                <h1 className="text-slate-700 text-xl font-semibold">Create New Company</h1>
              </a>
            </Link>
            <p className="text-slate-700 text-base tracking-sm">Step {activePageIndex + 1}/4</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100%-92px)] max-w-3xl mx-auto">
          <Wizard activePageIndex={activePageIndex} setActivePageIndex={setActivePageIndex}>
            <CompanyCreate />
            <IdeaCreate />
            <IdeaTopics />
            <IdeaStatus />
          </Wizard>
        </div>
      </div>
    </div>
  );
}
