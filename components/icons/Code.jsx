import * as React from 'react';

function SvgCode(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="code_svg__icon code_svg__icon-tabler code_svg__icon-tabler-code"
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
    <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
  </svg>
}
export default SvgCode;
