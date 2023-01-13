import React from 'react';
import Avatar from './Avatar';

export default function CompanyAvatar({ logoUrl, name, className, size }) {
  return logoUrl ? (
    <Avatar src={logoUrl} alt={name} size={size} />
  ) : (
    <div
      className={`inline-flex items-center justify-center bg-white dark:bg-aa-300 purple:bg-pt-300 text-slate-800 tracking-md border-2 border-slate-100 dark:border-aa-200 purple:border-pt-200 rounded-lg group-hover:border-indigo-700 ${className} ${size} `}>
      {name[0]?.charAt(0).toUpperCase()}
      {name[1]?.charAt(0).toUpperCase()}
    </div>
  );
}
