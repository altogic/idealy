import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch } from 'react-redux';

export default function useUpdateIdea(idea) {
  const dispatch = useDispatch();
  const updateIdea = (req) => {
    dispatch(
      ideaActions.updateIdea({
        idea: {
          _id: idea._id,
          ...req
        }
      })
    );
  };
  return updateIdea;
}
