import { ideaActions } from '@/redux/ideas/ideaSlice';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import useNotification from './useNotification';

export default function useUpdateIdea(idea) {
  const dispatch = useDispatch();
  const sendNotification = useNotification();
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.auth.user);
  const updateIdea = (req, onSuccess) => {
    dispatch(
      ideaActions.updateIdea({
        idea: {
          _id: idea._id,
          ...req
        },
        onSuccess: (data) => {
          if (!_.has(req, 'status') && !_.has(req, 'isApproved')) {
            sendNotification({
              targetUser: idea?.author?._id,
              message: `<b>${idea.title}</b> has been updated by <b>${
                idea.author?._id === user._id ? idea?.author?.name : company?.name
              }</b>`,
              ...(idea.author?._id === user._id && { targetUser: idea?.author?._id }),
              type: 'adminEditIdea',
              url: `public-view?feedback=${idea._id}`
            });
          }
          onSuccess(data);
        }
      })
    );
  };
  return updateIdea;
}
