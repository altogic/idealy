import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';

export default function useOpenFeedbackModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const isGuest = useSelector((state) => state.company.isGuest);
  useEffect(() => {
    if (router.isReady && router.query.feedback && !feedBackDetailModal) {
      dispatch(
        ideaActions.getIdeaById({
          filter: [
            `this._id == '${router.query.feedback}' &&  this.isMerged == false`,
            isGuest &&
              'this.isApproved == true && this.isArchived == false && this.isCompleted == false && this.isPrivate == false && this.isDeleted == false'
          ]
            .filter(Boolean)
            .join(' && '),
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
