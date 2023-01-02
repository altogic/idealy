import React, { Fragment, useState } from 'react';
import cn from 'classnames';
import { ClipLoader } from 'react-spinners';
import { XCircle } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';

function ImageList({ images, loading, onRemove, removable, isPreview }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {images?.map((file, index) => (
        <button
          className={cn(
            'relative group border border-slate-400 rounded flex items-center justify-center',
            isPreview ? 'cursor-pointer' : 'cursor-default'
          )}
          key={file}
          type="button"
          onClick={() => {
            if (isPreview) {
              setOpen(true);
              setSelectedImage(file);
            }
          }}>
          <img
            src={file}
            alt="preview"
            className={cn(
              'w-20 h-20 object-contain rounded',
              loading && index === images.length - 1 && 'filter blur-sm'
            )}
          />
          {loading && index === images.length - 1 && (
            <ClipLoader
              loading={loading && index === images.length - 1}
              size={20}
              className="absolute"
              color="#fff"
            />
          )}
          {removable && (
            <button
              type="button"
              className="absolute -top-[0.6rem] -right-[0.6rem] z-50 bg-white  hidden group-hover:flex hidden rounded-full"
              onClick={() => onRemove(index)}>
              <XCircle className="w-6 h-6 text-gray-400" />
            </button>
          )}
        </button>
      ))}
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
                  <div>
                    <img src={selectedImage} alt="preview" className="w-full h-full" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ImageList;
