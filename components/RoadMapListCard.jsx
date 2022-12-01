import { useState } from 'react';
import Button from './Button';
import DeleteModal from './DeleteModal';
import { Pen, Trash, Danger } from './icons';

export default function RoadMapListCard({
  title,
  description,
  modalTitle,
  modalDescription,
  ...props
}) {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <div
        className="group flex items-center justify-between gap-4 bg-white p-4 transition hover:bg-slate-50"
        {...props}>
        <div className="space-y-2">
          <h6 className="text-slate-700 text-base tracking-sm">{title}</h6>
          <p className="text-slate-500 text-sm tracking-sm">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-4 transition opacity-0 group-hover:opacity-100">
          <Button type="button" icon={<Pen className="w-5 h-5 text-slate-500" />} variant="icon" />
          <Button
            type="button"
            icon={<Trash className="w-5 h-5 text-slate-500" />}
            variant="icon"
            onClick={() => setIsDelete(!isDelete)}
          />
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        deleteOnClick={() => setIsDelete(!isDelete)}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title={modalTitle}
        description={modalDescription}
      />
    </>
  );
}
