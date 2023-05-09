import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';

export default function CategoryListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const [category, setCategory] = useState();

  function handleReset() {
    updateIdea({ category: null, message: `The category of ${idea.title} cleared` });
    setCategory(null);
  }
  useEffect(() => {
    if (idea) {
      setCategory(idea?.category);
    }
  }, [idea]);
  return (
    <BaseListBox
      value={category}
      label={category?.name}
      onChange={(value) => {
        setCategory(value);
        updateIdea({
          category: value._id,
          message: `The category of <b>${idea.title}</b> changed to <b>${value.name}</b>`
        });
      }}
      field="name"
      options={company?.categories}
      size={size}
      type="status"
      onReset={() => handleReset()}
    />
  );
}
