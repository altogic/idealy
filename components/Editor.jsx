import dynamic from 'next/dynamic';
import EditorToolbar, { modules, formats } from './EditorToolbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({ content, setContent, errors, ...props }) {
  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
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
