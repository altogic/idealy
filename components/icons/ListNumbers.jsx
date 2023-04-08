import * as React from 'react';

function SvgListNumbers(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="list-numbers_svg__icon list-numbers_svg__icon-tabler list-numbers_svg__icon-tabler-list-numbers"
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
    <path d="M11 6h9M11 12h9M12 18h8M4 16a2 2 0 1 1 4 0c0 .591-.5 1-1 1.5L4 20h4M6 10V4L4 6" />
  </svg>
}
export default SvgListNumbers;
