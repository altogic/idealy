import * as React from 'react';

function SvgReply(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M10 2v.7c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C7.72 7.5 6.88 7.5 5.2 7.5H2m0 0L4.5 5M2 7.5 4.5 10"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgReply;
