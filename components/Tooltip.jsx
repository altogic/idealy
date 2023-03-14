import React from 'react';

export default function Tooltip({ content }) {
  return (
    <span className="absolute z-50 hidden group-hover:flex -top-2 -translate-y-full px-3 py-1 text-sm  rounded-lg text-center bg-slate-50 dark:bg-aa-700 purple:bg-pt-900 text-slate-600 dark:text-aa-200 purple:text-pt-200 text-after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-white after:dark:border-t-aa-900 after:purple:border-t-pt-1000 whitespace-nowrap">
      {content}
    </span>
  );
}
