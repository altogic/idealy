import * as React from 'react';

function SvgEye(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="eye_svg__icon eye_svg__icon-tabler eye_svg__icon-tabler-eye"
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
    <circle cx={12} cy={12} r={2} />
    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7" />
  </svg>
}
export default SvgEye;
