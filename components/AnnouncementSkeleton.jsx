/* eslint-disable react/no-array-index-key */
import React from 'react';

export default function AnnouncementSkeleton() {
  return (
    <div className="w-full first:px-8 first:pb-8 [&:not(:first-child)]:p-8 odd:bg-white dark:odd:bg-aa-900 odd:purple:bg-pt-1000 even:bg-slate-100 dark:even:bg-aa-800 purple:even:bg-pt-900">
      <div className="mx-auto w-8/12 flex gap-8">
        <div className="grow flex flex-col">
          <div className="flex justify-between items-center gap-2 divide-x divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
            <div className=" h-6 w-[44rem]">
              <div className="animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400 w-3/4 h-full" />
            </div>

            <div className="hidden md:block">
              <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400 ml-2" />
            </div>
            <div className="hidden md:block">
              <div className="flex flex-wrap items-center justify-center gap-2 ml-auto max-w-md pl-2">
                <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
                <div className="h-4 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="pl-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
                  <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
                  <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center px-2 gap-2">
                <div className="h-6 w-6 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
                <div className="h-6 w-6 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
              </div>
            </div>
          </div>
          <div className="mt-2 mb-8 h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400" />
          <div className="max-w-full mb-4 space-y-4">
            {Array.from({ length: 7 }, () => Math.floor(Math.random() * 21) + 80).map(
              (width, index) => (
                <div
                  key={`${width} ${index}`}
                  style={{
                    '--announcement-width': `${width}%`
                  }}
                  className="w-[var(--announcement-width)] h-4 animate-pulse rounded-md bg-slate-200 dark:bg-aa-400 purple:bg-pt-400"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
