import { commentActions } from '@/redux/comments/commentsSlice';
import { toggleDeleteCommentModal } from '@/redux/general/generalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Danger } from '../icons';
import InfoModal from '../InfoModal';

export default function CommentDeleteModal({ commentId, onClose }) {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const deleteCommentModal = useSelector((state) => state.general.deleteCommentModal);
  return (
    <InfoModal
      show={deleteCommentModal}
      onClose={() => onClose()}
      cancelOnClick={() => onClose()}
      onConfirm={() => {
        dispatch(toggleDeleteCommentModal());
        dispatch(commentActions.deleteComment({ commentId, ideaId: idea._id }));
        onClose();
      }}
      icon={<Danger className="w-6 h-6 icon-red" />}
      title="Delete Comment"
      description="Are you sure you want to delete this comment? This action cannot be undone."
      confirmText="Delete Comment"
      confirmColor="red"
      canCancel
    />
  );
}
