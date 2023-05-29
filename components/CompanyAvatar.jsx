import React from 'react';
import Avatar from './Avatar';

export default function CompanyAvatar({ logoUrl, name, className, size }) {
  return logoUrl ? (
    <Avatar src={logoUrl} alt={name} size={size} />
  ) : (
    <div
      className={`inline-flex items-center justify-center bg-yellow-500 text-white tracking-md rounded-lg ${className} ${size} `}>
      {name[0]?.charAt(0).toUpperCase()}
      {name[1]?.charAt(0).toUpperCase()}
    </div>
  );
}
