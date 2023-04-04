import React from 'react';

export default function Emoji({ label, symbol }) {
  return (
    <span
      className="text-4xl"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}>
      {symbol}
    </span>
  );
}
