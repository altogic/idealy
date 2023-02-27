import Button from './Button';
import { Close } from './icons';
import Input from './Input';
import Modal from './Modal';

export default function CreateModal({
  show,
  icon,
  title,
  description,
  cancelOnClick,
  createOnClick,
  label,
  id,
  placeholder,
  onClose,
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    createOnClick(data[id]);
    onClose();
  };
  return (
    <Modal open={show} onClose={onClose} {...props}>
      <div className="absolute top-8 right-8">
        <Button
          variant="icon"
          icon={<Close className="w-6 h-6 text-slate-500 dark:text-aa-300 purple:text-pt-300" />}
          onClick={cancelOnClick}
        />
      </div>
      <div className="mb-5">
        <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full ring-8 ring-green-50">
          {icon}
        </span>
      </div>
      <div className="mb-5 space-y-2">
        <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
          {title}
        </h2>
        <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
          {description}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 space-y-5">
          <Input type="text" label={label} name={id} id={id} placeholder={placeholder} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center bg-white text-gray-700 dark:text-aa-200 purple:text-pt-200 py-2.5 px-4 text-sm font-medium tracking-sm border border-gray-300 rounded-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={cancelOnClick}
            {...props}>
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-indigo-600 dark:text-aa-200 purple:text-pt-200 text-white py-2.5 px-4 text-sm font-medium tracking-sm border border-transparent rounded-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            {...props}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
