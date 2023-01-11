import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { Merge, Archive, Thumbtack, Trash, Pen, Bug } from '@/components/icons';
import IdeaActionButton from './IdeaActionButton';

export default function IdeaActions({ updateIdea }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-50 dark:bg-aa-800 purple:bg-pt-900 p-6">
      <p className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
        Actions
      </p>
      <hr className="my-2 border-slate-200 dark:border-aa-400 purple:border-pt-400" />
      <div className="flex w-full flex-row space-x-2">
        <IdeaActionButton
          type="Pin"
          onClick={() => updateIdea({ isPinned: !idea.isPinned })}
          Icon={Thumbtack}
          color="green"
          control={idea?.isPinned}
        />
        <IdeaActionButton
          type="Archive"
          onClick={() => updateIdea({ isArchived: !idea.isArchived })}
          Icon={Archive}
          color="orange"
          control={idea?.isArchived}
        />
        <IdeaActionButton
          type="Bug"
          onClick={() => updateIdea({ isBug: !idea.isBug })}
          Icon={Bug}
          control={idea?.isBug}
          color="red"
        />
        <IdeaActionButton
          type="Merge"
          Icon={Merge}
          onClick={() => dispatch(toggleDeleteFeedBackModal())}
          color="pink"
        />
        <IdeaActionButton
          type="Delete"
          Icon={Trash}
          color="red"
          onClick={() => dispatch(toggleDeleteFeedBackModal())}
        />
        <IdeaActionButton
          type="Edit"
          Icon={Pen}
          color="blue"
          onClick={() => dispatch(toggleFeedBackSubmitModal())}
        />
      </div>
    </div>
  );
}
