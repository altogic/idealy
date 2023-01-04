import React from 'react';

export default function Avatar({ src, alt, size, fontSize }) {
  const name = alt?.split(' ');
  return src ? (
    <img src={src} alt={alt} className={`rounded-full object-contain ${size ?? 'w-11 h-11'}`} />
  ) : (
    <div>
      {name && (
        <div
          className={`rounded-full bg-slate-100 dark:bg-aa-300 purple:bg-pt-300 flex items-center justify-center ${
            size ?? 'w-11 h-11'
          }`}>
          <span className={`text-slate-700 tracking-sm ${fontSize ?? 'text-lg'}`}>
            {name[0]?.charAt(0)}
          </span>
          {name.length > 1 && (
            <span className={`text-slate-700 tracking-sm ${fontSize ?? 'text-lg'}`}>
              {name[1]?.charAt(0)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
