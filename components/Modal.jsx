import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

export default function Modal({ open, onClose, children, size = 'md', ...props }) {
  return (
    <Transition appear show={open} as={Fragment} {...props}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose()} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={cn(
                  'w-full transform overflow-hidden rounded-2xl bg-white dark:bg-aa-900 purple:bg-pt-1000 p-6 text-left align-middle shadow-xl transition-all',
                  size === 'sm' && 'max-w-sm',
                  size === 'md' && 'max-w-md',
                  size === 'lg' && 'max-w-lg',
                  size === 'xl' && 'max-w-xl',
                  size === '2xl' && 'max-w-2xl',
                  size === '3xl' && 'max-w-3xl',
                  size === '4xl' && 'max-w-4xl',
                  size === '5xl' && 'max-w-5xl'
                )}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
