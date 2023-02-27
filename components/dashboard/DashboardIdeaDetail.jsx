import Divider from '@/components/Divider';
import FeedbackCardDetail from '@/components/FeedbackCardDetail';
import { commentActions } from '@/redux/comments/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import CommentCard from '../CommentCard';
import CommentForm from '../CommentForm';
import CommentSkeleton from '../CommentSkeleton';
import EmptyState from '../EmptyState';
import InfiniteScroll from '../InfiniteScroll';
import DashboardIdeaActions from './DashboardIdeaActions';

export default function DashboardIdeaDetail({ setEditedIdea }) {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const commentCountInfo = useSelector((state) => state.comments.countInfo);
  const commentLoading = useSelector((state) => state.comments.isLoading);

  return (
    <div className="grid 2xl:grid-cols-[1fr,348px]">
      <div className="border-r border-slate-200 dark:border-aa-600 purple:border-pt-800 h-[calc(100vh-242px)]">
        <div className=" h-4/5 p-10 overflow-y-auto">
          <FeedbackCardDetail setEditedIdea={setEditedIdea} />
          <div className="my-10">
            <div className="flex items-center justify-between gap-6">
              <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200">Comments</h6>
              <Divider className="flex-1" />
            </div>
          </div>
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
            {commentLoading && !comments.length ? (
              <CommentSkeleton dashboard />
            ) : idea?.commentCount > 0 ? (
              comments?.map((comment) => (
                <CommentCard key={comment?._id} comment={comment} dashboard />
              ))
            ) : (
              <EmptyState
                title="No Comments"
                description="This idea does not have any comments yet"
              />
            )}
            {commentLoading && !!idea?.commentCount && <CommentSkeleton />}
          </InfiniteScroll>
        </div>
        <div className="w-full rounded-t-lg border border-slate-300 pr-2 shadow-lg">
          <CommentForm ideaId={idea?._id} dashboard />
        </div>
      </div>
      <DashboardIdeaActions />
    </div>
  );
}
