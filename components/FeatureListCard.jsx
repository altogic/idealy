import cn from 'classnames';
import TopicBadges from './TopicBadges';

export default function FeatureListCard({
  title,
  description,
  upNumber,
  commentNumber,
  status,
  badgeName
}) {
  return (
    <div className="bg-white px-8 py-6 border-2 border-transparent transition hover:bg-slate-50 hover:border-indigo-700">
      <h6 className="text-slate-800 mb-2 text-base font-medium tracking-sm">{title}</h6>
      <p className="text-slate-500 mb-5 text-sm tracking-sm">{description}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm tracking-sm">
            <svg
              className="w-5 h-5 text-slate-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 10L10 6.66667M10 6.66667L6.66667 10M10 6.66667V13.3333M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {upNumber}
          </span>
          <svg className="h-1.5 w-1.5 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm tracking-sm">
            <svg
              className="w-5 h-5 text-slate-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1026_15628)">
                <path
                  d="M8.33317 12.5L5.77046 15.0948C5.41299 15.4567 5.23426 15.6377 5.08063 15.6504C4.94735 15.6615 4.81685 15.6079 4.7298 15.5064C4.62947 15.3893 4.62947 15.135 4.62947 14.6263V13.3263C4.62947 12.87 4.25573 12.5398 3.80417 12.4736V12.4736C2.71129 12.3135 1.85298 11.4552 1.6929 10.3623C1.6665 10.1821 1.6665 9.9671 1.6665 9.53704V5.66667C1.6665 4.26654 1.6665 3.56647 1.93899 3.0317C2.17867 2.56129 2.56112 2.17884 3.03153 1.93916C3.56631 1.66667 4.26637 1.66667 5.6665 1.66667H11.8332C13.2333 1.66667 13.9334 1.66667 14.4681 1.93916C14.9386 2.17884 15.321 2.56129 15.5607 3.0317C15.8332 3.56647 15.8332 4.26654 15.8332 5.66667V9.16667M15.8332 18.3333L14.0195 17.0724C13.7645 16.8952 13.6371 16.8065 13.4983 16.7437C13.3752 16.6879 13.2457 16.6473 13.1128 16.6228C12.963 16.5952 12.8078 16.5952 12.4973 16.5952H10.9998C10.0664 16.5952 9.59971 16.5952 9.24319 16.4136C8.92958 16.2538 8.67462 15.9988 8.51483 15.6852C8.33317 15.3287 8.33317 14.862 8.33317 13.9286V11.8333C8.33317 10.8999 8.33317 10.4332 8.51483 10.0767C8.67462 9.76308 8.92958 9.50812 9.24319 9.34833C9.59971 9.16667 10.0664 9.16667 10.9998 9.16667H15.6665C16.5999 9.16667 17.0666 9.16667 17.4232 9.34833C17.7368 9.50812 17.9917 9.76308 18.1515 10.0767C18.3332 10.4332 18.3332 10.8999 18.3332 11.8333V14.0952C18.3332 14.8718 18.3332 15.2601 18.2063 15.5664C18.0371 15.9748 17.7127 16.2992 17.3043 16.4684C16.998 16.5952 16.6097 16.5952 15.8332 16.5952V18.3333Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1026_15628">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {commentNumber}
          </span>
        </div>
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            className={cn(
              `inline-flex items-center rounded-full  px-3 py-0.5 text-xs font-medium`,
              status === 1 ? 'bg-red-100 text-red-700' : null,
              status === 2 ? 'bg-blue-100 text-blue-700' : null,
              status === 3 ? 'bg-yellow-100 text-yellow-700' : null,
              status === 4 ? 'bg-green-100 text-green-700' : null,
              status === 5 ? 'bg-purple-100 text-purple-700' : null,
              status === 6 ? 'bg-slate-100 text-slate-700' : null
            )}>
            <svg
              className={cn(
                `-ml-1 mr-1.5 h-2 w-2`,
                status === 1 ? 'text-red-500' : null,
                status === 2 ? 'text-blue-500' : null,
                status === 3 ? 'text-yellow-500' : null,
                status === 4 ? 'text-green-500' : null,
                status === 5 ? 'text-purple-500' : null,
                status === 6 ? 'text-slate-500' : null
              )}
              fill="currentColor"
              viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            {status === 1 ? 'Under Consideration' : null}
            {status === 2 ? 'Planned' : null}
            {status === 3 ? 'In Development' : null}
            {status === 4 ? 'Shipped' : null}
            {status === 5 ? 'Complete' : null}
            {status === 6 ? 'Close' : null}
          </button>
          <svg className="h-2 w-2 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          <TopicBadges badgeName={badgeName} />
        </div>
      </div>
    </div>
  );
}
