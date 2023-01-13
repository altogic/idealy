import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function DeleteModal({
  show,
  title,
  icon,
  description,
  cancelOnClick,
  deleteOnClick,
  ...props
}) {
  return (
    <Transition appear show={show} as={Fragment} {...props}>
      <Dialog as="div" className="relative z-50" {...props}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center tr">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-aa-900 purple:bg-pt-1000 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 mb-8 lg:mb-4">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-aa-300 purple:bg-pt-300 rounded-full ring-8 ring-red-50 dark:ring-aa-200 purple:ring-pt-200">
                    {icon}
                  </span>
                  <div className="text-center lg:text-left space-y-2">
                    <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
                      {title}
                    </h2>
                    <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full lg:w-auto bg-white dark:bg-aa-300 purple:bg-pt-300 text-gray-700 dark:text-aa-600 purple:text-pt-600 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300 dark:border-aa-400 purple:border-pt-400 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={cancelOnClick}
                    {...props}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full lg:w-auto bg-red-600 dark:bg-red-900 purple:bg-red-900 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => {
                      deleteOnClick();
                      cancelOnClick();
                    }}
                    {...props}>
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
