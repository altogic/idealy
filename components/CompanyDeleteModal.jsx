import Button from '@/components/Button';
import { Close } from '@/components/icons';
import Input from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Modal from './Modal';

export default function CompanyDeleteModal({
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
    <Modal open={show} onClose={cancelOnClick}>
      <div className="absolute top-8 right-8">
        <Button
          variant="icon"
          icon={<Close className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />}
          onClick={cancelOnClick}
        />
      </div>
      <div className="mb-5">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-aa-200 purple:bg-pt-200 rounded-full ring-8 ring-red-50 dark:ring-aa-100 purple:ring-pt-100">
          {icon}
        </span>
      </div>
      <div className="mb-5 space-y-2">
        <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
          {title}
        </h2>
        <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
          {description}
        </p>
      </div>
      <form onSubmit={handleSubmit(handleDelete)}>
        <div>
          <label
            htmlFor="confirm"
            className="text-slate-800 dark:text-aa-200 purple:text-pt-200 tracking-sm">
            Please enter <span className="font-semibold">&quot;{companyName}&quot;</span> to confirm
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
            className="inline-flex items-center justify-center w-full lg:w-auto bg-white dark:bg-aa-300 purple:bg-pt-300 text-gray-700 dark:text-aa-600 purple:text-pt-600 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300 dark:border-aa-400 purple:border-pt-400 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
    </Modal>
  );
}
