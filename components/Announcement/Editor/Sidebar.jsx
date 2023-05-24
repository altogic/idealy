/* eslint-disable no-param-reassign */
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Feedback, MinusCircle, Photo, PlusCircle, VideoCamera } from '@/components/icons';
import { uploadImage } from '@/utils/index';
import Quill from 'quill';
import { forwardRef, useState } from 'react';
import ImportIdea from './ImportIdea';
import SideBarButton from './SideBarButton';

const Sidebar = forwardRef(({ quill, inputRef }, ref) => {
  const [addNewIdea, setAddNewIdea] = useState(false);

  const addDivider = () => {
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
    quill.setSelection(range.index + 1, Quill.sources.SILENT);
    ref.current.style.display = 'none';
    const controls = document.querySelector('.controls');
    controls.style.display = 'none';
  };

  const addImage = () => {
    const range = quill.getSelection(true);
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      const position = range ? range.index : 0;
      quill.insertText(position, 'Uploading Image. Please wait...', {
        size: '2rem'
      });
      const res = await uploadImage(file, quill);

      quill.insertEmbed(
        range.index,
        'image',
        {
          alt: 'Quill Cloud',
          url: res
        },
        Quill.sources.USER
      );
      quill.deleteText(position + 1, 31);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
    };
    ref.current.style.display = 'none';
    const controls = document.querySelector('.controls');
    controls.style.display = 'none';
  };

  const addVideo = (e) => {
    e.stopPropagation();
    const range = quill.getSelection(true);
    const lineBounds = quill.getBounds(range);
    inputRef.style.display = 'block';
    inputRef.style.left = `${lineBounds.left - 15}px`;
    inputRef.style.top = `${lineBounds.top - 3}px`;
    ref.current.style.display = 'none';
    const controls = document.querySelector('.controls');
    controls.style.display = 'none';
  };

  const handleShowControl = () => {
    ref.current.classList.toggle('active');
    quill.focus();
  };

  const handleAddIdea = (idea) => {
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'idea', idea, Quill.sources.USER);
    quill.setSelection(range.index + 1, Quill.sources.SILENT);
    ref.current.style.display = 'none';
    const controls = document.querySelector('.controls');
    controls.style.display = 'none';
  };
  return (
    <div ref={ref} id="sidebar-controls">
      <Popover>
        <PopoverTrigger>
          <button
            type="button"
            id="show-controls"
            className="self-start"
            onClick={handleShowControl}>
            <PlusCircle className="w-8 h-8 icon" />
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="controls flex-1 border border-slate-200 dark:border-aa-400 purple:border-pt-400 shadow-sm rounded bg-white min-w-[288px]  max-w-[384px] min-h-[300px] relative">
            {!addNewIdea ? (
              <ul
                id="sidebar-buttons"
                className="flex w-full relative overflow-hidden overflow-y-auto flex-col space-y-3 p-2 bg-white dark:bg-aa-900 purple:bg-pt-900">
                <SideBarButton
                  id="image-button"
                  onClick={addImage}
                  Icon={Photo}
                  name="Image"
                  description="Upload an image"
                />
                <SideBarButton
                  id="video-button"
                  onClick={addVideo}
                  Icon={VideoCamera}
                  name="Video"
                  description="Embed a video"
                />
                <SideBarButton
                  id="divider-button"
                  onClick={addDivider}
                  Icon={MinusCircle}
                  name="Divider"
                  description="Add a Divider"
                />
                <SideBarButton
                  id="idea-button"
                  onClick={() => {
                    setAddNewIdea(true);
                  }}
                  Icon={Feedback}
                  name="Idea"
                  description="Import an idea"
                />
              </ul>
            ) : (
              <ImportIdea addIdea={handleAddIdea} setAddNewIdea={setAddNewIdea} />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
