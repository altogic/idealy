import { announcementActions } from '@/redux/announcement/announcementSlice';
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
import hljs from 'highlight.js';
import _ from 'lodash';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { useEffect, useState, useRef } from 'react';
import { uploadImage } from '@/utils/index';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function useQuill(onChange, value) {
  const router = useRouter();
  const dispatch = useDispatch();
  const tooltip = useRef();
  const sidebar = useRef();
  const input = useRef();
  const tooltipInput = useRef();
  const tooltipButtons = useRef();
  const [quillInstance, setQuillInstance] = useState();

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
    quill.root.dataset.placeholder = !router.query.focus ? 'Tell your story...' : '';
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
        const [block] = quill.scroll.descendant(Block, range.index);
        if (
          block != null &&
          block.domNode.firstChild instanceof HTMLBRElement &&
          block.domNode instanceof HTMLParagraphElement
        ) {
          const lineBounds = quill.getBounds(range);
          sidebar.current.classList.remove('active');
          sidebar.current.style.display = 'block';
          sidebar.current.style.left = `${lineBounds.left - 50}px`;
          sidebar.current.style.top = `${lineBounds.top - 6}px`;
        } else {
          tooltip.current.style.display = 'none';
          sidebar.current.style.display = 'none';
          sidebar.current.classList.remove('active');
        }
      } else {
        tooltip.current.style.display = 'none';
        sidebar.current.style.display = 'none';
        sidebar.current.classList.remove('active');
        const rangeBounds = quill.getBounds(range);
        tooltip.current.style.display = 'block';
        tooltipButtons.current.style.display = 'flex';
        tooltipInput.current.style.display = 'none';
        tooltip.current.style.left = `${
          rangeBounds.left + rangeBounds.width / 2 - tooltip.current.offsetWidth / 2
        }px`;
        tooltip.current.style.top = `${rangeBounds.bottom + 10}px`;
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
      onChange(quill.root.innerHTML);
      tooltip.current.style.display = 'none';
      sidebar.current.style.display = 'none';
      sidebar.current.classList.remove('active');
    });
    quill.on(Quill.events.SELECTION_CHANGE, (range, oldRange) => {
      if (range !== null && oldRange === null) {
        const title = document.querySelector('#title').value;
        if (_.isEmpty(value) && title && router.asPath.includes('new')) {
          router.replace(
            `/announcements/edit/${title.toLowerCase().replace(/ /g, '-')}?focus=true`
          );
          dispatch(
            announcementActions.createAnnouncement({
              title,
              content: quill.root.innerHTML
            })
          );
        }
      }
    });
  }, []);

  return {
    quill: quillInstance,
    tooltip,
    sidebar,
    input,
    tooltipInput,
    tooltipButtons,
    insertVideo
  };
}
