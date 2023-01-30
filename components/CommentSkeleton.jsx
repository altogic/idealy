import React from 'react';

export default function CommentSkeleton() {
  return (
    <div
      role="status"
      className="w-full mt-2 space-y-4 divide-y divide-gray-300 dark:divide-aa-300 purple:divide-pt-300 animate-pulse bg-gray-50 dark:bg-aa-800 purple:bg-pt-900">
      <div className="flex justify-between items-center px-4 py-8">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-gray-300 dark:bg-aa-300 purple:bg-pt-300 rounded-full" />
          <div>
            <div className="w-64 h-2.5 bg-gray-300 dark:bg-aa-300 purple:bg-pt-300 rounded-full mb-2.5" />
            <div className="w-32 h-2 bg-gray-300 dark:bg-aa-300 purple:bg-pt-300 rounded-full mb-2.5" />
            <div className="h-2.5 bg-gray-300 dark:bg-aa-300 purple:bg-pt-300 rounded-full w-24" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
