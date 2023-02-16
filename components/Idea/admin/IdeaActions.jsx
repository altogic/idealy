import Divider from '@/components/Divider';
import { Archive, Bug, Merge, Pen, Thumbtack, Trash } from '@/components/icons';
import MergeModal from '@/components/MergeModal';

import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IdeaActionButton from './IdeaActionButton';

export default function IdeaActions() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const dispatch = useDispatch();
  const updateIdea = useUpdateIdea(idea);
  const [openMergeModal, setOpenMergeModal] = useState(false);

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
      <MergeModal openMergeModal={openMergeModal} setOpenMergeModal={setOpenMergeModal} />
    </div>
  );
}
