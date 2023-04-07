import Button from '@/components/Button';
import useNotification from '@/hooks/useNotification';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { toggleDeleteFeedBackModal } from '@/redux/general/generalSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function IdeaApproval() {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const loading = useSelector((state) => state.idea.isLoading);
  const company = useSelector((state) => state.company.company);
  const updateIdea = useUpdateIdea(idea);
  const dispatch = useDispatch();
  const sendNotification = useNotification();

  function handleApprove(isApproved) {
    updateIdea(
      {
        isApproved
      },
      () => {
        sendNotification({
          message: `Your idea <b>${idea.title}</b> has been approved by <b>${company?.name}</b>`,
          targetUser: idea?.author?._id,
          type: 'ideaApproved',
          url: `/public-view?feedback=${idea._id}`
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
