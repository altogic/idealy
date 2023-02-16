import BaseListBox from '@/components/BaseListBox';
import { PRIORITY_VALUES } from 'constants';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import IdeaAdminTab from './IdeaAdminTab';

export default function IdeaPriority() {
  const [benefitFactor, setBenefitFactor] = useState();
  const [costFactor, setCostFactor] = useState();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    setBenefitFactor(idea?.benefitFactor);
    setCostFactor(idea?.costFactor);
  }, [idea]);

  const updateIdea = useUpdateIdea(idea);
  // const handleChangePriority = (selected) => {
  //   const benefitIndex = PRIORITY_VALUES[company?.priorityType].indexOf(selected) + 1;
  //   const costIndex = PRIORITY_VALUES[company?.priorityType].indexOf(Number(costFactor)) + 1;
  //   const voteCount = idea?.voteCount || 1;
  //   updateIdea({
  //     benefitFactor,
  //     costFactor,
  //     priorityScore:
  //       0.4 * PRIORITY_VALUES.default[benefitIndex] +
  //       0.4 * voteCount +
  //       0.2 * PRIORITY_VALUES.default[costIndex]
  //   });
  // };

  return (
    <IdeaAdminTab title="Priority">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
            Reward
          </span>
          <div className="mt-2">
            <BaseListBox
              value={benefitFactor}
              options={PRIORITY_VALUES[company?.priorityType]}
              label={benefitFactor}
              size="sm"
              onChange={(selected) => {
                setBenefitFactor(selected);
                const benefitIndex = PRIORITY_VALUES[company?.priorityType].indexOf(selected);
                const costIndex = PRIORITY_VALUES[company?.priorityType].indexOf(
                  company?.priorityType === 'fibonacci' ? Number(costFactor) : costFactor
                );
                // TODO: get weight from company settings
                updateIdea({
                  benefitFactor: selected,
                  priorityScore:
                    0.4 * PRIORITY_VALUES.default[benefitIndex] +
                    0.8 * idea.voteCount +
                    0.2 * PRIORITY_VALUES.default[costIndex]
                });
              }}
            />
          </div>
        </div>
        <div>
          <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
            Effort
          </span>
          <div className="mt-2">
            <BaseListBox
              value={setCostFactor}
              options={PRIORITY_VALUES[company?.priorityType]}
              label={costFactor}
              size="sm"
              onChange={(selected) => {
                setCostFactor(selected);
                const benefitIndex = PRIORITY_VALUES[company?.priorityType].indexOf(
                  company?.priorityType === 'fibonacci' ? Number(benefitFactor) : benefitFactor
                );
                const costIndex = PRIORITY_VALUES[company?.priorityType].indexOf(selected);
                updateIdea({
                  costFactor: selected,
                  priorityScore:
                    0.4 * PRIORITY_VALUES.default[benefitIndex] +
                    0.4 * idea.voteCount +
                    0.2 * PRIORITY_VALUES.default[costIndex]
                });
              }}
            />
          </div>
        </div>
      </div>
    </IdeaAdminTab>
  );
}
