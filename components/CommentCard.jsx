import { DateTime } from 'luxon';
import Avatar from './Avatar';

export default function CommentCard({ comment }) {
  return (
    <div className="bg-gray-50 p-8 mt-2">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <div>
          <Avatar src={comment.profilePicture} alt={comment.name} />
        </div>
        <div className="space-y-5">
          <h6 className="text-slate-800 text-base tracking-sm">{comment.name}</h6>
          <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-sm tracking-sm">
              {DateTime.fromISO(comment.createdAt).toRelative()}
            </span>
            <svg className="h-1 w-1 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            <button type="button" className="inline-flex text-indigo-600 text-sm tracking-sm">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
