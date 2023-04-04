/* eslint-disable no-param-reassign */
import useDebounce from '@/hooks/useDebounce';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import FileService from '@/services/file';
import {
  BlockquoteBlot,
  BoldBlot,
  CustomCodeBlot,
  DividerBlot,
  HeaderBlot,
  IdeaBlot,
  ImageBlot,
  ItalicBlot,
  LinkBlot,
  TweetBlot,
  VideoBlot
} from '@/utils/Blots';
import { Block } from '@/utils/Blots/Blots';
import {
  Broom,
  CaretLeft,
  Code,
  Image,
  LightbulbFilament,
  Link,
  ListDashes,
  ListNumbers,
  MinusCircle,
  PlusCircle,
  Quotes,
  TextB,
  TextHOne,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  VideoCamera,
  X
} from '@phosphor-icons/react';
import hljs from 'highlight.js';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFeedBackDetailModal } from '@/redux/general/generalSlice';
import EditorSideBarButton from './EditorSideBarButton';
import EmptyState from './EmptyState';
import StatusBadge from './StatusBadge';
import IdeaDetail from './Idea/IdeaDetail';

const uploadImage = async (file) => {
  const { data } = await FileService.uploadFile(file, file.name);
  return data.publicPath;
};
async function imageHandler(imageDataUrl, type, imageData) {
  const file = imageData.toFile();
  const range = this.quill.getSelection();
  this.quill.insertText(range.index, 'Uploading Image. Please wait...', {
    size: '2rem'
  });
  const res = await uploadImage(file);

  this.quill.insertEmbed(
    range.index,
    'image',
    {
      alt: 'Quill Cloud',
      url: res
    },
    Quill.sources.USER
  );
  this.quill.deleteText(range.index + 1, 31);
  this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
}

