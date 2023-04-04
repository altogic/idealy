import VoteIdea from '@/components/Idea/VoteIdea';
import { Comment } from './icons';
import IdeaBadges from './Idea/IdeaBadges';
import IdeaInfo from './Idea/IdeaInfo';
import SanitizeHtml from './SanitizeHtml';
import StatusBadge from './StatusBadge';
import TopicBadges from './TopicBadges';

export default function PublicViewCard({ idea, onClick }) {
  return (
    <div className="relative px-2 py-6 lg:p-6 inline-block w-full rounded-lg transition hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900">
      <div className="flex gap-6">
        <VoteIdea voteCount={idea?.voteCount} idea={idea} />
        <button type="button" onClick={onClick} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 mb-2">
            {(idea?.isPrivate ||
              idea?.isBug ||
              idea?.isArchived ||
              idea?.isPinned ||
              idea?.isMerged ||
              !idea?.isApproved) && <IdeaBadges idea={idea} />}
            <h2
              className="max-w-[500px] text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left lg:truncate"
              title={idea?.title}>
              {idea?.title}
            </h2>
          </div>
          <SanitizeHtml
            className="max-w-3xl text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-6 text-sm tracking-sm text-left line-clamp-3"
            html={idea?.content}
          />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
            {/* Bottom Left */}

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-2 mb-4 lg:mb-0">
              <IdeaInfo idea={idea} />
              {idea?.topics?.length > 0 && (
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
              <div className="inline-flex items-center gap-1 text-slate-400 dark:text-aa-400 purple:text-pt-400">
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
