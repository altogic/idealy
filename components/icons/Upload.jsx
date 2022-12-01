import * as React from 'react';

function SvgUpload(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M7.167 13.333 10.5 10m0 0 3.333 3.333M10.5 10v7.5m6.666-3.548a4.583 4.583 0 0 0-2.917-8.12.516.516 0 0 1-.444-.25 6.25 6.25 0 1 0-9.816 7.58"
        stroke="currentColor"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgUpload;
