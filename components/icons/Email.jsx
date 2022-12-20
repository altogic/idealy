import * as React from 'react';

function SvgEmail(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16.142 4.667H7.934c-1.96 0-2.94 0-3.689.381a3.5 3.5 0 0 0-1.53 1.53c-.381.748-.381 1.729-.381 3.689v7.466c0 1.96 0 2.94.381 3.69a3.5 3.5 0 0 0 1.53 1.529c.749.381 1.729.381 3.689.381h12.133c1.96 0 2.94 0 3.69-.381a3.499 3.499 0 0 0 1.529-1.53c.381-.748.381-1.728.381-3.689v-6.066m-23.333-3.5 9.526 6.668c.771.54 1.157.81 1.576.914.37.093.758.093 1.129 0 .42-.104.805-.374 1.577-.914l3.925-3.168"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.334 8.167a1 1 0 1 0 2 0h-2Zm2-7a1 1 0 1 0-2 0h2Zm-4.5 2.5a1 1 0 1 0 0 2v-2Zm7 2a1 1 0 1 0 0-2v2Zm-2.5 2.5v-7h-2v7h2Zm-4.5-2.5h7v-2h-7v2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgEmail;
