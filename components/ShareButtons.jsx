import { Facebook, LinkedIn, Twitter, Link } from '@/components/icons';
import ToastMessage from '@/utils/toast';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import copy from 'copy-to-clipboard';

export default function ShareButtons({ url, title, summary, hashtags, isPublished }) {
  function copyToClipboard() {
    copy(url);
    ToastMessage.success('Copied to clipboard');
  }
  return (
    <div className="flex gap-2 items-center ">
      {isPublished && (
        <>
          <FacebookShareButton url={url} quote={summary} hashtag={hashtags}>
            <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#1877F2] dark:hover:bg-gray-700 dark:hover:text-[#1877F2] purple:hover:bg-gray-700 purple:hover:text-[#1877F2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
              <Facebook className="w-5 h-5" />
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title} hashtags={hashtags}>
            <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#1DA1F2] dark:hover:bg-gray-700 dark:hover:text-[#1DA1F2] purple:hover:bg-gray-700 purple:hover:text-[#1DA1F2] text-gray-700 dark:text-aa-200 purple:text-pt-200">
              <Twitter className="w-5 h-5  " />
            </div>
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={title} summary={summary} source={url}>
            <div className="w-8 h-8 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-[#0077B5] dark:hover:bg-gray-700 dark:hover:text-[#0077B5] purple:hover:bg-gray-700 purple:hover:text-[#0077B5] text-gray-700 dark:text-aa-200 purple:text-pt-200">
              <LinkedIn className="w-5 h-5  " />
            </div>
          </LinkedinShareButton>
        </>
      )}
      <button type="button" onClick={copyToClipboard}>
        <div className="w-8 h-8 flex justify-center items-center group rounded-full duration-300  hover:bg-cyan-300 dark:hover:bg-gray-700 dark:hover:text-cyan-300 purple:hover:bg-gray-700 purple:hover:text-cyan-300 text-gray-700 dark:text-aa-200 purple:text-pt-200">
          <Link className="w-5 h-5 group-hover:stroke-white icon" />
        </div>
      </button>
    </div>
  );
}
