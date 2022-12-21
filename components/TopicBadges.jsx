export default function TopicBadges({ badgeName, selected }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 bg-gray-200 py-1 px-3 text-xs font-medium ${
        selected ? 'text-indigo-700 border-indigo-500' : 'text-gray-700'
      }`}>
      <svg
        className={`w-3 h-3 mr-1 ${selected ? 'text-indigo-500' : 'text-gray-500'}`}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 2V10M9 3L3 9M10 6H2M9 9L3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {badgeName}
    </span>
  );
}
