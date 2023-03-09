import { useState } from 'react';
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
  const [error, setError] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data[id]) {
      createOnClick(data[id]);
      onClose();
    } else {
      setError({
        message: `Please enter a ${label.toLowerCase()}.`
      });
    }
  };
  return (
    <Modal open={show} onClose={onClose} {...props}>
      <div className="absolute top-8 right-8">
        <Button
          variant="icon"
          icon={<Close className="w-6 h-6 text-slate-500 dark:text-aa-200 purple:text-pt-200" />}
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
          <Input
            type="text"
            label={label}
            name={id}
            id={id}
            placeholder={placeholder}
            error={error}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="blank" onClick={onClose} text="Cancel" {...props} />
          <Button variant="indigo" type="submit" text="Create" {...props} />
        </div>
      </form>
    </Modal>
  );
}
