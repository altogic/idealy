import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import useNotification from './useNotification';

export default function useUpdateIdea(idea) {
  const dispatch = useDispatch();
  const sendNotification = useNotification();
  const user = useSelector((state) => state.auth.user);
  const updateIdea = (req, onSuccess) => {
    if (!idea) return;
    const { message, ...rest } = req;
    dispatch(
      ideaActions.updateIdea({
        idea: {
          _id: idea._id,
          ...rest
        },
        onSuccess: (data) => {
          if (message) {
            sendNotification({
              targetUser: idea?.author?._id,
              message,
              ...(idea.author?._id === user._id && { targetUser: idea?.author?._id }),
              type: 'adminEditIdea',
              ideaId: idea._id
            });
          }
          onSuccess(data);
        }
      })
    );
  };
  return updateIdea;
}
