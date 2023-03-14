import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';

export default function StatusListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const [status, setStatus] = useState(idea?.status);

  useEffect(() => {
    if (idea) {
      setStatus(idea?.status);
    }
  }, [idea]);

  return (
    <BaseListBox
      value={status}
      label={status?.name}
      onChange={(value) => {
        setStatus(value);
        updateIdea({
          status: value._id,
          statusUpdatedAt: Date.now(),
          isCompleted: value.isCompletedStatus
        });
      }}
      field="name"
      options={company?.statuses}
      size={size}
      hidden="mobile"
      type="status"
    />
  );
}
