import React from 'react';

export default function Avatar({ src, alt, size, fontSize }) {
  const name = alt?.split(' ');
  return src ? (
    <img src={src} alt={alt} className={`rounded-full object-contain ${size ?? 'w-11 h-11'}`} />
  ) : (
    name && (
      <div
        className={` relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  purple:bg-pt-300  ${
          size ?? 'w-11 h-11'
        }`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 ${fontSize ?? 'text-lg'}`}>
          {name[0]?.charAt(0)}
          {name[1]?.charAt(0)}
        </span>
      </div>
    )
  );
}
