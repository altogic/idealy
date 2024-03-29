import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUp } from '@/components/icons';

export default function IdeaAdminTab({ title, children }) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between py-2 rounded transition-colors duration-300 hover:bg-surface-10 outline-none cursor-pointer">
            <span className="text-slate-900 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
              {title}
            </span>
            <ChevronUp
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 icon`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
