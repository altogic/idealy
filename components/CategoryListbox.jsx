import useAddCompanySublist from '@/hooks/useAddCompanySublist';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseListBox from './BaseListBox';
import Button from './Button';
import CreateModal from './CreateModal';
import { Plus, ThreeStar } from './icons';

export default function CategoryListbox({ size }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const [category, setCategory] = useState(idea?.category);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const updateIdea = useUpdateIdea(idea);
  const addCompanySubList = useAddCompanySublist();

  function handleReset() {
    updateIdea({ category: null, message: `The category of <b>${idea.title}</b> removed` });
    setCategory(null);
  }
  function handleUpdateIdea(value) {
    setCategory(value);
    updateIdea({
      category: value._id,
      message: `The category of <b>${idea.title}</b> changed to <b>${value.name}</b>`
    });
  }

  function handleCreateCategory(name) {
    addCompanySubList(name, 'categories', (data) => handleUpdateIdea(data));
  }

  useEffect(() => {
    if (idea) {
      const category = company?.categories.find((category) => category._id === idea?.category?._id);
      setCategory(category);
    }
  }, [idea]);
  return (
    <>
      <div>
        {!!company?.categories.length && (
          <BaseListBox
            value={category}
            label={category?.name}
            onChange={(value) => handleUpdateIdea(value)}
            field="name"
            options={company?.categories}
            size={size}
            type="status"
            onReset={() => handleReset()}
          />
        )}
        <Button
          variant="text"
          text="Add Category"
          icon={<Plus className="w-4 h-4 icon" />}
          onClick={() => setOpenCreateModal(true)}
        />
      </div>
      <CreateModal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        cancelOnClick={() => setOpenCreateModal(false)}
        createOnClick={(name) => handleCreateCategory(name)}
        icon={<ThreeStar className="w-6 h-6 icon-green" />}
        title="Add Category"
        description="Add a new category to your company"
        label="Category Name"
        id="category"
      />
    </>
  );
}
