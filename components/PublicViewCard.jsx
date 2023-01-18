import VoteIdea from '@/components/Idea/VoteIdea';
import { Comment } from './icons';
import IdeaBadges from './Idea/IdeaBadges';
import IdeaInfo from './Idea/IdeaInfo';
import StatusBadge from './StatusBadge';
import TopicBadges from './TopicBadges';

export default function PublicViewCard({ idea, onClick, voted }) {
  return (
    <div className="px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900">
      <div className="flex items-start lg:items-center gap-6">
        <VoteIdea voted={voted} voteCount={idea?.voteCount} ideaId={idea?._id} />
        <button type="button" onClick={onClick} className="w-full">
          <div className="flex items-center mb-2">
            {(idea?.isPrivate || idea?.isBug || idea?.isArchived || idea?.isPinned) && (
              <IdeaBadges idea={idea} />
            )}
            <h2
              className="max-w-[500px] text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left truncate"
              title={idea?.title}>
              {idea?.title}
            </h2>
          </div>
          <p
            className="max-w-3xl text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-6 text-sm tracking-sm text-left line-clamp-3"
            dangerouslySetInnerHTML={{ __html: idea?.content }}
          />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
            {/* Bottom Left */}

            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <IdeaInfo idea={idea} />
              {idea?.topics.length > 0 && (
                <>
                  <svg
                    className="hidden lg:block h-1 w-1 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <div className="flex flex-wrap items-center gap-3">
                    {idea?.topics.map((topic) => (
                      <TopicBadges key={topic} badgeName={topic} />
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Bottom Right */}
            <div className="flex items-center justify-between lg:justify-start gap-3">
              {/* Badges */}
              {idea?.status && (
                <StatusBadge name={idea?.status?.name} color={idea?.status?.color} />
              )}
              {/* Comments Button */}
              <div
                type="button"
                className="inline-flex items-center gap-1 text-slate-400 dark:text-aa-400 purple:text-pt-400">
                <Comment className="w-6 h-6" />
                {idea?.commentCount}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
