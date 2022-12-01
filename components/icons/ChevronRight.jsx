import * as React from 'react';

function SvgChevronRight(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="m7.5 15 5-5-5-5"
        stroke="currentColor"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgChevronRight;