export default function AnnouncementEditor({ onChange, value }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  const { similarIdeas: ideas, selectedIdea } = useSelector((state) => state.idea);
  const [quillInstance, setQuillInstance] = useState();
  const [isStateUpdated, setIsStateUpdated] = useState(false);
  const [addNewIdea, setAddNewIdea] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState();
  const [content, setContent] = useState(value);
  useDebounce(ideaTitle, () => {
    dispatch(
      ideaActions.searchSimilarIdeas({
        title: ideaTitle,
        companyId: company._id,
        random: false,
        page: 1,
        limit: 5
      })
    );
  });

  useDebounce(
    content,
    () => {
      onChange(content);
    },
    1000
  );

  const tooltip = useRef();
  const sidebar = useRef();
  const editor = useRef();
  const input = useRef();
  const tooltipInput = useRef();
  const tooltipButtons = useRef();

  const validateURL = (url) => {
    const expression =
      /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return (
      regex.test(url) &&
      (url.includes('dailymotion') ||
        url.includes('vimeo') ||
        url.includes('youtube') ||
        url.includes('youtu.be') ||
        url.includes('twitter'))
    );
  };
  const insertVideo = (url, index, quill, isChangeEvent) => {
    if (validateURL(url)) {
      if (url.includes('twitter')) {
        const tweetUrlArray = url.split('/');
        const tweetId = tweetUrlArray[tweetUrlArray.length - 1];
        quill.insertEmbed(index, 'tweet', tweetId, Quill.sources.USER);
        quill.setSelection(index + 1, Quill.sources.SILENT);
      } else {
        quill.insertEmbed(index, 'video', url, Quill.sources.USER);
        quill.formatText(index + 1, 1, {
          height: '480',
          width: '854'
        });
        quill.setSelection(index + 1, Quill.sources.SILENT);
      }
      if (isChangeEvent) {
        quill.deleteText(index + 1, url.length, Quill.sources.USER);
      }
      return true;
    }
    return false;
  };

  function closeAddIdea() {
    setAddNewIdea(false);
    setIdeaTitle('');
  }
  useEffect(() => {
    const bindings = {
      code: {
        key: 'backspace',
        format: ['code-block'],
        empty: true,
        handler() {
          // eslint-disable-next-line no-use-before-define
          quill.format('code-block', false, Quill.sources.USER);
        }
      }
    };
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

    const quill = new Quill('#editor-container', {
      // scrollingContainer: document.documentElement,
      modules: {
        imageDropAndPaste: {
          handler: imageHandler
        },
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value
        },

        clipboard: {
          matchVisual: false
        },
        keyboard: {
          bindings
        }
      }
    });
    quill.root.dataset.placeholder = 'Tell your story...';
    setQuillInstance(quill);
    Quill.register(BoldBlot);
    Quill.register(ItalicBlot);
    Quill.register(LinkBlot);
    Quill.register(BlockquoteBlot);
    Quill.register(HeaderBlot);
    Quill.register(DividerBlot);
    Quill.register(ImageBlot);
    Quill.register(TweetBlot);
    Quill.register(IdeaBlot);
    Quill.register(VideoBlot);
    Quill.register(CustomCodeBlot, true);
    quill.addContainer(tooltip.current);
    quill.addContainer(sidebar.current);
    quill.addContainer(input.current);

    quill.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
      quill.root.dataset.placeholder = '';
      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;
      if (range.length === 0) {
        tooltip.current.style.display = 'none';
        sidebar.current.style.display = 'flex';
        const [block] = quill.scroll.descendant(Block, range.index);
        if (!(block != null && block.domNode.firstChild instanceof HTMLBRElement)) {
          tooltip.current.style.display = 'none';
          sidebar.current.style.display = 'none';
          sidebar.current.classList.remove('active');
        }
      } else {
        tooltip.current.style.display = 'none';
        sidebar.current.style.display = 'none';
        sidebar.current.classList.remove('active');
        tooltip.current.style.display = 'flex';
        tooltipButtons.current.style.display = 'flex';
        tooltipInput.current.style.display = 'none';
      }
    });
    quill.on(Quill.events.TEXT_CHANGE, (delta) => {
      delta.ops.forEach((op) => {
        if (op.insert) {
          const range = quill.getSelection(true);
          insertVideo(op.insert, range.index, quill, true);
        }
      });
      if (quill.root.innerHTML.length > 0 && quill.root.innerHTML !== '<p><br></p>') {
        quill.root.dataset.placeholder = '';
      } else {
        quill.root.dataset.placeholder = 'Tell your story...';
      }

      setContent(quill.root.innerHTML);
      sidebar.current.style.display = 'none';
      sidebar.current.classList.remove('active');
    });
    const tooltipControl = document.querySelector('#tooltip-controls');
    const sidebarControl = document.querySelector('#sidebar-controls');
    document.addEventListener('selectionchange', (e) => {
      if (e.target.activeElement.className !== 'ql-editor') return;
      const s = window.getSelection();
      const oRange = s.getRangeAt(0); // get the text range

      if (s.type === 'Range' && !s.isCollapsed) {
        const oRect = oRange.getBoundingClientRect();
        tooltipControl.style.left = `${oRect.left + oRect.width / 2}px`;
        tooltipControl.style.top = `${oRect.bottom + 10}px`;
        tooltipControl.style.transform = 'translateX(-50%)';
      } else {
        tooltipControl.style.display = 'none';
      }
      if (s.type === 'Caret' && s.anchorOffset === 0) {
        sidebarControl.classList.remove('active');
        sidebarControl.style.display = 'flex';
        const range = quill.getSelection(true);
        const caret = quill.getBounds(range);
        const cursorPosition = quill.container.getBoundingClientRect();
        sidebarControl.style.left = `${caret.left + cursorPosition.left + window.scrollX - 40}px`;
        sidebarControl.style.top = `${caret.top + cursorPosition.top + window.scrollY - 5}px`;
      } else {
        sidebarControl.style.display = 'none';
      }
    });

    const scrollContainer = document.getElementById('editor-scroll-container');
    scrollContainer.addEventListener('scroll', () => {
      tooltipControl.style.display = 'none';
      sidebarControl.style.display = 'none';
      sidebarControl.classList.remove('active');
    });

    return () => {
      quill.off(Quill.events.EDITOR_CHANGE);
      quill.off(Quill.events.TEXT_CHANGE);
      document.removeEventListener('selectionchange', () => {});
      scrollContainer.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    if (value && quillInstance && !isStateUpdated) {
      quillInstance.root.innerHTML = value;

      quillInstance.getSelection();
      quillInstance.setSelection(quillInstance.getLength(), 0);
      setIsStateUpdated(true);
    }
  }, [value, quillInstance]);

  const removeFormat = () => {
    const range = quillInstance.getSelection(true);
    if (quillInstance.getLeaf(range.index)[0])
      if (range.length === 0) {
        let leaf;
        const offset = quillInstance.getLeaf(range.index);
        quillInstance.removeFormat(range.index - offset, range.index + leaf.domNode.length);
      } else {
        if (
          quillInstance.getLeaf(range.index)[0]?.parent?.attributes?.attributes.token?.keyName ===
          'hljs'
        ) {
          quillInstance
            .getLeaf(range.index)[0]
            ?.parent?.attributes.domNode.classList.remove('hljs-attribute');
        }
        quillInstance.removeFormat(range.index, range.length, Quill.sources.USER);
      }
  };
  const handleAddVideo = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      const range = quillInstance.getSelection(true);
      const isInserted = insertVideo(value, range.index, quillInstance);
      if (isInserted) {
        e.target.value = '';
        input.current.style.display = 'none';
      } else {
        quillInstance.insertText(range.index, value);
        quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
        input.current.style.display = 'none';
      }
    }
    if (e.which === 27) {
      sidebar.current.style.display = 'flex';
      input.current.style.display = 'none';
    }
  };
  const handleAddLink = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      setTimeout(() => {
        quillInstance.format('link', value);
      }, 0.1);
      e.target.value = '';
    }
    if (e.code === 27) {
      tooltip.current.style.display = 'flex';
      input.current.style.display = 'none';
      e.target.value = '';
    }
  };
  const addLink = (e) => {
    e.stopPropagation();
    tooltipInput.current.style.display = 'flex';
    tooltip.current.style.display = 'flex';
    tooltipButtons.current.style.display = 'none';
  };
  const formatCode = () => {
    quillInstance.format('code-block', 2);
    const syntax = document.getElementsByClassName('ql-syntax');
    const code = document.createElement('code');
    if (syntax.length > 0) {
      Array.from(syntax).forEach((item) => {
        code.innerHTML = hljs.highlightAuto(item.innerText).value;
        item.innerHTML = code.outerHTML;
      });
    }
  };
  const addDivider = () => {
    const range = quillInstance.getSelection(true);
    quillInstance.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
    quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
    sidebar.current.style.display = 'none';
  };
  const addImage = () => {
    const range = quillInstance.getSelection(true);
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      const position = range ? range.index : 0;
      quillInstance.insertText(position, 'Uploading Image. Please wait...', {
        size: '2rem'
      });
      const res = await uploadImage(file, quillInstance);

      quillInstance.insertEmbed(
        range.index,
        'image',
        {
          alt: 'Quill Cloud',
          url: res
        },
        Quill.sources.USER
      );
      quillInstance.deleteText(position + 1, 31);
      quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
    };
    sidebar.current.style.display = 'none';
  };
  const addVideo = (e) => {
    e.stopPropagation();
    const range = quillInstance.getSelection(true);
    const lineBounds = quillInstance.getBounds(range);
    input.current.style.display = 'block';
    input.current.style.left = `${lineBounds.left - 15}px`;
    input.current.style.top = `${lineBounds.top - 3}px`;
    sidebar.current.style.display = 'none';
  };
  const handleShowControl = () => {
    sidebar.current.classList.toggle('active');
    quillInstance.focus();
    closeAddIdea();
  };
  const handleFormat = (type, ...param) => {
    quillInstance.format(type, ...param);
  };

  const handleAddIdea = (idea) => {
    const range = quillInstance.getSelection(true);
    quillInstance.insertEmbed(
      range.index,
      'idea',
      {
        ...idea,
        onClick: () => {
          dispatch(ideaActions.setSelectedIdea(idea));
          dispatch(toggleFeedBackDetailModal(true));
        }
      },
      Quill.sources.USER
    );
    quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
    sidebar.current.style.display = 'none';
  };

  return (
    <div className=" h-full">
      <div
        ref={tooltip}
        id="tooltip-controls"
        className="hidden fixed bg-white dark:bg-aa-900 purple:bg-pt-900 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-md shadow py-2 px-3">
        <div className="space-x-3  transition ease-in-out duration-500" ref={tooltipButtons}>
          <button type="button" id="bold-button" onClick={() => handleFormat('bold', true)}>
            <TextB size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <button type="button" id="italic-button" onClick={() => handleFormat('italic', true)}>
            <TextItalic size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <button type="button" id="italic-button" onClick={() => handleFormat('underline', true)}>
            <TextUnderline
              size={20}
              className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200"
            />
          </button>
          <button type="button" id="italic-button" onClick={() => handleFormat('strike', true)}>
            <TextStrikethrough
              size={20}
              className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200"
            />
          </button>
          <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
          <button type="button" id="link-button" onClick={addLink}>
            <Link size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
          <button
            type="button"
            id="link-button"
            onClick={() => handleFormat('list', 'bullet', true)}>
            <ListDashes size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <button
            type="button"
            id="link-button"
            onClick={() => handleFormat('list', 'ordered', true)}>
            <ListNumbers size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
          <button
            type="button"
            id="blockquote-button"
            onClick={() => handleFormat('blockquote', true)}>
            <Quotes size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
          <button type="button" id="header-1-button" onClick={() => handleFormat('header', 1)}>
            <TextHOne size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <button type="button" id="header-2-button" onClick={() => handleFormat('header', 2)}>
            <TextHTwo size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
          <button type="button" id="divider-button" onClick={formatCode}>
            <Code size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
          <button type="button" id="divider-button" onClick={removeFormat}>
            <Broom size={20} className="fill-slate-500 dark:fill-aa-200 purple:fill-pt-200" />
          </button>
        </div>
        <div ref={tooltipInput} className="hidden w-[244px] h-[22px]">
          <input
            className=" w-full h-full focus:border-none focus:outline-none bg-transparent text-slate-700 text-xs placeholder:text-xs"
            placeholder="Paste or type a link…"
            onKeyDown={handleAddLink}
          />
        </div>
      </div>

      <div ref={sidebar} id="sidebar-controls">
        <button type="button" id="show-controls" className="self-start" onClick={handleShowControl}>
          <PlusCircle size={32} weight="thin" />
        </button>
        <div className="controls flex-1 border border-slate-200 dark:border-aa-400 purple:border-pt-400 shadow-sm rounded bg-white min-w-[288px] w-  max-w-[384px] min-h-[300px]">
          {!addNewIdea ? (
            <ul className="flex w-full relative overflow-hidden overflow-y-auto flex-col space-y-3 p-2 ">
              <EditorSideBarButton
                id="image-button"
                onClick={addImage}
                Icon={Image}
                name="Image"
                description="Upload an image"
              />
              <EditorSideBarButton
                id="video-button"
                onClick={addVideo}
                Icon={VideoCamera}
                name="Video"
                description="Embed a video"
              />
              <EditorSideBarButton
                id="divider-button"
                onClick={addDivider}
                Icon={MinusCircle}
                name="Divider"
                description="Add a Divider"
              />
              <EditorSideBarButton
                id="idea-button"
                onClick={() => {
                  setAddNewIdea(true);
                  dispatch(
                    ideaActions.searchSimilarIdeas({
                      title: ideaTitle,
                      companyId: company._id,
                      random: true,
                      page: 1,
                      limit: 5
                    })
                  );
                }}
                Icon={LightbulbFilament}
                name="Idea"
                description="Import an idea"
              />
            </ul>
          ) : (
            <div className="w-full">
              <div className="flex gap-2 relative p-3 border-b border-slate-200 dark:border-aa-400 purple:border-pt-400">
                <button type="button" onClick={closeAddIdea}>
                  <CaretLeft size={24} weight="thin" />
                </button>
                <input
                  placeholder="Search idea"
                  className="outline-none grow"
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  value={ideaTitle}
                />
                {ideaTitle && (
                  <button type="button" onClick={() => setIdeaTitle('')}>
                    <X size={24} weight="thin" />
                  </button>
                )}
              </div>
              <ul className="flex flex-col h-full space-y-2 max-h-60 overflow-y-auto p-3">
                {ideas.length ? (
                  ideas.map((idea) => (
                    <li
                      key={idea._id}
                      className=" hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900 px-3 py-2 rounded">
                      <button
                        type="button"
                        onClick={() => handleAddIdea(idea)}
                        className="flex gap-4 justify-between w-full">
                        <p className=" text-sm text-slate-700 dark:text-aa-200 purple:text-pt-200 truncate">
                          {idea?.title}
                        </p>
                        {idea?.status && (
                          <StatusBadge name={idea?.status?.name} color={idea?.status?.color} />
                        )}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="m-auto">
                    <EmptyState
                      title="No ideas found"
                      description="Your search did not match any idea. Please retry or try a new word."
                    />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div ref={editor} id="editor-container" className="relative h-full bg-inherit" />
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
