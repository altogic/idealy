import * as React from 'react';

function SvgThreeDot(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12 12v2a2 2 0 0 0 2-2h-2Zm0 0h-2a2 2 0 0 0 2 2v-2Zm0 0v-2a2 2 0 0 0-2 2h2Zm0 0h2a2 2 0 0 0-2-2v2Zm7 0v2a2 2 0 0 0 2-2h-2Zm0 0h-2a2 2 0 0 0 2 2v-2Zm0 0v-2a2 2 0 0 0-2 2h2Zm0 0h2a2 2 0 0 0-2-2v2ZM5 12v2a2 2 0 0 0 2-2H5Zm0 0H3a2 2 0 0 0 2 2v-2Zm0 0v-2a2 2 0 0 0-2 2h2Zm0 0h2a2 2 0 0 0-2-2v2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgThreeDot;
