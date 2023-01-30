import React from 'react';
import cn from 'classnames';

export default function Indicator({ count, className }) {
  return (
    <span
      className={cn(
        'ml-2 inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full',
        className
      )}>
      {count}
    </span>
  );
}
