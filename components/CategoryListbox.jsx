import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import BaseListBox from './BaseListBox';

export default function CategoryListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const [category, setCategory] = useState();
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
        updateIdea({ category: value._id });
      }}
      field="name"
      options={company?.categories}
      size={size}
      hidden="mobile"
      type="status"
    />
  );
}
