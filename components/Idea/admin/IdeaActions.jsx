import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { Merge, Archive, Thumbtack, Trash, Pen, Bug } from '@/components/icons';
import IdeaActionButton from './IdeaActionButton';

export default function IdeaActions({ updateIdea }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const dispatch = useDispatch();
  const ideaActions = [
    {
      type: 'Pin',
      onClick: () => updateIdea({ isPinned: !idea.isPinned }),
      Icon: Thumbtack,
      color: `hover:text-green-500 ${idea?.isPinned ? 'text-green-500' : ''}`
    },
    {
      type: 'Archive',
      onClick: () => updateIdea({ isArchived: !idea.isArchived }),
      Icon: Archive,
      color: `hover:text-orange-500 ${idea?.isArchived ? 'text-orange-500' : ''}`
    },
    {
      type: 'Bug',
      onClick: () => updateIdea({ isBug: !idea.isBug }),
      Icon: Bug,
      color: `hover:text-red-500 ${idea?.isBug ? 'text-red-500' : ''}`
    },
    {
      type: 'Merge',
      onClick: () => {},
      Icon: Merge,
      color: 'hover:text-pink-500'
    },
    {
      type: 'Delete',
      Icon: Trash,
      color: 'hover:text-red-500',
      onClick: () => dispatch(toggleDeleteFeedBackModal())
    },
    {
      type: 'Edit',
      Icon: Pen,
      color: 'hover:text-blue-500',
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
            Icon={action.Icon}
            color={action.color}
            onClick={action.onClick}
            control={action.control}
          />
        ))}
      </div>
    </div>
  );
}
