import React from 'react';

export default function ThemeButton({ theme, isSelected, ...props }) {
  return (
    <button type="button" className="flex flex-col items-start gap-4" {...props}>
      <img
        src={theme.image}
        alt={theme.name}
        className={isSelected ? ' border-2 border-indigo-900 rounded-lg' : ''}
      />
      <span className="text-slate-900 text-base tracking-sm">{theme.name}</span>
    </button>
  );
}
