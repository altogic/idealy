import * as React from 'react';

function SvgUpDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="up-down_svg__icon up-down_svg__icon-tabler up-down_svg__icon-tabler-sort-ascending"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 6h7M4 12h7M4 18h9M15 9l3-3 3 3M18 6v12" />
    </svg>
  );
}
export default SvgUpDown;
