import { XCircle } from '@/components/icons';
import cn from 'classnames';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Modal from './Modal';

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
            className={cn('object-contain rounded min-h-[3rem] p-1', loading && 'filter blur-sm')}
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={src} alt="preview" className="w-full h-full" />
      </Modal>
    </>
  );
}
