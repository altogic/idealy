import React from 'react';

export default function Badge({ Icon, text, color, className }) {
  return (
    <div
      className={`${className} inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border bg-${color}-50 stroke-${color}-500 dark:bg-aa-600 purple:bg-pt-800 dark:stroke-${color}-400 purple:stroke-${color}-400 dark:text-aa-200 text-slate-500 purple:text-aa-200 border-transparent`}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {text}
    </div>
  );
}
