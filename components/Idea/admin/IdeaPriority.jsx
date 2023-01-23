import BaseListBox from '@/components/BaseListBox';
import Input from '@/components/Input';
import { PRIORITY_VALUES } from 'constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaPriority() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const [benefitFactor, setBenefitFactor] = useState(2);
  const [costFactor, setCostFactor] = useState(2);
  const company = useSelector((state) => state.company.company);
  return (
    <IdeaAdminTab title="Priority">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
            Vote
          </span>
          <div className="mt-2">
            <Input value={idea?.voteCount} disabled />
          </div>
        </div>
        <div>
          <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
            Benefit
          </span>
          <div className="mt-2">
            <BaseListBox
              value={benefitFactor}
              onChange={setBenefitFactor}
              options={PRIORITY_VALUES[company?.priorityType]}
              label={benefitFactor}
              size="sm"
            />
          </div>
        </div>
        <div>
          <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
            Cost
          </span>
          <div className="mt-2">
            <BaseListBox
              value={setCostFactor}
              onChange={setCostFactor}
              options={PRIORITY_VALUES[company?.priorityType]}
              label={costFactor}
              size="sm"
            />
          </div>
        </div>
      </div>
    </IdeaAdminTab>
  );
}
