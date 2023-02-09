import useIdeaActionValidation from '@/hooks/useIdeaActionValidation';
import { commentActions } from '@/redux/comments/commentsSlice';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import CommentSkeleton from './CommentSkeleton';
import Divider from './Divider';
import { Danger, Pen, Trash } from './icons';
import InfoModal from './InfoModal';
import ReplyCard from './ReplyCard';
import ReplyForm from './ReplyForm';
import SanitizeHtml from './SanitizeHtml';

export default function CommentCard({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [editComment, setEditComment] = useState();
  const [showReplies, setShowReplies] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [page, setPage] = useState();
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const replies = useSelector((state) => state.replies.replies);
  const countInfo = useSelector((state) => state.replies.countInfo);
  const loading = useSelector((state) => state.replies.isLoading);
  const canEdit = useIdeaActionValidation(comment, 'commentIdea');
  useEffect(() => {
    if (page) {
      dispatch(repliesActions.getReplies({ commentId: comment?._id, page }));
    }
  }, [page]);

  return (
    <div className="bg-gray-50 group dark:bg-aa-800 purple:bg-pt-900 p-8 mt-2 rounded">
      {editComment ? (
        <CommentForm
          ideaId={comment?.ideaId}
          editedComment={comment}
          setEditComment={setEditComment}
        />
      ) : (
        <div className="flex gap-5">
          {/* Name First Letter Icon */}
          <Avatar
            src={comment?.user?.profilePicture}
            alt={
              comment?.user
                ? comment?.user.name
                : comment?.guestName
                ? comment?.guestName
                : 'Anonymous'
            }
            size="w-7 h-7"
            fontSize="text-sm"
          />
          <div className="w-full space-y-w">
            <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
              {comment?.user
                ? comment?.user.name
                : comment?.guestName
                ? comment?.guestName
                : 'Anonymous'}
            </h6>
            <div className="prose prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-p:text-slate-500 prose-p:my-2 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
              <SanitizeHtml html={comment?.text} />
            </div>
            <div className="flex items-center gap-2 min-h-[32px]">
              <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-xs tracking-sm">
                {DateTime.fromISO(comment?.createdAt).setLocale('en').toRelative()}
              </span>
              <svg
                className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                fill="currentColor"
                viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
              </svg>
              {!comment?.replyCount && (
                <button
                  type="button"
                  onClick={() => {
                    setIsReplying(!isReplying);
                  }}
                  className="inline-flex text-slate-500 hover:text-indigo-600 dark:text-aa-200 purple:text-pt-200 text-xs tracking-sm">
                  Reply
                </button>
              )}
              {!!comment?.replyCount && (
                <button
                  type="button"
                  onClick={() => {
                    if (!showReplies) {
                      setPage(1);
                    }
                    setIsReplying(!isReplying);
                    setShowReplies(!showReplies);
                  }}
                  className="inline-flex items-center justify-center gap-2">
                  <span className="text-slate-500 hover:text-indigo-600 dark:text-aa-400 purple:text-pt-400 text-xs tracking-sm">
                    {showReplies ? 'Hide' : 'Show'}{' '}
                    {comment?.replyCount > 1 ? ` ${comment?.replyCount} Replies` : 'Reply'}
                  </span>
                </button>
              )}
              {canEdit && (
                <div className="hidden group-hover:flex items-center">
                  <svg
                    className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                    fill="currentColor"
                    viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setEditComment(true)}
                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-full text-slate-500 dark:text-aa-200 purple:text-pt-200 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-blue-400 purple:hover:bg-gray-700 purple:hover:text-blue-400">
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
            {showReplies && (
              <>
                <Divider className="my-8" />
                {loading && page === 1 ? (
                  <CommentSkeleton />
                ) : (
                  <div className="space-y-6">
                    {replies[comment?._id]?.map((reply) => (
                      <ReplyCard reply={reply} key={reply?._id} setShowReplies={setShowReplies} />
                    ))}
                  </div>
                )}
              </>
            )}
            {loading && page > 1 && <CommentSkeleton />}{' '}
            {page < countInfo[comment?._id]?.totalPages && showReplies && (
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="inline-flex text-indigo-600 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm mt-4">
                {`Show ${
                  countInfo[comment?._id].count - countInfo[comment?._id].currentPage * 5
                } more ${
                  countInfo[comment?._id].count - countInfo[comment?._id].currentPage * 5 > 1
                    ? 'replies'
                    : 'reply'
                } `}
              </button>
            )}
            {isReplying && (
              <ReplyForm
                commentId={comment?._id}
                setIsReplying={setIsReplying}
                setShowReplies={setShowReplies}
              />
            )}
          </div>
        </div>
      )}
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() => {
          dispatch(commentActions.deleteComment({ commentId: comment._id, ideaId: idea._id }));
          setIsDelete(!isDelete);
        }}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete Comment"
        confirmColor="red"
        canCancel
      />
    </div>
  );
}
