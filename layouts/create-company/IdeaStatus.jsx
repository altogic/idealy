import BaseListBox from '@/components/BaseListBox';
import IdeaPreview from '@/components/IdeaPreview';
import { companyActions } from '@/redux/company/companySlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FourthWizard() {
  const status = useSelector((state) => state.company.ideaStatus);
  const statuses = useSelector((state) => state.topic.statuses);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isNil(statuses)) {
      dispatch(companyActions.setIdeaStatus(statuses[0]));
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
          onChange={(value) => dispatch(companyActions.setIdeaStatus(value))}
          options={statuses}
          field="name"
          label={status?.name}
          type="status"
          size="full"
        />
        <IdeaPreview />
      </div>
    </>
  );
}
