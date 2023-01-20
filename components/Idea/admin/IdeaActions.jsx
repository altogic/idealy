import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { Merge, Archive, Thumbtack, Trash, Pen, Bug } from '@/components/icons';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import IdeaActionButton from './IdeaActionButton';

export default function IdeaActions() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const dispatch = useDispatch();
  const updateIdea = useUpdateIdea(idea);
  const ideaActions = [
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
      color: 'red',
      control: idea.isBug
    },
    {
      type: 'Merge',
      onClick: () => {},
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
      <hr className="my-2 border-slate-200 dark:border-aa-600 purple:border-pt-800" />
      <div className="flex w-full flex-row space-x-2">
        {ideaActions.map((action) => (
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
    </div>
  );
}
