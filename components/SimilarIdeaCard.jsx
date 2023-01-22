import React from 'react';
import { DateTime } from 'luxon';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { useDispatch } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import SanitizeHtml from './SanitizeHtml';

export default function SimilarIdeaCard({ idea }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <button
      type="button"
      className="w-full px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900"
      onClick={() => {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              feedback: idea._id
            }
          },
          undefined,
          { scroll: false }
        );
        dispatch(ideaActions.setSelectedIdea(idea));
        dispatch(toggleFeedBackSubmitModal());
        dispatch(toggleFeedBackDetailModal());
      }}>
      <div className="flex items-start lg:items-center gap-6">
        <div className="flex flex-col items-center justify-center bg-white dark:bg-aa-50 dark:bg-opacity-20 purple:bg-opacity-20 py-2 px-3 border border-gray-300 dark:border-aa-600 purple:border-pt-800 rounded-lg">
          <span className="text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md">
            {idea?.voteCount}
          </span>
          <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
            {idea?.voteCount <= 1 ? 'Vote' : 'Votes'}
          </span>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="max-w-[700px] text-slate-800 dark:text-aa-200 purple:text-pt-200 text-xl font-semibold tracking-md text-left truncate"
              title={idea?.title}>
              {idea?.title}
            </h3>
          </div>
          <SanitizeHtml
            className="max-w-3xl text-slate-500 mb-2 text-sm tracking-sm text-left line-clamp-1"
            content={idea?.content}
          />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Bottom Left */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
              <div className="flex items-center gap-3">
                {/* User */}
                <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
                  {idea?.author
                    ? idea?.author.name
                    : idea?.guestName
                    ? idea?.guestName
                    : 'Anonymous'}
                </span>
                <svg className="h-1 w-1 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                {/* Date */}
                <span className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
                  {DateTime.fromISO(idea?.createdAt).setLocale('en').toRelative()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
