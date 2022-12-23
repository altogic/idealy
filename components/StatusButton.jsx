import React, { useState, useEffect } from 'react';
import { LightenDarkenColor } from '../utils';

export default function StatusButton({ name, color, className }) {
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    if (color) {
      setBgColor(LightenDarkenColor(color, 230));
    }
  }, [color]);

  return (
    <button
      type="button"
      className={
        className || 'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium'
      }
      style={{ backgroundColor: bgColor, color }}>
      <svg className="-ml-1 mr-1.5 h-2 w-2" fill={color} viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
      {name}
    </button>
  );
}
