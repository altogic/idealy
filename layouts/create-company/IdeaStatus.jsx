import BaseListBox from '@/components/BaseListBox';
import StatusBadge from '@/components/StatusBadge';
import TopicBadges from '@/components/TopicBadges';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FourthWizard() {
  const companyTopics = useSelector((state) => state.company.companyTopics);
  const idea = useSelector((state) => state.company.idea);
  const ideaDescription = useSelector((state) => state.company.ideaDescription);
  const statuses = useSelector((state) => state.topic.statuses);
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyActions.setIdeaStatus(status));
  }, [status]);
  useEffect(() => {
    if (!_.isNil(statuses)) {
      setStatus(statuses[0]);
    }
  }, [statuses]);

  return (
    <>
      <div className="max-w-[444px] mx-auto mb-8 md:mb-16 text-center">
        <h2 className="text-slate-700 mb-4 text-3xl font-semibold tracking-md">
          Every idea has a status
        </h2>
        <p className="text-slate-500 text-lg tracking-sm">
          Statuses let customers know what stage the idea is at.
        </p>
      </div>
      <div className="space-y-6">
        <BaseListBox
          value={status}
          onChange={setStatus}
          options={statuses}
          field="name"
          label={status?.name}
          type="status"
          size="full"
        />
        <div className="bg-white py-8 px-6 border border-slate-200 rounded-lg">
          <h2 className="text-slate-800 mb-2 text-base font-semibold tracking-sm">{idea}</h2>
          <p className="text-slate-500 mb-5 text-sm tracking-sm">{ideaDescription}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {companyTopics.map((topic) => (
                <TopicBadges key={topic._id} badgeName={topic.name} />
              ))}
            </div>
            {status && <StatusBadge name={status?.name} color={status?.color} />}
          </div>
        </div>
      </div>
    </>
  );
}
