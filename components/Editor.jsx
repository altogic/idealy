import cn from 'classnames';
import dynamic from 'next/dynamic';
import 'quill-mention';
import { useState } from 'react';
import { formats, modules } from './EditorToolbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const EditorToolbar = dynamic(() => import('./EditorToolbar'), { ssr: false });

export default function Editor({ content, setContent, errors, children, dashboard, ...props }) {
  const [isEditorFocus, setIsEditorFocus] = useState();

  return (
    <>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className={cn(
          !dashboard
            ? 'editor border border-gray-300 dark:border-aa-600 purple:border-pt-600 focus:border-blue-300'
            : 'dashboard-editor',
          !dashboard && errors?.message ? 'border-red-300 focus:border-red-300' : '',
          !dashboard && isEditorFocus ? 'border border-indigo-500' : ''
        )}
        onFocus={() => setIsEditorFocus(true)}
        onBlur={() => setIsEditorFocus(false)}
        {...props}
      />
      <EditorToolbar>{children}</EditorToolbar>
    </>
  );
}
