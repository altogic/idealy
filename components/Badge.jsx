import React from 'react';

export default function Badge({ Icon, text, className }) {
  return (
    <div
      className={`inline-flex items-center rounded-full py-1 px-2 text-xs font-medium ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </div>
  );
}
