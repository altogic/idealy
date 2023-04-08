import { Danger } from '@/components/icons';
import InfoModal from '@/components/InfoModal';
import { useDispatch, useSelector } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { toggleDeleteFeedBackModal } from '@/redux/general/generalSlice';
import useNotification from '@/hooks/useNotification';

export default function DeleteIdeaModal({ onClose }) {
  const dispatch = useDispatch();
  const deleteFeedBackModal = useSelector((state) => state.general.deleteFeedBackModal);
  const selectedIdea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const sendNotification = useNotification();
  const handleDelete = () => {
    dispatch(toggleDeleteFeedBackModal());
    dispatch(
      ideaActions.deleteIdea({
        id: selectedIdea._id,
        onSuccess: () => {
          onClose();
          if (!selectedIdea.isApproved) {
            sendNotification({
              message: `Your idea <b>${selectedIdea.title}</b> has been rejected by <b>${company?.name}</b>`,
              targetUser: selectedIdea?.author?._id,
              type: 'ideaRejected',
              url: `/public-view`
            });
          }
        }
      })
    );
  };
  return (
    <InfoModal
      show={deleteFeedBackModal}
      onClose={() => dispatch(toggleDeleteFeedBackModal())}
      cancelOnClick={() => dispatch(toggleDeleteFeedBackModal())}
      onConfirm={handleDelete}
      icon={<Danger className="w-7 h-7 icon-red" />}
      title="Delete Idea"
      description="Are you sure you want to delete this idea? This action cannot be undone."
      confirmText="Delete Idea"
      confirmColor="red"
      canCancel
    />
  );
}
