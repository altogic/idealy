import React from 'react';
import { DateTime } from 'luxon';
import { toggleFeedBackDetailModal, toggleFeedBackSubmitModal } from '@/redux/general/generalSlice';
import { useDispatch } from 'react-redux';
import { ideaActions } from '@/redux/ideas/ideaSlice';

export default function SimilarIdeaCard({ idea }) {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-200"
      onClick={() => {
        dispatch(ideaActions.setSelectedIdea(idea));
        dispatch(toggleFeedBackSubmitModal());
        dispatch(toggleFeedBackDetailModal());
      }}>
      <div className="flex items-start lg:items-center gap-6">
        <div className="flex flex-col items-center justify-center bg-white px-3 md:px-5 border rounded-lg border-gray-400">
          <span className="text-indigo-700 text-xl font-semibold tracking-md">
            {idea?.voteCount}
          </span>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-slate-800 text-xl font-semibold tracking-md">{idea?.title}</h3>
          </div>
          <p
            className="max-w-3xl text-slate-500 mb-2 text-sm tracking-sm text-left line-clamp-1"
            dangerouslySetInnerHTML={{ __html: idea?.content }}
          />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Bottom Left */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
              <div className="flex items-center gap-3">
                {/* User */}
                <span className="text-slate-700 text-sm font-medium tracking-sm">
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
                <span className="text-slate-500 text-sm tracking-sm">
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
