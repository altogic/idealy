import * as React from 'react';

function SvgArchive(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <rect x={3} y={4} width={18} height={4} rx={2} />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4" />
    </svg>
  );
}
export default SvgArchive;
