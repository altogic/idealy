import { Close } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Drawer({ open, onClose, children, sidebar, className }) {
  return (
    <Dialog as="div" className={`relative ${className}`} open={open} onClose={() => onClose()}>
      <Transition
        show={open}
        appear
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition
              show={open}
              appear
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <Dialog.Panel className="pointer-events-auto max-w-screen-lg w-screen flex bg-white">
                {sidebar}
                <div className="relative flex w-full h-full flex-col overflow-y-scroll bg-white dark:bg-aa-900 purple:bg-pt-1000 p-10 drop-shadow-sm">
                  {/* Close Button Submit Feedback Modal */}
                  <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full h-full text-slate-500 rounded-md transition"
                      onClick={onClose}>
                      <span className="sr-only">Close panel</span>
                      <Close className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />
                    </button>
                  </div>
                  <div className="mt-2">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
