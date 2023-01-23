import { DateTime } from 'luxon';
import Avatar from '../Avatar';

export default function IdeaInfo({ idea }) {
  return (
    <>
      {/* Author */}
      <Avatar
        src={idea?.author?.profilePicture}
        alt={idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : 'Anonymous'}
        size="w-7 h-7"
        fontSize="text-xs"
      />
      <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
        {idea?.author ? idea?.author.name : idea?.guestName ? idea?.guestName : 'Anonymous'}
      </span>
      <svg
        className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
        fill="currentColor"
        viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {/* Date */}
      <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
        {DateTime.fromISO(idea?.createdAt).setLocale('en').toRelative()}
      </span>
    </>
  );
}
