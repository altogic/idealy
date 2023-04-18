import * as React from 'react';

function SvgPen(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="pen_svg__icon pen_svg__icon-tabler pen_svg__icon-tabler-pencil"
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
    <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
  </svg>
}
export default SvgPen;
