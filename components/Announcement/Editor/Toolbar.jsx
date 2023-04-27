/* eslint-disable no-param-reassign */
import {
  Bold,
  ClearFormat,
  Code,
  HOne,
  HTwo,
  Italic,
  Link,
  List,
  ListNumbers,
  Quote,
  Strikethrough,
  Underline
} from '@/components/icons';
import Quill from 'quill';
import { forwardRef } from 'react';
import hljs from 'highlight.js';

const Toolbar = forwardRef(({ quill, input }, { tooltip, tooltipButtons, tooltipInput }) => {
  const removeFormat = () => {
    const range = quill.getSelection(true);
    if (quill.getLeaf(range.index)[0])
      if (range.length === 0) {
        let leaf;
        const offset = quill.getLeaf(range.index);
        quill.removeFormat(range.index - offset, range.index + leaf.domNode.length);
      } else {
        if (
          quill.getLeaf(range.index)[0]?.parent?.attributes?.attributes.token?.keyName === 'hljs'
        ) {
          quill
            .getLeaf(range.index)[0]
            ?.parent?.attributes.domNode.classList.remove('hljs-attribute');
        }
        quill.removeFormat(range.index, range.length, Quill.sources.USER);
      }
  };

  const handleAddLink = (e) => {
    const { value } = e.target;
    if (e.which === 13) {
      setTimeout(() => {
        quill.format('link', value);
      }, 0.1);
      e.target.value = '';
    }
    if (e.code === 27) {
      tooltip.style.display = 'flex';
      input.style.display = 'none';
      e.target.value = '';
    }
  };
  const addLink = (e) => {
    e.stopPropagation();
    tooltipInput.current.style.display = 'flex';
    tooltipButtons.current.style.display = 'none';
  };
  const formatCode = () => {
    quill.format('code-block', 2);
    const syntax = document.getElementsByClassName('ql-syntax');
    const code = document.createElement('code');
    if (syntax.length > 0) {
      Array.from(syntax).forEach((item) => {
        code.innerHTML = hljs.highlightAuto(item.innerText).value;
        item.innerHTML = code.outerHTML;
      });
    }
  };

  const handleFormat = (type, ...param) => {
    quill.format(type, ...param);
  };
  return (
    <div
      ref={tooltip}
      id="tooltip-controls"
      className="hidden absolute bg-white dark:bg-aa-900 purple:bg-pt-900 border border-slate-200 dark:border-aa-600 purple:border-pt-800 rounded-md shadow py-2 px-3">
      <div className="space-x-3 transition ease-in-out duration-500" ref={tooltipButtons}>
        <button type="button" id="bold-button" onClick={() => handleFormat('bold', true)}>
          <Bold className="w-5 h-5 icon" />
        </button>
        <button type="button" id="italic-button" onClick={() => handleFormat('italic', true)}>
          <Italic className="w-5 h-5 icon" />
        </button>
        <button type="button" id="italic-button" onClick={() => handleFormat('underline', true)}>
          <Underline className="w-5 h-5 icon" />
        </button>
        <button type="button" id="italic-button" onClick={() => handleFormat('strike', true)}>
          <Strikethrough className="w-5 h-5 icon" />
        </button>
        <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
        <button type="button" id="link-button" onClick={addLink}>
          <Link className="w-5 h-5 icon" />
        </button>
        <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
        <button type="button" id="link-button" onClick={() => handleFormat('list', 'bullet', true)}>
          <List className="w-5 h-5 icon" />
        </button>
        <button
          type="button"
          id="link-button"
          onClick={() => handleFormat('list', 'ordered', true)}>
          <ListNumbers className="w-5 h-5 icon" />
        </button>
        <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
        <button
          type="button"
          id="blockquote-button"
          onClick={() => handleFormat('blockquote', true)}>
          <Quote className="w-5 h-5 icon" />
        </button>
        <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
        <button type="button" id="header-1-button" onClick={() => handleFormat('header', 1)}>
          <HOne className="w-5 h-5 icon" />
        </button>
        <button type="button" id="header-2-button" onClick={() => handleFormat('header', 2)}>
          <HTwo className="w-5 h-5 icon" />
        </button>
        <div className="flex w-px h-4 border-r border-slate-200 dark:border-aa-400 purple:border-pt-400" />
        <button type="button" id="divider-button" onClick={formatCode}>
          <Code className="w-5 h-5 icon" />
        </button>
        <button type="button" id="divider-button" onClick={removeFormat}>
          <ClearFormat className="w-5 h-5 icon" />
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
  );
});

Toolbar.displayName = 'Toolbar';
export default Toolbar;
