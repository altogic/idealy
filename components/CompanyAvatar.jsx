import React from 'react';
import Avatar from './Avatar';

export default function CompanyAvatar({ logoUrl, name, className }) {
  return (
    <div>
      {logoUrl ? (
        <Avatar src={logoUrl} alt={name} />
      ) : (
        <div>
          <div
            className={`inline-flex items-center justify-center bg-yellow-500 text-white tracking-md rounded-lg ${className} `}>
            {name[0].toUpperCase().charAt(0)}
            {name[1].toUpperCase().charAt(0)}
          </div>
        </div>
      )}
    </div>
  );
}
