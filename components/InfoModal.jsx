import Button from './Button';
import Modal from './Modal';

export default function InfoModal({
  show,
  title,
  icon,
  description,
  cancelOnClick,
  onConfirm,
  confirmText,
  canCancel,
  cancelText,
  confirmColor,
  ...props
}) {
  return (
    <Modal open={show} onClose={cancelOnClick} {...props}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 mb-8 lg:mb-4">
        {icon && (
          <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ring-8 bg-gray-200 dark:bg-aa-200 purple:bg-pt-200  ring-gray-100 dark:ring-aa-100 purple:ring-pt-100">
            {icon}
          </span>
        )}
        <div className="text-center lg:text-left space-y-2">
          <h2 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-medium tracking-sm">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-3">
        {canCancel && (
          <Button
            onClick={cancelOnClick}
            text={cancelText || 'Cancel'}
            variant="blank"
            {...props}
          />
        )}
        <Button
          variant={confirmColor}
          onClick={() => {
            onConfirm();
            cancelOnClick();
          }}
          text={confirmText || 'Confirm'}
          {...props}
        />
      </div>
    </Modal>
  );
}
