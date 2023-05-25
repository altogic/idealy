/* eslint-disable no-param-reassign */
import IdeaDetail from '@/components/Idea/IdeaDetail';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useRouter } from 'next/router';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useQuill from '@/hooks/useQuill';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

export default function AnnouncementEditor({ onChange, value }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const router = useRouter();
  const { selectedIdea } = useSelector((state) => state.idea);
  const [isStateUpdated, setIsStateUpdated] = useState(false);
  const editor = useRef();
  const valueRef = useRef(false);

  const { quill, tooltip, sidebar, input, tooltipInput, tooltipButtons, insertVideo } = useQuill(
    onChange,
    value
  );
  useEffect(() => {
    if (router.isReady && quill && !isStateUpdated && router.asPath.includes('edit')) {
      const focus = JSON.parse(router.query.focus);
      if (!focus) return;
      quill.getSelection();
      quill.setSelection(quill.getLength(), 0);
      setIsStateUpdated(true);
    }
  }, [quill, router]);

  useEffect(() => {
    if (quill && value && quill.getLength() <= 1) {
      quill.root.innerHTML = value;
      valueRef.current = true;
    }
  }, [value, quill]);

  useEffect(() => {
    if (quill && valueRef.current) {
      valueRef.current = false;
      quill.setSelection(quill.getLength(), 0);
    }
  }, [valueRef.current, quill]);

  const handleAddVideo = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      const range = quill.getSelection(true);
      const isInserted = insertVideo(value, range.index, quill);
      if (isInserted) {
        e.target.value = '';
        input.current.style.display = 'none';
      } else {
        quill.insertText(range.index, value);
        quill.setSelection(range.index + 1, Quill.sources.SILENT);
        input.current.style.display = 'none';
      }
    }
    if (e.which === 27) {
      sidebar.current.style.display = 'flex';
      input.current.style.display = 'none';
    }
  };

  return (
    <div className=" h-full">
      <Toolbar
        ref={{
          tooltipButtons,
          tooltipInput,
          tooltip
        }}
        quill={quill}
        input={input.current}
      />
      <Sidebar ref={sidebar} quill={quill} inputRef={input.current} />
      <div ref={editor} id="editor-container" className="relative bg-inherit" />
      <div ref={input} className="hidden absolute w-full">
        <input
          className="w-full focus:border-none focus:outline-none"
          placeholder="Paste a YouTube, Vimeo or tweet url and press Enter"
          onKeyDown={handleAddVideo}
          key="video-input"
        />
      </div>
      <IdeaDetail
        idea={selectedIdea}
        company={company}
        onClose={() => {
          dispatch(ideaActions.setSelectedIdea(null));
          dispatch(toggleFeedBackDetailModal());
        }}
      />
    </div>
  );
}
