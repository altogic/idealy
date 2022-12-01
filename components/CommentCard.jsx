export default function CommentCard({ nameFirstLetter, userName, timeAgo }) {
  return (
    <div className="bg-gray-50 p-8">
      <div className="flex gap-5">
        {/* Name First Letter Icon */}
        <div>
          <span className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-200 text-indigo-900 tracking-sm rounded-full">
            {nameFirstLetter}
          </span>
        </div>
        <div className="space-y-5">
          <h6 className="text-slate-800 text-base tracking-sm">{userName}</h6>
          <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full">
            <p>
              Id fringilla lacus cras fringilla blandit. Justo, a tincidunt quis nec. Quis luctus
              pellentesque vel, nec sed risus nunc ultricies. Dignissim aenean in mauris integer
              posuere at odio interdum. Eget egestas condimentum justo, adip
            </p>
            <p>
              Feugiat donec aliquam suspendisse dictum fringilla semper. Venenatis feugiat aenean
              risus nunc tortor auctor sed. Dolor, eget varius elit sit sed donec pharetra, blandit.
              At imperdiet sed urna tellus molestie pharetra lect
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-sm tracking-sm">{timeAgo}</span>
            <svg className="h-1 w-1 text-slate-500" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            <button type="button" className="inline-flex text-indigo-600 text-sm tracking-sm">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
