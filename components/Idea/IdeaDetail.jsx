import CommentCard from '@/components/CommentCard';
import ImageList from '@/components/ImageList';
import StatusBadge from '@/components/StatusBadge';
import TopicBadges from '@/components/TopicBadges';
import useClickMention from '@/hooks/useClickMention';
import useIdeaActionValidation from '@/hooks/useIdeaActionValidation';
import useRegisteredUserValidation from '@/hooks/useRegisteredUserValidation';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { commentActions } from '@/redux/comments/commentsSlice';
import { toggleDeleteFeedBackModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../CommentForm';
import CommentSkeleton from '../CommentSkeleton';
import Drawer from '../Drawer';
import EmptyState from '../EmptyState';
import { Pen, Thumbtack, Trash } from '../icons';
import InfiniteScroll from '../InfiniteScroll';
import SanitizeHtml from '../SanitizeHtml';
import UserCard from '../UserCard';
import IdeaActionButton from './admin/IdeaActionButton';
import IdeaBadges from './IdeaBadges';
import IdeaDetailAdmin from './IdeaDetailAdmin';
import IdeaInfo from './IdeaInfo';
import VoteIdea from './VoteIdea';
import SimilarIdeas from '../SimilarIdeas';

export default function IdeaDetail({ idea, company, voted, onClose }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const isMergeFetched = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.comments.comments);
  const commentCountInfo = useSelector((state) => state.comments.countInfo);
  const loading = useSelector((state) => state.comments.isLoading);
  const feedBackDetailModal = useSelector((state) => state.general.feedBackDetailModal);
  const canComment = useRegisteredUserValidation('commentIdea');
  const canEdit = useIdeaActionValidation(idea, 'submitIdeas');

  const [isMobileAdmin, setIsMobileAdmin] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const updateIdea = useUpdateIdea(idea);
  const { userCardStyle, userCardInfo } = useClickMention('idea-detail');

  useEffect(() => {
    const ideaId = router.query.feedback;

    if (router.isReady && !!idea?.commentCount && !isFetched && ideaId) {
      setIsFetched(true);
      dispatch(commentActions.getComments({ ideaId, page: 1 }));
    }
  }, [router.asPath, idea]);

  useEffect(() => {
    if (!feedBackDetailModal) {
      setIsFetched(false);
      dispatch(commentActions.clearComments());
      isMergeFetched.current = false;
    }
  }, [feedBackDetailModal]);

  useEffect(() => {
    console.log(
      'idea',
      idea && !idea?.mergedIdeasDetail && idea?.mergedIdeas.length > 0 && !isMergeFetched.current,
      {
        ' !idea?.mergedIdeasDetail': !idea?.mergedIdeasDetail,
        'idea?.mergedIdeas.length > 0': idea?.mergedIdeas.length > 0,
        '!isMergeFetched.current': !isMergeFetched.current
      }
    );
    if (
      idea &&
      !idea?.mergedIdeasDetail &&
      idea?.mergedIdeas.length > 0 &&
      !isMergeFetched.current
    ) {
      let filter = '';
      idea.mergedIdeas.forEach((i, index) => {
        if (index === idea.mergedIdeas.length - 1) {
          filter += `this._id == '${i.mergedIdea}'`;
          return;
        }
        filter += `this._id == '${i.mergedIdea}' || `;
      });

      dispatch(ideaActions.getMergedIdeas(filter));

      isMergeFetched.current = true;
    }
  }, [idea, router]);

  return (
    <Drawer
      open={feedBackDetailModal}
      onClose={() => onClose()}
      className="z-50"
      position="right"
      size="lg"
      sidebar={
        user &&
        !idea?.isMerged &&
        (company?.role === 'Owner' || company?.role === 'Admin') && (
          <IdeaDetailAdmin adminOpen={isMobileAdmin} setAdminOpen={setIsMobileAdmin} />
        )
      }>
      <button
        type="button"
        onClick={() => setIsMobileAdmin(!isMobileAdmin)}
        className="absolute top-4 left-4 inline-flex lg:hidden items-center justify-center w-8 h-8 text-slate-500 rounded-md transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <div className="flex gap-6 relative">
        <VoteIdea voted={voted} voteCount={idea?.voteCount} ideaId={idea?._id} />
        <div className="flex-1 relative">
          <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold break-all mb-8">
            {idea?.title}
          </h2>
          {(idea?.isPrivate ||
            idea?.isBug ||
            idea?.isArchived ||
            idea?.isPinned ||
            idea?.isMerged ||
            !idea?.isApproved) && (
            <div className="mb-8">
              <IdeaBadges idea={idea} />
            </div>
          )}
          <div className="prose prose-p:text-slate-800 dark:prose-p:text-aa-200 purple:prose-p:text-pt-200 prose-a:text-slate-800 dark:prose-a:text-aa-400 purple:prose-a:text-pt-400 prose-strong:text-slate-900 dark:prose-strong:text-aa-500 purple:prose-strong:text-pt-600 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-8 break-all">
            <SanitizeHtml id="idea-detail" html={idea?.content} />
          </div>

          <div className="relative flex flex-wrap items-center gap-2 mb-8">
            {/* User */}
            <IdeaInfo idea={idea} detail />
            {canEdit && !idea?.isMerged && (
              <>
                <svg
                  className="h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                  fill="currentColor"
                  viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <div className="flex">
                  {user && (company?.role === 'Owner' || company?.role === 'Admin') && (
                    <IdeaActionButton
                      type="Pin"
                      onClick={() =>
                        updateIdea({
                          _id: idea._id,
                          isPinned: !idea.isPinned
                        })
                      }
                      Icon={Thumbtack}
                      color="green"
                      control={idea?.isPinned}
                    />
                  )}
                  <IdeaActionButton
                    type="Delete"
                    Icon={Trash}
                    color="red"
                    onClick={() => dispatch(toggleDeleteFeedBackModal())}
                  />
                  <IdeaActionButton
                    type="Edit"
                    Icon={Pen}
                    color="blue"
                    onClick={() => dispatch(toggleFeedBackSubmitModal())}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mb-8">
            {/* Feedback Detail Topic Badges */}
            {!!idea?.topics?.length && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
                  Topics
                </span>
                <svg
                  className="hidden sm:block h-1 w-1 text-slate-500 dark:text-aa-400 purple:text-pt-400"
                  fill="currentColor"
                  viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <div className="flex flex-wrap items-center gap-2">
                  {idea?.topics.map((topic) => (
                    <TopicBadges key={topic} badgeName={topic} />
                  ))}
                </div>
              </div>
            )}
            {/* Feedback Detail Status Badge */}
            {idea?.status && <StatusBadge name={idea?.status.name} color={idea?.status.color} />}
          </div>

          <ImageList images={idea?.images} isPreview />
        </div>
        <UserCard
          profilePicture={userCardInfo?.profilePicture}
          name={userCardInfo?.name}
          email={userCardInfo?.email}
          style={userCardStyle}
        />
      </div>
      {!!idea?.mergedIdeasDetail?.length && (
        <SimilarIdeas ideas={idea?.mergedIdeasDetail} title="Merged Ideas" />
      )}
      {canComment && !idea?.isMerged && (
        <CommentForm ideaId={idea?._id} setIsFetched={setIsFetched} />
      )}
      <InfiniteScroll
        items={comments}
        countInfo={commentCountInfo}
        endOfList={() =>
          dispatch(
            commentActions.getComments({
              ideaId: idea?._id,
              page: commentCountInfo.currentPage + 1
            })
          )
        }>
        {loading && !comments.length ? (
          <CommentSkeleton />
        ) : idea?.commentCount > 0 ? (
          comments?.map((comment) => <CommentCard key={comment?._id} comment={comment} />)
        ) : (
          <EmptyState title="No Comments" description="This idea does not have any comments yet" />
        )}
        {loading && !!idea?.commentCount && <CommentSkeleton />}
      </InfiniteScroll>
    </Drawer>
  );
}
