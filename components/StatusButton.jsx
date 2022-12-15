import React from 'react';
import cn from 'classnames';
import { LightenDarkenColor } from '../utils';

export default function StatusButton({ name, color }) {
  const bgColor = LightenDarkenColor(color, 230);
  return (
    <button
      type="button"
      className={cn(`inline-flex items-center rounded-full  px-3 py-0.5 text-xs font-medium`)}
      style={{ backgroundColor: bgColor, color }}>
      <svg className="-ml-1 mr-1.5 h-2 w-2" fill={color} viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {name}
    </button>
  );
}
