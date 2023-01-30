export default function TopicBadges({ badgeName, selected }) {
  return (
    <span
      className={`inline-flex items-center bg-gray-200 dark:bg-aa-600 purple:bg-pt-800 px-1.5 text-xs font-medium border-2 border-gray-200 dark:border-transparent purple:border-transparent rounded-full ${
        selected
          ? 'text-indigo-700 dark:text-indigo-400 purple:text-indigo-100 border-indigo-500 dark:border-indigo-400 purple:border-indigo-100'
          : 'text-gray-700 dark:text-aa-100 purple:text-pt-100'
      }`}>
      <svg
        className={`w-3 h-3 mr-1 ${
          selected
            ? 'text-indigo-500 dark:text-indigo-400 purple:text-indigo-100'
            : 'text-gray-500 dark:text-aa-200 purple:text-pt-200'
        }`}
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
