import Button from '@/components/Button';
import useNotification from '@/hooks/useNotification';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal } from '@/redux/general/generalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function IdeaApproval() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const [loading, setLoading] = useState(false);
  const updateIdea = useUpdateIdea(idea);
  const dispatch = useDispatch();
  const sendNotification = useNotification();

  function handleApprove(isApproved) {
    setLoading(true);
    updateIdea(
      {
        isApproved
      },
      () => {
        setLoading(false);
        sendNotification({
          message: `Your idea <b>${idea.title}</b> has been approved`,
          targetUser: idea?.author?._id,
          type: 'ideaApproved',
          ideaId: idea._id
        });
      }
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={() => handleApprove(true)}
        text="Approve"
        variant="indigo"
        loading={loading}
        fullWidth
        size="sm"
        height="10"
      />
      <Button
        type="button"
        onClick={() => dispatch(toggleDeleteFeedBackModal())}
        text="Reject"
        variant="red"
        fullWidth
        size="sm"
        height="10"
      />
    </div>
  );
}
