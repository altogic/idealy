import * as React from 'react';

function SvgStar(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M10 3.333v13.333M15 5 5 15m11.667-5H3.333M15 15 5 5"
        stroke="currentColor"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgStar;
