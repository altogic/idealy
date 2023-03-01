import Divider from '@/components/Divider';
import FeedbackCardDetail from '@/components/FeedbackCardDetail';
import { commentActions } from '@/redux/comments/commentsSlice';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import 'quill-mention';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import Button from '../Button';
import CommentCard from '../CommentCard';
import CommentSkeleton from '../CommentSkeleton';
import { formats, modules } from '../EditorToolbar';
import EmptyState from '../EmptyState';
import InfiniteScroll from '../InfiniteScroll';
import DashboardIdeaActions from './DashboardIdeaActions';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const EditorToolbar = dynamic(() => import('../EditorToolbar'), { ssr: false });

export default function DashboardIdeaDetail({ setEditedIdea }) {
  const dispatch = useDispatch();
  const [isEditorFocus, setIsEditorFocus] = useState();
  const [content, setContent] = useState('');
  const comments = useSelector((state) => state.comments.comments);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const user = useSelector((state) => state.auth.user);
  const commentCountInfo = useSelector((state) => state.comments.countInfo);
  const commentLoading = useSelector((state) => state.comments.isLoading);

  return (
    <div className="grid 2xl:grid-cols-[1fr,348px]">
      <div className="relative border-r border-slate-200 dark:border-aa-600 purple:border-pt-800 h-[calc(100vh-242px)]">
        <div className={cn('p-10 overflow-y-auto', isEditorFocus ? 'max-h-[84%]' : 'max-h-[97%]')}>
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
        {idea && (
          <div className="absolute -bottom-14 z-50 w-full bg-white dark:bg-aa-800 purple:bg-pt-800 border-t border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-t-lg shadow-lg p-2 mt-2">
            <div className="relative flex ">
              <Avatar src={user?.profilePicture} alt={user?.name} className=" self-center" />
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                formats={formats}
                modules={modules}
                className={cn(isEditorFocus ? 'editor-focus' : 'dashboard-editor')}
                placeholder="Write a comment..."
                onFocus={() => setIsEditorFocus(true)}
                onBlur={() => setIsEditorFocus(false)}
              />

              <EditorToolbar
                className={cn(
                  'ql-toolbar ql-snow dashboard-toolbar',
                  isEditorFocus ? 'visible' : 'invisible'
                )}
              />
              {isEditorFocus && (
                <div className="absolute z-50 right-0 bottom-0">
                  <Button
                    variant="indigo"
                    text="Comment"
                    onClick={() => {
                      dispatch(
                        commentActions.addComment({
                          ideaId: idea?._id,
                          text: content,
                          user: user?._id
                        })
                      );
                      setContent('');
                    }}
                    size="sm"
                    height="10"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <DashboardIdeaActions />
    </div>
  );
}
