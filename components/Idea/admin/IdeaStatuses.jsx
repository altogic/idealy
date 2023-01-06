import { CircleCheck } from '@/components/icons';
import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaStatuses({ updateIdea }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const company = useSelector((state) => state.company.company);
  const idea = useSelector((state) => state.idea.selectedIdea);
  return (
    <IdeaAdminTab title="Statuses">
      <div className="flex flex-col gap-4">
        <RadioGroup
          value={selectedStatus}
          onChange={(status) => {
            updateIdea({
              status: status._id,
              statusUpdatedAt: Date.now(),
              isCompleted: status.isCompletedStatus
            });
            setSelectedStatus(status);
          }}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div>
            {company?.statuses?.map((status) => (
              <RadioGroup.Option
                key={status._id}
                value={status}
                className="relative flex cursor-pointer py-3 focus:outline-none">
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-2.5 w-2.5 mr-1.5" fill={status.color} viewBox="0 0 8 8">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked || idea?.status?.name === status.name
                              ? 'text-slate-400 dark:text-aa-400 purple:text-pt-400'
                              : 'text-slate-900 dark:text-aa-100 purple:text-pt-100'
                          }`}>
                          {status.name}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {(checked || idea?.status?.name === status.name) && (
                      <div className="flex-shrink-0 text-slate-900 dark:text-aa-100 purple:text-pt-100">
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
