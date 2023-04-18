import * as React from 'react';

function SvgUnderline(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="underline_svg__icon underline_svg__icon-tabler underline_svg__icon-tabler-underline"
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
    <path d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14" />
  </svg>
}
export default SvgUnderline;
