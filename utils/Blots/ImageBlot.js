import { BlockEmbed } from './Blots';

export default class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('alt', value.alt || '');
    node.setAttribute('src', value.url || value);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
ImageBlot.className = 'editor-img';
