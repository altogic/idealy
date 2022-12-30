import dynamic from 'next/dynamic';
import { EDITOR_MODULES, EDITOR_FORMATS } from '../constants';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({ content, setContent, errors, children, ...props }) {
  return (
    <div>
      {children}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={EDITOR_MODULES}
        formats={EDITOR_FORMATS}
        className={` border ${
          !errors?.message
            ? 'border-gray-300 focus:border-blue-300'
            : 'border-red-300 focus:border-red-300'
        }  rounded-md`}
        {...props}
      />
    </div>
  );
}
