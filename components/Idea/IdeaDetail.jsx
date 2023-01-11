import CommentCard from '@/components/CommentCard';
import ImageList from '@/components/ImageList';
import StatusBadge from '@/components/StatusBadge';
import TopicBadges from '@/components/TopicBadges';
import {
  toggleDeleteFeedBackModal,
  toggleFeedBackDetailModal,
  toggleFeedBackSubmitModal
} from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import CommentForm from '../CommentForm';
import Drawer from '../Drawer';
import { Pen, Thumbtack, Trash } from '../icons';
import IdeaActionButton from './admin/IdeaActionButton';
import IdeaBadges from './IdeaBadges';
import IdeaDetailAdmin from './IdeaDetailAdmin';
import IdeaInfo from './IdeaInfo';

export default function IdeaDetail({ idea, company, query }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.comments.comments);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const userIp = useSelector((state) => state.auth.userIp);
  const canComment = useRegisteredUserValidation('commentIdea');
  function handleClose() {
    dispatch(toggleFeedBackDetailModal());
    const temp = query;
    delete temp?.feedback;
    router.push(
      {
        pathname: router.pathname,
        query: temp
      },
      undefined,
      { scroll: false }
    );
    dispatch(ideaActions.setSelectedIdea(null));
  }
  return (
    <Drawer
      open={feedBackDetailModal}
      onClose={() => handleClose()}
      title={idea?.title}
      sidebar={
        user && (company?.role === 'Owner' || company?.role === 'Admin') && <IdeaDetailAdmin />
      }>
      <div className="mb-8">
        <IdeaBadges idea={idea} />
      </div>
      <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-400 purple:prose-p:text-pt-400 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-8 break-words">
        <p dangerouslySetInnerHTML={{ __html: idea?.content }} />
      </div>

      <div className="flex items-center gap-3 mb-8">
        {/* User */}
        <IdeaInfo idea={idea} />
        {(userIp === idea?.ip || user?._id === idea?.author?._id) && (
          <>
            <svg
              className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
              fill="currentColor"
              viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            <div className="flex">
              <IdeaActionButton
                type="Pin"
                onClick={() =>
                  dispatch(
                    ideaActions.updateIdea({
                      _id: idea._id,
                      isPinned: !idea.isPinned
                    })
                  )
                }
                Icon={Thumbtack}
                className={`${idea?.isPinned ? 'text-green-500' : 'hover:text-green-500'}`}
              />
              <IdeaActionButton
                type="Delete"
                Icon={Trash}
                className="hover:text-red-500"
                onClick={() => dispatch(toggleDeleteFeedBackModal())}
              />
              <IdeaActionButton
                type="Edit"
                Icon={Pen}
                className="hover:text-sky-500"
                onClick={() => dispatch(toggleFeedBackSubmitModal())}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Feedback Detail Topic Badges */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
            Topics
          </span>
          <svg
            className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
            fill="currentColor"
            viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <div className="flex items-center gap-2">
            {idea?.topics.map((topic) => (
              <TopicBadges key={topic} badgeName={topic} />
            ))}
          </div>
        </div>
        {/* Feedback Detail Status Badge */}
        {idea?.status && <StatusBadge name={idea?.status.name} color={idea?.status.color} />}
      </div>

      <ImageList images={idea?.images} isPreview />

      {canComment && <CommentForm ideaId={idea?._id} company={company} />}
      {comments?.length > 0 &&
        comments?.map((comment) => <CommentCard key={comment?._id} comment={comment} />)}
    </Drawer>
  );
}
