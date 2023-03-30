import TwitterWidgetsLoader from 'twitter-widgets';
import { BlockEmbed } from './Blots';

export default class TweetBlot extends BlockEmbed {
  static create(id) {
    const node = super.create();
    node.dataset.id = id;
    // Allow twitter library to modify our contents
    TwitterWidgetsLoader.load((err, twttr) => {
      if (err) {
        // do some graceful degradation / fallback
        return;
      }

      twttr.widgets.createTweet(id, node);
    });
    return node;
  }

  static value(domNode) {
    return domNode.dataset.id;
  }
}
TweetBlot.blotName = 'tweet';
TweetBlot.tagName = 'div';
TweetBlot.className = 'tweet';
