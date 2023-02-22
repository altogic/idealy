import dynamic from 'next/dynamic';
import 'quill-mention';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from './EditorToolbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const EditorToolbar = dynamic(() => import('./EditorToolbar'), { ssr: false });
// Quill editor component

export default function Editor({ content, setContent, errors, children, ...props }) {
  const [isEditorFocus, setIsEditorFocus] = useState();

  return (
    <>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className={` border border-gray-300 dark:border-aa-600 purple:border-pt-600 focus:border-blue-300 ${
          errors?.message ? 'border-red-300 focus:border-red-300' : ''
        } ${isEditorFocus ? 'border-2 border-indigo-500' : ''} rounded-md`}
        onFocus={() => setIsEditorFocus(true)}
        onBlur={() => setIsEditorFocus(false)}
        {...props}
      />
      <EditorToolbar>{children}</EditorToolbar>
    </>
  );
}
