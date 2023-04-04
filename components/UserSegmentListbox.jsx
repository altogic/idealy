import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';

export default function UserSegmentListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const [segments, setSegments] = useState(idea?.userSegment);
  const updateIdea = useUpdateIdea(idea);

  function handleReset() {
    updateIdea({ userSegment: null });
    setSegments(null);
  }
  useEffect(() => {
    if (idea) {
      setSegments(idea?.userSegment);
    }
  }, [idea]);
  return (
    <BaseListBox
      value={segments}
      label={segments?.name}
      onChange={(value) => {
        setSegments(value);
        updateIdea({ userSegment: value._id });
      }}
      field="name"
      type="status"
      options={company?.userSegments}
      size={size}
      onReset={() => handleReset()}
    />
  );
}
