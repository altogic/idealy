import React from 'react';
import { Exclamation } from '@/components/icons';

export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-aa-100 purple:bg-pt-100 rounded-full ring-8 ring-indigo-50 dark:ring-aa-200 purple:ring-pt-200">
        <Exclamation className="w-6 h-6 icon-indigo" />
      </span>
      <div className="max-w-[300px] text-center">
        <h6 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 mb-2 text-base font-semibold tracking-sm">
          {title}
        </h6>
        <p className="text-slate-500 dark:text-aa-400 purple:text-pt-400 text-sm tracking-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
