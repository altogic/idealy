import { BlockEmbed } from './Blots';

export default class VideoBlot extends BlockEmbed {
  static create(url) {
    const node = super.create();
    const embedUrl = this.convertMedia(url);
    node.setAttribute('src', embedUrl);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    return node;
  }

  static formats(node) {
    const format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }

  static value(node) {
    return node.getAttribute('src');
  }

  static convertMedia(url) {
    const vimeo = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    const youtube = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

    if (vimeo.test(url)) {
      return url.replace(vimeo, '//player.vimeo.com/video/$1');
    }

    if (youtube.test(url)) {
      return url.replace(youtube, 'https://lite-youtube-embed-iframe.vercel.app/embed/$1');
    }
    if (url.includes('dailymotion')) {
      return url.replace('video', 'embed/video');
    }
    return url;
  }

  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';
VideoBlot.className = 'editor-video';
