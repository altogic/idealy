import BaseListBox from '@/components/BaseListBox';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { calculateNormalizedPriority } from '@/utils/index';
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
    setPriorityValues(PRIORITY_VALUES.map((value) => value[company?.priorityType]));
  }, [PRIORITY_VALUES]);

  useEffect(() => {
    if (idea) {
      setBenefitFactor(idea?.benefitFactor);
      setCostFactor(idea?.costFactor);
    }
  }, [idea]);

  const updatePriority = (benefitFactor, costFactor) => {
    const benefitIndex = PRIORITY_VALUES.find(
      (value) => value[company?.priorityType] === benefitFactor
    ).default;

    const costIndex = PRIORITY_VALUES.find(
      (value) => value[company?.priorityType] === costFactor
    ).default;
    updateIdea({
      benefitFactor,
      costFactor,
      priorityScore: calculateNormalizedPriority(benefitIndex, idea?.voteCount, costIndex)
    });
  };

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
              updatePriority(selected, Number(costFactor));
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
              updatePriority(Number(benefitFactor), selected);
            }}
          />
        </div>
      </div>
    </div>
  );
}
