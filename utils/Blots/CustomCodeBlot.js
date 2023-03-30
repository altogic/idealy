import { CodeBlock } from './Blots';

export default class CustomCode extends CodeBlock {
  static create(value) {
    const node = super.create(value);
    return node;
  }

  static value(node) {
    return {
      lang: node.getAttribute('class'),
      content: node.innerText,
    };
  }
}

CustomCode.blotName = 'code-block';
CustomCode.tagName = 'pre';
CustomCode.className = 'ql-syntax';
