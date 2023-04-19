import * as React from 'react';

function SvgArrowRight(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="arrow-right_svg__icon arrow-right_svg__icon-tabler arrow-right_svg__icon-tabler-arrow-narrow-right"
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
    <path d="M5 12h14M15 16l4-4M15 8l4 4" />
  </svg>
}
export default SvgArrowRight;
