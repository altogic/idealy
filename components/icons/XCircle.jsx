import * as React from 'react';

function SvgXCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="x-circle_svg__icon x-circle_svg__icon-tabler x-circle_svg__icon-tabler-circle-x"
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
      <circle cx={12} cy={12} r={9} />
      <path d="m10 10 4 4m0-4-4 4" />
    </svg>
  );
}
export default SvgXCircle;
