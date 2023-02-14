import React from 'react';
import Avatar from './Avatar';
import Button from './Button';

export default function UserCard({ name, profilePicture, email, className, style }) {
  return (
    <div
      className={`user-card absolute hidden items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-aa-900 purple:bg-pt-1000 dark:border-aa-600 purple:border-pt-800 ${className}`}
      style={style}>
      <Avatar src={profilePicture} alt={name} />
      <div className="flex flex-col items-center gap-1">
        <h5 className="text-sm text-slate-900 dark:text-aa-100 purple:text-pt-100">{name}</h5>
        <span className="text-xs text-slate-500 dark:text-aa-200 purple:text-pt-200">{email}</span>
      </div>
      <Button variant="indigo" text="View Profile" size="sm" height="8" />
    </div>
  );
}
