/* eslint-disable no-param-reassign */
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Avatar from '../Avatar';
import UserCard from '../UserCard';

export default function IdeaInfo({ idea, detail }) {
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const [userCardStyle, setUserCardStyle] = useState({ top: 0, left: 0 });
  function hideUserCard() {
    setUserCardStyle({ display: 'none' });
  }

  useEffect(() => {
    if (feedBackDetailModal) {
      const ideaDetail = document.querySelector('.drawer-body');
      ideaDetail.addEventListener('click', hideUserCard);
    }
    document.body.addEventListener('click', hideUserCard);
    return () => {
      document.body.removeEventListener('click', hideUserCard);
    };
  }, [feedBackDetailModal]);
  return (
    <div className="flex flex-wrap items-center sm:items-center gap-4">
      <button
        className="flex items-center gap-4"
        type="button"
        onClick={(e) => {
          e.stopPropagation();

          const userCards = document.querySelectorAll('#idea-user-card');
          userCards.forEach((userCard) => {
            userCard.style.display = 'none';
          });
          e.currentTarget.childNodes[1].style.display = 'flex';
          setUserCardStyle({
            top: detail ? '-6rem' : '3rem',
            left: detail ? '-6rem' : '2.5rem',
            display: 'flex'
          });
        }}>
        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar
            src={idea?.author?.profilePicture || idea?.guestAvatar}
            alt={
              !_.isEmpty(idea?.author)
                ? idea?.author.name
                : idea?.guestName
                ? idea?.guestName
                : idea?.name
            }
            size="w-7 h-7"
            fontSize="text-xs"
          />
          <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
            {!_.isEmpty(idea?.author)
              ? idea?.author.name
              : idea?.guestName
              ? idea?.guestName
              : idea?.name}
          </span>
        </div>

        <UserCard
          id="idea-user-card"
          profilePicture={idea?.author?.profilePicture || idea?.guestAvatar}
          name={
            !_.isEmpty(idea?.author)
              ? idea?.author.name
              : idea?.guestName
              ? idea?.guestName
              : idea?.name
          }
          email={
            !_.isEmpty(idea?.author)
              ? idea?.author.email
              : idea?.guestEmail
              ? idea?.guestEmail
              : idea?.email
          }
          style={userCardStyle}
        />
      </button>
      <svg
        className="hidden lg:block h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
        fill="currentColor"
        viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {/* Date */}
      <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
        {DateTime.fromISO(idea?.createdAt).setLocale('en').toRelative()}
      </span>
    </div>
  );
}
