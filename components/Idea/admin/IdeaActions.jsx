import Divider from '@/components/Divider';
import { Archive, Bug, Merge, Pen, Thumbtack, Trash } from '@/components/icons';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import Button from '@/components/Button';
import ideaService from '@/services/idea';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import IdeaActionButton from './IdeaActionButton';

export default function IdeaActions() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const loading = useSelector((state) => state.idea.loading);
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const updateIdea = useUpdateIdea(idea);
  const [openMergeModal, setOpenMergeModal] = useState(false);
  const [baseIdea, setBaseIdea] = useState(null);
  const ideaActionButtons = [
    {
      type: 'Pin',
      onClick: () => updateIdea({ isPinned: !idea.isPinned }),
      Icon: Thumbtack,
      color: 'green',
      control: idea.isPinned
    },
    {
      type: 'Archive',
      onClick: () => updateIdea({ isArchived: !idea.isArchived }),
      Icon: Archive,
      color: 'yellow',
      control: idea.isArchived
    },
    {
      type: 'Bug',
      onClick: () => updateIdea({ isBug: !idea.isBug }),
      Icon: Bug,
      color: 'rose',
      control: idea.isBug
    },
    {
      type: 'Merge',
      onClick: () => setOpenMergeModal(true),
      Icon: Merge,
      color: 'pink'
    },
    {
      type: 'Delete',
      Icon: Trash,
      color: 'red',
      onClick: () => dispatch(toggleDeleteFeedBackModal())
    },
    {
      type: 'Edit',
      Icon: Pen,
      color: 'blue',
      onClick: () => dispatch(toggleFeedBackSubmitModal())
    }
  ];
  const filterIdeas = async (inputValue) => {
    const { data, errors } = await ideaService.searchSimilarIdeas(inputValue, company._id);
    if (errors) {
      return [];
    }
    return data.map((idea) => ({ value: idea._id, label: idea.title }));
  };
  const handleMerge = (e) => {
    e.preventDefault();
    dispatch(ideaActions.mergeIdeas({ baseIdea, mergedIdea: idea._id }));
  };

  return (
    <div className="bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-4">
      <p className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
        Actions
      </p>
      <Divider className="my-2" />
      <div className="flex w-full flex-row space-x-2">
        {ideaActionButtons.map((action) => (
          <IdeaActionButton
            key={action.type}
            type={action.type}
            color={action.color}
            control={action.control}
            Icon={action.Icon}
            onClick={action.onClick}
          />
        ))}
      </div>
      <Modal open={openMergeModal} onClose={() => setOpenMergeModal(false)} size="xl">
        <div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 mb-8 lg:mb-4">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ring-8 bg-gray-200 dark:bg-aa-200 purple:bg-pt-200  ring-gray-100 dark:ring-aa-100 purple:ring-pt-100">
              <Merge className="w-5 h-5 text-gray-500 dark:text-aa-100 purple:text-pt-100" />
            </span>

            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
                Merge Idea
              </h2>
              <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
                Merging an idea will move all votes, comments, and attachments to the selected idea.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <form onSubmit={handleMerge} className="px-8">
              <AsyncSelect
                cacheOptions
                loadOptions={filterIdeas}
                defaultOptions
                placeholder="Search for an idea"
                className="w-full"
                isLoading={loading}
                isClearable
                onChange={(idea) => {
                  setBaseIdea(idea.value);
                }}
              />
              <div className="flex items-center mt-10">
                <Input
                  id="privacyPolicy"
                  aria-describedby="privacyPolicy"
                  name="privacyPolicy"
                  type="checkbox"
                  // register={register('privacyPolicy')}
                  // error={errors.privacyPolicy}
                  label="Votes will combine with the winning idea."
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:focus:aa-indigo-500 purple:focus:ring-pt-500 dark:bg-aa-800 purple:bg-pt-800 checked:bg-aa-600 checked:purple:bg-pt-600 "
                />
              </div>
              <div className="flex justify-end gap-2 my-8">
                <Button
                  type="button"
                  text="Cancel"
                  variant="blank"
                  onClick={() => {
                    setOpenMergeModal(false);
                    // reset();
                  }}
                />
                <Button type="submit" variant="indigo" text="Submit" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
