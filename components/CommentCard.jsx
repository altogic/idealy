import { useState } from 'react';
import { DateTime } from 'luxon';
import Avatar from './Avatar';

export default function CommentCard({ comment }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-aa-800 purple:bg-pt-900 p-8 mt-2 rounded">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <Avatar src={comment?.profilePicture} alt={comment?.name} />
        <div className="w-full space-y-5">
          <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
            {comment?.name}
          </h6>
          <div className="prose prose-p:text-slate-500 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <div dangerouslySetInnerHTML={{ __html: comment?.text }} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
              {DateTime.fromISO(comment?.createdAt).toRelative()}
            </span>
            <svg
              className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
              fill="currentColor"
              viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            <button
              type="button"
              onClick={() => setIsReplying(!isReplying)}
              className="inline-flex text-indigo-600 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
              Reply
            </button>
          </div>
          {isReplying && (
            <div className="w-full">
              <textarea
                id="type-a-comment"
                name="type-a-comment"
                rows={5}
                className="block w-full bg-white dark:bg-aa-800 purple:bg-pt-800 text-slate-500 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm border border-gray-300 dark:border-aa-600 purple:border-pt-600 rounded-md placeholder:text-slate-500 dark:placeholder-aa-200 purple:placeholder-pt-200 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-aa-400 dark:focus:border-aa-400 purple:focus:ring-pt-400 purple:focus:border-pt-400"
                placeholder="Type a comment"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
