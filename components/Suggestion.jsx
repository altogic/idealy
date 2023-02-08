import React from 'react';
import Avatar from './Avatar';

export default function Suggestion({ item, profilePicture }) {
  return (
    <div className="flex items-center gap-2 text-slate-500 tracking-[-0.4px] cursor-pointer">
      <Avatar src={profilePicture} alt={item.name} size="w-7 h-7" fontSize="text-xs" />
      <span className="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">
        {item.name}
      </span>
      <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-xs font-medium tracking-sm">
        {item.email}
      </span>
    </div>
  );
}
