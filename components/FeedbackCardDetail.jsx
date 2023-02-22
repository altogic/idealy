import {
  toggleDeleteFeedBackModal,
  toggleFeedBackDetailModal,
  toggleFeedBackSubmitModal
} from '@/redux/general/generalSlice';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import ButtonBadge from './ButtonBadge';
import { Pen, Reply, Spam, Trash } from './icons';
import IdeaBadges from './Idea/IdeaBadges';
import SanitizeHtml from './SanitizeHtml';

export default function FeedbackCardDetail({ setEditedIdea }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const ideaActionButtons = [
    {
      id: 1,
      name: 'Edit',
      icon: <Pen className="w-3 h-3 text-gray-500 dark:text-aa-200 purple:text-pt-200" />,
      onClick: () => {
        setEditedIdea(idea);
        dispatch(toggleFeedBackSubmitModal());
      }
    },
    {
      id: 2,
      name: 'Add Comment',
      icon: <Reply className="w-3 h-3 text-gray-500 dark:text-aa-200 purple:text-pt-200" />,
      onClick: () => {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, commentType: 'new' }
        });
        dispatch(toggleFeedBackDetailModal());
      }
    },
    {
      id: 3,
      name: 'Spam',
      icon: <Spam className="w-3 h-3 text-gray-500 dark:text-aa-200 purple:text-pt-200" />,
      onClick: () => {}
    },
    {
      id: 4,
      name: 'Delete',
      icon: <Trash className="w-3 h-3 text-gray-500 dark:text-aa-200 purple:text-pt-200" />,
      onClick: () => dispatch(toggleDeleteFeedBackModal())
    }
  ];
  return (
    <>
      <div className="group">
        {(idea?.isPrivate ||
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
          {/* opacity-0 group-hover:opacity-100 */}
          <div className="flex items-center gap-3 transition opacity-0 group-hover:opacity-100">
            {ideaActionButtons.map((action, index) => (
              <>
                <ButtonBadge
                  key={action.id}
                  icon={action.icon}
                  name={action.name}
                  onClick={() => action.onClick(idea?._id)}
                />
                {index < ideaActionButtons.length - 1 && (
                  <svg className="h-1.5 w-1.5 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      {/* Delete Modal */}
    </>
  );
}
