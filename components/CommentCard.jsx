import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { commentActions } from '@/redux/comments/commentsSlice';
import useIdeaActionValidation from '@/hooks/useIdeaActionValidation';
import Avatar from './Avatar';
import ReplyForm from './ReplyForm';
import ReplyCard from './ReplyCard';
import { Danger, Pen, Trash } from './icons';
import DeleteModal from './DeleteModal';
import CommentForm from './CommentForm';

export default function CommentCard({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [editComment, setEditComment] = useState();
  const [showReplies, setShowReplies] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editedReply, setEditedReply] = useState();
  const [page, setPage] = useState();
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const replies = useSelector((state) => state.replies.replies);
  const countInfo = useSelector((state) => state.replies.countInfo);
  const canEdit = useIdeaActionValidation(comment);
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
          <Avatar src={comment?.profilePicture} alt={comment?.name || 'Anonymous'} />
          <div className="w-full space-y-w">
            <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-base tracking-sm">
              {comment?.name || 'Anonymous'}
            </h6>
            <div className="prose prose-p:text-slate-500 prose-p:my-2 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
              <article dangerouslySetInnerHTML={{ __html: comment?.text }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
                {DateTime.fromISO(comment?.createdAt).setLocale('en').toRelative()}
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
                className="inline-flex text-slate-500 hover:text-indigo-600 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                Reply
              </button>
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
                {!!comment.replyCount && (
                  <>
                    <svg
                      className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                      fill="currentColor"
                      viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    <span className="text-slate-500 hover:text-indigo-600 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
                      {showReplies ? 'Hide' : 'Show'}{' '}
                      {comment.replyCount > 1 ? ` ${comment.replyCount} Replies` : 'Reply'}
                    </span>
                  </>
                )}
              </button>
              {canEdit && (
                <div className=" hidden group-hover:flex items-center gap-3 ">
                  <svg
                    className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                    fill="currentColor"
                    viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  <button type="button" onClick={() => setEditComment(true)}>
                    <Pen className="h-4 w-4 text-slate-500 hover:text-blue-600 dark:text-aa-200 purple:text-pt-200" />
                  </button>
                  <button type="button" onClick={() => setIsDelete(true)}>
                    <Trash className="h-4 w-4 text-slate-500 hover:text-red-600 dark:text-aa-200 purple:text-pt-200" />
                  </button>
                </div>
              )}
            </div>
            {showReplies && (
              <>
                <hr className="my-2 border-slate-200 dark:border-aa-600 purple:border-pt-600" />
                {replies[comment?._id]?.map((reply) => (
                  <ReplyCard
                    reply={reply}
                    key={reply?._id}
                    setEditedReply={setEditedReply}
                    setIsReplying={setIsReplying}
                  />
                ))}
              </>
            )}
            {isReplying && (
              <ReplyForm
                commentId={comment?._id}
                setIsReplying={setIsReplying}
                reply={editedReply}
                setShowReplies={setShowReplies}
              />
            )}

            {page < countInfo[comment?._id]?.totalPages && showReplies && (
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="inline-flex text-indigo-600 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm mt-2">
                {`Show ${
                  countInfo[comment?._id].count - countInfo[comment?._id].currentPage * 5
                } more ${
                  countInfo[comment?._id].count - countInfo[comment?._id].currentPage * 5 > 1
                    ? 'replies'
                    : 'reply'
                } `}
              </button>
            )}
          </div>
        </div>
      )}
      <DeleteModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        deleteOnClick={() =>
          dispatch(commentActions.deleteComment({ commentId: comment._id, ideaId: idea._id }))
        }
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </div>
  );
}
