import { Close } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import cn from 'classnames';

export default function Drawer({ open, onClose, children, sidebar, position, size, className }) {
  return (
    <Dialog
      as="div"
      className={`drawer relative ${className}`}
      open={open}
      onClose={() => onClose()}>
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
          <div
            className={`pointer-events-none fixed inset-y-0 flex max-w-full ${
              position === 'right' ? 'right-0 lg:pl-10' : 'left-0 lg:pr-10'
            }`}>
            <Transition
              show={open}
              appear
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom={`${position === 'right' ? 'translate-x-full' : '-translate-x-full'}`}
              enterTo={`${position === 'right' ? 'translate-x-0' : '-translate-x-0'}`}
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom={`${position === 'right' ? 'translate-x-0' : '-translate-x-0'}`}
              leaveTo={`${position === 'right' ? 'translate-x-full' : '-translate-x-full'}`}>
              <Dialog.Panel
                className={cn(
                  'pointer-events-auto w-screen flex bg-white',
                  size === 'md' && 'max-w-xs',
                  size === 'lg' && 'max-w-screen-lg'
                )}>
                {sidebar}
                <div className="drawer-body p-4 lg:p-10 relative flex w-full h-full flex-col overflow-y-scroll bg-white dark:bg-aa-900 purple:bg-pt-1000  drop-shadow-sm">
                  {/* Close Button Submit Feedback Modal */}
                  <div className="lg:absolute lg:top-4 lg:right-4 flex items-center justify-end w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-8 h-8 text-slate-500 rounded-md transition"
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
