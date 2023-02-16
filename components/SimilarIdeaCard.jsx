import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import IdeaInfo from './Idea/IdeaInfo';
import SanitizeHtml from './SanitizeHtml';

export default function SimilarIdeaCard({ idea }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const feedBackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  return (
    <button
      type="button"
      className="w-full px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900"
      onClick={() => {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              feedback: idea._id
            }
          },
          undefined,
          { scroll: false }
        );
        dispatch(ideaActions.setSelectedIdea(idea));
        if (feedBackSubmitModal) {
          dispatch(toggleFeedBackSubmitModal());
          dispatch(toggleFeedBackDetailModal());
        }
      }}>
      <div className="flex items-start lg:items-center gap-6">
        <div className="flex flex-col items-center justify-center bg-white dark:bg-aa-50 purple:bg-pt-50 dark:bg-opacity-10 purple:bg-opacity-10 py-2 px-3 border border-gray-300 dark:border-aa-600 purple:border-pt-800 rounded-lg">
          <span className="text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md">
            {idea?.voteCount}
          </span>
          <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
            {idea?.voteCount <= 1 ? 'Vote' : 'Votes'}
          </span>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="max-w-[700px] text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left truncate"
              title={idea?.title}>
              {idea?.title}
            </h3>
          </div>
          <SanitizeHtml
            className="max-w-3xl text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-6 text-sm tracking-sm text-left line-clamp-1"
            content={idea?.content}
          />
          <IdeaInfo idea={idea} />
        </div>
      </div>
    </button>
  );
}
