import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Button from './Button';
import Input from './Input';
import { Close } from './icons';

export default function CreateModal({
  show,
  cancelOnClick,
  icon,
  title,
  description,
  createOnClick,
  label,
  id,
  placeholder,
  ...props
}) {
  return (
    <Transition appear show={show} as={Fragment} {...props}>
      <Dialog as="div" className="relative z-10" {...props}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-8 right-8">
                  <Button
                    variant="icon"
                    icon={<Close className="w-6 h-6 text-slate-500" />}
                    onClick={cancelOnClick}
                  />
                </div>
                <div className="mb-5">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full ring-8 ring-green-50">
                    {icon}
                  </span>
                </div>
                <div className="mb-5 space-y-2">
                  <h2 className="text-slate-800 text-lg font-medium tracking-sm">{title}</h2>
                  <p className="text-slate-500 text-sm tracking-sm">{description}</p>
                </div>
                <form action="" className="mb-8 space-y-5">
                  <Input type="text" label={label} name={id} id={id} placeholder={placeholder} />
                </form>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center bg-white text-gray-700 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={cancelOnClick}
                    {...props}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={createOnClick}
                    {...props}>
                    Create
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
