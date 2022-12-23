import { ideaActions } from '@/redux/ideas/ideaSlice';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { Archive, Bug, ChevronDown, ChevronUp, Eye, Thumbtack } from './icons';
import StatusButton from './StatusButton';
import TopicBadges from './TopicBadges';

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
            <h2 className="text-slate-800 text-xl font-semibold tracking-md">{idea?.title}</h2>
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
              <button type="button" className="inline-flex items-center gap-1 text-slate-400">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                32
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
