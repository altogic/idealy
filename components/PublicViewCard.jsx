import { ideaActions } from '@/redux/ideas/ideaSlice';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { Archive, Bug, ChevronDown, ChevronUp, Comment, Eye, Thumbtack } from './icons';
import StatusButton from './StatusButton';
import TopicBadges from './TopicBadges';
import { toggleCommentFormModal } from '@/redux/general/generalSlice';

export default function PublicViewCard({ idea, onClick, voted }) {
  const dispatch = useDispatch();

  const upVote = () => {
    dispatch(ideaActions.voteIdea(idea._id));
  };
  const downVote = () => {
    dispatch(ideaActions.downvoteIdea(idea._id));
  };
  return (
    <div className="px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-50 ]">
      <div className="flex items-start lg:items-center gap-6">
        <div
          className={`flex flex-col items-center bg-white px-3 md:px-5 border rounded-lg h-20 ${
            voted ? 'border-indigo-500' : 'border-gray-400'
          }`}>
          <button
            type="button"
            onClick={upVote}
            disabled={voted}
            className="inline-flex items-center justify-center">
            <ChevronUp className={`w-5 h-5 ${voted ? ' text-indigo-900' : 'text-slate-400'} `} />
          </button>
          <span className="text-indigo-700 text-2xl font-semibold tracking-md">
            {idea?.voteCount}
          </span>
          {idea?.voteCount > 0 && (
            <button
              type="button"
              onClick={downVote}
              className="inline-flex items-center justify-center">
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>
        <button type="button" onClick={onClick} className="w-full">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-slate-800 text-xl font-semibold tracking-md w-2/3 truncate">
              {idea?.title}
            </h2>
            {idea?.isPinned && (
              <span className="inline-flex items-center rounded-full bg-orange-50 py-1 px-2 text-xs font-medium text-orange-700">
                <Thumbtack className="w-3 h-3 mr-1 text-orange-500" />
                Pinned
              </span>
            )}
            {idea?.isArchived && (
              <span className="inline-flex items-center rounded-full bg-yellow-50 py-1 px-2 text-xs font-medium text-yellow-700">
                <Archive className="w-3 h-3 mr-1 text-yellow-500" />
                Archived
              </span>
            )}
            {idea?.isPrivate && (
              <span className="inline-flex items-center rounded-full bg-blue-50 py-1 px-2 text-xs font-medium text-blue-700">
                <Eye className="w-3 h-3 mr-1 text-blue-500" />
                Private
              </span>
            )}
            {idea?.isBug && (
              <span className="inline-flex items-center rounded-full bg-red-50 py-1 px-2 text-xs font-medium text-red-700">
                <Bug className="w-3 h-3 mr-1 text-red-500" />
                Bug
              </span>
            )}
          </div>
          <p
            className="max-w-3xl text-slate-500 mb-6 text-sm tracking-sm text-left line-clamp-3"
            dangerouslySetInnerHTML={{ __html: idea?.content }}
          />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Bottom Left */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
              <div className="flex items-center gap-3">
                {/* User */}
                <span className="text-slate-700 text-sm font-medium tracking-sm">
                  {idea?.author
                    ? idea?.author.name
                    : idea?.guestName
                    ? idea?.guestName
                    : 'Anonymous'}
                </span>
                <svg className="h-1 w-1 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                {/* Date */}
                <span className="text-slate-500 text-sm tracking-sm">
                  {DateTime.fromISO(idea?.createdAt).setLocale('en').toRelative()}
                </span>
              </div>
              <svg
                className="hidden lg:block h-1 w-1 text-slate-500"
                fill="currentColor"
                viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
              </svg>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {idea?.topics.map((topic) => (
                  <TopicBadges key={topic} badgeName={topic} />
                ))}
              </div>
            </div>
            {/* Bottom Right */}
            <div className="flex items-center justify-between lg:justify-start gap-3">
              {/* Badges */}
              {idea?.status && (
                <StatusButton name={idea?.status?.name} color={idea?.status?.color} />
              )}
              {/* Comments Button */}
              <button
                type="button"
                className="inline-flex items-center gap-1 text-slate-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                  dispatch(toggleCommentFormModal());
                }}>
                <Comment className="w-6 h-6" />
                {idea?.commentCount}
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
