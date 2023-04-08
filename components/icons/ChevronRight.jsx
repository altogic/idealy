import * as React from 'react';

function SvgChevronRight(props) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    className="chevron-right_svg__icon chevron-right_svg__icon-tabler chevron-right_svg__icon-tabler-chevron-right"
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
    <path d="m9 6 6 6-6 6" />
  </svg>
}
export default SvgChevronRight;
