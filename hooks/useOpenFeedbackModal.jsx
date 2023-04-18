import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';

export default function useOpenFeedbackModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  useEffect(() => {
    if (router.isReady && router.query.feedback && !feedBackDetailModal) {
      dispatch(
        ideaActions.getIdeaById({
          id: router.query.feedback,
          onSuccess: () => {
            dispatch(toggleFeedBackDetailModal());
          },
          onError: () => {
            router.push(
              {
                pathname: router.pathname,
                query: { ...router.query, feedback: undefined }
              },
              undefined,
              { scroll: false }
            );
          }
        })
      );
    }
  }, [router]);
}
