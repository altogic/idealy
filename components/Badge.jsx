import React from 'react';

export default function Badge({ Icon, text, color }) {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded border bg-${color}-100 text-${color}-800 dark:bg-gray-700 dark:text-${color}-500 border-${color}-500`}>
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </div>
  );
}
