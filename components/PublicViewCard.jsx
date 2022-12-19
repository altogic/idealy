import { useState } from 'react';
import cn from 'classnames';
import { DateTime } from 'luxon';
import TopicBadges from './TopicBadges';
import StatusButton from './StatusButton';

export default function PublicViewCard({ idea, onClick }) {
  const [counter, setCounter] = useState(0);

  return (
    <div className="px-2 py-6 lg:p-6 rounded-lg transition hover:bg-slate-50 ]">
      <div className="flex items-start lg:items-center gap-6">
        <div className="flex flex-col items-center bg-white px-3 md:px-5 rounded-lg">
          <button
            type="button"
            onClick={() => setCounter(counter + 1)}
            className="inline-flex items-center justify-center text-indigo-700 w-6 h-6">
            <svg
              className="w-4 h-2"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 7L7 1L1 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-indigo-700 text-2xl font-semibold tracking-md">{counter}</span>
          <button
            type="button"
            onClick={() => {
              setCounter(counter === 0 ? 0 : counter - 1);
            }}
            className={cn(
              `inline-flex items-center justify-center w-6 h-6`,
              counter === 0 ? 'text-slate-100' : 'text-indigo-700'
            )}>
            <svg
              className="w-4 h-2"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button type="button" onClick={onClick} className="w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-orange-50 py-1 px-2 text-xs font-medium text-orange-700">
              <svg
                className="w-3 h-3 mr-1 text-orange-500"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1380_17979)">
                  <path
                    d="M4.1878 7.80821L1.35938 10.6366M5.84665 3.32097L5.0662 4.10141C5.00254 4.16507 4.97071 4.1969 4.93444 4.2222C4.90225 4.24465 4.86753 4.26323 4.831 4.27756C4.78983 4.29371 4.74569 4.30253 4.65741 4.32019L2.82518 4.68664C2.34903 4.78187 2.11095 4.82948 1.99957 4.95501C1.90254 5.06436 1.85823 5.21071 1.8783 5.35552C1.90135 5.52175 2.07303 5.69343 2.41639 6.03679L5.95925 9.57966C6.30261 9.92301 6.47429 10.0947 6.64052 10.1177C6.78533 10.1378 6.93168 10.0935 7.04103 9.99647C7.16656 9.88509 7.21417 9.64701 7.3094 9.17086L7.67585 7.33863C7.69351 7.25035 7.70234 7.20621 7.71848 7.16504C7.73281 7.12851 7.75139 7.09379 7.77384 7.0616C7.79914 7.02533 7.83097 6.9935 7.89463 6.92984L8.67507 6.1494C8.71578 6.10869 8.73613 6.08834 8.7585 6.07057C8.77837 6.05479 8.79942 6.04054 8.82145 6.02795C8.84626 6.01378 8.87271 6.00244 8.92562 5.97976L10.1728 5.44526C10.5367 5.28932 10.7186 5.21136 10.8012 5.08536C10.8735 4.97519 10.8993 4.84094 10.8732 4.7118C10.8432 4.56413 10.7033 4.42417 10.4234 4.14426L7.85178 1.57269C7.57187 1.29278 7.43191 1.15282 7.28424 1.12288C7.1551 1.09671 7.02086 1.12256 6.91068 1.19483C6.78469 1.27746 6.70672 1.45939 6.55078 1.82324L6.01628 3.07042C5.9936 3.12333 5.98226 3.14978 5.96809 3.17459C5.9555 3.19662 5.94125 3.21767 5.92547 3.23754C5.9077 3.25991 5.88735 3.28027 5.84665 3.32097Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1380_17979">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Pinned
            </span>
            <h2 className="text-slate-800 text-xl font-semibold tracking-md">{idea.title}</h2>
          </div>
          <p className="max-w-3xl text-slate-500 mb-6 text-sm tracking-sm text-left line-clamp-3">
            {idea?.content}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Bottom Left */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
              <div className="flex items-center gap-3">
                {/* User */}
                <span className="text-slate-700 text-sm font-medium tracking-sm">
                  {idea?.author ? idea.author.name : idea.guestName}
                </span>
                <svg className="h-1 w-1 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                {/* Date */}
                <span className="text-slate-500 text-sm tracking-sm">
                  {DateTime.fromISO(idea.createdAt).setLocale('en').toRelative()}
                </span>
              </div>
              <svg
                className="hidden lg:block h-1 w-1 text-slate-500"
                fill="currentColor"
                viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
              </svg>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {idea.topics.map((topic) => (
                  <TopicBadges key={topic} badgeName={topic} />
                ))}
              </div>
            </div>
            {/* Bottom Right */}
            <div className="flex items-center justify-between lg:justify-start gap-3">
              {/* Badges */}
              <StatusButton name={idea?.status.name} color={idea?.status.color} />
              {/* Comments Button */}
              <button type="button" className="inline-flex items-center gap-1 text-slate-400">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                32
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
