import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';

export default function UserSegmentListbox({ size, onChange, value }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const [segments, setSegments] = useState(idea?.userSegment);
  const updateIdea = useUpdateIdea(idea);

  function handleReset() {
    if (onChange) onChange(null);
    else updateIdea({ userSegment: null, message: `The user segment of ${idea.title} cleared` });
    setSegments(null);
  }
  useEffect(() => {
    if (idea) {
      setSegments(value ?? idea?.userSegment);
    }
  }, [idea]);
  return (
    <BaseListBox
      value={segments}
      label={segments?.name}
      onChange={(value) => {
        setSegments(value);
        if (onChange) onChange(value);
        else
          updateIdea({
            userSegment: value._id,
            message: `The user segment of ${idea.title} changed to ${value.name}`
          });
      }}
      field="name"
      type="status"
      options={company?.userSegments}
      size={size}
      onReset={() => handleReset()}
    />
  );
}
