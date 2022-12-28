import React from 'react';
import Avatar from './Avatar';

export default function CompanyAvatar({ logoUrl, name, className, size }) {
  return (
    <div>
      {logoUrl ? (
        <Avatar src={logoUrl} alt={name} size={size} />
      ) : (
        <div>
          <div
            className={`inline-flex items-center justify-center bg-white text-slate-800 tracking-md border-2 border-slate-100 rounded-lg group-hover:border-indigo-700 ${className} ${size} `}>
            {name[0]?.charAt(0).toUpperCase()}
            {name[1]?.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}
