import BaseListBox from '@/components/BaseListBox';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { PRIORITY_VALUES } from 'constants';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function IdeaPriority() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const [priorityValues, setPriorityValues] = useState();
  const [benefitFactor, setBenefitFactor] = useState(idea?.benefitFactor);
  const [costFactor, setCostFactor] = useState(idea?.costFactor);

  const updateIdea = useUpdateIdea(idea);
  useEffect(() => {
    setPriorityValues(PRIORITY_VALUES[company?.priorityType]);
  }, [PRIORITY_VALUES]);

  useEffect(() => {
    if (idea) {
      setBenefitFactor(idea?.benefitFactor);
      setCostFactor(idea?.costFactor);
    }
  }, [idea]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
          Reward
        </span>
        <div className="mt-2">
          <BaseListBox
            value={benefitFactor}
            options={priorityValues}
            label={benefitFactor}
            size="sm"
            onChange={(selected) => {
              setBenefitFactor(selected);
              const benefitIndex = priorityValues.indexOf(selected);
              const costIndex = priorityValues.indexOf(
                company?.priorityType === 'fibonacci' ? Number(costFactor) : costFactor
              );
              // TODO: get weight from company settings
              updateIdea({
                benefitFactor: selected,
                priorityScore:
                  0.4 * PRIORITY_VALUES.default[benefitIndex] +
                  0.8 * idea.voteCount -
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
            value={costFactor}
            options={priorityValues}
            label={costFactor}
            size="sm"
            onChange={(selected) => {
              setCostFactor(selected);
              const benefitIndex = priorityValues.indexOf(
                company?.priorityType === 'fibonacci' ? Number(benefitFactor) : benefitFactor
              );
              const costIndex = priorityValues.indexOf(selected);
              updateIdea({
                costFactor: selected,
                priorityScore:
                  0.4 * PRIORITY_VALUES.default[benefitIndex] +
                  0.4 * idea.voteCount -
                  0.2 * PRIORITY_VALUES.default[costIndex]
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
