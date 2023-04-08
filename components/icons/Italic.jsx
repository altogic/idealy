import * as React from 'react';

function SvgItalic(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="italic_svg__icon italic_svg__icon-tabler italic_svg__icon-tabler-italic"
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
    <path d="M11 5h6M7 19h6M14 5l-4 14" />
  </svg>
}
export default SvgItalic;
