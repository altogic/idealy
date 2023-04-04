import { Block, Parchment } from './Blots';

export default class BlockquoteBlot extends Block {}
BlockquoteBlot.scope = Parchment.Scope.BLOCK;
BlockquoteBlot.blotName = 'blockquote';
BlockquoteBlot.tagName = 'blockquote';
