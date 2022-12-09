import React from 'react';

export default function Avatar({ src, alt }) {
  const name = alt?.split(' ');
  return src ? (
    <img src={src} alt={alt} className="w-11 h-11 rounded-full object-contain" />
  ) : (
    <div>
      {name && (
        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
          <span className="text-slate-700 text-lg tracking-sm">{name[0]?.charAt(0)}</span>
          {name.length > 1 && (
            <span className="text-slate-700 text-lg tracking-sm">{name[1]?.charAt(0)}</span>
          )}
        </div>
      )}
    </div>
  );
}
