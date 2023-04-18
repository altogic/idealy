import * as React from 'react';

function SvgPin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="pin_svg__icon pin_svg__icon-tabler pin_svg__icon-tabler-pin"
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
      <path d="m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" />
    </svg>
  );
}
export default SvgPin;
