import * as React from 'react';

function SvgCheck(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="check_svg__icon check_svg__icon-tabler check_svg__icon-tabler-check"
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
    <path d="m5 12 5 5L20 7" />
  </svg>
}
export default SvgCheck;
