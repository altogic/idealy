import { DateTime } from 'luxon';
import Avatar from './Avatar';

export default function ReplyCard({ reply }) {
  return (
    <div className="bg-gray-50 dark:bg-aa-800 purple:bg-pt-900 p-8 mt-2 rounded">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <Avatar src={reply?.user?.profilePicture} alt={reply?.user?.name || 'Anonymous'} />
        <div className="w-full space-y-5">
          <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
            {reply?.user?.name || 'Anonymous'}
          </h6>
          <div className="prose prose-p:text-slate-500 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <p>{reply?.content}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
              {DateTime.fromISO(reply?.createdAt).setLocale('en').toRelative()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
