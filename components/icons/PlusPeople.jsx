import * as React from 'react';

function SvgPlusPeople(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12 15.5H7.5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C2 18.907 2 19.604 2 21m17 0v-6m-3 3h6M14.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPlusPeople;
