import { Block } from './Blots';

export default class HeaderBlot extends Block {
  static formats(node) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
HeaderBlot.blotName = 'header';
// Medium only supports two header sizes, so we will only demonstrate two,
// but we could easily just add more tags into this array
HeaderBlot.tagName = ['H1', 'H2'];
