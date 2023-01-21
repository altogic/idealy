import React from 'react';

export default function Divider({ className }) {
  return (
    <hr
      className={`my-6 lg:my-8 border-slate-200 dark:border-aa-600 purple:border-pt-800 ${className}`}
    />
  );
}
