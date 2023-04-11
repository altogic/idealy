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
    <div className="flex gap-2 items-center ">
      <FacebookShareButton url={url} quote={summary} hashtag={hashtags}>
        <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#1877F2] dark:hover:bg-gray-700 dark:hover:text-[#1877F2] purple:hover:bg-gray-700 purple:hover:text-[#1877F2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
          <Facebook className="w-5 h-5" />
        </div>
      </FacebookShareButton>
      <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#1DA1F2] dark:hover:bg-gray-700 dark:hover:text-[#1DA1F2] purple:hover:bg-gray-700 purple:hover:text-[#1DA1F2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
        <TwitterShareButton url={url} title={title} hashtags={hashtags}>
          <Twitter className="w-5 h-5" />
        </TwitterShareButton>
      </div>
      <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#0A66C2] dark:hover:bg-gray-700 dark:hover:text-[#0A66C2] purple:hover:bg-gray-700 purple:hover:text-[#0A66C2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
        <LinkedinShareButton url={url} title={title} summary={summary} source={url}>
          <LinkedIn className="w-5 h-5" />
        </LinkedinShareButton>
      </div>

      <button
        className="w-8 h-8 flex justify-center items-center rounded-full group duration-300 hover:bg-[#8A2BE2] dark:hover:bg-gray-700  purple:hover:bg-gray-700"
        type="button"
        onClick={copyToClipboard}>
        <LinkSimple className="w-5 h-5 group-hover:fill-white group-hover:dark:fill-[#8A2BE2] group-hover:purple:fill-[#8A2BE2] fill-gray-700 dark:fill-aa-200 purple:fill-pt-200" />
      </button>
    </div>
  );
}
