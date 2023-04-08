import * as React from 'react';

function SvgCircleCheck(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="circle-check_svg__icon circle-check_svg__icon-tabler circle-check_svg__icon-tabler-circle-check"
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
    <path d="m9 12 2 2 4-4" />
  </svg>
}
export default SvgCircleCheck;
