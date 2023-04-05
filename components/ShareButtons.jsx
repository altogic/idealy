import { Facebook, LinkedIn, Twitter } from '@/components/icons';
import ToastMessage from '@/utils/toast';
import { LinkSimple } from '@phosphor-icons/react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import copy from 'copy-to-clipboard';

export default function ShareButtons({ url, title, summary, hashtags }) {
  function copyToClipboard() {
    copy(url);
    ToastMessage.success('Copied to clipboard');
  }
  return (
    <div className="flex gap-4 items-center ">
      <FacebookShareButton url={url} quote={summary} hashtag={hashtags}>
        <Facebook className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 ml-2 " />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <Twitter className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 " />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} summary={summary} source={url}>
        <LinkedIn className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 " />
      </LinkedinShareButton>
      <button type="button" onClick={copyToClipboard}>
        <LinkSimple className="w-5 h-5 fill-slate-500 dark:fill-aa-200 purple:fill-pt-200 " />
      </button>
    </div>
  );
}
