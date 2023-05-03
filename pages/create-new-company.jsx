import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Wizard from '@/components/Wizard';
import AuthService from '@/services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { topicActions } from '@/redux/topics/topicSlice';
import CompanyCreate from '@/layouts/create-company/CompanyCreate';
import IdeaCreate from '@/layouts/create-company/IdeaCreate';
import IdeaTopics from '@/layouts/create-company/IdeaTopics';
import IdeaStatus from '@/layouts/create-company/IdeaStatus';

export default function CreateNewCompany({ userIp }) {
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
        AuthService.updateUserCanCreateCompany(user._id, true);
      }
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Idealy - Create New Company</title>
      </Head>
      <div className="w-full h-screen">
        <div className="md:h-[92px] bg-slate-50 px-4 py-8 mb-8 md:mb-0">
          <div className="flex items-center justify-between max-w-screen-lg mx-auto">
            <h1 className="text-slate-700 text-xl font-semibold">Create New Company</h1>
            <p className="text-slate-700 text-base tracking-sm">Step {activePageIndex + 1}/4</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:h-[calc(100%-92px)] max-w-3xl mx-auto px-4 md:p-0">
          <Wizard
            activePageIndex={activePageIndex}
            setActivePageIndex={setActivePageIndex}
            userIp={userIp}>
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
export async function getServerSideProps() {
  const { ip } = await fetch('https://api.ipify.org?format=json').then((res) => res.json());
  return {
    props: {
      userIp: ip
    }
  };
}
