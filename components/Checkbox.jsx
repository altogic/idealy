import React from 'react';
import Input from './Input';

export default function Checkbox({ label, name, ...props }) {
  return (
    <Input
      id={name}
      aria-describedby={name}
      name={name}
      type="checkbox"
      label={label}
      className="h-4 w-4 rounded border-gray-300  checked:border-indigo-400 dark:border-aa-400 purple:border-pt-400 text-indigo-600 dark:bg-transparent purple:bg-transparent checked:dark:bg-transparent checked:purple:bg-transparent dark:checked:border-aa-400 purple:checked:border-pt-400 focus:ring-indigo-500 dark:focus:aa-indigo-500 purple:focus:ring-pt-500 "
      {...props}
    />
  );
}
