import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Notification, Close, ArrowRight } from '../icons';

export default function NotificationDropdown() {
  return (
    <Menu as="div" className="relative hidden lg:inline-flex items-center">
      <Menu.Button className="relative inline-flex items-center justify-center w-10 h-10 p-[10px] rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Notification className="w-5 h-5 icon-slate" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="origin-top-right absolute top-12 right-0 w-[430px] rounded-[10px] shadow-xl bg-slate-100 focus:outline-none z-50">
          <div className="p-4 space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-start w-full">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-indigo-500"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                    <strong className="font-semibold">İsmail Erüstün</strong> liked your{' '}
                    <strong className="font-semibold">Lorem Ipsum Dolor Sit Amet</strong> forum!
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    type="button"
                    className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    <Close className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-start w-full">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-indigo-500"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 8L3.23607 8C1.7493 8 0.782312 9.56462 1.44721 10.8944L4.94721 17.8944C5.286 18.572 5.97852 19 6.73607 19L10.7538 19C10.9173 19 11.0802 18.9799 11.2389 18.9403L15 18M8 8L8 3C8 1.89543 8.89543 0.999999 10 0.999999L10.0955 0.999999C10.595 0.999999 11 1.40497 11 1.90453C11 2.61883 11.2114 3.31715 11.6077 3.91149L15 9L15 18M8 8L10 8M15 18L17 18C18.1046 18 19 17.1046 19 16L19 10C19 8.89543 18.1046 8 17 8L14.5 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 w-0 text-slate-600 flex-1 text-sm leading-5 tracking-[-0.4 px]">
                    <strong className="font-semibold">Emillia Gates</strong> liked your{' '}
                    <strong className="font-semibold">Lorem Ipsum Dolor Sit Amet</strong> forum!
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    type="button"
                    className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    <Close className="h-5 w-5 icon" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full text-indigo-700 text-sm font-medium tracking-sm">
                See all notification
                <ArrowRight className="w-5 h-5 icon" />
              </button>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
