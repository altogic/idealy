import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Close } from '@/components/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function ConfirmDeleteModal({
  show,
  cancelOnClick,
  icon,
  title,
  description,
  deleteOnClick,
  companyName,
  ...props
}) {
  const companyNameSchema = new yup.ObjectSchema({
    companyName: yup.string().required('Company name is required')
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(companyNameSchema),
    mode: 'onBlur'
  });

  const handleDelete = () => {
    if (watch('companyName') === companyName) {
      deleteOnClick();
    } else {
      setError('companyName', {
        type: 'manual',
        message: 'Company name is not correct'
      });
    }
  };

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
                <div className="absolute top-8 right-8">
                  <Button
                    variant="icon"
                    icon={<Close className="w-6 h-6 text-slate-500" />}
                    onClick={cancelOnClick}
                  />
                </div>
                <div className="mb-5">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 rounded-full ring-8 ring-red-50">
                    {icon}
                  </span>
                </div>
                <div className="mb-5 space-y-2">
                  <h2 className="text-slate-800 text-lg font-medium tracking-sm">{title}</h2>
                  <p className="text-slate-500 text-sm tracking-sm">{description}</p>
                </div>
                <form onSubmit={handleSubmit(handleDelete)}>
                  <div>
                    <label htmlFor="confirm" className="text-slate-700 tracking-sm">
                      Please enter <span className="font-semibold">&quot;{companyName}&quot;</span>{' '}
                      to confirm
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      id="companyName"
                      register={register('companyName')}
                      error={errors.companyName}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full lg:w-auto bg-white dark:bg-aa-400 purple:bg-pt-400 text-gray-700 dark:text-aa-100 purple:text-pt-100 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      onClick={cancelOnClick}
                      {...props}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full lg:w-auto bg-red-600 dark:bg-red-900 purple:bg-red-900 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      {...props}>
                      Delete
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
