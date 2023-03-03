import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import IdeaBadges from './Idea/IdeaBadges';
import SanitizeHtml from './SanitizeHtml';

export default function FeedbackCardDetail() {
  const idea = useSelector((state) => state.idea.selectedIdea);

  return (
    <div>
      {idea &&
        (idea?.isPrivate ||
          idea?.isBug ||
          idea?.isArchived ||
          idea?.isPinned ||
          idea?.isMerged ||
          !idea?.isApproved) && <IdeaBadges idea={idea} />}
      <div className="flex items-center gap-2 my-4">
        <Avatar
          src={idea?.author?.profilePicture || idea?.guestAvatar}
          alt={idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : idea?.name}
          size="w-6 h-6"
          fontSize="text-xs"
        />
        <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
          {idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : idea?.name}
        </span>
      </div>

      <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-200 purple:prose-p:text-pt-200 prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-strong:text-slate-900 dark:prose-strong:text-aa-500 purple:prose-strong:text-pt-600 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-4">
        <SanitizeHtml id="dashboard-idea-detail" html={idea?.content} />
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-block text-slate-400 py-1 text-xs tracking-sm whitespace-nowrap">
          {DateTime.fromISO(idea?.createdAt).toRelative({ locale: 'en' })}
        </span>
      </div>
    </div>
  );
}
