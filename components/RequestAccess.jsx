import React from 'react';
import Button from './Button';
import { Check } from './icons';

export default function RequestAccess() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-11">
      <div className="text-center lg:text-left">
        <h2 className="max-w-md mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 text-2xl tracking-md">
          This board has been marked as private and can only be viewed by users with permission.{' '}
        </h2>
        <p className="max-w-xs mx-auto lg:mx-0 text-slate-800 dark:text-aa-200 purple:text-pt-200 my-10 text-xl font-medium tracking-sm">
          You will need to request access in order to view it.
        </p>
        <Button
          type="button"
          text="Request Access"
          icon={<Check className="w-5 h-5" />}
          variant="indigo"
          size="sm"
          mobileFullWidth="mobileFullWidth"
        />
      </div>
      <img src="./request-access.png" alt="" srcSet="./request-access.png 2x" />
    </div>
  );
}
