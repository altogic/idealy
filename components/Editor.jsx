import dynamic from 'next/dynamic';
import EditorToolbar, { formats, modules } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({ content, setContent, errors, children, ...props }) {
  return (
    <>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className={` border ${
          !errors?.message
            ? 'border-gray-300 dark:border-aa-400 purple:border-pt-400 focus:border-blue-300'
            : 'border-red-300 focus:border-red-300'
        }  rounded-md`}
        {...props}
      />
      <EditorToolbar />
      {children}
    </>
  );
}
