import { Facebook, LinkedIn, Twitter, Link } from '@/components/icons';
import ToastMessage from '@/utils/toast';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import copy from 'copy-to-clipboard';

export default function ShareButtons({ url, title, summary, hashtags }) {
  function copyToClipboard() {
    copy(url);
    ToastMessage.success('Copied to clipboard');
  }
  return (
    <div className="flex gap-2 items-center ">
      <FacebookShareButton url={url} quote={summary} hashtag={hashtags}>
        <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#1877F2] dark:hover:bg-gray-700 dark:hover:text-[#1877F2] purple:hover:bg-gray-700 purple:hover:text-[#1877F2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
          <Facebook className="w-5 h-5" />
        </div>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <Twitter className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 " />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} summary={summary} source={url}>
        <LinkedIn className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200 " />
      </LinkedinShareButton>
      <button type="button" onClick={copyToClipboard}>
        <Link className="w-5 h-5 icon" />
      </button>
    </div>
  );
}
