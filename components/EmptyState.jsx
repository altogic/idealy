import React from 'react';
import { Exclamation } from '@/components/icons';

export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-aa-100 purple:bg-pt-100 rounded-full ring-8 ring-indigo-50">
        <Exclamation className="w-5 h-5 text-indigo-600 dark:text-aa-600 purple:text-pt-600" />
      </span>
      <div className="max-w-[300px] text-center">
        <h6 className="text-slate-800 dark:text-aa-100 purple:text-pt-100 mb-2 text-base font-semibold tracking-sm">
          {title}
        </h6>
        <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
