import _ from 'lodash';
import { DateTime } from 'luxon';
import { BlockEmbed } from './Blots';
import { shadeHexColor } from '..';

export default class IdeaBlot extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    const profilePicture = value?.author?.profilePicture || value?.guestAvatar;
    const author = !_.isEmpty(value?.author)
      ? value?.author.name
      : value?.guestName
      ? value?.guestName
      : value?.name;

    const words = author?.split(' ');
    const name = [words[0], words[words.length - 1]].map((word) => word.charAt(0)).join('');

    const button = document.createElement('button');

    const ideaCard = `<div class="select-none relative p-4 w-full rounded-lg hover:bg-slate-50 dark:hover:bg-aa-800 purple:hover:bg-pt-900"><div class="flex gap-6"><div class="inline-flex items-center justify-center shrink-0 w-[50px] h-[50px] text-indigo-700 dark:text-aa-200 purple:text-pt-200 text-2xl font-semibold tracking-md border-2 border-slate-300 rounded-lg mt-3"><span>${
      value?.voteCount
    }</span></div><div class="flex flex-col justify-between w-full">
    <div class="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 mb-4"><h3 class="text-slate-800 dark:text-aa-200 purple:text-pt-200 font-semibold tracking-md text-left lg:truncate max-w-2xl" title=${
      value?.title
    }>${value?.title}</h2></div>
    <div spellCheck="false" class="w-3/4 text-slate-500 dark:text-aa-300 purple:text-pt-300 mb-6 text-sm tracking-sm text-left line-clamp-3">${
      value?.content ?? ''
    }</div>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-2"><div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-2 mb-4 lg:mb-0">
    <div class="flex flex-wrap items-center sm:items-center gap-4"><div class="flex items-center gap-2">${
      profilePicture
        ? `<img src=${profilePicture} alt=${name} class="rounded-full object-contain w-8 h-8"/>`
        : name &&
          `<div class="relative font-medium text-gray-600 dark:text-gray-300 text-xs inline-flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  purple:bg-pt-300 w-8 h-8">${name}</div>`
    }
    <span class="text-slate-700 dark:text-aa-200 purple:text-pt-200 text-sm font-medium tracking-sm">${author}</span></div>
    <span class="text-slate-500 dark:text-aa-300 purple:text-pt-300 text-sm tracking-sm">${DateTime.fromISO(
      value?.createdAt
    )
      .setLocale('en')
      .toRelative()}</span></div></div><div class="flex items-center justify-between lg:justify-start gap-3">
    ${
      value.status
        ? `<div style="background-color: ${shadeHexColor(value?.status?.color, 0.85)}; color: ${
            value.status.color
          }" class="inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-transparent"><svg class="-ml-1 mr-1.5 h-2 w-2" fill=${
            value.status.color
          } viewBox="0 0 8 8" > <circle cx=${4} cy=${4} r=${3} /></svg>${value.status.name}</div>`
        : ''
    }
    <div class="inline-flex items-center gap-1 text-slate-400 dark:text-aa-400 purple:text-pt-400">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M216,52H40A12,12,0,0,0,28,64V224a11.89,11.89,0,0,0,6.93,10.88A12.17,12.17,0,0,0,40,236a11.89,11.89,0,0,0,7.69-2.83l.06-.06,32.14-28.17A4,4,0,0,1,82.5,204H216a12,12,0,0,0,12-12V64A12,12,0,0,0,216,52Zm4,140a4,4,0,0,1-4,4H82.5a12.1,12.1,0,0,0-7.79,2.87l-32.16,28.2A4,4,0,0,1,36,224V64a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4Z" /></svg>${
      value?.commentCount
    }</div></div></div></div></div></button>`;
    button.innerHTML = ideaCard;
    button.setAttribute('data-id', value._id);
    button.setAttribute('id', 'idea-button');
    button.setAttribute('type', 'button');
    button.setAttribute('spellcheck', 'false');
    button.classList.add('w-full');
    node.appendChild(button);
    node.setAttribute('data-id', value._id);
    node.classList.add('border');
    node.classList.add('border-slate-300');
    node.classList.add('dark:border-aa-700');
    node.classList.add('purple:border-pt-700');
    node.classList.add('rounded-lg');
    node.classList.add('mb-4');
    node.classList.add('shadow');
    node.classList.add('hover:shadow-lg');
    node.classList.add('transition');
    node.classList.add('duration-200');
    node.classList.add('ease-in-out');

    return node;
  }

  static formats(node) {
    return {
      id: node.getAttribute('data-id')
    };
  }
}
IdeaBlot.blotName = 'idea';
IdeaBlot.tagName = 'div';
