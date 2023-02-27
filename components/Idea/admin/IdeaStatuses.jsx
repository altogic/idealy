import { CircleCheck } from '@/components/icons';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { RadioGroup } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses() {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const loading = useSelector((state) => state.idea.isLoading);
  const changedIndex = useRef(null);

  const updateIdea = useUpdateIdea(idea);
  useEffect(() => {
    if (idea?.status) {
      setSelectedStatus(idea.status);
    }
  }, [idea]);
  const handleStatusChange = (status) => {
    changedIndex.current = company.statuses.indexOf(status);
    if (status._id !== idea?.status?._id) {
      updateIdea({
        status: status._id,
        statusUpdatedAt: Date.now(),
        isCompleted: status.isCompletedStatus
      });
      setSelectedStatus(status);
    } else {
      dispatch(ideaActions.deleteIdeaStatus(idea._id));
      setSelectedStatus(null);
    }
  };

  return (
    <IdeaAdminTab title="Statuses">
      <div className="flex flex-col gap-4">
        <RadioGroup value={selectedStatus} onChange={handleStatusChange} disabled={loading}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div>
            {company?.statuses?.map((status, index) => (
              <RadioGroup.Option
                key={status._id}
                value={status}
                disabled={loading}
                className="relative flex cursor-pointer py-3 focus:outline-none">
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <svg className="h-2.5 w-2.5 mr-1.5" fill={status.color} viewBox="0 0 8 8">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium whitespace-nowrap  ${
                            checked || selectedStatus?.name === status.name
                              ? 'text-slate-400 dark:text-aa-400 purple:text-pt-400'
                              : 'text-slate-900 dark:text-aa-200 purple:text-pt-200'
                          }`}>
                          {status.name}
                        </RadioGroup.Label>
                      </div>
                      {loading && index === changedIndex.current && (
                        <div className="flex items-center gap-2">
                          <ClipLoader size={15} color="#9CA3AF" loading={loading} />
                          <span className="text-xs text-slate-400 dark:text-aa-400 purple:text-pt-400">
                            Updating...
                          </span>
                        </div>
                      )}
                    </div>
                    {(checked || selectedStatus?.name === status.name) && !loading && (
                      <div className="flex-shrink-0 text-slate-900 dark:text-aa-200 purple:text-pt-200">
                        <CircleCheck className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </IdeaAdminTab>
  );
}
