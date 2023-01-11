import React, { Fragment, useState } from 'react';
import cn from 'classnames';
import { ClipLoader } from 'react-spinners';
import { XCircle } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';

export default function Image({ isPreview, src, alt, loading, onRemove, removable, index }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative group border border-slate-400 rounded w-20 h-20 flex items-center justify-center ">
        <button
          className={`${
            isPreview ? 'cursor-pointer' : 'cursor-default'
          } flex items-center justify-center`}
          type="button"
          onClick={() => {
            if (isPreview) {
              setOpen(true);
            }
          }}>
          <img
            src={src}
            alt={alt || 'image'}
            className={cn('object-contain rounded', loading && 'filter blur-sm')}
          />
          {loading && (
            <ClipLoader className="absolute" loading={loading} size={20} color="#312e81" />
          )}
        </button>
        {removable && (
          <button
            type="button"
            className="absolute -top-[0.6rem] -right-[0.6rem] z-50 bg-white  hidden group-hover:flex  rounded-full"
            onClick={() => onRemove(index)}>
            <XCircle className="w-6 h-6 text-gray-400" />
          </button>
        )}
      </div>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-aa-900 purple:bg-pt-1000 p-6 text-left align-middle shadow-xl transition-all">
                  <img src={src} alt="preview" className="w-full h-full" />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
