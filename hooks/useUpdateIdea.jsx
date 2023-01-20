import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch } from 'react-redux';

export default function useUpdateIdea(idea) {
  const dispatch = useDispatch();
  const updateIdea = (req) => {
    dispatch(
      ideaActions.updateIdea({
        _id: idea._id,
        ...req
      })
    );
  };
  return updateIdea;
}
