import { useDispatch } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import cn from 'classnames';
import useRouteIdea from '@/hooks/useRouteIdea';
import { Comment } from './icons';
import StatusBadge from './StatusBadge';
import TopicBadges from './TopicBadges';
import SanitizeHtml from './SanitizeHtml';

export default function DashboardIdeaCard({ idea, selected, id }) {
  const dispatch = useDispatch();
  const routeIdea = useRouteIdea();

  return (
    <button
      id={id}
      type="button"
      className={cn(
        'px-8 py-6 text-left  border-transparent transition hover:shadow-md',
        selected
          ? 'border-2 border-indigo-700 dark:border-aa-100 purple:border-pt-100'
          : 'hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900'
      )}
      onClick={() => {
        dispatch(ideaActions.setSelectedIdea(idea));
        routeIdea(idea?._id);
      }}>
      <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-2 text-base font-medium tracking-sm max-w-[420px] lg:truncate">
        {idea?.title}
      </h6>
      <SanitizeHtml
        className="max-w-3xl text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-6 text-sm tracking-sm text-left line-clamp-3"
        html={idea?.content}
      />

      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm tracking-sm">
            <svg
              className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 10L10 6.66667M10 6.66667L6.66667 10M10 6.66667V13.3333M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {idea?.voteCount}
          </span>
          <svg className="h-1.5 w-1.5 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm tracking-sm">
            <Comment className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
            {idea?.commentCount}
          </span>
        </div>

        {idea?.status && (
          <StatusBadge
            className="whitespace-nowrap"
            name={idea?.status?.name}
            color={idea?.status?.color}
          />
        )}
      </div>
      <div className="mt-4">
        {idea?.topics?.length > 0 && (
          <div className="flex items-center justify-end gap-3">
            {idea?.topics.map((topic) => (
              <TopicBadges key={topic} badgeName={topic} />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
