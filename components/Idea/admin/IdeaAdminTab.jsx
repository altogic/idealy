import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUp } from '@/components/icons';

export default function IdeaAdminTab({ title, children }) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="-mx-2 p-2 flex items-center justify-between rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
            <span className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
              {title}
            </span>
            <ChevronUp
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-slate-500 dark:text-aa-200 purple:text-pt-200`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
