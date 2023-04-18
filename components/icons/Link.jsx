import * as React from 'react';

function SvgLink(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="link_svg__icon link_svg__icon-tabler link_svg__icon-tabler-link"
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
    <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
    <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
  </svg>
}
export default SvgLink;
