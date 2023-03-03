import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Avatar from './Avatar';
import IdeaBadges from './Idea/IdeaBadges';
import SanitizeHtml from './SanitizeHtml';
import UserCard from './UserCard';

export default function FeedbackCardDetail({ setMentionCardStyle }) {
  const idea = useSelector((state) => state.idea.selectedIdea);
  const [userCardStyle, setUserCardStyle] = useState({ top: 0, left: 0 });
  function hideUserCard() {
    setUserCardStyle({ display: 'none' });
    setMentionCardStyle({ display: 'none' });
  }

  useEffect(() => {
    const ideaDetail = document.getElementById('dashboard-idea-detail');
    ideaDetail?.addEventListener('click', hideUserCard);
    ideaDetail?.addEventListener('scroll', hideUserCard);
    document.body.addEventListener('click', hideUserCard);
    return () => {
      document.body.removeEventListener('click', hideUserCard);
      ideaDetail?.removeEventListener('click', hideUserCard);
      ideaDetail?.removeEventListener('scroll', hideUserCard);
    };
  }, []);
  return (
    <div>
      {idea &&
        (idea?.isPrivate ||
          idea?.isBug ||
          idea?.isArchived ||
          idea?.isPinned ||
          idea?.isMerged ||
          !idea?.isApproved) && <IdeaBadges idea={idea} />}
      <button
        type="button"
        className="flex items-center gap-2 my-4"
        onClick={(e) => {
          e.stopPropagation();
          const userCards = document.querySelectorAll('.idea-user-card');
          userCards.forEach((userCard) => {
            // eslint-disable-next-line no-param-reassign
            userCard.style.display = 'none';
          });
          setUserCardStyle({
            top: '-1rem',
            left: '1rem',
            display: 'flex'
          });
        }}>
        <Avatar
          src={idea?.author?.profilePicture || idea?.guestAvatar}
          alt={idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : idea?.name}
          size="w-6 h-6"
          fontSize="text-xs"
        />
        <span className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
          {idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : idea?.name}
        </span>
        <UserCard
          id="idea-user-card"
          profilePicture={idea?.author?.profilePicture || idea?.guestAvatar}
          name={idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : idea?.name}
          email={
            idea?.author ? idea?.author.email : idea?.guestEmail ? idea?.guestEmail : idea?.email
          }
          style={userCardStyle}
        />
      </button>

      <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-200 purple:prose-p:text-pt-200 prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-strong:text-slate-900 dark:prose-strong:text-aa-500 purple:prose-strong:text-pt-600 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-4">
        <SanitizeHtml id="idea-detail" html={idea?.content} />
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-block text-slate-400 py-1 text-xs tracking-sm whitespace-nowrap">
          {DateTime.fromISO(idea?.createdAt).toRelative({ locale: 'en' })}
        </span>
      </div>
    </div>
  );
}
