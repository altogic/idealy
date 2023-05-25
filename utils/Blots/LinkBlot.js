import { Inline } from './Blots';

export default class LinkBlot extends Inline {
  static create(val) {
    const node = super.create();
    let _val = val;
    // Sanitize url value if desired
    if (!val.startsWith('http') && !val.startsWith('https')) {
      _val = `https://${val}`;
    }

    node.setAttribute('href', _val);
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('target', '_blank');
    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('href');
  }
}
LinkBlot.blotName = 'link';
LinkBlot.tagName = 'a';
LinkBlot.className = 'link';
