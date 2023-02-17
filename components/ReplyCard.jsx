import useIdeaActionValidation from '@/hooks/useIdeaActionValidation';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useClickMention from '@/hooks/useClickMention';
import Avatar from './Avatar';
import InfoModal from './InfoModal';
import { Danger, Pen, Trash } from './icons';
import ReplyForm from './ReplyForm';
import SanitizeHtml from './SanitizeHtml';
import UserCard from './UserCard';

export default function ReplyCard({ reply, setShowReplies }) {
  const [isDelete, setIsDelete] = useState(false);
  const [editReply, setEditReply] = useState();
  const canEdit = useIdeaActionValidation(reply, 'reply');
  const dispatch = useDispatch();
  const { userCardStyle, userCardInfo, setUserCardInfo, setUserCardStyle } =
    useClickMention('reply');

  const handleShowUserCard = (e) => {
    e.stopPropagation();
    const userCards = document.querySelectorAll('.idea-user-card');
    const top = e.target.offsetTop - 80;
    const left = e.target.offsetLeft + 20;
    userCards.forEach((userCard) => {
      // eslint-disable-next-line no-param-reassign
      userCard.style.display = 'none';
    });
    setUserCardStyle({
      top,
      left,
      display: 'flex'
    });
    setUserCardInfo({
      profilePicture: reply?.user?.profilePicture,
      name: reply?.user?.name || reply?.name,
      email: reply?.user?.email
    });
  };
  return editReply ? (
    <ReplyForm reply={reply} setIsReplying={setEditReply} />
  ) : (
    <div className="group bg-gray-50 dark:bg-aa-800 purple:bg-pt-900 rounded">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <UserCard
          id="reply-user-card"
          profilePicture={userCardInfo?.profilePicture}
          name={userCardInfo?.name}
          email={userCardInfo?.email}
          style={userCardStyle}
        />
        <button className="w-8 h-8" type="button" onClick={handleShowUserCard}>
          <Avatar
            src={reply?.user?.profilePicture}
            alt={reply?.user?.name || reply.name}
            size="w-7 h-7"
            fontSize="text-sm"
          />
        </button>
        <div className="w-full space-y-3">
          <button type="button" onClick={handleShowUserCard}>
            <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
              {reply?.user?.name || reply.name}
            </h6>
          </button>
          <div className="prose prose-p:my-0 prose-p:text-slate-500 dark:prose-p:text-aa-300 purple:prose-p:text-pt-300 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <SanitizeHtml id="reply" html={reply?.content} />
          </div>
          <div className="flex items-center gap-3 min-h-[32px]">
            <span className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-xs tracking-sm">
              {DateTime.fromISO(reply?.createdAt).setLocale('en').toRelative()}
            </span>
            {canEdit && (
              <div className=" hidden group-hover:flex items-center">
                <svg
                  className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                  fill="currentColor"
                  viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <button
                  type="button"
                  onClick={() => setEditReply(true)}
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
        </div>
      </div>
      <InfoModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        onConfirm={() => {
          dispatch(
            repliesActions.deleteReply({
              replyId: reply._id,
              commentId: reply.commentId
            })
          );
          setIsDelete(!isDelete);
          setShowReplies(false);
        }}
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
