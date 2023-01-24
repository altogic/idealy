import useIdeaActionValidation from '@/hooks/useIdeaActionValidation';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar';
import InfoModal from './InfoModal';
import { Danger, Pen, Trash } from './icons';
import ReplyForm from './ReplyForm';

export default function ReplyCard({ reply }) {
  const [isDelete, setIsDelete] = useState(false);
  const [editReply, setEditReply] = useState();
  const canEdit = useIdeaActionValidation(reply);
  const dispatch = useDispatch();

  return editReply ? (
    <ReplyForm reply={reply} setIsReplying={setEditReply} />
  ) : (
    <div className="group bg-gray-50 dark:bg-aa-800 purple:bg-pt-900 rounded">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <Avatar
          src={reply?.user?.profilePicture}
          alt={reply?.user?.name || 'Anonymous'}
          size="w-7 h-7"
          fontSize="text-sm"
        />
        <div className="w-full space-y-3">
          <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
            {reply?.user?.name || 'Anonymous'}
          </h6>
          <div className="prose prose-p:my-0 prose-p:text-slate-500 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <p>{reply?.content}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
              {DateTime.fromISO(reply?.createdAt).setLocale('en').toRelative()}
            </span>
            {canEdit && (
              <div className=" hidden group-hover:flex items-center gap-3">
                <svg
                  className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                  fill="currentColor"
                  viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 dark:text-aa-200 purple:text-pt-200 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-blue-400 purple:hover:bg-gray-700 purple:hover:text-blue-400"
                  type="button"
                  onClick={() => setEditReply(true)}>
                  <Pen />
                </button>
                <button
                  type="button"
                  onClick={() => setIsDelete(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:text-red-600 dark:text-aa-200 purple:text-pt-200 hover:bg-red-100 dark:hover:bg-gray-700 dark:hover:text-red-400 purple:hover:bg-gray-700 purple:hover:text-red-400">
                  <Trash />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() =>
          dispatch(
            repliesActions.deleteReply({
              replyId: reply._id,
              commentId: reply.commentId
            })
          )
        }
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Reply"
        description="Are you sure you want to delete this reply? This action cannot be undone."
        confirmText="Delete Reply"
        confirmColor="red"
        canCancel
      />
    </div>
  );
}
